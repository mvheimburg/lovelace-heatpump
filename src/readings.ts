import type { HassEntity } from "./types";
export function available(entity?: HassEntity): entity is HassEntity {
  return !!entity && !["unavailable", "unknown", ""].includes(entity.state);
}
export function numeric(value: unknown): number | undefined {
  if (typeof value !== "number" && typeof value !== "string") return;
  if (typeof value === "string" && !value.trim()) return;
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
}
export class Readings {
  private last = new Map<string, HassEntity>();
  remember(entity?: HassEntity): void {
    if (available(entity))
      this.last.set(entity.entity_id, {
        ...entity,
        attributes: { ...entity.attributes },
      });
  }
  get(
    id: string | undefined,
    current: Record<string, HassEntity>,
    connected: boolean,
  ): { entity?: HassEntity; stale: boolean } {
    if (!id) return { stale: false };
    const live = current[id];
    if (connected && available(live)) return { entity: live, stale: false };
    return { entity: this.last.get(id), stale: true };
  }
}
