import {InstructionImpl} from "./InstructionImpl.js";
import {InstructionMap} from "./InstructionMap.js";

export type InstructionImplMap={
	[U in keyof InstructionMap]: InstructionImpl<U>;
};
