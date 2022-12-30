import {ToServiceParamsList} from "../t/ToServiceParamsList.js";

export type ECatcherServiceParamsType=ToServiceParamsList<ECatcherServiceType>;

type ECatcherServiceType={
	["client.version"]: `${2}.${2022}${12}${20}`;
	["client.name"]: "WEB";
	["client.fexp"]: string;
};

export type ECatcherServiceParams={
	service: "ECATCHER";
	params: ECatcherServiceParamsType;
};
