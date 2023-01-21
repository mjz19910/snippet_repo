namespace GEN$PathRoot {
	export type X$CU="[parse_value.gen_ns] [report.params.f28.f1.f1.f1[1].f1]";
	export type X$CU2="[parse_value.gen_ns] [report.params.f28.f1.f1.f1[1]]";
	type CX<T extends string>=SplitOnce<Extract<Split<T," ">,[any,any]>[1],"[">;
	type CX1<T extends string>=Split<Extract<CX<T>,[any,any]>[1],"]">;
	export type CX2<T extends string>=`${CX1<T>[0]}]${CX1<T>[1]}`;
}
