interface NS {
	heart: {
		break(): number;
	};
	// a rick roll
	openDevMenu(): void;
	// gives Exploit.UndocumentedFunctionCall
	exploit(): void;
	bypass(doc: Document): void;
	alterReality(): void;
	rainbow(guess: string): void;
	iKnowWhatImDoing(): void;
	tprintRaw?: (...x: any[]) => void;
	get_memoed_state?: () => {
		memoed: Partial<NS>;
		ns: InternalAPI<NS_With_GetSet>;
	};
}
interface NS_With_GetSet extends NS {
	get_state_set(): true;
}
interface WorkerScript {}
interface NetscriptContext {
	workerScript: WorkerScript;
	function: string;
	functionPath: string;
}
type GenericAPI<T>={[key in keyof T]: APIFn|GenericAPI<T[key]>};
type APIFn=(...x: any[]) => any;
type InternalFn<F extends APIFn>=(ctx: NetscriptContext) => ((...args: unknown[]) => ReturnType<F>)&F;

type GetCallableState<T>={[R in keyof T as T[R] extends (...x: any[]) => any? R:never]: T[R];};


// args, enums, and pid are excluded from the API for typing purposes via the definition of NSFull.
// They do in fact exist on the external API (but are absent on the internal API and ramcost tree)
type InternalAPI<API>={
	[key in keyof API]: API[key] extends APIFn? InternalFn<API[key]>:InternalAPI<API[key]>;
};
