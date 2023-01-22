namespace PathRoot_Gen {
	export type X$CU="[parse_value.gen_ns] [report.params.f28.f1.f1.f1[1].f1]";
	export type X$CU2="[parse_value.gen_ns] [report.params.f28.f1.f1.f1[1]]";
	export type X$CU3="[parse_value.gen_ns] []";
	export type X$CU4="[parse_value.gen_ns] [report.params.f28.f1.f1]";
	type X$X1<T extends string>=Split<T," ">;
	type X$X2<T extends string>=Extract<X$X1<T>,[any,any]>[1];
	function x() {
		type X1<T extends string>=X$X1<T>;
		type U1=true&(X1<X$CU3>[1] extends "[]"? never:X1<X$CU3>[1]);
		type INev=U1 extends never?true:false;
		type U2=X$X2<X$CU> extends "[]"? "":SplitOnce<X$X2<X$CU>,"[">[1];
		type U3=X$X2<X$CU3>;
		const v: [INev,U2,U3]=[true,"report.params.f28.f1.f1.f1[1].f1]","[]"]; v;
	}
	(function() {
		type X1<T extends string>=X$X2<T> extends "[]"? "":SplitOnce<X$X2<T>,"[">[1];
		type U2=Extract<Split<X1<X$CU3>,"]">,[any,any]>;
		type U3_1=X1<X$CU4>;
		type U3=Extract<Split<X1<X$CU>,"]">,[any,any]>;
		type U4=`${U3[0]}]${U3[1]}`;
		type INev=U2 extends never?true:false;
		const v: [U4,INev]=["report.params.f28.f1.f1.f1[1].f1",true]; v;
		function u(x:U3_1|null=null) {
			return x;
		}
		u();
	});
	x();
	type CX<T extends string>=SplitOnce<Extract<Split<T," ">,[any,any]>[1],"[">;
	type CX1<T extends string>=Split<Extract<CX<T>,[any,any]>[1],"]">;
	export type CX2<T extends string>=`${CX1<T>[0]}]${CX1<T>[1]}`;
}
