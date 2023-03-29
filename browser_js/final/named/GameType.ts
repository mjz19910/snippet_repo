import {GameUpgradesObj} from "./GameUpgradesObj";

export type GameType={
	upgrades: GameUpgradesObj;
	mergeObjects: string|any[];
	spawnTime: GameSpawnTimeObj;
	matter: any;
};
