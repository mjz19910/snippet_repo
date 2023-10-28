import {H,Do} from "./Helpers.ts";
import * as Items from "./items.ts";

type larTorch={
	id: "larTorch",
	news_str: "Lonely torch page",
};
type roof={
	id: "roof",
	news: "Roof.",
};
export type floorFive={
	id: "floorFive",
	links: [
		roof,
		// this is a cycle
		elevator|null,
	],
};
type keepKitchen={
	id: "keepKitchen";
	news: "Kitchen.";
};
type keep={
	id: "keep",
	links: [
		floorOne,
		floorTwo,
		floorThree,
		floorFive,
		keepKitchen,
	],
};
type screwdriver={
	type: "item";
	id: "screwdriver",
};
type unscrew_armor={
	id: "unscrew_armor";
	fn: "use";
	usingItem: screwdriver;
};
type take_piece_of_paper={
	required: unscrew_armor;
	fn: "take";
	item: piece_of_paper;
};
type armour={
	id: "armour",
	news: "Knight's armour",
	action: H.ActionArr<[
		unscrew_armor,
		take_piece_of_paper,
	]>,
};
type larStairs={
	id: "larStairs",
	links: [
		keep,
		armour,
	],
};
type egg={
	type: "item";
	id: "egg";
};
type larFm={
	id: "larFm";
	action: H.TakeActionR2<{
		requirements: [
			hand_press,
			fui,
		];
		item: egg;
	}>;
};
type larLake={
	id: "larLake",
	links: [larFm],
};
type larDark={
	id: "larDark",
	links: [
		larLake,
		deathDome,
	];
};
type deathDome={
	id: "deathDome";
	links: [grave];
};
type larBoat={
	id: "larBoat",
	links: [larDark],
};
type larRiver={
	id: "larRiver",
	links: [larBoat];
};
type larder={
	id: "larder",
	links: [
		larTorch,
		larStairs,
		larRiver,
	],
};
type burrow={
	id: "burrow",
	links: [larder],
};
type picRef={
	id: "picRef";
	links: [
		{
			bold: true;
			href: burrow;
		}
	];
};
type picCup={
	id: "picCup",
	links: [picRef],
};
type picTable={
	id: "picTable",
	links: [picCup],
};
type dead_klingon={
	type: "item";
	id: "dead Klingon";
};
type picQ={
	id: "picQ";
	links: [picTable],
	action: H.TakeActionR<{
		required: keycard;
		item: dead_klingon;
	}>;
	quest_chain_part: readyRoom["story"]["dead_klingon"];
	quest_chain: [
		picQ,picTable,picCup,picRef,burrow,larder,larStairs,keep,floorFive,elevator,elev_boiler,boiler,
		mechanic,
		Do.UseAction<mechanic,hypospray>,
		piping,
		pipe1,
	];
};
type good={
	id: "good",
	news: "Good page.",
};
type read={
	id: "read",
	links: [good],
};
type red={
	id: "red",
	links: [
		read,
		picQ,
	],
};
type green={
	id: "green",
	links: [red],
};
type members={
	id: "members",
	links: [green],
};
export type redbridge={
	id: "redbridge";
	news: "Red bridge",
	action: {
		fn: "use";
		usingItem: "sword";
	};
};
export type underworld={
	id: "underworld",
	links: [redbridge],
};
export type hSmell={
	id: "hSmell";
	news: "Weird smell in the hall gallery.";
};
export type hGallery={
	id: "hGallery";
	links: [hSmell];
};
export type hStairs={
	id: "hStairs";
	links: [hGallery];
};
export type sDoor={
	id: "sDoor";
	news: "Small door...",
	state: "closed",
};
export type lHall={
	id: "lHall";
	missing: ["corner"];
	links: [
		hStairs,
		sDoor,
	];
};
export type lGallery={
	id: "lGallery";
	links: [lHall],
};
export type narrowHole={
	id: "narrowHole";
	links: [lGallery],
	// 404 pages
	missing: ["uQwe"],
};
export type uLeafage={
	id: "uLeafage",
	links: [narrowHole],
};
export type uForest={
	id: "uForest",
	links: [uLeafage],
	action: {
		fn: "use",
		usingItem: "QweQwe",
	},
};
export type cowardly_dwarf={
	type: "item";
	id: "cowardly dwarf";
};
export type uForestEdge={
	id: "uForestEdge",
	links: [uForest],
	action: H.TakeAction<cowardly_dwarf>;
};
export type boiler={
	id: "boiler";
	news: "Boiler room",
	links: [
		piping,
		mechanic,
	],
};
type someone={
	id: "someone";
	action: H.ActionArr<[
		H.UseAction<Items.something>,
		H.TakeActionR<{item: glass_orb,required: Items.something;}>,
	]>;
};
type eternalMaze={
	id: "eternalMaze";
	links: [someone],
};
export type floorOne={
	id: "floorOne";
	links: [eternalMaze],
};
type giant={
	type: "item";
	id: "giant";
};
export type floorTwo={
	id: "floorTwo";
	news: "Floor Two";
	action: H.UseAction2<{
		v: giant;
		caption: "Move furniture";
	}>,
};
type genie={
	type: "item";
	id: "genie";
};
export type floorThree={
	id: "floorThree";
	news: "Floor Three",
	action: H.TakeAction<genie>;
};
export type elev_underworld={
	floor_number: 3;
	destination: underworld;
};
export type elev_uForest={
	floor_number: 4;
	destination: uForestEdge;
};
export type elev_boiler={
	floor_number: 5;
	destination: boiler;
};
export type elev_floorOne={
	floor_number: 6;
	destination: floorOne;
};
export type elev_floorTwo={
	floor_number: 7;
	destination: floorTwo;
};
export type elev_floorThree={
	floor_number: 8;
	destination: floorThree;
};
export type elev_floorFive={
	floor_number: 9;
	destination: floorFive;
};
export type elevator={
	destinations: {
		elev_underworld: elev_underworld,
		elev_uForest: elev_uForest,
		elev_boiler: elev_boiler,
		elev_floorOne: elev_floorOne,
		elev_floorTwo: elev_floorTwo,
		elev_floorThree: elev_floorThree,
		elev_floorFive: elev_floorFive,
	},
};
// cspell:word rozenbom
type rozenbom={
	id: "rozenbom",
	action: H.TakeActionStr<"small green lamp">,
};
type dwarfName={
	id: "dwarfName",
	links: [rozenbom],
};
type piece_of_paper={
	type: "item";
	id: "piece of paper",
	links: [dwarfName],
};
type keycard={
	type: "item",
	id: "keycard",
};
type off={
	id: "off",
	action: H.TakeAction<keycard>;
};
type on={
	id: "on",
	links: [off],
};
type v_25_of_shares={
	type: "item",
	id: "25% of shares",
	links: [on],
};
type caramel={
	id: "caramel";
	news: "This is a secret communication room. Please, use it with care.";
};
// cspell:ignore zbrogjdnfhvyensocuiehw
type u_page={
	id: "zbrogjdnfhvyensocuiehw",
	rid: "u",
	news_str: "This is the U page.",
	hints: [
		"A maze is less confusing if you try to conquer it with a friend who lives in a lamp",
		"An absense of a fourth floor does not mean there is no fifth",
		// cosmology -> pattern -> pcnt
		"An hourglass is more than it seems",
		// dwarfName
		"Be sure to find small green lamp - otherwise lots of locations would be too dark for you to explore!",
		"Bee yourself",
		"Beware!",
		// library
		"Books are typically kept in the library",
		"Cross the road only when you see green light",
		"If something is mentioned twice, chances are it hints to a room",
		"Keyword: <b>74stars</b>",
		"Keyword: <b>bridge</b>",
		// secret communication room
		"Keyword: <b>caramel</b>",
		"Keyword: <b>cosmology</b>",
		"Keyword: <b>flatJoke</b>",
		"Keyword: <b>jrrtgandalf</b>",
		"Selldome page: <b>selldome</b>",
		"Stay alert!",
		"The Poirot page: <b>herculepoirot</b>",
		"The best way to get rid of an angry mosquito is to hide from it!",
		"The underground river from the castle larder leads to the Silent Lake... that is, if you do not drown!",
		"Whenever in doubt - consult a wise book",
	],
	hint_refs: {
		"74stars": v_74stars,
		bridge: bridge,
		caramel: caramel,
		cosmology: cosmology,
		flatJoke: flatJoke,
		herculepoirot: "herculepoirot",
		jrrtgandalf: jrrtgandalf,
		library: library,
		selldome: selldome,
	},
};
type zbrogjdnfhvyensocuiehw=u_page;
type something={
	id: "something";
	action: H.TakeAction<Items.something>;
};
type rhino={
	links: [something],
};
type solutions={
	news: "Education: solutions.",
};
type missions={
	links: [solutions],
	solutions: {
		beginner: [u_page,"zbrogjdnfhvyensocuiehw"],
	},
};
type faq={
	links: [
		missions,
		y,
	],
	action: H.TakeAction<gandalf_magic_book>;
};
type wall={
	id: "wall";
	news: "Great Wall of IWGH";
	action: H.WallPostAct,
};
type d_essay={
	news: "An essay explaining why IWGH has no D page",
};
type hypospray={
	type: "item",
	id: "hypospray",
};
type sickbay={
	actions: [
		H.StoryEvent<{
			required: dead_klingon;
		}>,
		H.StoryEvent<{
			required: dead_romulan;
		}>,
		H.TakeActionR<{
			required: dead_romulan;
			item: hypospray,
		}>,
	];
};
export type enterprise={
	links: [
		deck8,
		v_10forward,
		engineering,
		sickbay,
		bridge,
	];
	quarters: [
		"riker",
		"worf",
		uQuarters,
	];
};
type deck8={
	id: "deck8",
};
type dead_romulan={
	type: "item";
	id: "dead Romulan";
};

