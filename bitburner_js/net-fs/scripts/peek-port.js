import {ObjectPort} from "/api/v100/hack-support";

/** @param {NS} ns */
export async function main(ns) {
	ns.tail();
	ns.clearLog();
	/** @typedef {{id:"link",data:number,next:LinkType|null}} LinkType */
	/** @param {number} port */
	function debug_port_handle(port) {
		let delayed_messages=[];
		/** @type {ObjectPort<LinkType>} */
		let handle=ObjectPort.getPortHandle(ns,port);
		if(handle.empty()) {
			ns.print(port,": empty");
			return;
		}
		while(!handle.empty()) {
			let res=handle.read();
			if(res===null) break;
			delayed_messages.push(res);
		}
		let delayed_messages_all=[];
		let stack=[delayed_messages];
		while(stack.length>0) {
			let arr=stack.pop();
			if(arr===void 0) break;
			for(let item of arr) {
				delayed_messages_all.push(item.data);
				if(item.next===null) continue;
				stack.push([item.next]);
			}
		}
		ns.print(port,": ",delayed_messages_all);
		for(let msg of delayed_messages) {
			let removed_msg=handle.write(msg);
			if(removed_msg!==null) ns.print("dropped: ",removed_msg);
		}
	}
	let port_id=ns.args[0];
	if(typeof port_id!=="number") throw new Error("Invalid arguments");
	debug_port_handle(port_id);
}
