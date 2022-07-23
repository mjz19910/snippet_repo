import {temporary_box_from_object} from "./temporary_box_from_object";
export function new_temporary_box_from_create_obj(value: {}) {
	return new temporary_box_from_object(value);
}
