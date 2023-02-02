type RCA_RelevantStateTags={relevantStateTags: B_StateTag[];};
type RC_ConsistencyTokenJar={
	encryptedTokenJarContents: string;
	expirationSeconds: `${D_TokenJarDefaultExpirationSeconds}`;
};
type RC_CsiServiceC={
	key: "c";
	value: RC_ECatcherClientName['value'];
};
type RC_CsiServiceCVer={
	key: "cver";
	value: string;
};
type RC_CsiVarMap={
	yt_li: "1";
	yt_ad: "1";
	yt_fn: D_BrowseEndpointPages;
	[x: T_RidFormat<string>]: `0x${string}`;
};
type RC_CsiVarTypes={cver: Extract<DRC_Csi_SPs[number],{key: "cver";}>['value'];};
type RC_Csi_SPs={
	service: "CSI",
	params: DRC_Csi_SPs;
};
type RC_ECatcherClientName={
	key: "client.name";
	value: "WEB"|"WEB_REMIX";
};
type RC_ECatcherClientVersion={
	key: "client.version";
	value: RC_SomeVer<RC_CsiVarTypes['cver']>;
};
type RC_ECatcherServiceType={["client.fexp"]: `${number}`|`${number},${number}`|`${number},${number},${string}`;};
type RC_ECatcher_SPs={
	service: "ECATCHER";
	params: RC_To_SPs<RC_ECatcherServiceType>|RC_ECatcherClientName[]|RC_ECatcherClientVersion[];
};
type RC_GFeedback_SPs={service: "GFEEDBACK";params: SP_GFeedbackServiceParamsType;};
type RC_GoogleHelp_SPs={service: "GOOGLE_HELP";params: RC_To_SPs<SP_GoogleHelpServiceObj>;};
type RC_MainAppWebResponseContext={
	datasyncId: `${number}||${number}`;
	loggedOut: boolean;
};
type RC_ResponseContext={
	mainAppWebResponseContext?: RC_MainAppWebResponseContext;
	serviceTrackingParams: GRC_ServiceTrackingParams[];
	webResponseContextExtensionData?: RC_WR_ContextExtension;
	consistencyTokenJar?: RC_ConsistencyTokenJar;
	maxAgeSeconds?: number;
	stateTags?: RCA_RelevantStateTags;
};
type RC_ResponseContext_1={
	mainAppWebResponseContext: RC_MainAppWebResponseContext;
	serviceTrackingParams: GRC_ServiceTrackingParams[];
	webResponseContextExtensionData: RC_WR_ContextExtension;
};
type RC_SomeVer<T extends string>=T extends `${infer V0}.${infer V1}.${string}.${string}`? `${V0}.${V1}`:T;
type RC_To_SPs<T>={[U in keyof T]: {key: U; value: T[U];};}[keyof T][];
type RC_WR_ContextExtension={
	hasDecorated?: boolean;
	ytConfigData?: D_YtConfig;
	webPrefetchData?: D_WebPrefetch;
};
type RD_MenuServiceIconType_1=[
	"NOT_INTERESTED"|"ADD_TO_QUEUE_TAIL",
	"FLAG",
	"CONTENT_CUT",
	"PLAYLIST_ADD",
	"WATCH_LATER",
	"SHARE",
	"REMOVE",
][number];
type RD_MenuServiceIconType_Sep="SHARE";
type RD_MenuServiceItem=
|{
	text: G_Text;
	icon: T_Icon<"VISIBILITY_OFF">;
	serviceEndpoint: E_RecordNotificationInteractions;
	trackingParams: string;
	loggingDirectives: D_LoggingDirectives;
}
|{
	text: G_Text;
	serviceEndpoint: E_NotificationOptOut;
	trackingParams: string;
	loggingDirectives: D_LoggingDirectives;
}
|{
	text: G_Text;
	icon: T_Icon<RD_MenuServiceIconType_1>;
	serviceEndpoint: G_SE_MenuService;
	trackingParams: string;
	hasSeparator?: true;
	isDisabled?: false;
};
type REG_AccountSwitcher={
	responseContext: RC_ResponseContext;
	selectText: G_Text;
	actions: A_GetMultiPageMenu[];
};
type REG_DatasyncIds={
	responseContext: RC_ResponseContext;
	datasyncIds: (`${number}||${number}`|`${number}||`)[];
};
type RG_Result=R_Tab|R_ExpandableTab;
type RMD_Badge={metadataBadgeRenderer: DMD_Badge;};
type RMD_RowContainer={metadataRowContainerRenderer: DMD_RowContainer;};
type RRC_ResponseContext={responseContext: RC_ResponseContext;};
type RSG_AddToPlaylist={
	responseContext: RC_ResponseContext;
	contents: R_AddToPlaylist[];
	trackingParams: string;
};
type RSG_GetUnseenCount={
	responseContext: RC_ResponseContext;
	actions?: [UA_NotificationsUnseenCount];
	unseenCount?: number;
};
type RSG_NotificationMenu_Action=TA_OpenPopup<D_NotificationMenu_Popup>;

