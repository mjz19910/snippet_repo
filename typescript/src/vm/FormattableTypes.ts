import {Box} from "box/Box.js"

export type FormattableTypes = string | (() => void) | ((err: Box) => void)
