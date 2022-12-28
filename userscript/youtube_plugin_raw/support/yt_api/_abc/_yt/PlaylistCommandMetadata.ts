export type PlaylistCommandMetadata<T extends string>={
	webCommandMetadata: {
		apiUrl: "/youtubei/v1/browse";
		rootVe: 5754;
		url: `/playlist?list=${T}`;
		webPageType: "WEB_PAGE_TYPE_PLAYLIST";
	};
};
