export type ScriptEventTargetType = {
	fns: any[]
	addEventListener(fn: (e: any) => void): void
	dispatchEvent(ev: {
		type: string
		state: string
	}): void
}
