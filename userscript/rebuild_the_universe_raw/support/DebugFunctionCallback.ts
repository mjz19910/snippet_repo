import {DebugFunctionType} from "./DebugFunctionType.ts"
export type DebugFunctionCallback=(function_: DebugFunctionType,obj: Record<never,never>,args: unknown[]) => Record<never,never>
