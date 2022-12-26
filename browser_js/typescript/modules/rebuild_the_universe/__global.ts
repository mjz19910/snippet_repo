export {};

declare global {
	interface ErrorConstructor {
		captureStackTrace<T>(obj: {},constructorOpt?: T): void;
	}
}
