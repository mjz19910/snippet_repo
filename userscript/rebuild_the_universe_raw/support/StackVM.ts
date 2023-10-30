import {Box} from "./box/mod/Box.ts";

export class StackVM {
	stack:Box[]=[];
	push(value:Box) {this.stack.push(value);}
}
