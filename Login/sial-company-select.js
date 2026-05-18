(function () {
  const form = document.querySelector("[data-company-form]");
  if (!form) return;

  const search = form.querySelector("[data-company-search]");
  const options = Array.from(form.querySelectorAll("[data-company-option]"));
  const empty = form.querySelector("[data-company-empty]");
  const submit = form.querySelector("[data-company-submit]");
  const error = document.querySelector("[data-company-error]");
  const selector = form.querySelector(".company-selector");

  window.SialAuthValidation?.initForm(form);

  function normalize(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  }

  function updateVisibleOptions() {
    const query = normalize(search?.value);
    let visibleCount = 0;

    options.forEach((option) => {
      const matches = !query || normalize(option.dataset.search).includes(query);
      option.classList.toggle("is-hidden", !matches);
      if (matches) visibleCount += 1;
    });

    empty?.classList.toggle("is-hidden", visibleCount > 0);
  }

  function replayState(option, stateClass) {
    if (!option) return;
    option.classList.remove(stateClass);
    window.requestAnimationFrame(() => {
      option.classList.add(stateClass);
    });
    window.setTimeout(() => {
      option.classList.remove(stateClass);
    }, 520);
  }

  search?.addEventListener("input", updateVisibleOptions);

  options.forEach((option) => {
    const input = option.querySelector('input[type="radio"]');

    input?.addEventListener("change", () => {
      if (!input.checked || input.disabled) return;
      error?.classList.add("is-hidden");
      window.SialAuthValidation?.clearCompositeError(selector);
      replayState(option, "is-selected-pulse");
    });

    option.addEventListener("click", () => {
      if (option.classList.contains("is-disabled")) {
        error?.classList.remove("is-hidden");
        error.textContent = "Esta empresa no esta disponible para la sesion actual.";
        replayState(option, "is-blocked-attempt");
      } else {
        error?.classList.add("is-hidden");
      }
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (window.SialAuthValidation && !window.SialAuthValidation.validateForm(form)) {
      return;
    }
    if (!window.SialAuthValidation && !form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const selected = form.querySelector('input[name="company"]:checked:not(:disabled)');
    if (!selected) {
      window.SialAuthValidation?.setCompositeError(selector, "Selecciona una empresa activa para continuar.");
      selector?.querySelector('input[name="company"]:not(:disabled)')?.focus();
      return;
    }

    error?.classList.add("is-hidden");
    window.SialAuthValidation?.clearCompositeError(selector);
    form.classList.add("is-submitting");
    submit?.setAttribute("disabled", "true");
    if (submit) {
      submit.classList.add("is-loading");
      submit.textContent = "Ingresando...";
    }

    selected.closest("[data-company-option]")?.classList.add("is-continuing");

    window.setTimeout(() => {
      window.location.href = form.dataset.redirect || "../Gestion%20de%20Usuarios/gestion-usuarios.html";
    }, 700);
  });

  updateVisibleOptions();
})();
