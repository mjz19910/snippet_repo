import {ParserBase} from "./ParserBase.ts";
import {ParseReturnType} from "./ParseReturnType.ts";

export class section_14_3_2 extends ParserBase {
	// https://tc39.es/ecma262/#prod-VariableStatement (VariableStatement[Yield, Await])
	VariableStatement(str: string,index: number): ParseReturnType {
		console.error("todo", str,index);
		return [null,0];
	}
	// var VariableDeclarationList[+In, ?Yield, ?Await]

	// VariableDeclarationList[In, Yield, Await] :
	// VariableDeclaration[?In, ?Yield, ?Await]
	// VariableDeclarationList[?In, ?Yield, ?Await] , VariableDeclaration[?In, ?Yield, ?Await]

	// VariableDeclaration[In, Yield, Await] :
	// BindingIdentifier[?Yield, ?Await] Initializer[?In, ?Yield, ?Await]opt
	// BindingPattern[?Yield, ?Await] Initializer[?In, ?Yield, ?Await]*/
}