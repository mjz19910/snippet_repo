import {Box} from "src/box/Box.js"

export type FormattableTypes = string | (() => void) | ((err: Box) => void)
