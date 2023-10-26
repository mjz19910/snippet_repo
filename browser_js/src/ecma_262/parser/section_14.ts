import {ParserBase} from "./ParserBase.ts";
import {ParseReturnType} from "./ParseReturnType.ts";

export class section_14 extends ParserBase {
	// TODO: support the set of flags needed (none so far)
	Statement(str: string,index: number): ParseReturnType {
		let res=this.m_dispatcher.BlockStatement(str,index);
		if(res[0]) return ['Statement',res[1]];
		res=this.m_dispatcher.VariableStatement(str,index);
		if(res[0]) return ['Statement',res[1]];
		// BlockStatement[?Yield, ?Await, ?Return]
		// VariableStatement[?Yield, ?Await]
		// EmptyStatement
		// ExpressionStatement[?Yield, ?Await]
		// IfStatement[?Yield, ?Await, ?Return]
		// BreakableStatement[?Yield, ?Await, ?Return]
		// ContinueStatement[?Yield, ?Await]
		// BreakStatement[?Yield, ?Await]
		// [+Return] ReturnStatement[?Yield, ?Await]
		// WithStatement[?Yield, ?Await, ?Return]
		// LabelledStatement[?Yield, ?Await, ?Return]
		// ThrowStatement[?Yield, ?Await]
		// TryStatement[?Yield, ?Await, ?Return]
		// DebuggerStatement
		res=this.m_dispatcher.DebuggerStatement(str,index);
		if(res[0]) return ['Statement',res[1]];
		return [null,0];
	}
}