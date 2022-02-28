import {ecma_base} from "./ecma_base";
import {ecma_return_type} from "./ecma_return_type";

export interface DispatcherType {
	[x:string]:((str:string, index:number)=>ecma_return_type) | ecma_base;
	IdentifierName(x: string, y: number): ecma_return_type;
	PrivateIdentifier(x: string, y: number): ecma_return_type;
	Punctuator(x: string, y: number): ecma_return_type;
	NumericLiteral(x: string, y: number): ecma_return_type;
	StringLiteral(x: string, y: number): ecma_return_type;
	Template(x: string, y: number): ecma_return_type;
}