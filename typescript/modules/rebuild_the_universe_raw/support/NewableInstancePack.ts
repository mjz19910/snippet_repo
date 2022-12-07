import {Box} from "../ns.js";

export interface NewableInstancePack<T> {
	make_box(box_value: new (...a: Box[]) => T,construct_args: Box[]): Box;
}
