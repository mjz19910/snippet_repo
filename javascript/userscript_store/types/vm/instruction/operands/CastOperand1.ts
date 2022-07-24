import {CastToFunctionIndexOperandValue} from "./values/CastToFunctionIndexOperandValue"
import {CastToObjectIndexOperandValue} from "./values/CastToObjectIndexOperandValue"

export type CastOperand1 =
CastToObjectIndexOperandValue |
CastToFunctionIndexOperandValue |
'vm_function'
