import {InstructionImpl} from "./InstructionImpl.ts";
import {InstructionMap} from "./InstructionMap.ts";

export type InstructionImplMap={
	[U in keyof InstructionMap]: InstructionImpl<U>;
};
