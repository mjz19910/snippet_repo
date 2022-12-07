export {};
<<<<<<< HEAD
=======

interface ErrorStackTrace {
	stack?: string;
}

declare global {
	interface ErrorConstructor {
		captureStackTrace<T>(obj: ErrorStackTrace,constructorOpt?: T): void;
	}
}
>>>>>>> e10fb913 (u)
