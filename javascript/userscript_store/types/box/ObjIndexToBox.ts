import {Box} from "./Box";

export type ObjIndexToBox<T extends string>={[U in T]: Box};
