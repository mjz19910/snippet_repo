//#region Renderer
type R_AboutThisAd={aboutThisAdRenderer: D_AboutThisAd;};
type R_AccountItem={accountItemRenderer: D_AccountItem;};
type R_AccountItemSection={accountItemSectionRenderer: D_AccountItemSection;};
type R_AccountLinkButton={accountLinkButtonRenderer: D_AccountLinkButton;};
type R_AccountSectionList={accountSectionListRenderer: Record<"contents",R_AccountItemSection[]>;};
type R_ActionCompanionAd={actionCompanionAdRenderer: D_ActionCompanionAd;};
type R_AdActionInterstitial={adActionInterstitialRenderer: D_AdActionInterstitial;};
type R_AdBreakService={adBreakServiceRenderer: D_AdBreakService;};
type R_AddToPlaylist={addToPlaylistRenderer: D_AddToPlaylist;};
type R_AddToPlaylistCreate={addToPlaylistCreateRenderer: D_AddToPlaylistCreate;};
type R_AdHoverTextButton={adHoverTextButtonRenderer: D_AdHoverTextButton;};
type R_AdPlacement={adPlacementRenderer: D_AdPlacement;};
type R_AdPlacementConfig={adPlacementConfig: D_AdPlacementConfig;};
type R_AdsEngagementPanelContent={adsEngagementPanelContentRenderer: B_Hack;};
type R_AdSlot={adSlotRenderer: D_AdSlot;};
type R_AlertWithButton={alertWithButtonRenderer: D_AlertWithButton;};
type R_AutomixPreviewVideo={automixPreviewVideoRenderer: D_AutomixPreviewVideo;};
type R_AutoplaySwitchButton={autoplaySwitchButtonRenderer: D_AutoplaySwitchButton;};
type R_BrowseEndpointContextMusicConfig={browseEndpointContextMusicConfig: D_BrowseEndpointContextMusicConfig;};
type R_BrowseFeedActions={browseFeedActionsRenderer: D_BrowseFeedActions;};
type R_BrowserMediaSessionRenderer={browserMediaSessionRenderer: D_BrowserMediaSessionRenderer;};
type R_C4TabbedHeader={c4TabbedHeaderRenderer: D_C4TabbedHeader;};
type R_Card={cardRenderer: D_Card;};
type R_CardCollection={cardCollectionRenderer: D_CardCollection;};
type R_CarouselLockup={carouselLockupRenderer: D_CarouselLockup;};
type R_Channel_MD={channelMetadataRenderer: D_Channel_MD;};
type R_ChannelHeaderLinks={channelHeaderLinksRenderer: D_ChannelHeaderLinks;};
type R_ChannelOptions={channelOptionsRenderer: D_ChannelOptions;};
type R_ChannelSwitcherHeader={channelSwitcherHeaderRenderer: D_ChannelSwitcherHeader;};
type R_ChannelSwitcherPage={channelSwitcherPageRenderer: D_ChannelSwitcherPage;};
type R_ChannelThumbnailWithLink={channelThumbnailWithLinkRenderer: D_ChannelThumbnailWithLink;};
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
type R_CommentsEntryPointHeader={commentsEntryPointHeaderRenderer: D_CommentsEntryPointHeader;};
type R_CommentsEntryPointTeaser={commentsEntryPointTeaserRenderer: D_CommentsEntryPointTeaser;};
type R_CommentsHeader={commentsHeaderRenderer: D_CommentsHeader;};
type R_CommentSimplebox={commentSimpleboxRenderer: D_CommentSimplebox;};
type R_CommentThread={commentThreadRenderer: D_CommentThread;};
type R_CommonConfig={commonConfig: D_CommonConfig;};
type R_CompactLink={compactLinkRenderer: D_CompactLink;};
type R_CompactPlaylist={compactPlaylistRenderer: D_CompactPlaylist;};
type R_CompactRadio={compactRadioRenderer: D_CompactRadio;};
type R_CompactVideo={compactVideoRenderer: D_CompactVideo;};
type R_ConfirmDialog={confirmDialogRenderer: D_ConfirmDialog;};
type R_ConnectedApp={connectedAppRenderer: D_ConnectedApp;};
type R_ContinuationItem={continuationItemRenderer: D_ContinuationItem;};
type R_CopyLink={copyLinkRenderer: D_CopyLink;};
type R_DecoratedPlayerBar={decoratedPlayerBarRenderer: D_DecoratedPlayerBar;};
type R_DefaultButton={buttonRenderer: D_Button;};
type R_DescriptionChaptersItem=T_MapEntry<"DESCRIPTION_CHAPTERS",D_DescriptionChapters>;
type R_DesktopTopbar={desktopTopbarRenderer: D_DesktopTopbar;};
type R_DesktopWatchAds={playerLegacyDesktopWatchAdsRenderer: D_DesktopWatchAds;};
type R_DisplayAd={displayAdRenderer: D_DisplayAd;};
type R_Dropdown={dropdownRenderer: D_Dropdown_Privacy;};
type R_ElementUpdate={updates: D_ElementUpdate[];};
type R_EmojiPicker={emojiPickerRenderer: D_EmojiPicker;};
type R_Endscreen={endscreenRenderer: D_Endscreen;};
type R_EndscreenElement={endscreenElementRenderer: D_EndscreenElement;};
type R_EndScreenPlaylist={endScreenPlaylistRenderer: D_EndScreenPlaylist;};
type R_EndScreenVideo={endScreenVideoRenderer: D_EndScreenVideo;};
type R_EngagementPanelSectionList={engagementPanelSectionListRenderer: D_EngagementPanelSectionList;};
type R_EngagementPanelTitleHeader={engagementPanelTitleHeaderRenderer: D_EngagementPanelTitleHeader;};
type R_ExpandableSurveyResponse={expandableSurveyResponseRenderer: D_ExpandableSurveyResponse;};
type R_ExpandableTab={expandableTabRenderer: D_ExpandableTab;};
type R_ExpandableVideoDescriptionBody={expandableVideoDescriptionBodyRenderer: D_ExpandableVideoDescriptionBody;};
type R_Factoid={factoidRenderer: D_Factoid;};
type R_FancyDismissibleDialog={fancyDismissibleDialogRenderer: D_FancyDismissibleDialog;};
type R_FeedFilterChipBar={feedFilterChipBarRenderer: D_FeedFilterChipBar;};
type R_FeedNudge={feedNudgeRenderer: D_FeedNudge;};
type R_FeedTabbedHeader={feedTabbedHeaderRenderer: D_FeedTabbedHeader;};
type D_FulfilledLayout_Item=R_FulfilledLayoutContent|R_FulfillmentLayoutContent;
type R_FulfilledLayout={fulfilledLayout: D_FulfilledLayout_Item;};
type R_FulfilledLayoutContent=R_PageTopAdLayout;
type R_FulfillmentLayoutContent=R_InFeedAdLayout;
type R_FusionSearchbox={fusionSearchboxRenderer: D_FusionSearchbox;};
type R_General=R_SettingsSidebar;
type R_GhostGrid={ghostGridRenderer: D_GhostGrid;};
type R_GuideCollapsibleEntry={guideCollapsibleEntryRenderer: D_GuideCollapsibleEntry;};
type R_GuideCollapsibleSectionEntry={guideCollapsibleSectionEntryRenderer: D_GuideCollapsibleSectionEntry;};
type R_GuideDownloadsEntry={guideDownloadsEntryRenderer: D_GuideDownloadsEntry;};
type R_GuideEntry={guideEntryRenderer: D_GuideEntry;};
type R_GuideEntryData={guideEntryData: D_GuideEntryData;};
type R_GuideSection={guideSectionRenderer: D_GuideSection;};
type R_GuideSubscriptionsSection={guideSubscriptionsSectionRenderer: D_GuideSubscriptionsSection;};
type R_Heatmap={heatmapRenderer: D_Heatmap;};
type R_HeatSeekerItem=T_MapEntry<"HEATSEEKER",D_HeatSeekerItemData>;
type R_HeroPlaylistThumbnail={heroPlaylistThumbnailRenderer: D_HeroPlaylistThumbnail;};
type R_Hint={hintRenderer: D_Hint;};
type R_HorizontalCardList={horizontalCardListRenderer: D_HorizontalCardList;};
type R_HotkeyDialog={hotkeyDialogRenderer: D_HotkeyDialog;};
type R_HotkeyDialogSection={hotkeyDialogSectionRenderer: D_HotkeyDialogSection;};
type R_HotkeyDialogSectionOption={hotkeyDialogSectionOptionRenderer: D_HotkeyDialogSectionOption;};
type R_Html5PlaybackOnesieConfig={html5PlaybackOnesieConfig: R_CommonConfig;};
type R_InFeedAdLayout={inFeedAdLayoutRenderer: D_InFeedAdLayout;};
type R_InfoCardIcon={infoCardIconRenderer: D_InfoCardIcon;};
type D_InfoCardIcon=D_TrackingParams;
type R_InfoRow={infoRowRenderer: D_InfoRow;};
type R_InlineSurvey={inlineSurveyRenderer: D_InlineSurvey;};
type R_InstreamVideoAd={instreamVideoAdRenderer: D_InstreamVideoAd;};
type R_ItemSectionHeader={itemSectionHeaderRenderer: D_ItemSectionHeader;};
type R_LikeButton={likeButtonRenderer: D_LikeButton;};
type R_LinearAdSequence={linearAdSequenceRenderer: D_LinearAdSequence;};
type R_LiveChatAuthorBadge={liveChatAuthorBadgeRenderer: D_LiveChatAuthorBadge;};
type R_LiveChatHeader={liveChatHeaderRenderer: D_LiveChatHeader;};
type R_LiveChatItemList={liveChatItemListRenderer: D_LiveChatItemList;};
type R_LiveChatMessageInput={liveChatMessageInputRenderer: D_LiveChatMessageInput;};
type R_LiveChatParticipantsList={liveChatParticipantsListRenderer: D_LiveChatParticipantsList;};
type R_LiveChatPlaceholderItem={liveChatPlaceholderItemRenderer: D_LiveChatPlaceholderItem;};
type R_LiveChatTextMessage={liveChatTextMessageRenderer: D_LiveChatTextMessage;};
type R_LiveChatTicker={liveChatTickerRenderer: D_LiveChatTicker;};
type R_LiveChatViewerEngagementMessage={liveChatViewerEngagementMessageRenderer: D_LiveChatViewerEngagementMessage;};
type R_MacroMarkersList={macroMarkersListRenderer: D_MacroMarkersList;};
type R_MacroMarkersListItem={macroMarkersListItemRenderer: D_MacroMarkersListItem;};
type R_Menu={menuRenderer: D_Menu;};
type R_MenuFlexibleItem={menuFlexibleItemRenderer: DT_MenuFlexibleItem;};
type R_MenuNavigationItem={menuNavigationItemRenderer: D_MenuNavigationItem;};
type R_MenuServiceItem={menuServiceItemRenderer: RD_MenuServiceItem;};
type R_MerchandiseItem={merchandiseItemRenderer: D_MerchandiseItem;};
type R_MerchandiseShelf={merchandiseShelfRenderer: D_MerchandiseShelf;};
type R_Message={messageRenderer: D_Message;};
type R_MetadataRow={metadataRowRenderer: D_MetadataRow;};
type R_MicroformatData={microformatDataRenderer: D_Microformat;};
type R_Miniplayer={miniplayerRenderer: D_Miniplayer;};
type R_MovingThumbnail={movingThumbnailRenderer: D_MovingThumbnail;};
type R_MP_MenuNotificationSection={multiPageMenuNotificationSectionRenderer: D_MP_MenuNotificationSection;};
type R_MultiMarkersPlayerBar={multiMarkersPlayerBarRenderer: D_MultiMarkersPlayerBar;};
type R_MusicCarouselShelf={musicCarouselShelfRenderer: D_MusicCarouselShelf;};
type R_MusicHeader={musicHeaderRenderer: {};};
type R_MusicQueue={musicQueueRenderer: D_MusicQueue;};
type R_MusicResponsiveListItem={musicResponsiveListItemRenderer: D_MusicResponsiveListItem;};
type R_MusicShelf={musicShelfRenderer: D_MusicShelf;};
type R_MusicShelfDivider={musicShelfDividerRenderer: D_MusicShelfDivider;};
type R_MusicThumbnail={musicThumbnailRenderer: D_MusicThumbnail;};
type R_Notification={notificationRenderer: D_Notification;};
type RA_NotificationMulti={notificationMultiActionRenderer: {};};
type R_NotificationText={notificationTextRenderer: D_NotificationText;};
type R_NotificationTopbarButton={notificationTopbarButtonRenderer: D_NotificationTopbarButton;};
type R_Page={trackingParams: string; contents: R_TwoColumnBrowseResults[];};
type R_PageIntroduction={pageIntroductionRenderer: D_PageIntroduction;};
type R_PageTopAdLayout={pageTopAdLayoutRenderer: D_PageTopAdLayout;};
type R_PdgBuyFlow={pdgBuyFlowRenderer: D_PdgBuyFlow;};
type R_PdgBuyFlowHeader={pdgBuyFlowHeaderRenderer: D_PdgBuyFlowHeader;};
type R_PdgColorSlider={pdgColorSliderRenderer: D_PdgColorSlider;};
type R_PdgCommentChip={pdgCommentChipRenderer: D_PdgCommentChip;};
type R_PdgCommentOption={pdgCommentOptionRenderer: D_PdgCommentOption;};
type R_PdgCommentPreview={pdgCommentPreviewRenderer: D_PdgCommentPreview;};
type R_PivotButton={pivotButtonRenderer: D_PivotButton;};
type R_PlayerAnnotationsExpanded={playerAnnotationsExpandedRenderer: D_PlayerAnnotationsExpanded;};
type R_PlayerAttestation={playerAttestationRenderer: D_PlayerAttestation;};
type R_PlayerCaptionsTracklist={playerCaptionsTracklistRenderer: D_PlayerCaptionsTracklist;};
type R_PlayerLiveStoryboardSpec={playerLiveStoryboardSpecRenderer: D_PlayerLiveStoryboardSpec;};
type R_PlayerMicroformat={playerMicroformatRenderer: D_PlayerMicroformat;};
type R_PlayerOverlay={playerOverlayRenderer: D_PlayerOverlay;};
type R_PlayerOverlayAutoplay={playerOverlayAutoplayRenderer: D_PlayerOverlayAutoplay;};
type R_PlayerOverlayVideoDetails={playerOverlayVideoDetailsRenderer: D_PlayerOverlayVideoDetails;};
type R_PlayerStoryboardSpec={playerStoryboardSpecRenderer: D_PlayerStoryboardSpec;};
type R_Playlist_MD={playlistMetadataRenderer: D_Playlist_MD;};
type R_PlaylistAddToOption={playlistAddToOptionRenderer: D_PlaylistAddToOption;};
type R_PlaylistByline={playlistBylineRenderer: D_PlaylistByline;};
type R_PlaylistContent={trackingParams: string; contents: R_TwoColumnBrowseResults[];};
type R_PlaylistHeader={playlistHeaderRenderer: D_PlaylistHeader;};
type R_PlaylistPanel={playlistPanelRenderer: D_PlaylistPanel;};
type R_PlaylistPanelVideo={playlistPanelVideoRenderer: D_PlaylistPanelVideo;};
type R_PlaylistSidebar={playlistSidebarRenderer: D_PlaylistSidebar;};
type R_PlaylistSidebarPrimaryInfo={playlistSidebarPrimaryInfoRenderer: D_PlaylistSidebarPrimaryInfo;};
type D_PlaylistSidebarPrimaryInfo={
	thumbnailRenderer: R_PlaylistVideoThumbnail;
	title?: G_Text;
	stats: G_Text[];
	menu: R_Menu;
	thumbnailOverlays: G_ThumbnailOverlayItem[];
	navigationEndpoint: E_Watch;
	badges?: RMD_Badge[];
	description?: {};
	showMoreText: G_Text;
	titleForm?: R_InlineForm;
	descriptionForm?: R_InlineForm;
	privacyForm?: R_DropdownFormField;
};
type R_PlaylistSidebarSecondaryInfo={playlistSidebarSecondaryInfoRenderer: D_PlaylistSidebarSecondaryInfo;};
type R_PlaylistVideoList={playlistVideoListRenderer: D_PlaylistVideoList;};
type R_PlaylistVideoThumbnail={playlistVideoThumbnailRenderer: D_PlaylistVideoThumbnail;};
type R_PrefetchHintConfig={prefetchHintConfig: D_PrefetchHintConfig;};
type R_PrivacyDropdownItem={privacyDropdownItemRenderer: D_PrivacyDropdownItem;};
type R_ProductList={productListRenderer: D_ProductList;};
type R_ProductListItem={productListItemRenderer: D_ProductListItem;};
type R_ProfileColumn={profileColumnRenderer: D_ProfileColumn;};
type R_ProfileColumnStats={profileColumnStatsRenderer: D_ProfileColumnStats;};
type R_ProfileColumnStatsEntry={profileColumnStatsEntryRenderer: D_ProfileColumnStatsEntry;};
type R_ProfileColumnUserInfo={profileColumnUserInfoRenderer: D_ProfileColumnUserInfo;};
type R_ProfilePageHeaderButtonRowViewModel={profilePageHeaderButtonRowViewModel: {};};
type R_ProfilePageHeaderInformationViewModel={profilePageHeaderInformationViewModel: D_ProfilePageHeaderInformation;};
type R_ProfilePageHeaderMetadataViewModel={profilePageHeaderMetadataViewModel: {};};
type R_ProfilePageHeaderThumbnailViewModel={profilePageHeaderThumbnailViewModel: {};};
type R_ProfilePageHeaderTitleViewModel={profilePageHeaderTitleViewModel: D_ProfilePageHeaderTitle;};
type R_PromotedSparklesWeb={promotedSparklesWebRenderer: D_PromotedSparklesWeb;};
type R_Radio={radioRenderer: D_Radio;};
type R_RadioButtonSurveyOption={radioButtonSurveyOptionRenderer: D_RadioButtonSurveyOption;};
type R_RatingSurvey={ratingSurveyRenderer: D_RatingSurvey;};
type R_RatingSurveyOption={ratingSurveyOptionRenderer: D_RatingSurveyOption;};
type R_ReelItem={reelItemRenderer: D_ReelItem;};
type R_ReelMultimixAttributionLabel={reelMultimixAttributionLabelRenderer: D_ReelMultimixAttributionLabel;};
type R_ReelPlayerHeader={reelPlayerHeaderRenderer: D_ReelPlayerHeader;};
type R_ReelPlayerOverlay={reelPlayerOverlayRenderer: D_ReelPlayerOverlay;};
type R_ReelShelf={reelShelfRenderer: D_ReelShelf;};
type R_RelatedChipCloud={relatedChipCloudRenderer: D_RelatedChipCloud;};
type R_ReportFormModal={reportFormModalRenderer: D_ReportFormModal;};
type R_ResourceStatusInResponseCheck={resourceStatusInResponseCheck: D_ResourceStatusInResponseCheck;};
type R_RichGrid={richGridRenderer: D_RichGrid;};
type R_RichItem={richItemRenderer: D_RichItem;};
type R_RichListHeader={richListHeaderRenderer: D_RichListHeader;};
type R_RichMetadata={richMetadataRenderer: D_RichMetadata;};
type R_RichMetadataRow={richMetadataRowRenderer: D_RichMetadataRow;};
type R_RichSection={richSectionRenderer: D_RichSection;};
type R_RichShelf={richShelfRenderer: D_RichShelf;};
type R_RichThumbnail={movingThumbnailRenderer: D_MovingThumbnail;};
type R_SampledThumbnailColor={sampledThumbnailColor: D_ThumbnailColor;};
type R_SearchBox={searchBoxRenderer: D_SearchBox;};
type R_SearchPyv={searchPyvRenderer: D_SearchPyv;};
type R_SearchResultsTab={tabRenderer: D_SearchResultsTab;};
type R_SectionList={sectionListRenderer: GD_RC_SectionList;};
type R_SegmentedLikeDislikeButton={segmentedLikeDislikeButtonRenderer: D_SegmentedLikeDislikeButton;};
type R_SettingsCheckbox={settingsCheckboxRenderer: D_SettingsCheckbox;};
type R_SettingsOption={settingsOptionsRenderer: D_SettingsOptions;};
type R_SettingsRadioOption={settingsRadioOptionRenderer: D_SettingsRadioOption;};
type R_SettingsSidebar={settingsSidebarRenderer: D_SettingsSidebar;};
type R_SettingsSwitch={settingsSwitchRenderer: D_SettingsSwitch;};
type R_SimpleMenuHeader={simpleMenuHeaderRenderer: D_SimpleMenuHeader;};
type R_SingleColumnMusicWatchNextResults={singleColumnMusicWatchNextResultsRenderer: R_Tabbed;};
type R_SortFilterSubMenu={sortFilterSubMenuRenderer: D_SortFilterSubMenu;};
type R_SourcePivotHeader={sourcePivotHeaderRenderer: D_SourcePivotHeader;};
type R_StructuredDescriptionContent={structuredDescriptionContentRenderer: D_StructuredDescriptionContent;};
type R_SubFeedOption={subFeedOptionRenderer: D_SubFeedOption;};
type R_SubFeedSelector={subFeedSelectorRenderer: D_SubFeedSelector;};
type R_SubscribeButton={subscribeButtonRenderer: D_SubscribeButton;};
type R_SubscriptionNotificationToggleButton={subscriptionNotificationToggleButtonRenderer: D_SubscriptionNotificationToggleButton;};
type R_SuperVodBuyFlowContent={superVodBuyFlowContentRenderer: D_SuperVodBuyFlowContent;};
type R_Tab={tabRenderer: D_Tab;};
type R_Tabbed={tabbedRenderer: R_WatchNextTabbedResults;};
type R_TabbedSearchResults={tabbedSearchResultsRenderer: D_TabbedSearchResults;};
type R_TemplateUpdate={templateUpdate: D_TemplateUpdate;};
type R_TextInputFormField={textInputFormFieldRenderer: D_TextInputFormField;};
type R_ThumbnailOverlayBottomPanel={thumbnailOverlayBottomPanelRenderer: D_ThumbnailOverlayBottomPanel;};
type R_ThumbnailOverlayEndorsement={thumbnailOverlayEndorsementRenderer: D_ThumbnailOverlayEndorsement;};
type R_ThumbnailOverlayHoverText={thumbnailOverlayHoverTextRenderer: D_ThumbnailOverlayHoverText;};
type R_ThumbnailOverlayLoadingPreview={thumbnailOverlayLoadingPreviewRenderer: D_ThumbnailOverlayLoadingPreview;};
type R_ThumbnailOverlayNowPlaying={thumbnailOverlayNowPlayingRenderer: D_ThumbnailOverlayNowPlaying;};
type R_ThumbnailOverlayResumePlayback={thumbnailOverlayResumePlaybackRenderer: D_ThumbnailOverlayResumePlayback;};
type R_ThumbnailOverlaySidePanel={thumbnailOverlaySidePanelRenderer: D_ThumbnailOverlaySidePanel;};
type R_ThumbnailOverlayTimeStatus={thumbnailOverlayTimeStatusRenderer: D_ThumbnailOverlayTimeStatus;};
type R_ThumbnailOverlayToggleButton={thumbnailOverlayToggleButtonRenderer: D_ThumbnailOverlayToggleButton;};
type R_ToggleButton={toggleButtonRenderer: D_ToggleButton;};
type R_ToggleMenuServiceItem={toggleMenuServiceItemRenderer: D_ToggleMenuServiceItem;};
type R_TopbarLogo={topbarLogoRenderer: D_TopbarLogo;};
type R_TopbarMenuButton={topbarMenuButtonRenderer: D_TopbarMenuButton;};
type R_TopicLink={topicLinkRenderer: D_TopicLink;};
type R_Transcript={transcriptRenderer: D_Transcript;};
type R_TranscriptFooter={transcriptFooterRenderer: D_TranscriptFooter;};
type R_TranscriptSearchPanel={transcriptSearchPanelRenderer: D_TranscriptSearchPanel;};
type R_TranscriptSegment={transcriptSegmentRenderer: D_TranscriptSegment;};
type R_TranscriptSegmentList={transcriptSegmentListRenderer: D_TranscriptSegmentList;};
type R_TwoColumnBrowseResults={twoColumnBrowseResultsRenderer: D_TwoColumnBrowseResults;};
type R_TwoColumnSearchResults={twoColumnSearchResultsRenderer: D_TwoColumnSearchResults;};
type R_UnifiedSharePanel={unifiedSharePanelRenderer: D_UnifiedSharePanel;};
type R_Video={videoRenderer: D_Video;};
type R_VideoDescriptionHeader={videoDescriptionHeaderRenderer: D_VideoDescriptionHeader;};
type R_VideoDescriptionMusicSection={videoDescriptionMusicSectionRenderer: D_VideoDescriptionMusicSection;};
type R_VideoMastheadAdV3={videoMastheadAdV3Renderer: D_VideoMastheadAdV3;};
type R_VideoOwner={videoOwnerRenderer: D_VideoOwner;};
type R_VideoPrimaryInfo={videoPrimaryInfoRenderer: D_VideoPrimaryInfo;};
type R_VideoQualityPromo={videoQualityPromoRenderer: D_VideoQualityPromo;};
type R_VideoSecondaryInfo={videoSecondaryInfoRenderer: D_VideoSecondaryInfo;};
type R_VideoViewCount={videoViewCountRenderer: D_VideoViewCount;};
type R_VoiceSearchDialog={voiceSearchDialogRenderer: D_VoiceSearchDialog;};
type R_VssLoggingContext={vssLoggingContext: D_VssLoggingContext;};
type R_WatchEndpointMusicConfig={watchEndpointMusicConfig: D_WatchEndpointMusicConfig;};
type R_WatchNextEndScreen={watchNextEndScreenRenderer: D_WatchNextEndScreen;};
type R_WatchNextTabbedResults={watchNextTabbedResultsRenderer: D_WatchNextTabbedResults;};
type R_WebSearchboxConfig={webSearchboxConfig: D_WebSearchboxConfig;};
//#endregion
//#region {pageType:string}
type R_PageTypeWatch={
	pageType: "watch";
	endpoint: E_Watch;
	response: G_RS_WatchPage;
	fromHistory: boolean;
	navigationDoneMs: number;
};
type R_VE6827_PageType_Browse_Response={
	page: "browse";
	endpoint: E_VE6827;
	response: {
		responseContext: RC_ResponseContext;
		contents: R_TwoColumnBrowseResults;
		header: R_C4TabbedHeader;
		trackingParams: string;
		topbar: R_DesktopTopbar;
	};
	url: "/feed/trending?bp=6gQJRkVleHBsb3Jl";
	expirationTime: 1676762653957;
}|{
	page: "browse";
	endpoint: E_VE6827;
	response: {
		responseContext: RC_ResponseContext;
		contents: R_TwoColumnBrowseResults;
		header: R_FeedTabbedHeader;
		trackingParams: string;
		topbar: R_DesktopTopbar;
	};
	url: "/feed/library";
	expirationTime: 1676555594925;
}|{
	page: "browse";
	endpoint: E_VE6827;
	response: {
		responseContext: RC_ResponseContext;
		contents: R_TwoColumnBrowseResults;
		trackingParams: string;
		topbar: R_DesktopTopbar;
	};
	url: "/feed/history";
	expirationTime: 1676555455508;
};

