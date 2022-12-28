import {KVStore} from "./KVStore";

export type CsiServiceParams={
	service: "CSI";
	params: KVStore[];
};
