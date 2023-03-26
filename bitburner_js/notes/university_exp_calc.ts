function computer_sci<T extends number>(base_exp_per_sec: T) {
	return {
		money_rate_per_sec: 0,
		hacking_exp_per_sec: base_exp_per_sec,
	} as const;
}
type LastChar<T extends string>=T extends `${infer F}${infer R extends string}`? R extends ''? F:LastChar<R>:never;
type AddObj={
	"0": {"0": ["0","0"]; "1": ["0","1"],"9": ["0","9"];};
	"1": {"1": ["0","2"]; "2": ["0","3"]; "3": ["0","4"]; "9": ["1","0"];};
	"2": {"1": ["0","3"]; "9": ["1","1"];};
	"5": {"1": ["0","6"]; "5": ["1","0"]; "6": ["1","1"]; "8": ["1","3"];};
	"7": {"0": ["0","7"]; "1": ["0","8"]; "3": ["1","0"];};
	"9": {"1": ["1","0"]; "9": ["1","8"];};
};
type RippleCarryAdd<T extends string,U extends string>=
	LastChar<T> extends keyof AddObj?
	LastChar<U> extends keyof AddObj[LastChar<T>]?
	AddObj[LastChar<T>][LastChar<U>] extends infer J extends [string,string]?
	J extends ["0",infer A]? A:
	T extends `${infer R}${LastChar<T>}`?
	R extends ''?
	[
		"ar",`${J[0]}${J[1]}`,
		[],
		"m1"
	]:
	RippleCarryAdd<R,J[0]> extends ["ar",any,any,any]?
	[
		"ar",`${RippleCarryAdd<R,J[0]>[1]}${J[1]}`,
		[`${J[0]}${J[1]}`,RippleCarryAdd<R,J[0]>,R,`${R}${LastChar<T>}`],
		"m2"
	]:
	RippleCarryAdd<R,J[0]> extends ["ar",any,any,any]?
	[
		"ar",`${RippleCarryAdd<R,J[0]>[1]}${J[1]}`,
		[`${J[0]}${J[1]}`,RippleCarryAdd<R,J[0]>,R,`${R}${LastChar<T>}`],
		"m3"
	]:
	RippleCarryAdd<R,`${J[0]}${J[1]}`> extends ["ar",any,any,any]?
	[
		"ar",`${RippleCarryAdd<R,`${J[0]}${J[1]}`>[1]}${J[1]}`,
		[`${J[0]}${J[1]}`,RippleCarryAdd<R,`${J[0]}${J[1]}`>,R,`${R}${LastChar<T>}`],
		"m5"
	]:
	U extends `${infer R2}${LastChar<U>}`?
	RippleCarryAdd<R2,J[0]> extends string?
	[
		"ar",`${RippleCarryAdd<R2,J[0]>}${J[1]}`,
		[RippleCarryAdd<R2,J[0]>,U],
		"m6"
	]:
	["nt1",R2,`${J[0]}${J[1]}`,RippleCarryAdd<R2,J[0]>,U]:
	["nt2",R,`${J[0]}${J[1]}`,RippleCarryAdd<R,`${J[0]}${J[1]}`>,U]:
	["nr2",J]:
	["nr4",T,U]:
	["lc2",LastChar<T>,LastChar<U>]:
	['lc1',LastChar<T>]
	;
;
type RCTest=RippleCarryAdd<"1","9">;
export let rc_val: RCTest|null=null;

function university<T extends number>(base_exp: T) {
	const computer_science=computer_sci(base_exp);
	type RR=`${T}` extends `${infer F}.${infer R}`? `${F}${R}`:never;
	const rr_val: RippleCarryAdd<RR,RR>=`${base_exp*2}` as any as RippleCarryAdd<RR,RR>;
	return [
		{type: "course",tag: "Computer Science",rates: computer_science},
		{
			type: "course",tag: "Data Structures",
			cost: rr_val,
		},
	] as const;
}
function world() {
	const rothman_uni={
		tag: "rothman university",
		company_name: "Rothman University",
		base_service_cost: {exp_rate: 2.759},
		services: university(2.759),
	} as const;
	let sector_12=[
		{
			tag: "powerhouse gym",
			company_name: "Powerhouse Gym",
			service_cost: {exp_rate: 18.280,cost: -2400},
			services: [
				{type: "train",exp: {type: "str",tag: "strength"}},
				{type: "train",exp: {type: "def",tag: "defense"}},
				{type: "train",exp: {type: "dex",tag: "dexterity"}},
				{type: "train",exp: {type: "agi",tag: "agility"}},
			]
		},
		{
			tag: "iron gym",
			company_name: "Iron Gym",
			service_cost: {exp_rate: 1.828,cost: -108},
			services: [
				{type: "train",exp: {type: "str",tag: "strength"}},
				{type: "train",exp: {type: "def",tag: "defense"}},
				{type: "train",exp: {type: "dex",tag: "dexterity"}},
				{type: "train",exp: {type: "agi",tag: "agility"}},
			]
		},
		rothman_uni,
		{
			map: `
          78                                                     o 97           
          o                               [icarus microsystems] /               
          G [powerhouse gym]  o                                C                
    1     |                   |                               /                 
    o-----+---x----o 4        T [alpha ent.]     o-------o   /                  
          |   3     \         |                           \ /                   
          |          \        |     [iron gym]             x 95                 
     (79) x           \       |                           / \                   
          |            o-?----+----x----G--o 10          /   o----$--o          
          |                   |    8        \        94 x                       
       80 x       [city hall] |              x 11      /  [world stock exchange]
          |                   |               \       /                         
          |                   C [cia]          \     /                          
          H  [hospital]       |                 C   C [universal energy]        
          |                   o      [deltaone]  \ /                            
          |                          35 o---------x 13/92/36                    
          C  [megacorp]  33            /         / \                            
          |              o------------o 34      /   \                           
 (29)     |             /    [carmichael sec.] C     \                          
    o-----+-----x------o                      /       U [rothman university]    
          |     31     32              [nsa] ?                                  
          |                                 /                                   
          C [blade industries]             C                                    
          |                               / [four sigma]                        
          |      [joe's guns]            /                                      
          |                             /                                       
       85 o--C--------C--------T-------o 88                [the slums] S        
          [foodnstuff]     [travel agency]                                      
`
		}
	] as const;
	sector_12[0];
}

world();
