export class VerifyError extends Error {
	constructor(message: string|undefined) {
		super(message)
		this.name="VerifyError"
	}
}
