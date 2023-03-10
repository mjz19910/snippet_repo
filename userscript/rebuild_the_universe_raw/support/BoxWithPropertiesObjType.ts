import {Box} from "./box/Box.js"

export type BoxWithPropertiesObjType<T extends readonly string[]>={[U in T[number]]: Box}
