import {ScriptEventTargetType} from "./ScriptEventTargetType";

export class ScriptStateHost {
	static event_target: ScriptEventTargetType = {
		fns: [],
		addEventListener(fn: (e: any) => void) {
			this.fns.push(fn);
		},
		dispatchEvent(ev: {type: string; state: string;}) {
			let l_fns = this.fns.slice();
			for(let i = 0;i < l_fns.length;i++) {
				let fn = l_fns[i];
				fn(ev);
			}
		}
	};
}
