function compress_main() {
	compress_init();
	if(g_auto_buy) {
		src_arr=g_auto_buy.compressor.try_decompress(g_auto_buy.state_history_arr)[1];
	} else {
		console.log("TODO: use event_log (can't find it)");
		return;
	}
	ids=[...new Set(src_arr)];
	id_groups=[];
	for(let value of src_arr) {
		make_group_from_item(id_groups,ids.indexOf(value),value);
	}
	el_ids=src_arr.map(get_ids);
	max_id=new Set(el_ids).size;
	let arr=compressionStatsCalc.compressor.try_compress_T(NumType,el_ids);
	/**@type {IValue} */
	let obj_start={
		id: 0,
		arr_rep: el_ids,
	};
	if(arr[0]===true) {
		obj_start.arr_rep_num=arr[1];
	} else if(arr[0]===false) {
		obj_start.arr_num=arr[1];
	}
	for(let i=0,cur=obj_start;i<3000;i++) {
		let comp_res=run_calc(cur);
		if(!cur.stats)
			throw new Error();
		let obj=cur;
		if(obj.log_val&&comp_res===null) {
			console.log('id:'+obj.id,'[',...obj.log_val,']',obj.stats_win);
		}
		if(cur.stats.length===0) {
			break;
		}
		if(cur.stats[0][1]===1) {
			break;
		}
		if(cur.next) {
			cur=cur.next;
			continue;
		} else {
			break;
		}
	}
	g_obj_arr=flat_obj(obj_start);
}
