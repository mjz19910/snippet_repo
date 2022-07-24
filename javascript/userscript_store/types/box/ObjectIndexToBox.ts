import {Box} from "./Box";

export type ObjectIndexToBox<T extends string>={[U in T]: Box};
