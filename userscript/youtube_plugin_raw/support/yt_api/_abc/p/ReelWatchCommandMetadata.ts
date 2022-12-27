type ReelWatchWebCommandMetadata<T>={
	url: T extends string? `/shorts/${T}`:never;
	webPageType: "WEB_PAGE_TYPE_SHORTS";
	rootVe: 37414;
};

export type ReelWatchCommandMetadata<T>={
	webCommandMetadata: ReelWatchWebCommandMetadata<T>;
};
