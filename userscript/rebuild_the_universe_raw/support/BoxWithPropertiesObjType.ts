import {Box} from "./box/z_done/box/Box.js"

export type BoxWithPropertiesObjType<T extends readonly string[]>={[U in T[number]]: Box}
