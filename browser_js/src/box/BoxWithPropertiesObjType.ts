import {Box} from "./Box.ts"

export type BoxWithPropertiesObjType<T extends string[]>={
	[U in T[number]]: Box
}
