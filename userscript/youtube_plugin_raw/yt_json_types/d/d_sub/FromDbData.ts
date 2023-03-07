type FromDbData={
	key: never;
	type: "boxed_id";
	tag: J_DU_TagStr;
	value: {
		type: never;
		info_arr: [FromDbData_InfoItem_L1];
	};
}|{
	key: `boxed_id:channel_id:UC:${string}`;
	tag: "channel_id:UC";
	type: "boxed_id";
	value: {
		type: "channel_id";
		tag: "UC";
		info_arr: [
			{raw_id: `UC${string}`;},
			{id: string;}
		];
	};
}|{
	type: "boxed_id";
	tag: "keys";
	key: `boxed_id:keys:${string}`;
	value: {
		info_arr: [["many",string[][]]];
		type: string;
	};
}|{
	type: "boxed_id"; tag: "number";
	key: `boxed_id:number:${string}`;
	value: {
		info_arr: [["one",number]];
		type: string;
	};
};