type RSG_NotificationMenu={
	responseContext: RC_ResponseContext;
	actions: RSG_NotificationMenu_Action[];
	trackingParams: string;
};
type RSG_PdgBuyFlow={
	responseContext: RC_ResponseContext;
	command: TA_OpenPopup<R_PdgBuyFlow>;
	trackingParams: string;
	frameworkUpdates: A_FrameworkUpdates;
};
type RSG_SearchSuggestions={
	responseContext: RC_ResponseContext;
	trackingParams: string;
};
type RSG_SharePanel={
	responseContext: RC_ResponseContext;
	trackingParams: string;
	actions: TA_OpenPopup_Empty[];
};
type RSG_Survey={
	responseContext: RC_ResponseContext;
	trackingParams: string;
};
type RSG_Transcript={
	responseContext: RC_ResponseContext;
	actions: UA_EngagementPanel[];
	trackingParams: string;
};
type RSL_Dislike=RRC_ResponseContext&T_Actions<TA_OpenPopup_Empty>;
type RSL_Like={
	responseContext: RC_ResponseContext;
	actions?: (TA_OpenPopup_Empty|A_AddToGuideSection)[];
};
type RSL_RemoveLike={
	responseContext: RC_ResponseContext;
	actions?: (TA_OpenPopup_Empty|A_RemoveFromGuideSection)[]
};
type RSM_ChannelPreference={
	responseContext: RC_ResponseContext;
	actions: TA_OpenPopup_Empty[];
	channelId: `UC${string}`;
	newNotificationButton: R_SubscriptionNotificationToggleButton;
	trackingParams: string;
	frameworkUpdates: R_EntityBatchUpdate;
};
type RSU_M={
	responseContext: RC_ResponseContext;
	continuation: CD_TimedContinuation;
	actions: UMA_Item[];
};
type RS_Search_1={
	responseContext: RC_ResponseContext;
	contents?: R_TabbedSearchResults;
	continuationContents?: RC_MusicShelf;
	trackingParams: string;
	header?: R_MusicHeader;
};
type RS_SearchApi=RS_Search_1|RS_Search;
type R_AboutThisAd={aboutThisAdRenderer: D_AboutThisAd;};
type R_AccountItem={accountItemRenderer: AD_AccountItem;};
type R_AccountItemSection={accountItemSectionRenderer: D_AccountItemSection;};
type R_AccountLinkButton={accountLinkButtonRenderer: D_AccountLinkButton;};
type R_AccountSectionList={accountSectionListRenderer: Record<"contents",R_AccountItemSection[]>;};
type R_ActionCompanionAd={actionCompanionAdRenderer: D_ActionCompanionAd;};
type R_AdActionInterstitial={adActionInterstitialRenderer: D_AdActionInterstitial;};
type R_AdBreakService={adBreakServiceRenderer: D_AdBreakService;};
type R_AdHoverTextButton={adHoverTextButtonRenderer: D_AdHoverTextButton;};
type R_AdPlacement={adPlacementRenderer: D_AdPlacement;};
type R_AdPlacementConfig={adPlacementConfig: D_AdPlacementConfig;};
type AdPlacementRendererItem=[
	R_AdBreakService,
	R_ClientForecastingAd,
	R_InstreamVideoAd,
	R_LinearAdSequence,
][number];
type R_AdSlot={adSlotRenderer: D_AdSlot;};
type R_AddToPlaylist={addToPlaylistRenderer: D_AddToPlaylist;};
type R_AddToPlaylistCreate={addToPlaylistCreateRenderer: D_AddToPlaylistCreate;};
type R_AdsEngagementPanelContent={adsEngagementPanelContentRenderer: B_Hack;};
type R_AlertWithButton={alertWithButtonRenderer: D_AlertWithButton;};
type D_AudioConfig={
	loudnessDb: number;
	perceptualLoudnessDb: number;
	enablePerFormatLoudness: boolean;
};
type R_AutomixPreviewVideo={automixPreviewVideoRenderer: D_AutomixPreviewVideo;};
type R_AutoplaySwitchButton={autoplaySwitchButtonRenderer: D_AutoplaySwitchButton;};
type R_BrowseEndpointContextMusicConfig={browseEndpointContextMusicConfig: D_BrowseEndpointContextMusicConfig;};
type R_BrowseFeed={};
type R_BrowseFeedActions={browseFeedActionsRenderer: D_BrowseFeedActions;};
type R_BrowserMediaSession={browserMediaSessionRenderer: AD_BrowserMediaSession;};
type R_C4TabbedHeader={c4TabbedHeaderRenderer: D_C4TabbedHeader;};
type R_Card={cardRenderer: D_Card;};
type R_CardCollection={cardCollectionRenderer: D_CardCollection;};
type R_CarouselLockup={carouselLockupRenderer: D_CarouselLockup;};
type R_ChannelHeaderLinks={channelHeaderLinksRenderer: D_ChannelHeaderLinks;};
type R_ChannelOptions={channelOptionsRenderer: D_ChannelOptions;};
type R_ChannelSwitcherHeader={channelSwitcherHeaderRenderer: D_ChannelSwitcherHeader;};
type R_ChannelSwitcherPage={channelSwitcherPageRenderer: D_ChannelSwitcherPage;};
type R_ChannelThumbnailWithLink={channelThumbnailWithLinkRenderer: D_ChannelThumbnailWithLink;};
type R_Channel_MD={channelMetadataRenderer: D_Channel_MD;};
type R_Chapter={chapterRenderer: D_Chapter;};
type R_CheckboxSurveyOption={checkboxSurveyOptionRenderer: D_CheckboxSurveyOption;};
type R_ChildVideo={childVideoRenderer: D_ChildVideo;};
type R_ChipCloud={chipCloudRenderer: D_ChipCloud;};
type R_ChipCloudChip={chipCloudChipRenderer: D_ChipCloudChip;};
type R_CinematicContainer={cinematicContainerRenderer: D_CinematicContainer;};
type R_ClientForecastingAd={clientForecastingAdRenderer: D_ClientForecastingAd;};
type R_ClipAdState={clipAdStateRenderer: D_ClipAdState;};
type R_ClipCreation={clipCreationRenderer: D_ClipCreation;};
type R_ClipCreationScrubber={clipCreationScrubberRenderer: D_ClipCreationScrubber;};
type R_ClipCreationTextInput={clipCreationTextInputRenderer: D_ClipCreationTextInput;};
type R_ClipSection={clipSectionRenderer: D_ClipSection;};
type R_Comment={commentRenderer: D_Comment;};
type R_CommentActionButtons={commentActionButtonsRenderer: D_CommentActionButtons;};
type R_CommentSimplebox={commentSimpleboxRenderer: D_CommentSimplebox;};
type R_CommentThread={commentThreadRenderer: D_CommentThread;};
type R_CommentsEntryPointHeader={commentsEntryPointHeaderRenderer: D_CommentsEntryPointHeader;};
type R_CommentsEntryPointTeaser={commentsEntryPointTeaserRenderer: D_CommentsEntryPointTeaser;};
type R_CommentsHeader={commentsHeaderRenderer: D_CommentsHeader;};
type G_CommentsSection={};
type R_CommonConfig={commonConfig: D_CommonConfig;};
type R_CompactLink={compactLinkRenderer: D_CompactLink;};
type R_CompactPlaylist={compactPlaylistRenderer: D_CompactPlaylist;};
type R_CompactRadio={compactRadioRenderer: D_CompactRadio;};
type R_ConfirmDialog={confirmDialogRenderer: D_ConfirmDialog;};
type R_ConnectedApp={connectedAppRenderer: D_ConnectedApp;};
type R_ContinuationItem={continuationItemRenderer: D_ContinuationItem;};
type R_CopyLink={copyLinkRenderer: D_CopyLink;};
type R_DecoratedPlayerBar={decoratedPlayerBarRenderer: D_DecoratedPlayerBar;};
type R_DefaultButton={buttonRenderer: D_Button;};
type R_DescriptionChapters={
	chapters: R_Chapter[];
	trackingParams: string;
	onChapterRepeat: TA_OpenPopup_Empty;
};
type R_DescriptionChaptersItem=T_MapEntry<"DESCRIPTION_CHAPTERS",R_DescriptionChapters>;
type R_DesktopTopbar={desktopTopbarRenderer: D_DesktopTopbar;};
type R_DesktopWatchAds={playerLegacyDesktopWatchAdsRenderer: D_DesktopWatchAds;};
type R_Dropdown={dropdownRenderer: D_Dropdown_Privacy;};
type R_ElementUpdate={updates: D_ElementUpdate[];};
type D_EmojiPicker={};

