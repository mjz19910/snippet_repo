import Box from "./types/vm/box/Box";

export type FormattableTypes = string | (() => void) | ((err: Box) => void);
