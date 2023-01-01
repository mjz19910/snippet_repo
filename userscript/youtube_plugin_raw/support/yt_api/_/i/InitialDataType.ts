import {YtPageState} from "../../yt/YtPageState.js";
import {JsonDataResponseType} from "../j/JsonDataResponseType";

export type InitialDataType=JsonDataResponseType;
function check(data: YtPageState) {
	const types_assert=data.response;
	return types_assert;
}
export const do_check=function() {
	check({} as YtPageState);
};
