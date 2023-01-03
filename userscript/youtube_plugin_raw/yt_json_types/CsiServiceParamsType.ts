type CsiServiceParamsType=ToServiceParamsList<CsiVarMap>|{
	key: "cver";
	value: "2.20230103.01.00";
}[];
type CsiVarTypes={
	cver: Extract<CsiServiceParamsType[number],{key:"cver"}>['value'];
};
type SomeVer<T extends string>=T extends `${infer V0}.${infer V1}.${string}.${string}`?`${V0}.${V1}`:never;