type R_EmojiPicker={emojiPickerRenderer: D_EmojiPicker;};
type R_EndScreenPlaylist={endScreenPlaylistRenderer: D_EndScreenPlaylist;};
type R_EndScreenVideo={endScreenVideoRenderer: D_EndScreenVideo;};
type R_Endscreen={endscreenRenderer: D_Endscreen;};
type R_EndscreenElement={endscreenElementRenderer: D_EndscreenElement;};
type R_EngagementPanelSectionList={engagementPanelSectionListRenderer: D_EngagementPanelSectionList;};
type R_EngagementPanelTitleHeader={engagementPanelTitleHeaderRenderer: D_EngagementPanelTitleHeader;};
type R_EntityBatchUpdate={entityBatchUpdate: D_EntityBatchUpdate;};
type R_ExpandableTab={expandableTabRenderer: D_ExpandableTab;};
type R_Factoid={factoidRenderer: D_Factoid;};
type R_FeedFilterChipBar={feedFilterChipBarRenderer: D_FeedFilterChipBar;};
type R_FeedNudge={feedNudgeRenderer: D_FeedNudge;};
type R_FeedTabbedHeader={feedTabbedHeaderRenderer: D_FeedTabbedHeader;};
type R_FusionSearchbox={fusionSearchboxRenderer: D_FusionSearchbox;};
type R_General=R_SettingsSidebar;
type R_GhostGrid={ghostGridRenderer: D_GhostGrid;};
type R_Grid=T_Items<R_GridVideo>;
type R_GridVideo={gridVideoRenderer: D_GridVideo;};
type R_GuideEntryData={guideEntryData: D_GuideEntryData;};
type R_GuideSection={guideSectionRenderer: D_GuideSection;};
type R_GuideSubscriptionsSection={guideSubscriptionsSectionRenderer: D_GuideSubscriptionsSection;};
type R_HeatSeekerItem=T_MapEntry<"HEATSEEKER",D_HeatSeekerItemData>;
type R_Heatmap={heatmapRenderer: D_Heatmap;};
type R_HeroPlaylistThumbnail={heroPlaylistThumbnailRenderer: D_HeroPlaylistThumbnail;};
type R_Hint={hintRenderer: D_Hint;};
type R_HorizontalCardList={horizontalCardListRenderer: D_HorizontalCardList;};
type R_HotkeyDialog={hotkeyDialogRenderer: D_HotkeyDialog;};
type R_HotkeyDialogSection={hotkeyDialogSectionRenderer: D_HotkeyDialogSection;};
type R_HotkeyDialogSectionOption={hotkeyDialogSectionOptionRenderer: D_HotkeyDialogSectionOption;};
type R_Html5PlaybackOnesieConfig={html5PlaybackOnesieConfig: R_CommonConfig;};
type R_InFeedAdLayout={inFeedAdLayoutRenderer: D_InFeedAdLayout;};
type R_InfoCardIcon={infoCardIconRenderer: D_Tracking;};
type R_InfoRow={infoRowRenderer: D_InfoRow;};
type R_InstreamVideoAd={instreamVideoAdRenderer: D_InstreamVideoAd;};
type R_ItemSectionHeader={itemSectionHeaderRenderer: D_ItemSectionHeader;};
type R_LikeButton={likeButtonRenderer: D_LikeButton;};
type R_LinearAdSequence={linearAdSequenceRenderer: D_LinearAdSequence;};
type R_LiveChatAuthorBadge={liveChatAuthorBadgeRenderer: D_LiveChatAuthorBadge;};
type D_LiveChatHeader={};

