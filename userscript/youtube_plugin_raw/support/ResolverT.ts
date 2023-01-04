import {ServiceResolver} from "../youtube_plugin.user.js";

export type ResolverT<T,U>={
	value: ServiceResolver<T,U>|null;
};
