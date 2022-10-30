import {Box} from "./Box"

export type NewableInstancePack<T>=(box_value: new (...a: Box[]) => T) => Box

