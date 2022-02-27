import {map_to_tuple} from "./map_to_tuple";

export function to_tuple_arr(keys: string[], values: number[]) {
	return keys.map(map_to_tuple, values);
}
