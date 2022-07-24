import {Box} from "./Box"

export type BoxWithPropertiesObjType<T extends string[]>={
	[U in T[number]]: Box
}
