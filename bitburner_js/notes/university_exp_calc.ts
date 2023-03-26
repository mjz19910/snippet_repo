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
			service_cost: {exp_rate: 18.280,cost: -2400},
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
			service_cost: {exp_rate: 1.828,cost: -108},
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
					const base_exp_rate=location.base_service_cost.exp_rate;
					const base_cost_rate=location.base_service_cost.cost;
					console.log(location.services.slice(0,2));
					console.log(location.services.slice(2));
					console.log(-120/base_cost_rate);
					base_exp_rate;
				} break;
			}
		} break;
	}
	sector_12[0];
}

world();
