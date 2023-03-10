import {Box} from "../mod/Box.js"

export type BoxWithPropertiesObjType<T extends readonly string[]>={[U in T[number]]: Box}
