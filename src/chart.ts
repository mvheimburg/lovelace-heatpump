import { svg, nothing } from "lit";
import { isTemperature, ticks, type Point, type Series } from "./history";

const LEFT = 40,
  TOP = 24,
  BOTTOM = 196,
  H = 230,
  GUTTER = 44;

export interface ChartText {
  number: (value: number, digits: number) => string;
  time: (ms: number, withDay: boolean) => string;
  label: string;
}

function runs(points: Point[]): Array<Array<[number, number]>> {
  const out: Array<Array<[number, number]>> = [];
  let current: Array<[number, number]> = [];
  for (const [t, v] of points) {
    if (v === undefined) {
      if (current.length) out.push(current);
      current = [];
    } else current.push([t, v]);
  }
  if (current.length) out.push(current);
  return out;
}

function scale(series: Series[], pad: number) {
  const values = series.flatMap((s) =>
    s.points.flatMap(([, v]) => (v === undefined ? [] : [v])),
  );
  if (!values.length) return undefined;
  const lo = Math.min(...values),
    hi = Math.max(...values);
  const marks = ticks(lo - pad, hi + pad);
  return { marks, min: marks[0], max: marks[marks.length - 1] };
}

/**
 * Daily COP and outdoor temperature retain their custom daily chart.
 */
export function chart(
  series: Series[],
  start: number,
  end: number,
  hover: number | undefined,
  text: ChartText,
  W = 600,
) {
  const RIGHT = W - GUTTER;
  const left = series.filter((s) => isTemperature(s.unit));
  const right = series.filter((s) => !isTemperature(s.unit));
  const l = scale(left, 1),
    r = scale(right, 0.1);
  const unit = right[0]?.unit ?? "";
  const x = (t: number) =>
    LEFT +
    ((Math.min(Math.max(t, start), end) - start) / (end - start)) *
      (RIGHT - LEFT);
  const y = (v: number, s: { min: number; max: number }) =>
    BOTTOM - ((v - s.min) / (s.max - s.min || 1)) * (BOTTOM - TOP);
  const hours = (end - start) / 3_600_000;
  const narrow = W < 480;
  const every =
    hours > 168
      ? narrow
        ? 336
        : 168
      : hours <= 6
        ? narrow
          ? 2
          : 1
        : hours <= 24
          ? narrow
            ? 6
            : 4
          : narrow
            ? 48
            : 24;
  const xTicks: number[] = [];
  const hour = new Date(start);
  hour.setMinutes(0, 0, 0);
  let midnights = 0;
  for (let t = hour.getTime(); t <= end; t += 3_600_000) {
    const h = new Date(t).getHours();
    if (t < start) continue;
    if (
      every >= 24
        ? h === 0 && midnights++ % (every / 24) === 0
        : h % every === 0
    )
      xTicks.push(t);
  }
  const path = (s: Series, sc: { min: number; max: number }) =>
    runs(s.points)
      .map((run) =>
        run
          .map(([t, v], i) => {
            const at = `${x(t).toFixed(1)},${y(v, sc).toFixed(1)}`;
            // A lone reading between gaps is drawn as a dot.
            if (!i) return run.length === 1 ? `M${at} h0.01` : `M${at}`;
            return `L${at}`;
          })
          .join(" "),
      )
      .join(" ");
  // As many decimals as the tick spacing needs, so 57.5 never shows as 58.
  const decimals = (marks: number[]) =>
    marks.length > 1
      ? Math.min(
          2,
          (String(Number((marks[1] - marks[0]).toFixed(6))).split(".")[1] ?? "")
            .length,
        )
      : 0;
  const digits = r ? decimals(r.marks) : 0;
  return svg`<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label=${text.label}>
    <title>${text.label}</title>
    ${(l ?? r)?.marks.map((v) => {
      const sc = (l ?? r)!;
      return svg`<line class="grid" x1=${LEFT} x2=${RIGHT} y1=${y(v, sc)} y2=${y(v, sc)}></line>`;
    })}
    ${
      l
        ? l.marks.map(
            (v) =>
              svg`<text class="axis" x=${LEFT - 6} y=${y(v, l) + 4} text-anchor="end">${text.number(v, decimals(l.marks))}°</text>`,
          )
        : nothing
    }
    ${
      r
        ? r.marks.map(
            (v) =>
              svg`<text class="axis" x=${RIGHT + 6} y=${y(v, r) + 4}>${text.number(v, digits)}</text>`,
          )
        : nothing
    }
    ${
      r
        ? svg`<text class="axis unit" x=${W - 4} y="12" text-anchor="end">${unit}</text>`
        : nothing
    }
    ${xTicks.map(
      (t) =>
        svg`<line class="grid" x1=${x(t)} x2=${x(t)} y1=${TOP} y2=${BOTTOM}></line>
        <text class="axis" x=${x(t)} y=${BOTTOM + 18} text-anchor="middle">${text.time(t, every >= 24)}</text>`,
    )}
    ${left.map((s) => svg`<path class=${`line s-${s.role}`} d=${path(s, l!)}></path>`)}
    ${right.map((s) => svg`<path class=${`line s-${s.role}`} d=${path(s, r!)}></path>`)}
    ${
      hover === undefined
        ? nothing
        : svg`<line class="cursor" x1=${x(hover)} x2=${x(hover)} y1=${TOP} y2=${BOTTOM}></line>`
    }
  </svg>`;
}

/** The time under a pointer over the chart. */
export function timeAt(
  event: PointerEvent,
  element: Element,
  start: number,
  end: number,
): number {
  const box = element.getBoundingClientRect();
  const W = (element as SVGSVGElement).viewBox?.baseVal?.width || box.width;
  const px = ((event.clientX - box.left) / box.width) * W;
  const ratio = (px - LEFT) / (W - GUTTER - LEFT);
  return start + Math.min(1, Math.max(0, ratio)) * (end - start);
}
