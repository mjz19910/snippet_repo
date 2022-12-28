class Ty {
	/**
	 * @param {{ parts: string[]; index: number; }} obj
	 * @returns {never}
	 */
	no_handler(obj) {
		console.log('nh',obj);
		throw new Error();
	}
	/**
	 * @arg {{}} state
	 * @arg {string[]} parts
	 * @arg {number} index
	 * @returns {import("./support/yt_api/_abc/UrlTypes").UrlTypes}
	 */
	get_yt_url_type(state,parts,index) {
		if(parts[1]!=="v1") {
			debugger;
		}
		index++;
		let cur_part=parts[index];
		switch(cur_part) {
			case "att": switch(parts[index+1]) {
				case "get": return "att.get";
				default: this.no_handler({...state,parts,index});
			}
			case "notification": index++; switch(parts[index]) {
				case "get_unseen_count": return "notification.get_unseen_count";
				case "get_notification_menu": return "notification.get_notification_menu";
				default: this.no_handler({...state,parts,index});
			}
			case "browse": return "browse";
			case "guide": index++; switch(parts[index]) {
				case void 0: return "guide";
				default: this.no_handler({...state,parts,index});
			}
			case "reel": index++; switch(parts[index]) {
				case "reel_item_watch": return "reel_item_watch";
				case "reel_watch_sequence": return "reel_watch_sequence";
				default: this.no_handler({...state,parts,index});
			}
			case "next": return "next";
			case "player": return "player";
			case "live_chat": index++; return this.get_live_chat_type(state,"live_chat",parts,index);
			case "get_transcript": return "get_transcript";
			case "account": return this.get_account_type(state,cur_part,parts,index+1);
			default: this.no_handler({...state,parts,index});
		}
	}
	/**
	 * @arg {{}} state
	 * @arg {"account"} base
	 * @arg {string[]} parts
	 * @arg {number} index
	 * @returns {import("./support/yt_api/_abc/UrlTypes").UrlTypes}
	 */
	get_account_type(state,base,parts,index) {
		let cur_part=parts[index];
		switch(cur_part) {
			case "account_menu": break;
			default: this.no_handler({...state,parts,index});
		}
		return `${base}.${cur_part}`;
	}
	/**
	 * @arg {{}} state
	 * @arg {"live_chat"} base
	 * @arg {string[]} parts
	 * @arg {number} index
	 * @returns {import("./support/yt_api/_abc/UrlTypes").UrlTypes}
	 */
	get_live_chat_type(state,base,parts,index) {
		let cur_part=parts[index];
		switch(cur_part) {
			case "get_live_chat_replay": break;
			default: this.no_handler({...state,parts,index});
		};
		return `${base}.${cur_part}`;
	}
}