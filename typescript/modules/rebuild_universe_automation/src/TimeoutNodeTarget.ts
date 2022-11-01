export interface TimeoutNodeTarget {
	wait(): Promise<any>
	fire(): void
	destroy(): void
}
