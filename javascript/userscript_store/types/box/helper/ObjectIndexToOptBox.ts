import {Box} from "../Box"

export type ObjectIndexToOptBox<T extends string>={[U in T]?: Box}
