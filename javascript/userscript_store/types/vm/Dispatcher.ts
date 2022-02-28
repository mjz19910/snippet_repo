import {DispatcherType} from "types/vm/DispatcherType.js";
import {ecma_12_5} from "./ecma_12_5";
import {ecma_12_6} from "./ecma_12_6";
import {ecma_12_7} from "./ecma_12_7";
import {ecma_12_8_3} from "./ecma_12_8_3";

export class Dispatcher extends DispatcherType {
	ecma_12_5:ecma_12_5=new ecma_12_5(this);
	ecma_12_6:ecma_12_6=new ecma_12_6(this);
	ecma_12_7:ecma_12_7=new ecma_12_7(this);
	ecma_12_8_3:ecma_12_8_3=new ecma_12_8_3(this);
	constructor(){
		super();
	}
	IdentifierName(str:string, index:number) {
		return this.ecma_12_6.IdentifierName(str, index);
	}
	PrivateIdentifier(str:string, index:number) {
		return this.ecma_12_6.PrivateIdentifier(str, index);
	}
	Punctuator(str:string, index:number) {
		return this.ecma_12_7.Punctuator(str, index);
	}
	DecimalDigit(str:string, index:number) {
		return this.ecma_12_8_3.DecimalDigit(str, index);
	}
}
