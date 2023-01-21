namespace PathRoot_Gen {
	export type X$CU="[parse_value.gen_ns] [report.params.f28.f1.f1.f1[1].f1]";
	export type X$CU2="[parse_value.gen_ns] [report.params.f28.f1.f1.f1[1]]";
	export type X$CU3="[parse_value.gen_ns] []";
	type X$X1<T extends string>=Split<T," ">;
	type X$X2<T extends string>=Extract<X$X1<T>,[any,any]>[1];
	function x() {
		type U1=X$X1<X$CU3>[1] extends "[]"?never:X$X1<X$CU3>[1];
		type U2=X$X2<X$CU> extends "[]"?[]:SplitOnce<X$X2<X$CU>,"[">[1];
		type U3=X$X2<X$CU3>;
	}
	(function () {
		type U2=X$X2<X$CU> extends "[]"?[]:SplitOnce<X$X2<X$CU>,"[">[1];
	})
	x();
	type CX<T extends string>=SplitOnce<Extract<Split<T," ">,[any,any]>[1],"[">;
	type CX1<T extends string>=Split<Extract<CX<T>,[any,any]>[1],"]">;
	export type CX2<T extends string>=`${CX1<T>[0]}]${CX1<T>[1]}`;
}
