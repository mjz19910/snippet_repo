// deno-lint-ignore-file
type Generator={
	prestigeAmount: number;
	prestigeGain: boolean;
	autoMaxAll: boolean;
	list: {}[];
};
type Player={
	generators: Generator[];
};
type BigNumType={
	logarithm: number;
};
declare global {
	function getPrestigeGain(x: any): BigNumType;
	function prestige(id: number): void;
	function maxAll(id: number): void;
	function buyMaxGenerator(a: number,b: number): void;
	var player: Player;
}
export {};
