function university<T extends number,U extends number>(base_exp: T,base_cost: U) {
	return [
		{
			type: "course",tag: "Computer Science",
			cost: 0,
			hacking_exp: base_exp,
		},
		{
			type: "course",tag: "Data Structures",
			cost: base_cost,
			hacking_exp: base_exp*2,
		},
		{
			type: "course",tag: "Networks",
			cost: base_cost*2,
			hacking_exp: base_exp*4,
		},
		{
			type: "course",tag: "Algorithms",
			cost: base_cost*8,
			hacking_exp: base_exp*8,
		},
	] as const;
}
function world() {
	let sector_12=[
		{
			type: "location",
			tag: "powerhouse gym",
			company_name: "Powerhouse Gym",
			service_cost: {exp_rate: 18.834,cost: -2400},
			services: [
				{type: "train",exp: {type: "str",tag: "strength"}},
				{type: "train",exp: {type: "def",tag: "defense"}},
				{type: "train",exp: {type: "dex",tag: "dexterity"}},
				{type: "train",exp: {type: "agi",tag: "agility"}},
			]
		},
		{
			type: "location",
			tag: "iron gym",
			company_name: "Iron Gym",
			service_cost: {exp_rate: 1.883,cost: -120},
			backdoor_discount: "10%",
			backdoor_rates: {cost: -120-(-120*0.1)},
			services: [
				{type: "train",exp: {type: "str",tag: "strength"}},
				{type: "train",exp: {type: "def",tag: "defense"}},
				{type: "train",exp: {type: "dex",tag: "dexterity"}},
				{type: "train",exp: {type: "agi",tag: "agility"}},
			]
		},
		{
			type: "location",
			tag: "rothman university",
			company_name: "Rothman University",
			base_service_cost: {exp_rate: 3.184,cost: -120},
			services: university(3.184,-120),
		},
		{
			type: "location",
			tag: "foodnstuff",
			company_name: "FoodNStuff",
			jobs: [
				{
					position: "Employee",
					money_rate: 163.778,
					reputation_rate: 0.053,
					strength_exp: 0.188,
					defense_exp: 0.188,
					dexterity_exp: 0.188,
					agility_exp: 0.188,
					charisma_exp: 0.377,
				},
				{
					position: "Part-time Employee",
					money_rate: 163.778,
					reputation_rate: 0.053,
					strength_exp: 0.188*(3/8),
					defense_exp: 0.188*(3/8),
					dexterity_exp: 0.188*(3/8),
					agility_exp: 0.188*(3/8),
					charisma_exp: 0.377*(3/4),
				}
			]
		},
		{
			type: "map",
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
	for(const location of sector_12) switch(location.type) {
		case "map": break;
		case "location": {
			switch(location.tag) {
				case "rothman university": {
					const enabled=false;
					const base_cost_rate=location.base_service_cost.cost;
					if(enabled) console.log(location.services.slice(0,2));
					if(enabled) console.log(location.services.slice(2));
					if(enabled) console.log(-120/base_cost_rate);
				} break;
				case "iron gym": {
					console.log(location);
				} break;
			}
		} break;
	}
	sector_12[0];
}

world();
