{
	let idb=indexedDB.open("yt_plugin",2);
	idb.onsuccess=function idb_success() {
		let db_tx=idb.result.transaction("video_id","readwrite");
		let video_id_s=db_tx.objectStore("video_id");
		let bound=null;
		bound=IDBKeyRange.bound("-","n");
		bound=IDBKeyRange.bound("-","o",false,true);
		/** @type {(string|number)[]} */
		let msg=[];
		let cursor_req_0=video_id_s.openCursor(bound);
		/** @arg {string} x */
		function create_ts_type_assign(x) {
			return `type ${x[0].toUpperCase()+x.slice(1)}={};`;
		}
		cursor_req_0.onsuccess=() => {
			const cursor=cursor_req_0.result;
			if(cursor) cursor.continue();
			if(!cursor) return;
			let cur_key=cursor.key;
			if(typeof cur_key!=="string") return;
			cur_key=cur_key.split("name-list-")[1];
			cur_key=create_ts_type_assign(cur_key);
			msg.push(cur_key);
		};
		db_tx.oncomplete=() => {
			console.log(msg.join("\n"));
		};
	};
}