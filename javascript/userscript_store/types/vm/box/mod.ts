import {NonNull} from "types/api";
import {Primitives} from "../Primitives";
import Box from "./Box";

export {Box};

type NonNullBox=NonNull<Box>;

export type AsObject<T extends NonNullBox>=T extends Primitives ? T : {
	type:"temp_box",
	value:T
};
