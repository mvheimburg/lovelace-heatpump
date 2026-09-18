import { roles, type CardConfig } from "./types";
export function normalizeConfig(config: CardConfig): CardConfig {
  if (!config || config.type !== "custom:heatpump-card")
    throw new Error("Expected type: custom:heatpump-card");
  for (const [key, values] of Object.entries({
    mode: ["all", "comfort", "water", "efficiency"],
    appearance: ["default", "bubble"],
    cop_window: ["24h", "7d", "30d"],
  })) {
    const value = config[key as keyof CardConfig];
    if (value !== undefined && !values.includes(value as string))
      throw new Error(`Invalid ${key}`);
  }
  for (const key of [
    "show_efficiency",
    "show_hot_water",
    "allow_curve_edit",
  ] as const)
    if (config[key] !== undefined && typeof config[key] !== "boolean")
      throw new Error(`Invalid ${key}`);
  for (const key of ["entry", "entity", "name"] as const)
    if (
      config[key] !== undefined &&
      (typeof config[key] !== "string" || !config[key]?.trim())
    )
      throw new Error(`Invalid ${key}`);
  if (config.entity && !config.entity.startsWith("climate."))
    throw new Error("entity must be a climate entity");
  if (
    config.legionella_interval_days !== undefined &&
    (!Number.isFinite(config.legionella_interval_days) ||
      config.legionella_interval_days <= 0)
  )
    throw new Error("legionella_interval_days must be positive");
  if (config.entities) {
    if (typeof config.entities !== "object" || Array.isArray(config.entities))
      throw new Error("Invalid entities");
    for (const [key, id] of Object.entries(config.entities))
      if (
        !roles.includes(key as (typeof roles)[number]) ||
        typeof id !== "string" ||
        !/^\w+\.[\w]+$/.test(id)
      )
        throw new Error(`Invalid role override: ${key}`);
  }
  return {
    mode: "all",
    appearance: "default",
    cop_window: "7d",
    show_efficiency: true,
    show_hot_water: true,
    allow_curve_edit: false,
    legionella_interval_days: 7,
    ...config,
    entities: { ...config.entities },
  };
}
