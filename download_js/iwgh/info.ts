import {Do} from "./Helpers.ts";
import {H} from "./Helpers.ts";

type lartorch={
	id: "lartorch",
	news_str: "Lonely torch page",
};
type roof={
	id: "roof",
	news: "Roof.",
};
type floorfive={
	id: "floorfive",
	links: [
		roof,
		elevator,
	],
};
type keepkitchen={
	id: "keepkitchen";
	news: "Kitchen.";
};
type keep={
	id: "keep",
	links: [
		floorone,
		floortwo,
		floorthree,
		floorfive,
		keepkitchen,
	],
};
type screwdriver={
	type: "item";
	id: "screwdriver",
};
type armour={
	id: "armour",
	news: "Knight's armour",
	actions: [
		{
			id: "unscrew_armor",
			fn: "use",
			usingitem: screwdriver,
		},
		{
			required: "unscrew_armor",
			fn: "take",
			item: piece_of_paper,
		}
	],
};
type larstairs={
	id: "larstairs",
	links: [
		keep,
		armour,
	],
};
type egg={
	type: "item";
	id: "egg";
};
type larfm={
	id: "larfm";
	action: H.TakeActionR2<{
		requirements: [
			hand_press,
			fui,
		];
		item: egg;
	}>;
};
type larlake={
	id: "larlake",
	links: [larfm],
};
type lardark={
	id: "lardark",
	links: [
		larlake,
		deathdome,
	];
};
type deathdome={
	id: "deathdome";
	links: [grave];
};
type larboat={
	id: "larboat",
	links: [lardark],
};
type larriver={
	id: "larriver",
	links: [larboat];
};
type larder={
	id: "larder",
	links: [
		lartorch,
		larstairs,
		larriver,
	],
};
type burrow={
	id: "burrow",
	links: [larder],
};
type picref={
	id: "picref";
	links: [
		{
			bold: true;
			href: burrow;
		}
	];
};
type piccup={
	id: "piccup",
	links: [picref],
};
type pictable={
	id: "pictable",
	links: [piccup],
};
type dead_klingon={
	type: "item";
	id: "dead Klingon";
};
type picq={
	id: "picq";
	links: [pictable],
	action: H.TakeActionR<{
		required: keycard;
		item: dead_klingon;
	}>;
	quest_chain_part: readyroom["story"]["dead_klingon"];
	story: {
		burrow: {
			quest_chain: [
				picq,pictable,piccup,picref,burrow,larder,larstairs,keep,floorfive,elevator,elev_boiler,boiler,
				mechanic,
				Do.UseAction<mechanic,hypospray>,
				piping,
				pipe1,
			];
		};
	};
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
		picq,
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
type redbridge={
	uses: "sword",
};
type underworld={
	links: [redbridge],
};
type hsmell={
	news: "Weird smell in the hall gallery.",
};
type hgallery={
	links: [hsmell],
};
type hstairs={
	links: [hgallery],
};
type sdoor={
	news: "Small door...",
	state: "closed",
};
type lhall={
	links: [
		hstairs,
		sdoor,
	],
};
type lgallery={
	links: [lhall],
};
type narrowhole={
	links: [lgallery],
	// 404 pages
	missing: ["uqwe"],
};
type uleafage={
	id: "uleafage",
	links: [narrowhole],
};
type uforest={
	id: "uforest",
	links: [uleafage],
	action: {
		fn: "use",
		usingitem: "qweqwe",
	},
};
type uforestedge={
	id: "uforestedge",
	links: [uforest],
};
type boiler={
	news: "Boiler room",
	links: [
		piping,
		mechanic,
	],
};
type someone={
	id: "someone";
	uses: something_item;
};
type eternalmaze={
	id: "eternalmaze";
	links: [someone],
};
type floorone={
	id: "floorone";
	links: [eternalmaze],
};
type giant={
	type: "item";
	id: "giant";
};
type floortwo={
	id: "floortwo";
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
type floorthree={
	id: "floorthree";
	news: "Floor Three",
	action: H.TakeAction<genie>;
};
type elev_floorfive={
	floor_number: 9;
	destination: floorfive;
};
type elev_underworld={
	floor_number: 3;
	destination: underworld;
};
type elev_uforest={
	floor_number: 4;
	destination: uforestedge;
};
type elev_boiler={
	floor_number: 5;
	destination: boiler;
};
type elev_floorone={
	floor_number: 6;
	destination: floorone;
};
type elev_floortwo={
	floor_number: 7;
	destination: floortwo;
};
type elev_floorthree={
	floor_number: 8;
	destination: floorthree;
};
type elevator={
	destinations: {
		"elev_underworld": elev_underworld,
		"elev_uforest": elev_uforest,
		"elev_boiler": elev_boiler,
		"elev_floorone": elev_floorone,
		"elev_floortwo": elev_floortwo,
		"elev_floorthree": elev_floorthree,
		"elev_floorfive": elev_floorfive,
	},
};
const elevator: elevator={} as elevator;
type rozenbom={
	id: "rozenbom",
	action: H.TakeActionStr<"small green lamp">,
};
type dwarfname={
	id: "dwarfname",
	links: [rozenbom],
};
type piece_of_paper={
	id: "piece of paper",
	links: [dwarfname],
};
type keycard={
	type: "item",
	id: "keycard",
};
type off={
	id: "off",
	action: H.TakeAction<keycard>;
	quest_chain: [
		Do.TakeAction<keycard>,
		Do.UseMenu<members>,
		members,green,red,picq,
	];
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
type u_page={
	id: "zbrogjdnfhvyensocuiehw",
	rid: "u",
	news_str: "This is the U page.",
	hints: [
		"A maze is less confusing if you try to conquer it with a friend who lives in a lamp",
		"An absense of a fourth floor does not mean there is no fifth",
		// cosmology -> pattern -> pcnt
		"An hourglass is more than it seems",
		// dwarfname
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
		"Keyword: <b>flatjoke</b>",
		"Keyword: <b>jrrtgandalf</b>",
		"Selldome page: <b>selldome</b>",
		"Stay alert!",
		"The Poirot page: <b>herculepoirot</b>",
		"The best way to get rid of an angry mosquito is to hide from it!",
		"The underground river from the castle larder leads to the Silent Lake... that is, if you do not drown!",
		"Whenever in doubt - consult a wise book",
	],
	hint_refs: [
		v_74stars,
		bridge,
		"caramel",
		cosmology,
		flatjoke,
		"herculepoirot",
		jrrtgandalf,
		library,
		"selldome",
	],
};
type zbrogjdnfhvyensocuiehw=u_page;
type something_item={
	type: "item";
	id: "something";
};
type something={
	id: "something",
	action: H.TakeAction<something_item>;
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
	action: {
		dst: "wall_post.php",
		message: string,
	},
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
type enterprise={
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
		uquarters,
	];
};
type deck8={
	id: "deck8",
};
type dead_romulan={
	type: "item";
	id: "dead Romulan";
};

type uquarters={
	news: "Uninhabited quarters";
	extra: "the Romulan just entered their quarters, there is no one *visible* inside";
	action: H.TakeActionR<{
		required: after_lockdown;
		item: dead_romulan;
	}>;
	quest_chain_part: readyroom["story"]["dead_klingon"];
};
type v_10forward={
	id: "10forward",
	news: "Enterprise NCC-1701-D: Ten Forward",
};
type engineering={
	links: [cdisruptor];
	action: H.UseActionStr<"wqwrqr">;
};
type cdisruptor={
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
	links: [ufridge];
};
type ut2={
	news: "Underground tunnel, section 2.";
	links: [
		ut231,
		ut232,
	];
};
type ut3={
	links: [deadend];
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
type inventory={
	items: {
		"Glass Orb": null,
		"hand press": hand_press,
		"fat worm": fat_worm,
		"Gandalf Magic Book": gandalf_magic_book,
		"25% of shares": v_25_of_shares,
		"screwdriver": screwdriver,
		"fui": fui,
		"piece of paper": piece_of_paper,
		"small green lamp": null,
		"egg": null,
		"mosquito disinterest": null,
		"hypospray": hypospray,
		"broken water filter": null,
		"Fake Orb": fake_orb,
		"Orb Book": orb_book,
		"dead Klingon": dead_klingon,
		"dead Romulan": dead_romulan,
		"mosquitoz": mosquitoz,
	};
};
type after_lockdown={
	type: "story_pos";
	pos: "after lockdown";
};
type readyroom={
	story: {
		dead_klingon: {
			uses: dead_klingon;
			quest_chain: [
				Do.TakeAction<dead_klingon>,
				readyroom,
				sickbay,
				readyroom,
				v_10forward,
				after_lockdown,
				uquarters,
				Do.TakeAction<dead_romulan>,
				olounge,
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
type olounge={
	id: "olounge",
	news: "Enterprise NCC-1701-D: Observation lounge",
};
type bridge={
	id: "bridge",
	links: [
		readyroom,
		olounge,
	];
};
type ufridge={
	id: "ufridge",
	links: [
		deadend,
		usuddend,
	];
};
type deadend={
	id: "deadend",
	news: "Dead end.";
};
type usuddend={
	id: "usuddend",
	links: [ufridgeopen];
};
type hand_press={
	type: "item";
	id: "hand press";
};
type fui={
	type: "item";
	id: "fui";
};
type ufridgeopen={
	id: "ufridgeopen",
	action: H.TakeAction<hand_press>;
	quest_chain: [
		Do.TakeAction<hand_press>,
		burrow,
		larder,larriver,larboat,lardark,
		lardark,
		deathdome,
		grave,
		Do.TakeAction<fui>,
		o,
		zbrogjdnfhvyensocuiehw,cosmology,
		Do.FollowChain<pattern>["follow_chain"]["quest_chain"],
		Do.AssertPageIs<pcnt>,Do.FollowChain<pcnt>["follow_chain"]["quest_chain"],
		Do.AssertPageIs<off>,Do.FollowChain<off>["follow_chain"]["quest_chain"],
		Do.AssertPageIs<picq>,pictable,piccup,picref,
		burrow,larder,larriver,larboat,lardark,
		deathdome,
		grave,
		Do.TakeAction<fui>,
		lardark,larlake,larfm,
		Do.UseInventory2<[hand_press,fui]>,
	];
};
type v_74stars={
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
		flatdisc,
		{type: "chain",arr: [flatdisc,glimpse,a,dot];},
		// chain from pattern
		pattern,
		difference,
		deadend,
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
	quest_chain: [
		Do.TakeAction<v_25_of_shares>,
		Do.UseInventory<v_25_of_shares>,
		on,off,
	];
};
type flatdisc={
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
type flatjoke={
	news: "Flat joke.";
};
type kukiorbs={
	links: [
		"clearlake",
		"mudicat",
		"simonnavil",
		"naada"
	];
};
type orb_book={
	type: "item";
	id: "Orb Book",
	links: [
		kukiorbs
	];
};
type main={
	links: [wall],
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
			"dictionary",
			"communication",
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
type communications={
	id: "communications";
};
type dictionary={
	id: "dictionary";
};
type open_dir={
	links: [
		main,
		generator,
		communications,
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
const work_queue: {
	floor_number: 4;
	destination: uforestedge;
}[]=[];
work_queue.push(elevator.destinations.elev_uforest);

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
type mosquitoz={
	type: "item";
	id: "mosquitoz";
};
type z={
	news: "This is Z space";
	action: {
		fn: "take",
		item: mosquitoz,
	};
};

