import {Box} from "root:box/Box.js"

export type FormattableTypes = string | (() => void) | ((err: Box) => void)
