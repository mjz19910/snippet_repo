import {Box} from "typescript/box/Box.js"

export type FormattableTypes = string | (() => void) | ((err: Box) => void)
