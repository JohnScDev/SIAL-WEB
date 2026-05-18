(function () {
  const CONTROL_SELECTOR = "input, select, textarea";
  let errorSequence = 0;

  function normalizeText(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }

  function getField(control) {
    return control?.closest?.(".field") || control?.closest?.("fieldset") || control?.parentElement || null;
  }

  function getOtpGroup(control) {
    return control?.closest?.("[data-otp-group]") || null;
  }

  function getFieldLabel(control) {
    const field = getField(control);
    const label = field?.querySelector("label");
    return normalizeText(label?.textContent).replace(/\*/g, "").trim();
  }

  function ensureId(element, prefix) {
    if (!element.id) {
      errorSequence += 1;
      element.id = `${prefix}-${errorSequence}`;
    }
    return element.id;
  }

  function setDescribedBy(control, errorId) {
    if (!control.dataset.sialBaseDescribedBy) {
      control.dataset.sialBaseDescribedBy = control.getAttribute("aria-describedby") || "";
    }
    const ids = [control.dataset.sialBaseDescribedBy, errorId]
      .flatMap((item) => String(item || "").split(/\s+/))
      .filter(Boolean);
    control.setAttribute("aria-describedby", Array.from(new Set(ids)).join(" "));
  }

  function restoreDescribedBy(control) {
    const base = control.dataset.sialBaseDescribedBy || "";
    if (base) control.setAttribute("aria-describedby", base);
    else control.removeAttribute("aria-describedby");
  }

  function ensureErrorElement(field) {
    if (!field) return null;
    let error = field.querySelector(":scope > .field-error[data-sial-field-error]");
    if (!error) {
      error = document.createElement("p");
      error.className = "field-error";
      error.dataset.sialFieldError = "";
      error.setAttribute("aria-live", "polite");
      error.id = `field-error-${Date.now()}-${errorSequence += 1}`;
      field.appendChild(error);
    }
    return error;
  }

  function setCompositeError(target, message) {
    const field = getField(target) || target;
    const error = ensureErrorElement(field);
    if (!target || !error) return;
    error.textContent = message;
    target.setAttribute("aria-invalid", "true");
    field.classList.add("is-invalid");
    setDescribedBy(target, error.id);
  }

  function clearCompositeError(target) {
    const field = getField(target) || target;
    const error = field?.querySelector(":scope > .field-error[data-sial-field-error]");
    target?.removeAttribute("aria-invalid");
    field?.classList.remove("is-invalid");
    if (error) error.textContent = "";
    if (target) restoreDescribedBy(target);
  }

  function setFieldError(control, message) {
    setCompositeError(control, message);
  }

  function clearFieldError(control) {
    clearCompositeError(control);
  }

  function isPasswordPolicyMet(value) {
    return value.length >= 8 && /[A-Za-z]/.test(value) && /[0-9]/.test(value) && /[^A-Za-z0-9]/.test(value);
  }

  function getRequiredMessage(control) {
    const key = control.name || control.id;
    if (key === "username") return "Ingresa el usuario asignado.";
    if (key === "password") return "Ingresa la contrasena.";
    if (key === "newPassword") return "Ingresa una nueva contrasena.";
    if (key === "confirmPassword") return "Confirma la contrasena.";
    if (key === "company") return "Selecciona una empresa activa para continuar.";
    const label = getFieldLabel(control);
    return label ? `Completa ${label.toLowerCase()}.` : "Completa este campo obligatorio.";
  }

  function validateControl(control, form) {
    if (!control || control.disabled || ["button", "submit", "reset", "hidden"].includes(control.type)) return true;
    if (getOtpGroup(control)) return validateOtpGroup(getOtpGroup(control));

    const value = normalizeText(control.value);
    if (control.required && !value) {
      setFieldError(control, getRequiredMessage(control));
      return false;
    }

    if (control.id === "newPassword" && value && !isPasswordPolicyMet(value)) {
      setFieldError(control, "Usa minimo 8 caracteres con letras, numeros y simbolos.");
      return false;
    }

    if (control.id === "confirmPassword" && value) {
      const password = form?.querySelector("#newPassword");
      if (password?.value && value !== password.value) {
        setFieldError(control, "Las contrasenas deben coincidir.");
        return false;
      }
    }

    if (control.validity?.patternMismatch) {
      setFieldError(control, "Revisa el formato ingresado.");
      return false;
    }

    clearFieldError(control);
    return true;
  }

  function validateOtpGroup(group) {
    if (!group) return true;
    const inputs = Array.from(group.querySelectorAll(".otp-input"));
    const value = inputs.map((input) => input.value).join("");
    const isComplete = inputs.length > 0 && value.length === inputs.length && /^[0-9]+$/.test(value);

    if (!isComplete) {
      setCompositeError(group, `Ingresa los ${inputs.length || 6} digitos del codigo.`);
      inputs.forEach((input) => input.setAttribute("aria-invalid", "true"));
      return false;
    }

    clearCompositeError(group);
    inputs.forEach((input) => input.removeAttribute("aria-invalid"));
    return true;
  }

  function validateForm(form) {
    if (!form) return true;
    form.classList.add("was-validated");
    const controls = Array.from(form.querySelectorAll(CONTROL_SELECTOR));
    const otpGroups = Array.from(new Set(controls.map(getOtpGroup).filter(Boolean)));
    let firstInvalid = null;
    let valid = true;

    controls.forEach((control) => {
      if (getOtpGroup(control)) return;
      const controlValid = validateControl(control, form);
      if (!controlValid && !firstInvalid) firstInvalid = control;
      valid = controlValid && valid;
    });

    otpGroups.forEach((group) => {
      const groupValid = validateOtpGroup(group);
      if (!groupValid && !firstInvalid) firstInvalid = group.querySelector(".otp-input");
      valid = groupValid && valid;
    });

    if (!valid) {
      form.querySelector("[data-login-error]")?.classList.add("is-hidden");
      firstInvalid?.focus?.();
    }

    return valid;
  }

  function initForm(form) {
    if (!form || form.dataset.sialValidationReady === "true") return;
    form.dataset.sialValidationReady = "true";

    Array.from(form.querySelectorAll(CONTROL_SELECTOR)).forEach((control) => {
      ensureId(control, "auth-control");
      control.addEventListener("input", () => {
        if (getOtpGroup(control)) {
          const group = getOtpGroup(control);
          if (form.classList.contains("was-validated") || group?.getAttribute("aria-invalid") === "true") {
            validateOtpGroup(group);
          }
          return;
        }
        if (form.classList.contains("was-validated") || control.getAttribute("aria-invalid") === "true") {
          validateControl(control, form);
        }
      });
      control.addEventListener("change", () => {
        if (form.classList.contains("was-validated") || control.getAttribute("aria-invalid") === "true") {
          validateControl(control, form);
        }
      });
    });
  }

  window.SialAuthValidation = {
    initForm,
    validateForm,
    validateControl,
    setCompositeError,
    clearCompositeError,
    setFieldError,
    clearFieldError,
  };
})();
