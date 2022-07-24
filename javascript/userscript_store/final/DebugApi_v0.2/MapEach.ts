import {MapAllKeys} from "./MapAllKeys"
import {MapAllValues} from "./MapAllValues"

export type MapEach<T extends number>=Map<MapAllKeys[T],MapAllValues[T]>
