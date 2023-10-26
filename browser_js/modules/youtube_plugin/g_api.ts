import {GApiType} from "./GApiType.ts";

export const g_api: {
	value: ReturnType<GApiType["create"]>|null;
	create: GApiType["create"];
}={
	value: null,
	create: GApiType.prototype.create,
};
