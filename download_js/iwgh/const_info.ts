import {RT} from "./Helpers.ts";
import {WorkQueueItem,boiler,cowardly_dwarf,elev_boiler,elev_floorFive,elev_floorOne,elev_floorThree,elev_floorTwo,elev_uForest,elev_underworld,elevator,floorFive,floorOne,floorThree,floorTwo,redbridge,uForest,uForestEdge,underworld} from "./info.ts";
import {something} from "./items.ts";
//#region underworld
const redbridge: redbridge={id: "redbridge",news: "Red bridge",action: {fn: "use",usingItem: "sword"}};
const underworld: underworld={id: "underworld",links: [redbridge]};
//#endregion
//#region uForest
const uForest: uForest={
	id: "uForest",
	action: {fn: "use",usingItem: "QweQwe"},
	links: [{
		id: "uLeafage",links: [{
			id: "narrowHole",missing: ["uQwe"],links: [{
				id: "lGallery",links: [{
					id: "lHall",
					missing: ["corner"],
					links: [{
						id: "hStairs",links: [{
							id: "hGallery",links: [{
								id: "hSmell",
								news: "Weird smell in the hall gallery.",
							}]
						}]
					},{id: "sDoor",news: "Small door...",state: "closed"}]
				}]
			}]
		}]
	}]
};
const cowardly_dwarf: cowardly_dwarf={
	type: "item",
	id: "cowardly dwarf"
};
const uForestEdge: uForestEdge={
	id: "uForestEdge",
	action: RT.take(cowardly_dwarf),
	links: [uForest],
};
//#endregion
const boiler: boiler={
	id: "boiler",
	news: "Boiler room",
	links: [{
		news: "Piping",links: [
			{news: "Pipe passage 1"},
			{news: "Pipe passage 3",action: {fn: "take",item: {type: "item",id: "philosophical principles"}}},
			{news: "Pipe passage 5"},
			{news: "Pipe passage 6",action: {fn: "take",item: {type: "item",id: "broken water filter"}}},
			{news: "Pipe passage 7",action: {fn: "take",item: {type: "item",id: "Fake Orb"}}},
			{news: "Pipe passage 9",required: {type: "not",v: {id: "philosophical principles",type: "item"}}},
			{news: "Pipe passage 11"},
			{
				news: "Pipe passage 13",required: {id: "philosophical principles",type: "item"},links: [
					{news: "Underground tunnel, section 17."},
					{news: "Underground tunnel, section 18.",events: {room_enter: {_tag: "event",type: "add_companion",value: {id: "annoying fly",type: "companion"}}}},
					{news: "Underground tunnel, section 19."},
				]
			}
		]
	},{
		id: "mechanic",news: "Mechanic in the boiler room",action: {
			fn: "use",
			usingItem: {type: "item",id: "hypospray"}
		}
	}]
};
const Items: {something: something;}={
	something: {
		type: "item",
		id: "something"
	}
};
const floorOne: floorOne={
	id: "floorOne",links: [{
		id: "eternalMaze",links: [{
			id: "someone",action: {type: "multi",arr: [{fn: "use",usingItem: Items.something},{fn: "take",item: {id: "Glass Orb",type: "item"},required: Items.something}]}
		}]
	}]
};
const floorTwo: floorTwo={id: "floorTwo",news: "Floor Two",action: {caption: "Move furniture",fn: "use",usingItem: {id: "giant",type: "item"}}};
const floorThree: floorThree={id: "floorThree",news: "Floor Three",action: {fn: "take",item: {id: "genie",type: "item"}}};
const floorFive: floorFive={id: "floorFive",links: [{id: "roof",news: "Roof."},null]};
//#region elevator floors
const elev_underworld: elev_underworld={floor_number: 3,destination: underworld};
const elev_uForest: elev_uForest={floor_number: 4,destination: uForestEdge};
const elev_boiler: elev_boiler={floor_number: 5,destination: boiler};
const elev_floorOne: elev_floorOne={floor_number: 6,destination: floorOne};
const elev_floorTwo: elev_floorTwo={floor_number: 7,destination: floorTwo};
const elev_floorThree: elev_floorThree={floor_number: 8,destination: floorThree};
const elev_floorFive: elev_floorFive={floor_number: 9,destination: floorFive};
//#endregion

const elevator: elevator={
	destinations: {
		elev_underworld: elev_underworld,
		elev_uForest: elev_uForest,
		elev_boiler: elev_boiler,
		elev_floorOne: elev_floorOne,
		elev_floorTwo: elev_floorTwo,
		elev_floorThree: elev_floorThree,
		elev_floorFive: elev_floorFive,
	}
};
// this is a cycle
floorFive.links[1]=elevator;

const work_queue: WorkQueueItem[]=[];
work_queue.push(elevator.destinations.elev_uForest);