type uQuarters={
	news: "Uninhabited quarters";
	extra: "the Romulan just entered their quarters, there is no one *visible* inside";
	action: H.TakeActionR<{
		required: after_lockdown;
		item: dead_romulan;
	}>;
	quest_chain_part: readyRoom["story"]["dead_klingon"];
};
type v_10forward={
	id: "10forward",
	news: "Enterprise NCC-1701-D: Ten Forward",
};
type engineering={
	links: [cDisruptor];
	//cspell:ignore wqwrqr
	action: H.UseActionStr<"wqwrqr">;
};
type cDisruptor={
	news: "Cloak disruptor",
};
type fat_worm={
	type: "item";
	id: "fat worm";
};
type worms={
	id: "worms";
	news: "Worms";
	action: H.TakeAction<fat_worm>;
};
type hole={
	links: [worms];
};
type ut1={
	news: "Underground tunnel, section 1.";
	action: H.TakeAction<screwdriver>;
	links: [hole];
};
type ut231={
	news_fmt: "Underground tunnel, section 231.";
};
type ut232={
	news_fmt: "Underground tunnel, section 232.";
	links: [uFridge];
};
type ut2={
	news: "Underground tunnel, section 2.";
	links: [
		ut231,
		ut232,
	];
};
type ut3={
	links: [deadEnd];
};
type grave={
	links: [
		ut1,
		ut2,
		ut3,
	],
	action: H.TakeAction<fui>;
};
type mechanic={
	id: "mechanic";
	news: "Mechanic in the boiler room";
	action: H.UseAction<hypospray>;
};
type piping={
	news: "Piping",
	links: [
		pipe1,
		pipe3,
		pipe5,
		pipe6,
		pipe7,
		pipe9,
		pipe11,
		pipe13,
	],
};
type pipe1={
	news: "Pipe passage 1",
};
type philosophical_principles={
	type: "item";
	id: "philosophical principles",
};
type pipe3={
	news: "Pipe passage 3",
	action: H.TakeAction<philosophical_principles>,
};
type pipe5={
	news: "Pipe passage 5",
};
type broken_water_filter={
	type: "item";
	id: "broken water filter";
};
type pipe6={
	news: "Pipe passage 6",
	action: H.TakeAction<broken_water_filter>;
};
type fake_orb={
	type: "item";
	id: "Fake Orb",
};
type pipe7={
	news: "Pipe passage 7",
	action: H.TakeAction<fake_orb>,
};
type pipe9={
	news: "Pipe passage 9";
	required: H.Not<philosophical_principles>;
};
type pipe11={
	news: "Pipe passage 11",
};
type pipe13={
	news: "Pipe passage 13";
	required: philosophical_principles;
	links: [
		ut17,
		ut18,
		ut19,
	],
};
type ut17={
	news: "Underground tunnel, section 17.",
};
type annoying_fly={
	type: "companion";
	id: "annoying fly";
};
type ut18={
	news: "Underground tunnel, section 18.";
	events: {
		room_enter: {
			_tag: "event";
			type: "add_companion";
			value: annoying_fly;
		};
	};
};
type ut19={
	news: "Underground tunnel, section 19.",
};
type gandalf_magic_book={
	type: "item";
	id: "Gandalf Magic Book",
	links: [jrrtgandalf];
};
type glass_orb={
	type: "item";
	id: "Glass Orb";
};
type inventory={
	items: {
		"Glass Orb": glass_orb,
		"hand press": hand_press,
		"fat worm": fat_worm,
		"Gandalf Magic Book": gandalf_magic_book,
		"25% of shares": v_25_of_shares,
		"screwdriver": screwdriver,
		"fui": fui,
		"piece of paper": piece_of_paper,
		"small green lamp": null,
		"egg": egg,
		"mosquito disinterest": null,
		"hypospray": hypospray,
		"broken water filter": broken_water_filter,
		"Fake Orb": fake_orb,
		"Orb Book": orb_book,
		"dead Klingon": dead_klingon,
		"dead Romulan": dead_romulan,
		"mosquitoZ": mosquitoZ,
	};
};
type after_lockdown={
	type: "story_pos";
	pos: "after lockdown";
};
type readyRoom={
	story: {
		dead_klingon: {
			uses: dead_klingon;
			quest_chain: [
				Do.RunTakeAct<dead_klingon>,
				readyRoom,
				sickbay,
				readyRoom,
				v_10forward,
				after_lockdown,
				uQuarters,
				Do.RunTakeAct<dead_romulan>,
				oLounge,
				sickbay,
				H.TakeActionR<{
					required: dead_romulan;
					item: hypospray,
				}>,
			];
		};
		null: {
			uses: null,
		};
	};
};
type oLounge={
	id: "oLounge",
	news: "Enterprise NCC-1701-D: Observation lounge",
};
type bridge={
	id: "bridge",
	links: [
		readyRoom,
		oLounge,
	];
};
//cspell:ignore usuddend
type uFridge={
	id: "uFridge",
	links: [
		deadEnd,
		usuddend,
	];
};
type deadEnd={
	id: "deadEnd",
	news: "Dead end.";
};
type usuddend={
	id: "usuddend",
	links: [uFridgeOpen];
};
type hand_press={
	type: "item";
	id: "hand press";
};
type fui={
	type: "item";
	id: "fui";
};
type uFridgeOpen={
	id: "uFridgeOpen",
	action: H.TakeAction<hand_press>;
	quest_chain: [
		Do.RunTakeAct<hand_press>,
		burrow,
		larder,larRiver,larBoat,larDark,
		larDark,
		deathDome,
		grave,
		Do.RunTakeAct<fui>,
		o,
		zbrogjdnfhvyensocuiehw,cosmology,
		pattern,pcnt,
		Do.RunTakeAct<v_25_of_shares>,
		Do.UseInventory<v_25_of_shares>,
		on,off,
		Do.RunTakeAct<keycard>,
		Do.UseMenu<members>,
		members,green,red,picQ,
		picTable,picCup,picRef,
		burrow,larder,larRiver,larBoat,larDark,
		deathDome,
		grave,
		larDark,larLake,larFm,
		Do.UseInventory2<[hand_press,fui]>,
	];
};
type v_74stars={
	id: "74stars";
	news: "74 StArS";
};
type library={
	links: [
		lib1,
		lib2,
	];
};
type lib1={
	news: "Or-Os";
	action: H.TakeAction<orb_book>;
};
type lib2={
	news: "Gt-Gz";
};
type cosmology={
	links: [
		opinion,
		characteristics,
		generation,
		flatDisc,
		{type: "chain",arr: [flatDisc,glimpse,a,dot];},
		// chain from pattern
		pattern,
		{type: "chain",arr: [pattern,pcnt];},
		difference,
		deadEnd,
	];
};
type opinion={
	news: "Opinion page.";
};
type characteristics={
	news: "Random super hero";
	action: {
		type: "reload_link",
		button: {
			caption: "Generate superhero",
		},
	},
};
type generation={
	news: "Generation page.";
};
type difference={
	news: "Difference page.";
};
type pattern={
	id: "pattern";
	links: [pcnt];
	quest_chain: [
		pattern,pcnt,
	];
};
type pcnt={
	id: "pcnt";
	action: H.TakeAction<v_25_of_shares>;
};
type flatDisc={
	links: [glimpse];
};
type glimpse={
	links: [a];
};
type dot={
	news: "Dot page.";
};
type jrrtgandalf={
	id: "jrrtgandalf",
	news: "Gandalf Magic Book extracts.";
};
type flatJoke={
	news: "Flat joke.";
};
//cspell:word kuki mudi naada
type kukiOrbs={
	links: [
		"clearlake",
		"mudiCat",
		//cspell:ignore simon navil
		"simonNavil",
		"naada"
	];
};
type orb_book={
	type: "item";
	id: "Orb Book",
	links: [
		kukiOrbs
	];
};
type all_pages={
	generic: {
		links: [
			inventory,
			o,
			u_page,
		],
	},
	menu: {
		items: [
			main,
			dictionary,
			communication,
			members,
			faq,
		],
	};
	hidden: [
		open_dir,
		a,
		b,c,d,z,
	];
};
type generator={
	id: "generator";
	news: "This is the famous short story generator.";
};
type selldome={
	id: "selldome";
};
type ghbs={
	id: "ghbs";
};
type tohru={
	id: "tohru";
};
type communication={
	id: "communication";
};
type dictionary={
	id: "dictionary";
};
type open_dir={
	links: [
		main,
		generator,
		communication,
		dictionary,
		wall,
		o,
		faq,
		inventory,
		members,
		selldome,
		ghbs,
		tohru,
	],
};
export {type all_pages};
export type WorkQueueItem={
	destination: uForestEdge;
};
type a={
	news: "This is the A page.";
	links: [dot];
};
type b={
	news: "This is the B page.";
};
type c={
	news: "This is the See page";
	links: [rhino],
};
type o={
	id: "o",
	news: "This is the O page.";
};
type d={
	id: "d",
	news: "As confusing as it may seem, this is the M page";
	links: [m];
};
type m={
	id: "m";
	news: "This is the M page";
	links: [d_essay];
};
type y={
	news: "Why page.";
	clues: {
		y: [missions];
	};
};
type mosquitoZ={
	type: "item";
	id: "mosquitoZ";
};
type z={
	news: "This is Z space";
	action: {
		fn: "take",
		item: mosquitoZ,
	};
};

type main={
	id: "main";
	links: [wall];
	quest_chain: [
		faq,
		Do.RunTakeAct<gandalf_magic_book>,
		y,
		picQ,picTable,picCup,picRef,burrow,larder,larStairs,keep,floorFive,elevator,elev_boiler,boiler,
		mechanic,
		Do.UseAction<mechanic,hypospray>,
		piping,
		pipe1,
	];
};
