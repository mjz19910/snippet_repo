import {Box} from "./Box";
import VoidBox from "./VoidBox";
import ArrayBox from "./ArrayBox";
import Primitives from "./Primitives";

export type ExtractKey<T extends Box, U> = 
T extends Exclude<Box, Primitives|null> ?
U extends keyof Exclude<T, VoidBox> ?
Exclude<T, VoidBox>[U] :
never :
never;

export function run_tests(){
	type Test2=ExtractKey<ArrayBox | VoidBox, 'value'>;
	type Test3=ExtractKey<Exclude<Box, Primitives>, 'value'>;
	let vv:Test2=[new VoidBox];
	let vv2:Test3=[[new VoidBox]];
	void vv,vv2;
}

export default ExtractKey;
