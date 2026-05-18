(function () {
  const form = document.querySelector("[data-company-form]");
  if (!form) return;

  const search = form.querySelector("[data-company-search]");
  const options = Array.from(form.querySelectorAll("[data-company-option]"));
  const empty = form.querySelector("[data-company-empty]");
  const submit = form.querySelector("[data-company-submit]");
  const error = document.querySelector("[data-company-error]");

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

  search?.addEventListener("input", updateVisibleOptions);

  options.forEach((option) => {
    option.addEventListener("click", () => {
      if (option.classList.contains("is-disabled")) {
        error?.classList.remove("is-hidden");
        error.textContent = "Esta empresa no esta disponible para la sesion actual.";
      } else {
        error?.classList.add("is-hidden");
      }
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const selected = form.querySelector('input[name="company"]:checked:not(:disabled)');
    if (!selected) {
      error?.classList.remove("is-hidden");
      error.textContent = "Selecciona una empresa activa para continuar.";
      return;
    }

    error?.classList.add("is-hidden");
    submit?.setAttribute("disabled", "true");
    if (submit) submit.textContent = "Ingresando...";

    window.setTimeout(() => {
      window.location.href = form.dataset.redirect || "../Gestion%20de%20Usuarios/gestion-usuarios.html";
    }, 700);
  });

  updateVisibleOptions();
})();
