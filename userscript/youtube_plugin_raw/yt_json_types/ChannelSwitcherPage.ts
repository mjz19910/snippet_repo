type AccountItemRendererData={
	accountName: TextT;
	accountPhoto: ThumbnailsListData;
	isSelected: boolean;
	isDisabled: boolean;
	hasChannel: boolean;
	serviceEndpoint: YtEndpoint;
	accountByline: TextT;
	channelHandle: TextT;
};

type AccountItemRenderer={
	accountItemRenderer: AccountItemRendererData
};
type ChannelSwitcherPage={
	header: ChannelSwitcherHeaderRenderer;
	contents: (ButtonRenderer|AccountItemRenderer)[];
	targetId: string;
};
