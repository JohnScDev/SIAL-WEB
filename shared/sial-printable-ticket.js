(function () {
  "use strict";

  function text(value, fallback = "—") {
    return value === null || value === undefined || value === "" ? fallback : String(value);
  }

  function createField(field) {
    const item = document.createElement("div");
    if (field.wide) item.className = "sial-ticket-data-wide";
    const label = document.createElement("dt");
    const value = document.createElement("dd");
    label.textContent = text(field.label, "Dato");
    value.textContent = text(field.value);
    item.append(label, value);
    return item;
  }

  /**
   * Crea una vista previa de ticket reutilizable.
   * Los consumidores envían un objeto de datos y no dependen de su marcado interno.
   */
  function createPreview(options = {}) {
    const id = options.id || `sialTicket${Date.now()}`;
    const stage = document.createElement("div");
    stage.className = "sial-ticket-print-stage";
    stage.hidden = true;
    stage.dataset.state = "complete";
    const printer = document.createElement("div");
    printer.className = "sial-ticket-printer";
    printer.dataset.sialTicketPrinter = "";
    printer.setAttribute("aria-hidden", "true");
    const printerStatus = document.createElement("span");
    printerStatus.className = "sial-ticket-printer-status";
    const printerSlot = document.createElement("span");
    printerSlot.className = "sial-ticket-printer-slot";
    printer.append(printerStatus, printerSlot);
    const element = document.createElement("section");
    element.className = "sial-printable-ticket";
    element.id = id;
    element.dataset.sialTicketRoot = "";
    element.setAttribute("aria-labelledby", `${id}Title`);

    const topline = document.createElement("div");
    topline.className = "sial-ticket-topline";
    const brand = document.createElement("span");
    const ticketId = document.createElement("span");
    brand.textContent = options.brand || "SIAL";
    topline.append(brand, ticketId);

    const heading = document.createElement("div");
    heading.className = "sial-ticket-brand";
    const eyebrow = document.createElement("p");
    eyebrow.className = "sial-ticket-eyebrow";
    const title = document.createElement("h4");
    title.id = `${id}Title`;
    title.tabIndex = -1;
    const meta = document.createElement("p");
    meta.className = "sial-ticket-meta";
    heading.append(eyebrow, title, meta);

    const state = document.createElement("div");
    state.className = "sial-ticket-state";
    const firstDivider = document.createElement("div");
    firstDivider.className = "sial-ticket-divider";
    firstDivider.setAttribute("aria-hidden", "true");
    const primaryData = document.createElement("dl");
    primaryData.className = "sial-ticket-data";
    const secondDivider = document.createElement("div");
    secondDivider.className = "sial-ticket-divider";
    secondDivider.setAttribute("aria-hidden", "true");
    const secondaryData = document.createElement("dl");
    secondaryData.className = "sial-ticket-data";

    const verification = document.createElement("div");
    verification.className = "sial-ticket-verification";
    const verificationLabel = document.createElement("span");
    verificationLabel.className = "sial-ticket-verification-label";
    verificationLabel.textContent = options.verificationLabel || "Código de verificación";
    const verificationCode = document.createElement("strong");
    const verificationHelp = document.createElement("p");
    verificationHelp.textContent = options.verificationHelp || "Consulte este documento con el código en SIAL.";
    verification.append(verificationLabel, verificationCode, verificationHelp);

    const footer = document.createElement("p");
    footer.className = "sial-ticket-footer-copy";
    element.append(topline, heading, state, firstDivider, primaryData, secondDivider, secondaryData, verification, footer);
    stage.append(printer, element);

    function render(data = {}) {
      ticketId.textContent = text(data.ticketId);
      eyebrow.textContent = text(data.eyebrow, "DOCUMENTO OPERATIVO");
      title.textContent = text(data.title, "Ticket");
      meta.textContent = text(data.meta);
      state.textContent = text(data.state);
      verificationCode.textContent = text(data.verificationCode);
      verificationHelp.textContent = text(data.verificationHelp, options.verificationHelp || "Consulte este documento con el código en SIAL.");
      footer.textContent = text(data.footerNote, "Documento operativo.");
      primaryData.replaceChildren(...(data.primaryFields || []).map(createField));
      secondaryData.replaceChildren(...(data.secondaryFields || []).map(createField));
    }

    function focus() {
      title.focus({ preventScroll: true });
    }

    function play() {
      const reduceMotion = Boolean(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
      stage.dataset.state = "idle";
      void stage.offsetWidth;
      if (reduceMotion) {
        stage.dataset.state = "complete";
        return Promise.resolve();
      }
      stage.dataset.state = "printing";
      return new Promise((resolve) => {
        window.setTimeout(() => {
          stage.dataset.state = "complete";
          resolve();
        }, 760);
      });
    }

    function print() {
      const shell = options.printShell || element.closest("[data-sial-ticket-shell]");
      if (!shell) return false;
      shell.setAttribute("data-sial-ticket-shell", "");
      document.body.dataset.sialPrintTicket = id;
      window.addEventListener("afterprint", () => {
        delete document.body.dataset.sialPrintTicket;
        options.onAfterPrint?.();
      }, { once: true });
      window.print();
      return true;
    }

    return { element: stage, render, focus, play, print };
  }

  /**
   * Acciones reutilizables para integrar un ticket en un drawer.
   */
  function createDrawerActions(options = {}) {
    const element = document.createElement("div");
    element.className = "sial-ticket-actions";
    element.dataset.sialTicketActions = "";

    const hint = document.createElement("p");
    hint.className = "sial-ticket-hint";
    hint.hidden = true;

    const detailActions = document.createElement("div");
    detailActions.className = "sial-ticket-detail-actions";
    const generate = document.createElement("button");
    generate.className = "btn btn-primary";
    generate.type = "button";
    generate.textContent = options.generateLabel || "Generar ticket";
    detailActions.appendChild(generate);

    const previewActions = document.createElement("div");
    previewActions.className = "sial-ticket-preview-actions";
    previewActions.hidden = true;
    const back = document.createElement("button");
    back.className = "btn btn-secondary";
    back.type = "button";
    back.textContent = options.backLabel || "Volver al detalle";
    const print = document.createElement("button");
    print.className = "btn btn-primary";
    print.type = "button";
    print.textContent = options.printLabel || "Imprimir ticket";
    const printLabel = print.textContent;
    previewActions.append(back, print);
    element.append(hint, detailActions, previewActions);

    generate.addEventListener("click", () => options.onGenerate?.());
    back.addEventListener("click", () => options.onBack?.());
    print.addEventListener("click", () => options.onPrint?.());

    function setMode(mode) {
      const preview = mode === "preview";
      detailActions.hidden = preview;
      previewActions.hidden = !preview;
    }

    function setAvailability(available, reason = "") {
      generate.disabled = !available;
      hint.hidden = available || !reason;
      hint.textContent = reason;
    }

    function setPrinting(printing) {
      print.disabled = printing;
      print.textContent = printing ? (options.preparingLabel || "Preparando ticket…") : printLabel;
    }

    return { element, setMode, setAvailability, setPrinting, focusGenerate: () => generate.focus(), focusPrint: () => print.focus() };
  }

  window.SIALPrintableTicket = { createPreview, createDrawerActions };
})();
