import {ParseText} from "./ParseText.js";

export interface IRealm {}
export class ECMAScriptCode {}
export class HostDefined {}
export class ScriptRecord {
	m_realm: IRealm;
	m_ecma_script_code: ECMAScriptCode;
	m_host_defined: HostDefined;
	constructor(realm: IRealm,script: ECMAScriptCode,host_defined: HostDefined) {
		this.m_realm=realm;
		this.m_ecma_script_code=script;
		this.m_host_defined=host_defined;
	}
}
export enum GoalSymbol {
	Script="Script",
}
export function ParseScript(sourceText: string,realm: IRealm,hostDefined: HostDefined) {
	let script=ParseText(sourceText,GoalSymbol.Script);
	return new ScriptRecord(realm,script,hostDefined);
}