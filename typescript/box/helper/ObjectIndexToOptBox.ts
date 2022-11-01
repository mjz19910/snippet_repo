import {Box} from "../Box.js"

export type ObjectIndexToOptBox<T extends string>={[U in T]?: Box}