type R_VE96368_PageType_Browse_Response={
	page: "browse";
	endpoint: E_VE96368;
	response: {
		responseContext: RC_ResponseContext;
		contents: R_TwoColumnBrowseResults;
		header: R_FeedTabbedHeader;
		trackingParams: string;
		topbar: R_DesktopTopbar;
		observedStateTags: {
			stateTag: 3;
			instruction: "STATE_TAG_BROWSE_INSTRUCTION_MARK_AS_DIRTY";
		}[];
	};
	url: "/feed/subscriptions";
	expirationTime: number;
};
type R_VE3854_PageType_Browse_Response={
	page: "browse";
	endpoint: E_VE3854;
	response: RS_Browse;
	url: "/";
	expirationTime?: number;
}|{
	page: "browse";
	endpoint: E_VE3854;
	response: RS_Browse;
	url: "/";
	expirationTime: 1676995057316;
	graftedVes: D_GraftedVeItem[];
	csn: string;
};
type R_PageTypeBrowse={
	endpoint: E_VE6827;
	pageType: "browse";
	fromHistory: boolean;
	response: R_VE6827_PageType_Browse_Response;
	navigationDoneMs: number;
}|{
	endpoint: E_VE96368;
	pageType: "browse";
	fromHistory: false;
	response: R_VE96368_PageType_Browse_Response;
	navigationDoneMs: number;
}|{
	pageType: "browse";
	endpoint: E_VE3854;
	response: R_VE3854_PageType_Browse_Response;
	fromHistory: boolean;
	navigationDoneMs: number;
};
type R_PageTypeChannel={
	pageType: "channel";
	endpoint: E_VE3611;
	response: RS_Page_Channel;
	fromHistory: boolean;
	navigationDoneMs: number;
};
type R_PageTypePlaylist={
	endpoint: E_VE5754;
	pageType: "playlist";
	fromHistory: false;
	response: {
		page: "playlist";
		endpoint: E_VE5754;
		response: {
			responseContext: RC_ResponseContext;
			contents: R_TwoColumnBrowseResults;
			header: R_PlaylistHeader;
			metadata: R_Playlist_MD;
			trackingParams: string;
			topbar: R_DesktopTopbar;
			microformat: R_MicroformatData;
			sidebar: R_PlaylistSidebar;
		};
		url: "/playlist?list=WL";
	};
	navigationDoneMs: 1676555876221;
};
type R_PageTypeSearch={
	pageType: "search";
	endpoint: E_VE4724_Search;
	response: RS_Page_Search;
	fromHistory: boolean;
	navigationDoneMs: number;
};
type R_PageTypeSettings={
	pageType: "settings";
	endpoint: E_Settings;
	response: G_RS_Page_Settings;
	fromHistory: boolean;
	navigationDoneMs: number;
};
type DataResponsePageType=G_RS_WatchPage|RS_Page_Channel|G_RS_Page_Playlist|G_RS_Page_Settings|RS_Page_Search|RS_Page_Browse|G_RS_Page_Shorts;
type R_PageTypeShorts={
	pageType: "shorts";
	endpoint: E_ReelWatch;
	response: G_RS_Page_Shorts;
	fromHistory: boolean;
	navigationDoneMs: number;
};
//#endregion
//#region RA_
type RA_ReelDismissal={reelDismissalActionRenderer: AD_ReelDismissal;};
type RA_Notification={notificationActionRenderer: AD_Notification;};
//#endregion
//#region RC_
//#region Continuation Renderer
type RC_LiveChat={liveChatContinuation: DC_LiveChat;};
type RC_MusicShelf={musicShelfContinuation: DC_MusicShelf;};
type RC_PlaylistPanel={playlistPanelContinuation: DC_PlaylistPanel;};
type RC_SectionList={sectionListContinuation: GD_RC_SectionList;};
//#endregion
//#region RC
type RC_ConsistencyTokenJar={encryptedTokenJarContents: string; expirationSeconds: `${D_TokenJarDefaultExpirationSeconds}`;};
type RC_CsiServiceC={key: "c"; value: RC_ECatcherClientName['value'];};
type RC_CsiServiceCVer={key: "cver"; value: string;};
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
type RC_ECatcherClientName={key: "client.name"; value: "WEB"|"WEB_REMIX";};
type RC_ECatcherClientVersion={key: "client.version"; value: RC_SomeVer<RC_CsiVarTypes['cver']>;};
type RC_ECatcherServiceType={["client.fexp"]: `${number}`|`${number},${number}`|`${number},${number},${string}`;};
type RC_ECatcher_ParamItem=RC_ECatcherClientName|RC_ECatcherClientVersion;
type RC_ECatcher_SPs={service: "ECATCHER"; params: RC_To_SPs<RC_ECatcherServiceType>|RC_ECatcher_ParamItem[];};
type RC_GFeedback_SPs={service: "GFEEDBACK"; params: SP_GFeedbackServiceParamsType;};
type RC_GoogleHelp_SPs={service: "GOOGLE_HELP"; params: RC_To_SPs<SP_GoogleHelpServiceObj>;};
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
//#endregion
//#endregion
