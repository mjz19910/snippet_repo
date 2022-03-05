import {KT5} from "./KT5";

type ExtractKeys<T extends number> = T extends 0 ? KT5<T> : never;
