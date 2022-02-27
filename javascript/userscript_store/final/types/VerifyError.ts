export class VerifyError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "VerifyError";
	}
}
