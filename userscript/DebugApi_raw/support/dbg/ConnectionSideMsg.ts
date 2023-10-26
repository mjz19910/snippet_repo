import {ConnectionSide} from "./ConnectionSide.ts";

export type ConnectionSideMsg={
	type: "side";
	side: ConnectionSide;
};
