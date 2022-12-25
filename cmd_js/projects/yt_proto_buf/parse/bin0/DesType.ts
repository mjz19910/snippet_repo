import {ItemType} from "./ItemType.js";

type OccupiedValue={
	key: number;
	value: number;
};

export type DesType={
	items: (ItemType)[];
	keys: number[];
	keysAlt: number[];
	valueMap: OccupiedValue[];
};
