import type { CardConfig, HassEntity, HomeAssistant, Role } from "./types";
import { available, numeric } from "./readings";
export type Action = "temperature" | "mode" | "number" | "boost" | "quickVeto";
export function actionPayload(
  role: Role,
  action: Action,
  entity: HassEntity | undefined,
  config: CardConfig,
  value?: unknown,
  duration?: number,
  temperatureUnit = "°C",
): { domain: string; service: string; data: Record<string, unknown> } {
  if (!available(entity)) throw Error("unavailable");
  const data: Record<string, unknown> = { entity_id: entity.entity_id };
  const domain = entity.entity_id.split(".")[0];
  if (action === "boost" && role === "boost" && domain === "switch") {
    if (!["on", "off"].includes(entity.state)) throw Error("unavailable");
    return {
      domain,
      service: entity.state === "on" ? "turn_off" : "turn_on",
      data,
    };
  }
  if (action === "mode" && domain === "climate") {
    if (
      !Array.isArray(entity.attributes.hvac_modes) ||
      !entity.attributes.hvac_modes.includes(value)
    )
      throw Error("invalidMode");
    return {
      domain,
      service: "set_hvac_mode",
      data: { ...data, hvac_mode: value },
    };
  }
  if (
    (action === "number" && domain !== "number") ||
    (["temperature", "quickVeto"].includes(action) &&
      !["climate", "water_heater"].includes(domain))
  )
    throw Error("unavailable");
  if (["curve", "minFlow"].includes(role) && !config.allow_curve_edit)
    throw Error("unavailable");
  const number = numeric(value);
  const isNumber = action === "number";
  const min = numeric(entity.attributes[isNumber ? "min" : "min_temp"]);
  const max = numeric(entity.attributes[isNumber ? "max" : "max_temp"]);
  const step = numeric(
    entity.attributes[isNumber ? "step" : "target_temp_step"],
  );
  if (
    number === undefined ||
    (min !== undefined && number < min) ||
    (max !== undefined && number > max) ||
    (step &&
      Math.abs(
        (number - (min ?? 0)) / step - Math.round((number - (min ?? 0)) / step),
      ) > 1e-6)
  )
    throw Error("range");
  if (action === "quickVeto") {
    const temperature =
      temperatureUnit === "°F" ? ((number - 32) * 5) / 9 : number;
    if (temperature < 0 || temperature > 30) throw Error("range");
    if (
      domain !== "climate" ||
      duration === undefined ||
      !Number.isFinite(duration) ||
      duration < 1 ||
      duration > 12
    )
      throw Error("range");
    return {
      domain: "mypyllant",
      service: "set_quick_veto",
      data: {
        ...data,
        temperature,
        duration_hours: duration,
      },
    };
  }
  if (
    !isNumber &&
    (Number(entity.attributes.supported_features ?? 0) & 1) === 0
  )
    throw Error("unavailable");
  return {
    domain,
    service: isNumber ? "set_value" : "set_temperature",
    data: { ...data, [isNumber ? "value" : "temperature"]: number },
  };
}
/** Heating/cooling selector: an external on/off entity where on = cooling. */
export function coolingPayload(
  entity: HassEntity | undefined,
  cooling: boolean,
): { domain: string; service: string; data: Record<string, unknown> } {
  if (!available(entity) || !["on", "off"].includes(entity.state))
    throw Error("unavailable");
  const domain = entity.entity_id.split(".")[0];
  if (!["switch", "input_boolean"].includes(domain)) throw Error("unavailable");
  return {
    domain,
    service: cooling ? "turn_on" : "turn_off",
    data: { entity_id: entity.entity_id },
  };
}
export async function perform(
  hass: HomeAssistant,
  payload: ReturnType<typeof actionPayload>,
): Promise<void> {
  await hass.callService(payload.domain, payload.service, payload.data);
}
