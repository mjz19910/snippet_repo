import {section_14} from "./section_14.js";
import {section_14_16} from "./section_14_16.js";
import {section_14_2} from "./section_14_2.js";
import {section_14_3_2} from "./section_14_3_2.js";

export class ParserDispatcher {
	DebuggerStatement(str: string,index: number) {
		return this.m_section_14_16.DebuggerStatement(str,index)
	}
	Statement(str: string,index: number) {
		return this.m_section_14.Statement(str,index)
	}
	BlockStatement(str: string,index: number) {
		return this.m_section_14_2.BlockStatement(str,index)
	}
	VariableStatement(str: string,index: number) {
		return this.m_section_14_3_2.VariableStatement(str,index)
	}
	m_section_14=new section_14(this)
	m_section_14_2=new section_14_2(this)
	m_section_14_3_2=new section_14_3_2(this)
	m_section_14_16=new section_14_16(this)
	m_state={
		Yield: false,Await: false,Return: false
	}
}