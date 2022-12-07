import {TypeAOrTypeB} from "./repeat/TypeAOrTypeB.js";
import {AnyOrRepeat2} from "./repeat/AnyOrRepeat2.js";

declare global {
	export type DualR=[true,AnyOrRepeat2<string,number>[]]|[false,TypeAOrTypeB<string,number>[]];
	export type TypeAOrTypeBSimple=["string",string]|["number",number];
	export type DualRSimple=[true,(["string", AnyOrRepeat<string>] | ["number", AnyOrRepeat<number>])[]]|[false,TypeAOrTypeBSimple[]];
}
