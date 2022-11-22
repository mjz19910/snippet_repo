import {SimpleStackVM} from "./simple_stack_vm.js";

/** @type {import("../__global.js").Holder} */
let holder={
	use() {}
};
holder.use();

class EventHandlerVMDispatch extends SimpleStackVM {
	/**
	 * @param {{background_audio: {play(): void;};}} target_obj
	 * @param {(["this"] | ["push", ...string[]] | ["get"] | ["call", number] | ["drop"])[]} instructions
	 */
	constructor(instructions,target_obj) {
		super(instructions);
		this.target_obj=target_obj;
	}
	/**
	 * @param {{}} event
	 */
	handleEvent(event) {
		this.reset();
		this.run(event);
	}
}
const test_obj={
	background_audio: {
		play() {
			console.log('test success');
		}
	}
};
/** @type {(['this']|['push',...string[]]|['get']|['call',number]|['drop'])[]} */
let instruction_list=[
	['this'],
	['push','target_obj'],
	['get'],
	['push','background_audio'],
	['get'],
	['push','play'],
	['call',0],
	['drop']
];
const handler_test=new EventHandlerVMDispatch(instruction_list,test_obj);
handler_test.handleEvent({});