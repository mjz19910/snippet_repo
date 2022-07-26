import {Box} from "types/box/Box"

export type FormattableTypes = string | (() => void) | ((err: Box) => void)
