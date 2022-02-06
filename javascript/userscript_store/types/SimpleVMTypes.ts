type VMBoxedT<T> = {
	type: 'VMBoxedT',
	value: T
};
function box_value<T>(v: T): VMBoxedT<T> {
	return {
		type: 'VMBoxedT',
		value: v
	}
}
const EASY_TAG_SYMBOL = Symbol(3);
class EasyTag {
	static sym = EASY_TAG_SYMBOL;
}
type AnyBox = VMBoxedT<any>;
type OptAnyBox = AnyBox | null;
export class VMBoxedAnySafe {
	static box_array(...v: any[]): VMBoxedAnySafe[] {
		let res: VMBoxedAnySafe[] = [];
		for(let i = 0;i < v.length;i++) {
			res[i] = new VMBoxedAnySafe(v[i]);
		}
		return res;
	}
	#unsafe_value?: AnyBox = undefined;
	#unsafe_this_value: VMBoxedT<object> | null;
	constructor(value: any) {
		this.#unsafe_value = box_value(value);
		this.#unsafe_this_value = null;
	}
	#real_value() {
		if(!this.#unsafe_value) throw new Error("Panic");
		return this.#unsafe_value;
	}
	#real_this_value() {
		if(this.#unsafe_this_value === null) {
			return box_value(window);
		}
		return this.#unsafe_this_value;
	}
	get_value_box(): AnyBox {
		let real = this.#real_value();
		return real;
	}
	store_this(v: VMBoxedAnySafe, et: EasyTag) {
		let inner_this_value: OptAnyBox = null;
		v.use_inner_this((e) => {
			inner_this_value = e;
		}, et);
		this.#unsafe_this_value = inner_this_value;
	}
	do_get(k: string) {
		let real = this.#real_value();
		let box = new VMBoxedAnySafe(real.value[k]);
		box.store_this(this, new EasyTag);
		return box;
	}
	do_call(...args_list: VMBoxedAnySafe[]): VMBoxedAnySafe {
		let visible_boxed_args: AnyBox[] = [];
		for(let i = 0;i < args_list.length;i++) {
			args_list[i].use_inner_value((e: AnyBox) => {
				visible_boxed_args.push(e);
			}, new EasyTag);
		}
		let unboxed_args = [];
		for(let i = 0;i < visible_boxed_args.length;i++) {
			unboxed_args.push(visible_boxed_args[i].value);
		}
		let real = this.#real_value();
		let real_value = real.value;
		if(real_value instanceof Function) {
			let ret = real_value.call();
			return new VMBoxedAnySafe(ret);
		}
		throw new Error("Unable to call non function");
	}
	use_inner_value(cb: (v: AnyBox) => void, et: EasyTag) {
		if(EASY_TAG_SYMBOL !== EasyTag.sym) throw new Error("User caused desync of EasyTag.sym and EASY_TAG_SYMBOL");
		if(et instanceof EasyTag && Object.getPrototypeOf(et) === EasyTag.prototype) {
			let real = this.#real_value();
			cb(real);
		}
	}
	use_inner_this(cb: (v: AnyBox) => void, et: EasyTag) {
		if(EASY_TAG_SYMBOL !== EasyTag.sym) throw new Error("User caused desync of EasyTag.sym and EASY_TAG_SYMBOL");
		if(et instanceof EasyTag && Object.getPrototypeOf(et) === EasyTag.prototype) {
			let real = this.#real_this_value();
			cb(real);
		}
	}
	clear_inner() {
		this.#unsafe_value = void 0;
	}
}
class VMBoxedValue {
	value: VMBoxed
}
export type VMBoxed = number | string | VMBoxedValue | VMBoxedAnySafe | undefined;
type StackInstructionPushArgs = VMBoxed[];
type InstructionDropArgs = [];
type InstructionGetArgs = [];
type InstructionCallArgs = [number];
type InstructionReturnArgs = [];
type InstructionHaltArgs = [];
type SpecialInstructionPushArgsType = [];
type InstructionThisArgs = [];
type InstructionGlobalArgs = [];
type InstructionBreakpointArgs = [];
type InstructionPush = ['push', ...StackInstructionPushArgs];
type InstructionDrop = ['drop', ...InstructionDropArgs];
type InstructionGet = ['get', ...InstructionGetArgs];
type InstructionCall = ['call', ...InstructionCallArgs];
type InstructionReturn = ['return', ...InstructionReturnArgs];
type InstructionGlobal = ['global', ...InstructionGlobalArgs];
type InstructionThis = ['this', ...InstructionThisArgs];
type InstructionPushArgs = ['push_args', ...SpecialInstructionPushArgsType];
type InstructionBreakpoint = ['breakpoint', ...InstructionBreakpointArgs];
type InstructionHalt = ['halt', ...InstructionHaltArgs];
export type AnyInstructionOperands = StackInstructionPushArgs | InstructionDropArgs | InstructionCallArgs | InstructionGetArgs;

export type IStackInstructionType = InstructionPush | InstructionDrop;
export type IObjectInstructionType = InstructionGet;
export type ICallInstructionType = InstructionCall | InstructionReturn;
export type ITuringInstructionType = InstructionHalt;
export type ISpecialInstructionType = InstructionPushArgs | InstructionThis | InstructionGlobal;
export type IDebugInstructionType = InstructionBreakpoint;
type InstructionType1 = IStackInstructionType | IObjectInstructionType;
type InstructionType2 = ICallInstructionType | ITuringInstructionType;
type InstructionType3 = ISpecialInstructionType | IDebugInstructionType;
type InstructionTypeG1 = InstructionType1 | InstructionType2;
type InstructionTypeG2 = InstructionType2 | InstructionType3;
export type InstructionType = InstructionTypeG1 | InstructionTypeG2;
