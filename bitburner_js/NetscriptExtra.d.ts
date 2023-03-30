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
		ns: NS&{
			get_state_set(state: {
				workerScript: WorkerScript;
				function: "get_state_set";
				functionPath: "get_state_set";
			}): () => true;
		};
	};
}
interface NS_With_GetSet extends NS {
	get_state_set(): true;
}
interface WorkerScript {}