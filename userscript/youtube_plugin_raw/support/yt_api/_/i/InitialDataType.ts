import {YTNavigateFinishEventDetail} from "../../yt/YTNavigateFinishEventDetail.js";
import {JsonDataResponseType} from "../j/JsonDataResponseType";

export type InitialDataType=JsonDataResponseType;
function check(data: YTNavigateFinishEventDetail) {
	const types_assert=data.response;
	return types_assert;
}
export const do_check=function() {
	check({} as YTNavigateFinishEventDetail);
};
