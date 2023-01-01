import {ECatcherServiceType} from "./ECatcherServiceType.js";
import {ToServiceParams} from "./ToServiceParams.js";

export type ECatcherServiceParams={
	service: "ECATCHER";
	params: ToServiceParams<ECatcherServiceType>;
};
