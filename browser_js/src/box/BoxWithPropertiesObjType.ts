import {Box} from "./Box.js"

export type BoxWithPropertiesObjType<T extends string[]>={
	[U in T[number]]: Box
}