type R_LiveChatHeader={liveChatHeaderRenderer: D_LiveChatHeader;};
type D_LiveChatItemList={};

type R_LiveChatItemList={liveChatItemListRenderer: D_LiveChatItemList;};
type D_LiveChatMessageInput={};

type R_LiveChatMessageInput={liveChatMessageInputRenderer: D_LiveChatMessageInput;};
type D_LiveChatParticipantsList={};

type R_LiveChatParticipantsList={liveChatParticipantsListRenderer: D_LiveChatParticipantsList;};
type R_LiveChatPlaceholderItem={liveChatPlaceholderItemRenderer: D_LiveChatPlaceholderItem;};
type R_LiveChatTextMessage={liveChatTextMessageRenderer: D_LiveChatTextMessage;};
type D_LiveChatTicker={};

type R_LiveChatTicker={liveChatTickerRenderer: D_LiveChatTicker;};
type R_LiveChatViewerEngagementMessage={liveChatViewerEngagementMessageRenderer: D_LiveChatViewerEngagementMessage;};
type R_MP_MenuNotificationSection={multiPageMenuNotificationSectionRenderer: D_MP_MenuNotificationSection;};
type GR_MP_MenuNotificationSection_Item=R_Notification|R_ContinuationItem;
type R_MacroMarkersList={macroMarkersListRenderer: D_MacroMarkersList;};
type R_MacroMarkersListItem={macroMarkersListItemRenderer: D_MacroMarkersListItem;};
type R_Menu={menuRenderer: D_Menu;};
type R_MenuFlexibleItem={menuFlexibleItemRenderer: DT_MenuFlexibleItem;};
type R_MenuNavigationItem={menuNavigationItemRenderer: D_MenuNavigationItem;};
type R_MenuServiceItem={menuServiceItemRenderer: RD_MenuServiceItem;};
type R_MerchandiseItem={merchandiseItemRenderer: D_MerchandiseItem;};
type R_MerchandiseShelf={merchandiseShelfRenderer: D_MerchandiseShelf;};
type D_Message={};

