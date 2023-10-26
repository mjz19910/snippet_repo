import {Box} from "./Box.ts";

export interface NewableInstancePack<T> {
	make_box(box_value: new (...a: Box[]) => T,construct_args: Box[]): Box;
}
