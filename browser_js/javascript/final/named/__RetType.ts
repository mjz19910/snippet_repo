import {SubARet} from "../../group1/sub_a/types/item_2_support.js";
import {Runner} from "../support/Runner.js";

export type __RetType={
	type: "site";
	from: "1000mines.com";
	ret: symbol|[any,any];
}|{
	type: "runner";
	value: Runner;
}|{
	type: "sub_a";
	ret: SubARet;
};
