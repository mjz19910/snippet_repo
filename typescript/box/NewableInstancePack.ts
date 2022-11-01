import {Box} from "./Box.js"

export type NewableInstancePack<T>=(box_value: new (...a: Box[]) => T, construct_args: Box[]) => Box

