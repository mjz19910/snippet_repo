import {CastToFunctionIndexOperandValue} from "./values/CastToFunctionIndexOperandValue.ts"
import {CastToObjectIndexOperandValue} from "./values/CastToObjectIndexOperandValue.ts"
import {CastToVMFunctionOperandValue} from "./values/CastToVMFunctionOperandValue.ts"

export type CastOperand1=
	CastToObjectIndexOperandValue|
	CastToFunctionIndexOperandValue|
	CastToVMFunctionOperandValue
