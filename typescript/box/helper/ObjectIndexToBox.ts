import {Box} from "../Box.js"

export type ObjectIndexToBox<T extends string>={[U in T]: Box}
