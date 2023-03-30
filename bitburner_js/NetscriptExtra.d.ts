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
		ns: ReqState<NS&{
			get_state_set(): true;
		}>;
	};
}
interface NS_With_GetSet extends NS {
	get_state_set(): true;
}
interface WorkerScript {}
interface ScriptState<T extends string> {
	workerScript: WorkerScript;
	function: T;
	functionPath: T;
}
type ReqState<T>={[R in keyof T]: R extends string? T[R] extends (...x: any[]) => any? (x: ScriptState<R>) => T[R]:T[R]:T[R];};
type GetCallableState<T>={[R in keyof T as T[R] extends (...x: any[]) => any? R:never]: T[R];};