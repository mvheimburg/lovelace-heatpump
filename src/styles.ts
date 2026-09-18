import { css } from "lit";
export const styles = css`
  :host {
    display: block;
    color: var(--primary-text-color, #243a39);
    font-family: var(--paper-font-body1_-_font-family, system-ui, sans-serif);
    --hp-warm: #c27430;
    --hp-water: #327ca0;
    --hp-green: #42866d;
  }
  * {
    box-sizing: border-box;
  }
  ha-card {
    display: block;
    padding: 22px;
    background: var(--ha-card-background, var(--card-background-color, #fff));
    border: var(--ha-card-border-width, 1px) solid
      var(--ha-card-border-color, #e2e7e4);
    border-radius: var(--ha-card-border-radius, 20px);
    box-shadow: var(--ha-card-box-shadow);
    overflow: hidden;
  }
  .bubble {
    --hp-warm: var(--bubble-accent-color, #c27430);
    background: var(
      --bubble-main-background-color,
      var(--ha-card-background, #fff)
    );
    border: var(--bubble-border, none);
    border-radius: var(--bubble-border-radius, 32px);
    box-shadow: var(--bubble-box-shadow, var(--ha-card-box-shadow));
  }
  header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 18px;
  }
  header .symbol {
    display: grid;
    place-items: center;
    width: 42px;
    height: 42px;
    flex: none;
    background: var(
      --bubble-icon-background-color,
      var(--secondary-background-color, #eff3ef)
    );
    border-radius: var(--bubble-icon-border-radius, 50%);
    color: var(--hp-green);
  }
  h2 {
    font-size: 1.15rem;
    letter-spacing: -0.02em;
    margin: 0;
  }
  h3 {
    font-size: 1rem;
    margin: 0 0 14px;
  }
  h4 {
    font-size: 0.95rem;
    margin: 0;
  }
  .muted,
  .hint {
    color: var(--secondary-text-color, #627370);
  }
  .hint {
    font-size: 0.78rem;
    line-height: 1.55;
    margin: 8px 0;
  }
  .eyebrow {
    font-size: 0.68rem;
    font-weight: 650;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 3px;
  }
  .header-name {
    flex: 1;
    min-width: 0;
    overflow-wrap: anywhere;
  }
  section {
    padding: 18px 0;
    border-top: 1px solid var(--divider-color, #e1e6e3);
  }
  section:last-child {
    padding-bottom: 0;
  }
  .row {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }
  .between {
    justify-content: space-between;
  }
  .readings {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin: 12px 0;
  }
  .chip {
    border: 1px solid var(--divider-color, #dce4df);
    padding: 5px 9px;
    border-radius: 12px;
    font-size: 0.8rem;
  }
  .big {
    font-size: 2.25rem;
    font-weight: 550;
    letter-spacing: -0.055em;
    line-height: 1.2;
    font-variant-numeric: tabular-nums;
  }
  .unit {
    font-size: 0.9rem;
    letter-spacing: normal;
    font-weight: 400;
    margin-left: 4px;
  }
  label {
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: 0.8rem;
    min-width: 0;
  }
  input,
  select,
  button {
    font: inherit;
    color: inherit;
    border: 1px solid var(--divider-color, #ced8d2);
    border-radius: 10px;
    background: var(--card-background-color, #fff);
    min-height: 44px;
    padding: 9px 12px;
  }
  input,
  select {
    max-width: 100%;
    width: 100%;
  }
  input[type="number"] {
    width: 100px;
  }
  button {
    cursor: pointer;
  }
  button:disabled,
  input:disabled,
  select:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  button:focus-visible,
  input:focus-visible,
  select:focus-visible,
  summary:focus-visible {
    outline: 3px solid var(--primary-color, #367b6e);
    outline-offset: 3px;
  }
  .primary {
    background: var(--hp-water);
    color: white;
    border-color: transparent;
    font-weight: 550;
    width: 100%;
  }
  .active {
    background: var(--hp-warm);
  }
  .secondary {
    background: var(
      --bubble-sub-button-background-color,
      var(--secondary-background-color, #f1f4f1)
    );
    border-radius: var(--bubble-sub-button-border-radius, 12px);
  }
  .controls {
    display: flex;
    gap: 12px;
    align-items: flex-end;
    flex-wrap: wrap;
  }
  .veto {
    padding: 12px;
    margin-top: 14px;
    border-radius: var(--bubble-sub-button-border-radius, 14px);
    background: var(
      --bubble-secondary-background-color,
      var(--secondary-background-color, #f4f6f3)
    );
  }
  .veto summary {
    font-size: 0.85rem;
    cursor: pointer;
  }
  .veto .controls {
    margin-top: 12px;
  }
  .veto .controls button {
    flex: 1;
  }
  .water-layout {
    display: grid;
    grid-template-columns: 80px 1fr;
    gap: 22px;
    align-items: center;
  }
  .tank {
    height: 146px;
    border: 2px solid var(--hp-water);
    border-radius: 22px;
    position: relative;
    overflow: hidden;
    background: var(--secondary-background-color, #f2f6f8);
  }
  .fill {
    position: absolute;
    inset: auto 0 0;
    background: var(--hp-water);
    opacity: 0.58;
    border-top: 2px solid var(--hp-water);
    transition: height 0.4s;
  }
  .tank::after {
    content: "";
    position: absolute;
    inset: 14px 9px;
    border-top: 1px dashed var(--hp-water);
    border-bottom: 1px dashed var(--hp-water);
    opacity: 0.5;
  }
  .water-info {
    min-width: 0;
  }
  .water-info .primary {
    margin-top: 12px;
  }
  .legionella {
    display: flex;
    gap: 8px;
    align-items: baseline;
    flex-wrap: wrap;
    margin-top: 16px;
    font-size: 0.78rem;
  }
  .warning {
    color: var(--warning-color, #986013);
  }
  .stale {
    font-size: 0.75rem;
    color: var(--warning-color, #986013);
    display: block;
    margin-top: 4px;
  }
  .takeover {
    padding: 16px;
    border-radius: 14px;
    background: var(--error-color, #b52424);
    color: #fff;
    margin-bottom: 16px;
  }
  .takeover h3 {
    margin-bottom: 8px;
  }
  .takeover button {
    color: inherit;
    background: transparent;
    border-color: currentColor;
  }
  .takeover .stale {
    color: inherit;
  }
  .takeover pre {
    white-space: pre-wrap;
    overflow-wrap: anywhere;
    font-size: 0.85rem;
  }
  .feedback {
    padding: 10px;
    border-radius: 10px;
    background: var(--secondary-background-color, #f3f5f2);
    font-size: 0.85rem;
    overflow-wrap: anywhere;
  }
  .error {
    border-left: 3px solid var(--error-color, #b52424);
  }
  .energy-group {
    padding: 14px;
    margin: 12px 0;
    border-radius: var(--bubble-sub-button-border-radius, 16px);
    background: var(
      --bubble-secondary-background-color,
      var(--secondary-background-color, #f4f6f3)
    );
  }
  .cop {
    color: var(--heatpump-cop-color, var(--primary-text-color, #367b61));
  }
  .energy-bar {
    display: flex;
    height: 14px;
    overflow: hidden;
    border-radius: 7px;
    margin: 14px 0 8px;
    background: var(--divider-color, #ddd);
  }
  .electric {
    background: var(--hp-warm);
  }
  .environment {
    background: var(--hp-green);
  }
  .legend {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 16px;
    font-size: 0.75rem;
    line-height: 1.6;
  }
  .dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 5px;
  }
  .heat-out {
    margin-top: 8px;
    font-size: 0.85rem;
  }
  .plot {
    width: 100%;
    display: block;
    margin-top: 10px;
    color: var(--secondary-text-color, #627370);
  }
  .plot text {
    font: 11px system-ui;
    fill: currentColor;
  }
  .plot .point {
    fill: var(--hp-green);
    opacity: 0.55;
  }
  .plot .grid {
    stroke: var(--divider-color, #dce4df);
    stroke-width: 1;
  }
  .plot .axis {
    stroke: currentColor;
    stroke-width: 1;
  }
  .plot-title {
    margin-top: 16px;
    font-size: 0.8rem;
  }
  details table {
    width: 100%;
    font-size: 0.75rem;
    border-collapse: collapse;
  }
  th,
  td {
    text-align: left;
    padding: 5px;
    border-bottom: 1px solid var(--divider-color, #ddd);
  }
  .table-scroll {
    max-height: 200px;
    overflow: auto;
  }
  .hidden {
    display: none;
  }
  .editor {
    display: grid;
    gap: 16px;
  }
  .editor input[type="number"] {
    width: 100%;
  }
  .editor .toggle {
    flex-direction: row;
    align-items: center;
    gap: 10px;
  }
  .editor input[type="checkbox"] {
    width: 20px;
    min-height: 20px;
    height: 20px;
  }
  .editor h3 {
    margin: 6px 0 0;
  }
  @media (max-width: 380px) {
    ha-card {
      padding: 16px;
    }
    .water-layout {
      grid-template-columns: 65px 1fr;
      gap: 14px;
    }
    .big {
      font-size: 2rem;
    }
    .controls {
      gap: 8px;
    }
    .controls label {
      flex: 1;
    }
    .controls input {
      width: 100%;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .fill {
      transition: none;
    }
  }
`;
