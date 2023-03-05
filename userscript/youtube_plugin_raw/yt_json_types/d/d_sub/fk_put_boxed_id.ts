async function fk_put_boxed_id(version: number,...args: Y_PutBoxedArgs) {
	let idb_cls=await import("../../../zc_child_modules/YTPlugin_IndexedDB.user.js");
	let dr: DefaultServiceResolver={value: null,listeners: []};
	let t=new idb_cls.IndexedDBService(dr);
	switch(args[0]) {
		default: throw new Error();
		case "video_time": {
			let [tag,,value]=args;
			let ret=t.put_box({
				type: "boxed_id",
				tag,
				key: `boxed_id:${tag}:${value.raw_value}`,
				value,
			},version);
			return {args,ret};
		}
	}
}
