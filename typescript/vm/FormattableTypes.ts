import {Box} from "typescript/box/Box"

export type FormattableTypes = string | (() => void) | ((err: Box) => void)
