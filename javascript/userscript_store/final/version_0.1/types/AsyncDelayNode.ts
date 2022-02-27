import {AsyncNodeRoot} from "./AsyncNodeRoot";

export class AsyncDelayNode<T, C extends (this: T) => void> {
	root;
	cint: number;
	target_obj: T;
	target_callback: C;
	label: string;
	timeout: number;
	constructor(root: AsyncNodeRoot, target_obj: T, target_callback: C, label: string) {
		this.root = root;
		this.cint = -1;
		this.target_obj = target_obj;
		this.target_callback = target_callback;
		this.label = label;
		this.timeout = 0;
	}
	start() {
		this.root.on_child_start(this);
		this.cint = setTimeout(this.run, this.timeout, this);
	}
	run(): void {
		this.root.on_child_run(this);
		this.target_callback.call(this.target_obj);
	}
}
