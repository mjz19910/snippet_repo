import {Box} from "./Box";
export function async_box_is_box<T>(v: T extends Box ? T : never): v is (T extends Box ? T : never) {
	switch(typeof v) {
		default: return true;
	}
}
