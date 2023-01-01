type RichShelfRendererData={
	icon: Icon<"YOUTUBE_SHORTS_BRAND_24">;
	title: YtTextType;
};

type RichShelfRenderer={
	richShelfRenderer: RichShelfRendererData;
};

type RichSectionRendererData={
	content: RichShelfRenderer;
};

type RichSectionRenderer={
	richSectionRenderer: RichSectionRendererData;
};
