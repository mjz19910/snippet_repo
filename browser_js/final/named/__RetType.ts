import {SubARet} from "../../group1/sub_a/types/SubARet.ts";
import {Runner} from "../support/Runner.js";

export type __RetType={
	type: "site";
	from: "1000mines.com";
	ret: symbol|[unknown,unknown];
}|{
	type: "runner";
	value: Runner;
}|{
	type: "sub_a";
	ret: SubARet;
};
