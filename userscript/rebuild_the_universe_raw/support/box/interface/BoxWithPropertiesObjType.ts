import {Box} from "../mod/Box.ts"

export type BoxWithPropertiesObjType<T extends readonly string[]>={[U in T[number]]: Box}
