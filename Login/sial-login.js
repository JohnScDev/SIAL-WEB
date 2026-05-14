(function () {
  const slides = Array.from(document.querySelectorAll("[data-slide]"));
  const controls = Array.from(document.querySelectorAll("[data-slide-control]"));
  const toggle = document.querySelector("[data-carousel-toggle]");
  const passwordToggles = Array.from(document.querySelectorAll("[data-password-toggle]"));
  const forms = Array.from(document.querySelectorAll("[data-auth-form], .login-form"));
  const otpInputs = Array.from(document.querySelectorAll("[data-otp-group] .otp-input"));
  const resend = document.querySelector("[data-resend-code]");
  const resendCounter = document.querySelector("[data-resend-counter]");
  let active = 0;
  let paused = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let timer = null;

  function setSlide(index) {
    active = index;
    slides.forEach((slide, slideIndex) => slide.classList.toggle("is-active", slideIndex === index));
    controls.forEach((control, controlIndex) => control.classList.toggle("is-active", controlIndex === index));
  }

  function start() {
    if (paused || slides.length < 2) return;
    stop();
    timer = window.setInterval(() => {
      setSlide((active + 1) % slides.length);
    }, 6500);
  }

  function stop() {
    if (timer) window.clearInterval(timer);
    timer = null;
  }

  controls.forEach((control) => {
    control.addEventListener("click", () => {
      setSlide(Number(control.dataset.slideControl || 0));
      start();
    });
  });

  toggle?.addEventListener("click", () => {
    paused = !paused;
    toggle.textContent = paused ? "Reanudar" : "Pausar";
    toggle.setAttribute("aria-pressed", String(paused));
    if (paused) stop();
    else start();
  });

  passwordToggles.forEach((passwordToggle) => {
    const targetId = passwordToggle.dataset.passwordTarget || "password";
    const password = document.querySelector(`#${targetId}`);
    passwordToggle.addEventListener("click", () => {
    if (!password) return;
    const visible = password.getAttribute("type") === "text";
    password.setAttribute("type", visible ? "password" : "text");
    passwordToggle.setAttribute("aria-label", visible ? "Mostrar contrasena" : "Ocultar contrasena");
  });
  });

  otpInputs.forEach((input, index) => {
    input.addEventListener("input", () => {
      input.value = input.value.replace(/[^0-9]/g, "").slice(0, 1);
      if (input.value && otpInputs[index + 1]) otpInputs[index + 1].focus();
      updateOtpSubmit();
    });

    input.addEventListener("keydown", (event) => {
      if (event.key === "Backspace" && !input.value && otpInputs[index - 1]) {
        otpInputs[index - 1].focus();
      }
    });

    input.addEventListener("paste", (event) => {
      const pasted = event.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, otpInputs.length);
      if (!pasted) return;
      event.preventDefault();
      pasted.split("").forEach((digit, digitIndex) => {
        if (otpInputs[digitIndex]) otpInputs[digitIndex].value = digit;
      });
      otpInputs[Math.min(pasted.length, otpInputs.length) - 1]?.focus();
      updateOtpSubmit();
    });
  });

  function updateOtpSubmit() {
    const submit = document.querySelector("[data-otp-group]")?.closest("form")?.querySelector("[data-login-submit]");
    if (!submit) return;
    submit.disabled = otpInputs.some((input) => input.value.length !== 1);
  }

  forms.forEach((form) => {
    const submit = form.querySelector("[data-login-submit]");
    const error = form.querySelector("[data-login-error]");
    if (!submit) return;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      error?.classList.add("is-hidden");
      submit.setAttribute("disabled", "true");
      submit.textContent = form.dataset.loadingText || "Validando...";
      window.setTimeout(() => {
        const redirect = form.dataset.redirect;
        if (redirect) {
          window.location.href = redirect;
          return;
        }
        submit.removeAttribute("disabled");
        submit.textContent = form.dataset.defaultText || "Iniciar sesion";
        error?.classList.remove("is-hidden");
      }, 900);
    });
  });

  if (resend && resendCounter) {
    let seconds = Number(resendCounter.textContent || 45);
    const interval = window.setInterval(() => {
      seconds -= 1;
      resendCounter.textContent = String(Math.max(seconds, 0));
      if (seconds <= 0) {
        window.clearInterval(interval);
        resend.removeAttribute("disabled");
        resend.textContent = "Reenviar codigo";
      }
    }, 1000);

    resend.addEventListener("click", () => {
      if (resend.hasAttribute("disabled")) return;
      resend.setAttribute("disabled", "true");
      resend.textContent = "Codigo reenviado";
      window.setTimeout(() => {
        resend.textContent = "Reenviar codigo";
        resend.removeAttribute("disabled");
      }, 1800);
    });
  }

  updateOtpSubmit();

  if (paused && toggle) {
    toggle.textContent = "Reanudar";
    toggle.setAttribute("aria-pressed", "true");
  }

  setSlide(0);
  start();
})();
