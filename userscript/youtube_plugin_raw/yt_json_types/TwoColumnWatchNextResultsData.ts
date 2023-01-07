type TwoColumnWatchNextResultsData={
	results: ResultsTemplate<ContentTemplate<VideoPrimaryInfoRenderer|VideoSecondaryInfoRenderer|ItemSectionRenderer<never,never>>>;
	secondaryResults: SecondaryResultsTemplate<ContentTemplate<RelatedChipCloudRenderer|ItemSectionRenderer<never,never>>>;
	playlist?: PlaylistTemplate<PlaylistContent>;
	autoplay?: AutoplayTemplate<AutoplayContent>;
	conversationBar?: ConversationBarTypes;
};
type ConversationBarTypes=LiveChatRenderer;

type LiveChatData={
	continuations: {}[];
	header: {};
	trackingParams: string;
	clientMessages: {};
	isReplay: {};
	initialDisplayState: string;
	showHideButton: {};
};

type LiveChatRenderer={liveChatRenderer:LiveChatData}