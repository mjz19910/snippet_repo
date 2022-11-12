import {List} from "./List.js";
import {GoalSymbol,HostDefined,IRealm,ScriptRecord} from "./ParseScript.js";
import {ParseText} from "./section_11_1_6.js";
// https://tc39.es/ecma262/#sec-parse-script
export function ParseScript(sourceText: string,realm: IRealm,hostDefined: HostDefined) {
	// 1. Let script be ParseText(sourceText, Script).
	let script=ParseText(sourceText,GoalSymbol.Script);
	// 2. If script is a List of errors, return script.
	if(script instanceof List) return script;
	// 3. Return Script Record { [[Realm]]: realm, [[ECMAScriptCode]]: script, [[HostDefined]]: hostDefined }.
	return new ScriptRecord(realm,script,hostDefined);
}