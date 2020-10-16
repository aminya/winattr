export function get(path: string): Promise<object>;
export function getSync(path: string): any;

export function set(path: string, attrs: object): Promise<void>;
export function setSync(path: string, attrs: object): void;
