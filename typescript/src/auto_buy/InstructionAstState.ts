import {InstructionType} from "../vm/instruction/InstructionType.js";
import {TreeItem} from "../vm/TreeItem.js";

type StackItemType=['children',number,[number,TreeItem[]]];

export class InstructionAstState {
	clone(tree=this.tree,functions_map=this.functions_map,stack=this.stack,cur_depth=this.cur_depth) {
		return new InstructionAstState(tree,functions_map,stack,cur_depth);
	}
	constructor(
		public tree: TreeItem[],
		public functions_map: Map<number,InstructionType[]>,
		public stack: StackItemType[]=[],
		public cur_depth=0,
		public items: InstructionType[]=[],
		public depths: number[]=[],
		public ret: InstructionType[]|null=null,
	) {}
}
