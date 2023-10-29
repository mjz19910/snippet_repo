import {H,Do} from "./Helpers.ts";
import * as Items from "./items.ts";
import {main} from "./main.ts";

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
export type keep={
	id: "keep",
	links: [
		floorOne,
		floorTwo,
		floorThree,
		floorFive,
		keepKitchen,
	],
};
type unscrew_armor={
	id: "unscrew_armor";
	fn: "use";
	usingItem: Items.screwdriver;
};
export type larStairs={
	id: "larStairs",
	links: [
		keep,
		armour,
	],
};
export type larLake={
	id: "larLake",
	links: [larFm],
};
export type larDark={
	id: "larDark",
	links: [
		larLake,
		deathDome,
	];
};
export type deathDome={
	id: "deathDome";
	links: [grave];
};
export type larBoat={
	id: "larBoat",
	links: [larDark],
};
export type larRiver={
	id: "larRiver",
	links: [larBoat];
};
export type larder={
	id: "larder",
	links: [
		larTorch,
		larStairs,
		larRiver,
	],
};
export type burrow={
	id: "burrow",
	links: [larder],
};
export type picRef={
	id: "picRef";
	links: [
		{
			bold: true;
			href: burrow;
		}
	];
};
export type picCup={
	id: "picCup",
	links: [picRef],
};
export type picTable={
	id: "picTable",
	links: [picCup],
};
export type good={
	id: "good",
	news: "Good page.",
};
export type read={
	id: "read",
	links: [good],
};
export type red={
	id: "red",
	links: [
		read,
		picQ,
	],
};
export type green={
	id: "green",
	links: [red],
};
export type members={
	id: "members",
	links: [green],
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
export type boiler={
	id: "boiler";
	news: "Boiler room",
	links: [
		piping,
		mechanic,
	],
};
type eternalMaze={
	id: "eternalMaze";
	links: [someone],
};
export type floorOne={
	id: "floorOne";
	links: [eternalMaze],
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
type dwarfname={
	id: "dwarfname",
	links: [rozenbom],
};
type piece_of_paper_inv={
	id: "piece of paper",
	links: [dwarfname],
	item: Items.piece_of_paper;
};
export type on={
	id: "on",
	links: [off],
};
export type v_25_of_shares={
	id: "25% of shares";
	item: Items.v_25_of_shares;
	links: [on];
	quest_chain: [
		on,
		Do.ActivateRoom<off>,
		Do.RunTakeAct<off,Items.keycard>,
	];
};
type caramel={
	id: "caramel";
	news: "This is a secret communication room. Please, use it with care.";
};
type herculepoirot={
	id: "herculepoirot";
	news: "This is the Poirot page.";
};
// cspell:ignore zbrogjdnfhvyensocuiehw
type u_page={
	id: "zbrogjdnfhvyensocuiehw",
	rid: "u",
	news_str: "This is the U page.",
	hints: [
		Items.genie,
		"A maze is less confusing if you try to conquer it with a friend who lives in a lamp",
		floorFive,
		"An absense of a fourth floor does not mean there is no fifth",
		// cosmology -> pattern -> pcnt
		pcnt,
		"An hourglass is more than it seems",
		// dwarfName -> rozenbom -> small_green_lamp
		Items.small_green_lamp,
		"Be sure to find small green lamp - otherwise lots of locations would be too dark for you to explore!",
		// b
		"Bee yourself",
		// [?]
		"Beware!",
		// library
		"Books are typically kept in the library",
		// [?]
		"Cross the road only when you see green light",
		// something
		"If something is mentioned twice, chances are it hints to a room",
		"Keyword: <b>74stars</b>",
		"Keyword: <b>bridge</b>",
		// secret communication room
		"Keyword: <b>caramel</b>",
		"Keyword: <b>cosmology</b>",
		"Keyword: <b>flatJoke</b>",
		"Keyword: <b>jrrtgandalf</b>",
		"Selldome page: <b>selldome</b>",
		// [?]
		"Stay alert!",
		"The Poirot page: <b>herculepoirot</b>",
		// ut1 -> Items.screwdriver -> armour
		ut1,armour,
		"The best way to get rid of an angry mosquito is to hide from it!",
		// SilentLake,
		"The underground river from the castle larder leads to the Silent Lake... that is, if you do not drown!",
		// [?]
		"Whenever in doubt - consult a wise book",
	],
	hint_refs: {
		guide: guide;
		genie: [floorThree,Items.genie];
		floorFive: floorFive,
		pcnt: [cosmology,pattern,pcnt],
		small_green_lamp: [dwarfname,rozenbom,Items.small_green_lamp],
		b: b;
		library: library,
		"74stars": v_74stars,
		bridge: bridge,
		caramel: caramel,
		cosmology: cosmology,
		flatJoke: flatJoke,
		jrrtgandalf: jrrtgandalf,
		selldome: selldome,
		herculepoirot: herculepoirot,
	};
	quests: {
		cosmology: cosmology["quest_chain"];
	};
};
export type zbrogjdnfhvyensocuiehw=u_page;
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
type d_essay={
	news: "An essay explaining why IWGH has no D page",
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
type cDisruptor={
	news: "Cloak disruptor",
};
type hole={
	links: [worms];
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
export type piping={
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
type pipe5={
	news: "Pipe passage 5",
};
type pipe9={
	news: "Pipe passage 9";
	required: H.Not<Items.philosophical_principles>;
};
type pipe11={
	news: "Pipe passage 11",
};
type pipe13={
	news: "Pipe passage 13";
	required: Items.philosophical_principles;
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
type gandalf_magic_book_inv={
	id: "Gandalf Magic Book",
	links: [jrrtgandalf];
	item: Items.gandalf_magic_book;
};
type inventory={
	items: {
		"Glass Orb": Items.glass_orb,
		"hand press": Items.hand_press,
		"fat worm": Items.fat_worm,
		"Gandalf Magic Book": gandalf_magic_book_inv;
		"25% of shares": v_25_of_shares,
		"screwdriver": Items.screwdriver,
		"fui": Items.fui,
		"piece of paper": piece_of_paper_inv,
		"small green lamp": Items.small_green_lamp,
		"egg": Items.egg,
		"mosquito disinterest": null,
		"hypospray": Items.hypospray,
		"broken water filter": Items.broken_water_filter,
		"Fake Orb": Items.fake_orb,
		"Orb Book": orb_book_inv,
		"dead Klingon": Items.dead_klingon,
		"dead Romulan": Items.dead_romulan,
		"mosquitoZ": Items.mosquitoZ,
	};
};
export type after_lockdown={
	type: "story_pos";
	pos: "after lockdown";
};
export type oLounge={
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
		uSuddEnd,
	];
};
type deadEnd={
	id: "deadEnd";
	news: "Dead end.";
};
export type uSuddEnd={
	id: "uSuddEnd";
	links: [uFridgeOpen];
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
type lib2={
	news: "Gt-Gz";
};
export type cosmology={
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
	quest_chain: [
		pattern,
		Do.ActivateRoom<pcnt>,
	];
};
type opinion={
	news: "Opinion page.";
};
type generation={
	news: "Generation page.";
};
type difference={
	news: "Difference page.";
};
export type pattern={
	id: "pattern";
	links: [pcnt];
	quest_chain: [
		pattern,pcnt,
	];
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
type clearlake={id: "clearlake";};
type mudiCat={id: "mudiCat";};
type simonNavil={id: "simonNavil";};
type naada={id: "naada";};
//cspell:word kuki mudi naada
type kukiOrbs={
	links: [
		clearlake,
		mudiCat,
		//cspell:ignore simon navil
		simonNavil,
		naada,
	];
};
type orb_book_inv={
	id: "Orb Book",
	links: [kukiOrbs];
	item: Items.orb_book;
};
type h={
	id: "h";
	news: "This is the H page.";
};
type guide={
	id: "guide";
	links: [open_dir];
};
type all_pages={
	generic: {
		links: [
			inventory,
			o,
			u_page,
			h,
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
		b,
		c,
		d,
		z,
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
export type o={
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
export type uQuarters={
	id: "uQuarters";
	news: "Uninhabited quarters";
	extra: "the Romulan just entered their quarters, there is no one *visible* inside";
	action: H.TakeActionR<{
		required: after_lockdown;
		item: Items.dead_romulan;
	}>;
};
export type v_10forward={
	id: "10forward",
	news: "Enterprise NCC-1701-D: Ten Forward";
	action: H.StoryEvent<{required: {type: "story_pos",pos: "after lockdown";};}>;
};
type engineering={
	links: [cDisruptor];
	//cspell:ignore wqwrqr
	action: H.UseAction<Items.wqwrqr>;
};
type z={
	news: "This is Z space";
	action: H.TakeAction<Items.mosquitoZ>;
};
export type sickbay_has_dead_klingon={
	type: "story";
	id: "sickbay_has_dead_klingon";
	action: "activate_room";
	room: sickbay;
	required: Items.dead_klingon;
	remove_item: true;
};
type armour={
	id: "armour",
	news: "Knight's armour",
	action: H.ActionArr<[
		unscrew_armor,
		H.TakeActionR<{item: Items.piece_of_paper,required: unscrew_armor;}>,
	]>,
};
export type larFm={
	id: "larFm";
	action: H.TakeActionR2<{
		requirements: [
			Items.hand_press,
			Items.fui,
		];
		item: Items.egg;
	}>;
};
export type picQ={
	id: "picQ";
	links: [picTable],
	action: H.TakeActionR<{
		required: Items.keycard;
		item: Items.dead_klingon;
	}>;
};
export type redbridge={
	id: "redbridge";
	news: "Red bridge",
	action: H.UseActionStr<"sword">;
};
export type uForest={
	id: "uForest",
	links: [uLeafage],
	action: H.UseActionStr<"qweqwe">,
};
export type uForestEdge={
	id: "uForestEdge",
	links: [uForest],
	action: H.TakeAction<Items.cowardly_dwarf>;
};
export type someone={
	id: "someone";
	action: H.ActionArr<[
		H.UseAction<Items.something>,
		H.TakeActionR<{item: Items.glass_orb,required: Items.something;}>,
	]>;
};
export type floorTwo={
	id: "floorTwo";
	news: "Floor Two";
	action: H.UseAction2<{
		v: Items.giant;
		caption: "Move furniture";
	}>,
};
export type floorThree={
	id: "floorThree";
	news: "Floor Three",
	action: H.TakeAction<Items.genie>;
};
export type rozenbom={
	id: "rozenbom",
	action: H.TakeAction<Items.small_green_lamp>,
};
export type off={
	id: "off",
	action: H.TakeAction<Items.keycard>;
};
export type something={
	id: "something";
	action: H.TakeAction<Items.something>;
};
export type faq={
	id: "faq";
	links: [
		missions,
		y,
	],
	action: H.TakeAction<Items.gandalf_magic_book>;
};
export type wall={
	id: "wall";
	news: "Great Wall of IWGH";
	action: H.WallPostAct,
};
export type sickbay={
	id: "sickbay";
	action: H.ActionArr<[
		H.StoryEvent<{
			required: Items.dead_klingon;
		}>,
		H.StoryEvent<{
			required: Items.dead_romulan;
		}>,
		H.TakeActionR<{
			required: Items.dead_romulan;
			item: Items.hypospray,
		}>,
	]>;
};
type worms={
	id: "worms";
	news: "Worms";
	action: H.TakeAction<Items.fat_worm>;
};
type ut1={
	news: "Underground tunnel, section 1.";
	action: H.TakeAction<Items.screwdriver>;
	links: [hole];
};
export type grave={
	id: "grave";
	links: [
		ut1,
		ut2,
		ut3,
	],
	action: H.TakeAction<Items.fui>;
};
export type mechanic={
	id: "mechanic";
	news: "Mechanic in the boiler room";
	action: H.UseAction<Items.hypospray>;
};
export type pipe3={
	news: "Pipe passage 3",
	action: H.TakeAction<Items.philosophical_principles>,
};
export type pipe6={
	news: "Pipe passage 6",
	action: H.TakeAction<Items.broken_water_filter>;
};
export type pipe7={
	news: "Pipe passage 7",
	action: H.TakeAction<Items.fake_orb>,
};
export type readyRoom={
	id: "readyRoom";
	action: H.ActionArr<[
		H.StoryEvent<{required: Items.dead_klingon;}>,
	]>,
};
export type uFridgeOpen={
	id: "uFridgeOpen",
	action: H.TakeAction<Items.hand_press>;
};
type lib1={
	news: "Or-Os";
	action: H.TakeAction<Items.orb_book>;
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
export type pcnt={
	id: "pcnt";
	action: H.TakeAction<Items.v_25_of_shares>;
};
// You have visited 125 places:
