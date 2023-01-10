type InitialDataType=JsonDataResponseType;
function check(data: YTNavigateFinishDetail) {
	const types_assert=data.response;
	return types_assert;
}
const do_check=function() {
	check({} as YTNavigateFinishDetail);
};
