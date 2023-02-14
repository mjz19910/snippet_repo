type D_0x94d81d4={
	3: string;
	8: 1;
	14: {
		1: 4;
		3: 1;
		4: 0;
	};
}|{
	3: string;
	8: 1;
	14: {
		1: 4;
		3: 2;
		4: 0;
	}|{
		1: 4;
		3: 2;
	};
	15: 1;
}|{
	3: string;
	8: 1;
	14: {
		1: 1;
		3: 1;
		4: 0;
	};
};
type D_0x4c82a9c={
	2: "FEwhat_to_watch";
	3: string;
	35: "browse-feedFEwhat_to_watch";
}|{
	2: "FEcomment_shorts_web_top_level";
	3: string;
};
type D_0x19ac5ceb={
	1: {
		2: "\u0000\u0002\u0004\u0006\b\n\f\u000e\u0010\u0012\u0014\u0016\u0018\u001a\u001c\u001e \"$&";
		5: "\u0000\u0002\u0004\u0006\b\n\f\u000e\u0010\u0012\u0014\u0016\u0018\u001a\u001c\u001e \"$&";
	};
};
type V_Uint8Array<_T>=Uint8Array;
type V_Bigint<T extends bigint>=T;
type V_BinaryTimestamp={
	1: number;
	2: number;
	3: number;
};
type D_0x12f639cf={
	1: 25;
};
type D_YtPageSnapshot={
	1: "yt_page_snapshot_regional";
	// token in url_base64
	2: string;
	3: V_Uint8Array<"\u0000\u0000en-GB\u0000\u0001CA\u0000\u0001CA\u0000\u0001\u0000FEwhat_to_watch\u0000\u0001\u0001\u0001\u0000\u0000\u0001\u0000\u0001\u0000\u0000\u0001\u0001\u0000">;
};
type R_YtPageSnapshot={1: D_YtPageSnapshot;};
type D_PageSnapshotToken={
	1: 0;
	2: "page_snapshot_token";
	3: V_BinaryTimestamp;
	4: V_BinaryTimestamp;
};
type R_BigInt={1: V_Bigint<bigint>;};
type R_0x12f639cf={
	3: number;
	6: R_BigInt;
	11: R_YtPageSnapshot;
	12: D_PageSnapshotToken;
	0x12f639cf: D_0x12f639cf;
};
type R_0x4c82a9c={0x4c82a9c: D_0x4c82a9c;};
type f3_idx_item={
	index: 0;
	type: "d";
	v: 0;
}|{
	index: 2;
	type: "str";
	v: "en-GB";
}|{
	index: 3;
	type: "d";
	v: 1;
}|{
	index: 4;
	type: "str";
	v: "CA";
}|{
	index: 6;
	type: "str";
	v: "CA";
}|{
	index: 9;
	type: "str";
	v: "FEwhat_to_watch";
};