import {Box} from "./Box.js"

export type BoxWithPropertiesObjType<T extends readonly string[]>={[U in T[number]]: Box}
