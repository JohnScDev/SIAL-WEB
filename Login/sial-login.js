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
  const viewMotion = initAuthViewMotion();

  /* === SIAL View Motion START (auth reversible block) ===
     Remove this function and the viewMotion.start call below to disable auth page motion. */
  function initAuthViewMotion() {
    if (!document.body || document.body.hasAttribute("data-view-motion-disabled")) {
      return { start: (targetHref) => { window.location.href = targetHref; } };
    }
    const root = document.documentElement;
    const reducedMotion = () => window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let navigationTimer = null;
    let overlayTimer = null;

    function ensureMotionSurfaces() {
      if (!document.querySelector("[data-view-motion-bar]")) {
        const bar = document.createElement("div");
        bar.className = "view-motion-bar";
        bar.dataset.viewMotionBar = "true";
        bar.setAttribute("aria-hidden", "true");
        document.body.appendChild(bar);
      }
      if (!document.querySelector("[data-view-motion-overlay]")) {
        const overlay = document.createElement("div");
        overlay.className = "view-motion-overlay";
        overlay.dataset.viewMotionOverlay = "true";
        overlay.setAttribute("role", "status");
        overlay.setAttribute("aria-live", "polite");
        overlay.innerHTML = `
          <div class="view-motion-card">
            <span class="view-motion-brand" aria-hidden="true"></span>
            <span class="view-motion-text">Cargando vista</span>
            <span class="view-motion-track" aria-hidden="true"><span></span></span>
          </div>
        `;
        document.body.appendChild(overlay);
      }
    }

    function resetMotion() {
      window.clearTimeout(navigationTimer);
      window.clearTimeout(overlayTimer);
      delete root.dataset.viewMotionOverlay;
      if (root.dataset.viewMotion === "leaving") root.dataset.viewMotion = "ready";
    }

    function start(targetHref) {
      if (reducedMotion()) {
        window.location.href = targetHref;
        return;
      }
      resetMotion();
      ensureMotionSurfaces();
      root.dataset.viewMotion = "leaving";
      overlayTimer = window.setTimeout(() => {
        root.dataset.viewMotionOverlay = "visible";
      }, 320);
      navigationTimer = window.setTimeout(() => {
        window.location.href = targetHref;
      }, 150);
    }

    function shouldHandleLink(link, event) {
      if (!link || event.defaultPrevented || event.button !== 0) return false;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false;
      if (link.hasAttribute("download")) return false;
      if (link.target && link.target !== "_self") return false;
      const rawHref = link.getAttribute("href");
      if (!rawHref || rawHref.startsWith("#")) return false;
      if (/^(mailto:|tel:|javascript:)/i.test(rawHref)) return false;
      let url;
      try {
        url = new URL(rawHref, window.location.href);
      } catch {
        return false;
      }
      if (url.origin !== window.location.origin) return false;
      const sameDocument = url.pathname === window.location.pathname && url.search === window.location.search;
      if (sameDocument && url.hash) return false;
      return url.href !== window.location.href;
    }

    document.addEventListener("click", (event) => {
      const link = event.target.closest?.("a[href]");
      if (!shouldHandleLink(link, event)) return;
      event.preventDefault();
      start(link.href);
    });

    window.addEventListener("pagehide", resetMotion);
    ensureMotionSurfaces();
    if (!reducedMotion()) {
      root.dataset.viewMotion = "entering";
      window.setTimeout(() => {
        if (root.dataset.viewMotion === "entering") root.dataset.viewMotion = "ready";
      }, 620);
    }

    return { start };
  }
  /* === SIAL View Motion END (auth reversible block) === */

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
          viewMotion.start(redirect);
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
