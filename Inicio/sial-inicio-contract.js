"use strict";

const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");

const root = __dirname;
const read = (name) => fs.readFileSync(path.join(root, name), "utf8");
const script = read("sial-inicio.js");
const style = read("sial-inicio.css");
const moduleIndex = read("index.html");
const catalog = read("../sial-catalogo.js");
const catalogIndex = read("../index.html");
const views = [
  ["centro-excepciones.html", "exceptions"],
  ["jornada-operativa.html", "agenda"],
  ["torre-control.html", "tower"],
  ["inicio-personalizado.html", "personal"],
  ["resumen-ejecutivo.html", "executive"]
];

views.forEach(([file, proposal]) => {
  const html = read(file);
  assert.ok(html.includes(`data-home-proposal="${proposal}"`), `${file}: falta propuesta ${proposal}`);
  assert.ok(html.includes("data-profile-select"), `${file}: falta selector de responsabilidad`);
  assert.ok(html.includes("data-home-welcome"), `${file}: falta bienvenida compartida`);
  assert.ok(html.includes("data-home-content"), `${file}: falta region de contenido`);
  assert.ok(html.includes("../shared/sial-core.js"), `${file}: no consume el nucleo compartido`);
});

[
  "function can(permission)",
  "function visibleModules()",
  "exceptions.filter((item) => can(item.permission))",
  "agenda.filter((item) => can(item.permission))",
  "stages.filter((item) => can(item.permission))",
  "contributions.filter((item) => can(item.permission))",
  "executiveMetrics.filter((item) => can(item.permission))",
  "can(item.actionPermission)",
  "function renderWelcome()",
  "No hay información para mostrar"
].forEach((needle) => assert.ok(script.includes(needle), `Motor de permisos incompleto: ${needle}`));

[
  ".exception-layout",
  ".agenda-layout",
  ".control-tower",
  ".personal-grid",
  ".executive-grid",
  ".home-welcome",
  "@media (prefers-reduced-motion: reduce)"
].forEach((needle) => assert.ok(style.includes(needle), `Estilos incompletos: ${needle}`));

[
  "Simular perfil",
  "módulos visibles",
  "eventos autorizados",
  "evento visible",
  "etapas autorizadas",
  "Continuidad visible",
  "fuente autorizada",
  "No hay información disponible para este perfil"
].forEach((phrase) => assert.ok(!script.includes(phrase) && !moduleIndex.includes(phrase), `Queda lenguaje técnico visible: ${phrase}`));
assert.ok(!script.includes("data-unauthorized"), "No deben renderizarse placeholders de modulos restringidos.");
assert.strictEqual((moduleIndex.match(/>Abrir propuesta<\/a>/g) || []).length, 5, "La portada del modulo debe ofrecer exactamente cinco propuestas.");
assert.ok(moduleIndex.includes('href="centro-excepciones.html"'), "La portada debe enlazar la propuesta recomendada.");
assert.ok(moduleIndex.includes('href="resumen-ejecutivo.html"'), "La portada debe enlazar la quinta propuesta.");
assert.strictEqual((catalog.match(/module: "inicio"/g) || []).length, 5, "El catalogo debe registrar exactamente cinco propuestas de Inicio.");
assert.ok(catalogIndex.includes('data-module-group="inicio"'), "El catalogo debe renderizar la familia Inicio.");
[
  "[data-home-content]",
  "--metric-count",
  ".module-summary",
  ".executive-reading"
].forEach((needle) => assert.ok(style.includes(needle), `Normalización visual incompleta: ${needle}`));

[
  "style=\"--stage-count:${visible.length}\"",
  "data-toggle-actions",
  "module-summary-row"
].forEach((needle) => assert.ok(script.includes(needle), `Simplificación dinámica incompleta: ${needle}`));

assert.ok(!style.includes(".agenda-day::before"), "La agenda no debe depender de una línea con coordenada fija.");
console.log("OK contrato Inicio adaptable por permisos");







