export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
  last_updated?: string;
  last_changed?: string;
}
export interface RegistryEntity {
  entity_id: string;
  unique_id: string;
  platform: string;
  config_entry_id: string | null;
  device_id: string | null;
  original_name?: string | null;
  device_class?: string | null;
  original_device_class?: string | null;
  disabled_by?: string | null;
}
export interface RegistryDevice {
  id: string;
  model?: string | null;
  name?: string | null;
  identifiers?: [string, string][];
  config_entries?: string[];
  disabled_by?: string | null;
}
export interface Registry {
  entities: RegistryEntity[];
  devices: RegistryDevice[];
}
export interface Connection {
  connected: boolean;
  sendMessagePromise<T>(message: Record<string, unknown>): Promise<T>;
  subscribeEvents(callback: () => void, event: string): Promise<() => void>;
  addEventListener(event: string, callback: () => void): void;
  removeEventListener(event: string, callback: () => void): void;
}
export interface HomeAssistant {
  states: Record<string, HassEntity>;
  connection: Connection;
  language?: string;
  config?: { unit_system?: { temperature?: string } };
  callService(
    domain: string,
    service: string,
    data: Record<string, unknown>,
  ): Promise<unknown>;
}
export const roles = [
  "climate",
  "water",
  "flow",
  "flowTarget",
  "outdoor",
  "pressure",
  "tank",
  "waterTarget",
  "boost",
  "legionella",
  "quickVeto",
  "curve",
  "minFlow",
  "trouble",
  "heatingElectric",
  "heatingHeat",
  "heatingEnvironment",
  "waterElectric",
  "waterHeat",
  "waterEnvironment",
] as const;
export type Role = (typeof roles)[number];
export type Resolved = Partial<Record<Role, RegistryEntity>>;
export type Window = "24h" | "7d" | "30d";
export interface CardConfig {
  type: string;
  entity?: string;
  entry?: string;
  name?: string;
  mode?: "all" | "comfort" | "water" | "efficiency";
  appearance?: "default" | "bubble";
  cop_window?: Window;
  show_efficiency?: boolean;
  show_hot_water?: boolean;
  allow_curve_edit?: boolean;
  legionella_interval_days?: number;
  entities?: Partial<Record<Role, string>>;
}
export interface Statistic {
  start: number;
  end?: number;
  sum?: number | null;
  mean?: number | null;
}
export type Statistics = Record<string, Statistic[]>;
export interface Metadata {
  statistic_id: string;
  source?: string;
  has_sum: boolean;
  mean_type?: number;
  has_mean?: boolean;
  statistics_unit_of_measurement?: string | null;
  unit_of_measurement?: string | null;
  unit_class?: string | null;
}
