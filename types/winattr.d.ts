export interface Attributes {
  archive: boolean
  hidden: boolean
  readonly: boolean
  system: boolean
}

export function get(path: string): Promise<Attributes>;
export function getSync(path: string): Attributes;

export function set(path: string, attrs: Attributes): Promise<void>;
export function setSync(path: string, attrs: Attributes): void;
