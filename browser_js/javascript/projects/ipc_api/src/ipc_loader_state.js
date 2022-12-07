
export class IpcLoader {
	depth=0;
	/**@type {(()=>void)[]} */
	exports=[];
}

export let ipc_loader_state=new IpcLoader();
