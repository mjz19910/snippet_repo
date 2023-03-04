type T_UrlInfo1<T_Type,T_RawStr>={
	type: T_Type;
	info_arr: [{raw_id: T_RawStr;}];
};
type T_UrlInfoArr<T_Type,T_InfoItem>={
	type: T_Type;
	info_arr: [T_InfoItem];
};