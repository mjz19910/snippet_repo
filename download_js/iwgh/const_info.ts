import {WorkQueueItem,elev_boiler,elev_floorFive,elev_floorOne,elev_floorThree,elev_floorTwo,elev_uForest,elev_underworld,elevator,redbridge,underworld} from "./info.ts";

//#region underworld
const redbridge: redbridge={id: "redbridge",news: "Red bridge",action: {fn: "use",usingItem: "sword"}};
const underworld: underworld={id: "underworld",links: [redbridge]};
//#endregion
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

const work_queue: WorkQueueItem[]=[];
work_queue.push(elevator.destinations.elev_uForest);
