type CsiServiceParamsType=ToServiceParamsList<CsiVarMap>|CsiServiceC[]|CsiServiceCVer[];
type CsiServiceC={
	key: "c";
	value: ECatcherClientName['value'];
}