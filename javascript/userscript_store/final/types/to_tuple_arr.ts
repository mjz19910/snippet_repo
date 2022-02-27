import {map_to_tuple} from "./map_to_tuple";

export function to_tuple_arr(keys: any[], values: any[]) {
	return keys.map(map_to_tuple, values);
}
