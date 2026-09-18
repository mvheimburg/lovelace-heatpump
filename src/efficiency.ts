import { html, svg, nothing } from "lit";
import type { EnergyData } from "./data";
import type { Summary } from "./energy";
import type { TextKey } from "./localize";
type Translate = (key: TextKey) => string;
const formatter =
  (language: string) =>
  (n: number | undefined, digits = 1) =>
    n === undefined
      ? "—"
      : new Intl.NumberFormat(language, {
          minimumFractionDigits: digits,
          maximumFractionDigits: digits,
        }).format(n);
function plot(summary: Summary, t: Translate, language: string) {
  const fmt = formatter(language);
  const points = summary.points;
  if (!points.length) return html`<p class="hint">${t("plotEmpty")}</p>`;
  const xMin = Math.floor(Math.min(...points.map((p) => p.temperature))) - 1,
    xMax = Math.ceil(Math.max(...points.map((p) => p.temperature))) + 1;
  const yMax = Math.max(1, Math.ceil(Math.max(...points.map((p) => p.cop))));
  const x = (n: number) => 40 + ((n - xMin) / (xMax - xMin)) * 275,
    y = (n: number) => 155 - (n / yMax) * 125;
  return html`<div class="plot-title">${t("plot")}</div>
    <svg class="plot" viewBox="0 0 340 195" role="img" aria-label=${t("plot")}>
      <title>${t("plot")}</title>
      ${[0, yMax / 2, yMax].map((n) => svg`<line class="grid" x1="40" y1=${y(n)} x2="315" y2=${y(n)}></line><text x="32" y=${y(n) + 4} text-anchor="end">${fmt(n)}</text>`)}
      <line class="axis" x1="40" y1="155" x2="315" y2="155"></line>
      ${[xMin, (xMin + xMax) / 2, xMax].map((n) => svg`<text x=${x(n)} y="173" text-anchor="middle">${fmt(n, 0)}°</text>`)}
      <text x="40" y="15">COP</text>
      <text x="178" y="191" text-anchor="middle">${t("outdoor")} (°C)</text>
      ${points.map((p) => svg`<circle class="point" cx=${x(p.temperature)} cy=${y(p.cop)} r="3"><title>${new Date(p.start).toLocaleString(language)} · ${fmt(p.temperature)} °C · COP ${fmt(p.cop, 2)}</title></circle>`)}
    </svg>
    <p class="hint">${t("plotHint")}</p>
    <details>
      <summary class="hint">${t("details")} (${points.length})</summary>
      <div class="table-scroll">
        <table>
          <thead>
            <tr>
              <th>${t("through")}</th>
              <th>°C</th>
              <th>COP</th>
            </tr>
          </thead>
          <tbody>
            ${points.map(
              (p) =>
                html`<tr>
                  <td>${new Date(p.start).toLocaleString(language)}</td>
                  <td>${fmt(p.temperature)}</td>
                  <td>${fmt(p.cop, 2)}</td>
                </tr>`,
            )}
          </tbody>
        </table>
      </div>
    </details>`;
}
export function efficiencyGroup(
  mode: "heating" | "water",
  data: EnergyData | undefined,
  t: Translate,
  language = "en",
) {
  const fmt = formatter(language);
  const s = data?.[mode];
  if (!s || s.status === "missing")
    return html`<div class="energy-group">
      <h4>${t(mode)}</h4>
      <p class="hint">${t("missingStats")}</p>
    </div>`;
  const input = (s.electric ?? 0) + (s.environment ?? 0);
  const electricWidth = input > 0 ? ((s.electric ?? 0) / input) * 100 : 0;
  return html`<div class="energy-group">
    <div class="row between">
      <h4>${t(mode)}</h4>
      <div>
        <div class="eyebrow muted">${t("cop")}</div>
        <div class="big cop">${fmt(s.cop, 2)}</div>
      </div>
    </div>
    ${s.status === "noInput" ? html`<p class="hint warning">${t("noInput")}</p>` : nothing}
    ${s.status === "idle" ? html`<p class="hint">${t("noOperation")}</p>` : nothing}
    <div
      class="energy-bar"
      role="img"
      aria-label=${`${t("balance")}: ${t("electric")} ${fmt(s.electric)} kWh; ${t("environment")} ${fmt(s.environment)} kWh; ${t("heat")} ${fmt(s.heat)} kWh`}
    >
      <span class="electric" style=${`width:${electricWidth}%`}></span
      >${s.environment !== undefined ? html`<span class="environment" style=${`width:${100 - electricWidth}%`}></span>` : nothing}
    </div>
    <div class="legend">
      <span
        ><i class="dot electric"></i>${t("electric")}
        <strong>${fmt(s.electric)} kWh</strong></span
      >${s.environment !== undefined ? html`<span><i class="dot environment"></i>${t("environment")} <strong>${fmt(s.environment)} kWh</strong></span>` : nothing}
    </div>
    <div class="heat-out">
      → ${t("heat")} <strong>${fmt(s.heat)} kWh</strong>
    </div>
    <p class=${`hint ${s.coverage < 1 ? "warning" : ""}`}>
      ${t("partial")}: ${Math.round(s.coverage * 100)}%
    </p>
    <p class="hint">
      ${t(data?.sources[mode] === "external" ? "externalHint" : "recorderHint")}
    </p>
    ${plot(s, t, language)}
  </div>`;
}
