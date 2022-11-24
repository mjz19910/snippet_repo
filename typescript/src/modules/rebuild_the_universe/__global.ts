interface ErrorStackTrace {
	stack?: string;
}

declare global {
	interface ErrorConstructor {
		captureStackTrace<T>(obj: ErrorStackTrace,constructorOpt?: T): void;
	}
}

export {};