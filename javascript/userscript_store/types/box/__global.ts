declare global {
	interface ObjectConstructor {
		keys<T>(v: T): (keyof T)[]
	}
}
export {}
