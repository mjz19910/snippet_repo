import {Box} from "./Box"

export type ObjectIndexToOptBox<T extends keyof Z,Z extends object>={[U in T]?: Z[U] extends Box? Z[U]:never}

