"use strict";

const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");

const design = read("DESIGN.md");
const core = read("shared/sial-core.css");
const catalog = read("shared/componentes.html");
const map = read("shared/patrones-de-diseno-web.md");
const poma = read("Trazabilidad/generar-documento-poma.html");

[
  ".sial-readiness-grid",
  ".sial-key-value-grid"
].forEach((needle) => assert.ok(core.includes(needle), "Falta composición compartida: " + needle));

[
  "sial-readiness-grid",
  "sial-key-value-grid",
  "candidato visual"
].forEach((needle) => assert.ok(catalog.includes(needle), "El catálogo no documenta: " + needle));

assert.ok(poma.includes("sial-readiness-grid") && poma.includes("sial-key-value-grid"), "POMA no consume las composiciones compartidas.");
assert.ok(design.includes("Auditoría de madurez visual") && design.includes("candidatos visuales"), "DESIGN no contiene el gobierno evolutivo.");
assert.ok(map.includes("Mapa completo de vistas") && map.includes("Evolución controlada") && map.includes("Candidato visual"), "Falta el mapeo o gobierno de patrones web.");

console.log("OK contrato del sistema de diseño web");
