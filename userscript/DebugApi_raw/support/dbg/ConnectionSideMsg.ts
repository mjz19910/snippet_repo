import {ConnectionSide} from "./ConnectionSide.js";

export type ConnectionSideMsg={
	type: "side";
	side: ConnectionSide;
};