type R_Message={messageRenderer: D_Message;};
type R_Microformat={microformatDataRenderer: D_Microformat;};
type R_Miniplayer={miniplayerRenderer: D_Miniplayer;};
type R_MovingThumbnail={movingThumbnailRenderer: D_MovingThumbnail;};
type R_MultiMarkersPlayerBar={multiMarkersPlayerBarRenderer: D_MultiMarkersPlayerBar;};
type R_MusicCarouselShelf={musicCarouselShelfRenderer: D_MusicCarouselShelf;};
type R_MusicHeader={musicHeaderRenderer: {};};
type R_MusicQueue={musicQueueRenderer: D_MusicQueue;};
type R_MusicResponsiveListItem={musicResponsiveListItemRenderer: D_MusicResponsiveListItem;};
type R_MusicShelf={musicShelfRenderer: D_MusicShelf;};
type D_MusicShelfDivider={};

type R_MusicShelfDivider={musicShelfDividerRenderer: D_MusicShelfDivider;};
type R_MusicThumbnail={musicThumbnailRenderer: D_MusicThumbnail;};
type G_NextContents=R_TwoColumnWatchNextResults|R_SingleColumnMusicWatchNextResults;
type R_Notification={notificationRenderer: D_Notification;};
type R_NotificationText={notificationTextRenderer: D_NotificationText;};
type R_Page={trackingParams: string; contents: R_TwoColumnBrowseResults[];};
type R_PageIntroduction={pageIntroductionRenderer: D_PageIntroduction;};
type D_PaidDigitalGoods={paidDigitalGoods: B_Hack;};
type G_RendererContentItem=
	|R_RichItem
	|R_RichSection
	|R_CommentsHeader
	|R_CommentThread
	|R_ContinuationItem
	|R_CompactVideo
	|R_CompactPlaylist
	;
type RL_ActionCompanionAdInfo=R_AdHoverTextButton;
