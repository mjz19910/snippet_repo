import {VerifyError} from "./VerifyError.ts"

export function VERIFY(assert_result: boolean,assert_message: string) {
	if(!assert_result) {
		throw new VerifyError(assert_message)
	}
}
