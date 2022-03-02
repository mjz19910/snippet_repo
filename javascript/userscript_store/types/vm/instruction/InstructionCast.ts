export type InstructionCastOpcode="cast";
export type InstructionCastArg = "object_index" | "callable_index";
export type InstructionCast = [InstructionCastOpcode, InstructionCastArg];
