import {AU_ChannelSwitcherPage,AU_EngagementPanel,AU_NotificationsUnseenCount,AU_SubscribeButton,A_AddToGuideSection,A_AppendContinuationItems,A_GetMultiPageMenu,A_RemoveFromGuideSection} from "../abc/A.js";
import {AD_Notification,AD_NotificationMulti,AD_ReelDismissal} from "../abc/AD.js";
import {B_Hack,B_StateTag} from "../abc/B.js";
import {CD_TimedContinuation,C_AdsControlFlowOpportunityReceived,C_Continuation,C_ReloadContinuationItems,C_ResetChannelUnreadCount,DC_EntityBatchUpdate} from "../abc/C.js";
import {G_PlaylistEditResult} from "../abc/a_sub/G_empty_obj.js";
import {DD_Streaming,DMD_Badge,DMD_RowContainer,DRC_CsiVarKV,D_AboutThisAd,D_AccountItemSection,D_AccountLinkButton,D_AccountSettingIdList,D_ActionCompanionAd,D_AdBreakService,D_AdFeedback,D_AdHoverTextButton,D_AdPlacement,D_AdPlacementConfig,D_AdSlot,D_AddToPlaylist,D_AddToPlaylistCreate,D_AlertWithButton,D_AttBgChallenge,D_AuthorCommentBadge,D_AutoplaySwitchButton,D_BasicColorPaletteData,D_BrowseEndpointContextMusicConfig,D_BrowseEndpointPages,D_BrowseFeedActions,D_C4TabbedHeader,D_Cache_MD,D_Card,D_CardCollection,D_CarouselLockup,D_ChannelHeaderLinks,D_ChannelOptions,D_ChannelSwitcherHeader,D_ChannelSwitcherPage,D_ChannelThumbnailWithLink,D_Channel_MD,D_Chapter,D_CheckboxSurveyOption,D_ChildVideo,D_ChipCloud,D_ChipCloudChip,D_CinematicContainer,D_ClientForecastingAd,D_ClipAdState,D_ClipCreation,D_ClipCreationScrubber,D_ClipCreationTextInput,D_ClipSection,D_Comment,D_CommentSimplebox,D_CommentThread,D_CommentsEntryPointHeader,D_CommentsEntryPointTeaser,D_CommentsHeader,D_CommonConfig,D_CompactPlaylist,D_CompactRadio,D_CompactVideo,D_ConfirmDialog,D_ConnectedApp,D_ContinuationItem,D_CopyLink,D_DecoratedPlayerBar,D_DescriptionChapters,D_DesktopTopbar,D_DesktopWatchAds,D_DisplayAd,D_DropdownFormField,D_Dropdown_Privacy,D_ElementUpdate,D_EndScreenPlaylist,D_EndScreenVideo,D_Endscreen,D_EngagementPanelSectionList,D_EngagementPanelTitleHeader,D_ExpandableSurveyResponse,D_ExpandableTab,D_ExpandableVideoDescriptionBody,D_Factoid,D_FancyDismissibleDialog,D_FeedFilterChipBar,D_FeedNudge,D_FeedTabbedHeader,D_FeedbackResponseItem,D_FrameworkUpdates,D_FusionSearchbox,D_GhostGrid,D_GuideCollapsibleEntry,D_GuideCollapsibleSectionEntry,D_GuideDownloadsEntry,D_GuideEntry,D_GuideEntryData,D_GuideSection,D_GuideSubscriptionsSection,D_HeartbeatParams,D_HeatSeekerItemData,D_Heatmap,D_HeroPlaylistThumbnail,D_Hint,D_HorizontalCardList,D_HotkeyDialog,D_HotkeyDialogSection,D_HotkeyDialogSectionOption,D_InFeedAdLayout,D_InfoRow,D_InlineSurvey,D_InstreamVideoAd,D_ItemSectionHeader,D_LinearAdSequence,D_LiveChatAuthorBadge,D_LiveChatPlaceholderItem,D_LiveChatTextMessage,D_LiveChatViewerEngagementMessage,D_LoggingDirectives,D_MacroMarkersListItem,D_Menu,D_MerchandiseItem,D_MerchandiseShelf,D_MetadataRow,D_Microformat,D_MovingThumbnail,D_MultiMarkersPlayerBar,D_MultiPageMenuNotificationSection,D_MusicCarouselShelf,D_MusicQueue,D_MusicShelf,D_MusicThumbnail,D_Notification,D_NotificationText,D_NotificationTopbarButton,D_PageIntroduction,D_PageTopAdLayout,D_PdgBuyFlow,D_PdgBuyFlowHeader,D_PdgColorSlider,D_PdgCommentOption,D_PdgCommentPreview,D_PlaybackTracking,D_PlayerAnnotationsExpanded,D_PlayerAttestation,D_PlayerCaptionsTracklist,D_PlayerLiveStoryboardSpec,D_PlayerMicroformat,D_PlayerOverlay,D_PlayerOverlayAutoplay,D_PlayerOverlayVideoDetails,D_PlayerStoryboardSpec,D_PlaylistAddToOption,D_PlaylistByline,D_PlaylistHeader,D_PlaylistPanel,D_PlaylistPanelVideo,D_PlaylistSidebar,D_PlaylistSidebarSecondaryInfo,D_PlaylistVideoList,D_PlaylistVideoThumbnail,D_Playlist_MD,D_PrefetchHintConfig,D_PrivacyDropdownItem,D_ProductList,D_ProductListItem,D_ProfileColumn,D_ProfileColumnStats,D_ProfileColumnStatsEntry,D_ProfileColumnUserInfo,D_ProfilePageHeaderInformation,D_ProfilePageHeaderTitle,D_PromotedSparklesWeb,D_Radio,D_RadioButtonSurveyOption,D_RatingSurvey,D_RatingSurveyOption,D_ReelItem,D_ReelPlayerHeader,D_ReelShelf,D_RelatedChipCloud,D_ResourceStatusInResponseCheck,D_RichGrid,D_RichItem,D_RichListHeader,D_RichMetadataRow,D_RichSection,D_RichShelf,D_SearchBox,D_SearchPyv,D_SearchResultsTab,D_SegmentedLikeDislikeButton,D_SettingsCheckbox,D_SettingsOptions,D_SettingsRadioOption,D_SettingsSidebar,D_SettingsSwitch,D_SimpleMenuHeader,D_SourcePivotHeader,D_SponsorCommentBadge,D_StructuredDescriptionContent,D_SubFeedOption,D_SubFeedSelector,D_SubscriptionNotificationToggleButton,D_SuperVodBuyFlowContent,D_TabbedSearchResults,D_TemplateUpdate,D_TextInputFormField,D_Thumbnail,D_ThumbnailColor,D_ThumbnailOverlayBottomPanel,D_ThumbnailOverlayEndorsement,D_ThumbnailOverlayHoverText,D_ThumbnailOverlayLoadingPreview,D_ThumbnailOverlayNowPlaying,D_ThumbnailOverlayResumePlayback,D_ThumbnailOverlaySidePanel,D_ThumbnailOverlayTimeStatus,D_ThumbnailOverlayToggleButton,D_ToggleMenuServiceItem,D_TokenJarDefaultExpirationSeconds,D_TopbarLogo,D_TopbarMenuButton,D_TopicLink,D_TrackingParams,D_Transcript,D_TranscriptFooter,D_TranscriptSearchPanel,D_TranscriptSegment,D_TranscriptSegmentList,D_TwoColumnBrowseResults,D_TwoColumnSearchResults,D_UnifiedSharePanel,D_Video,D_VideoDescriptionHeader,D_VideoDescriptionMusicSection,D_VideoOwner,D_VideoPrimaryInfo,D_VideoQualityPromo,D_VideoViewCount,D_VoiceSearchDialog,D_VssLoggingContext,D_WatchEndpointMusicConfig,D_WatchNextEndScreen,D_WatchNextTabbedResults,D_WatchPageUrl,D_WebPrefetch,D_WebSearchboxConfig,D_YtConfig,R_InlineForm} from "../d/group_D.js";
import {DC_LiveChat} from "../d/group_DC.js";
import {DU_VE3832_PreconnectUrl,D_ResultsPageUrl,D_UserIdStr,T_IdTemplate} from "../d/mod_D/DU_T/DU.js";
import {D_Button} from "../d/mod_D/D_T/D_Button.js";
import {E_NotificationOptOut,E_RecordNotificationInteractions,E_Url,E_Watch} from "../e/E.js";
import {E_ApplicationSettings,E_Search,E_VE23462,E_VE3611,E_VE37414_ReelWatch,E_VE3854,E_VE5754,E_VE6827,E_VE96368} from "../e/GR_E_VE.js";
import {GU_VE3611_2,GU_VE3611_3} from "../ghi/_group.mod/GU.js";
import {GE_Browse,GE_ResponseReceived} from "../ghi/g_.mod/group_GE.js";
import {GA_EditPlaylist,G_BrowseContents,G_BrowseHeader,G_BrowseSidebar,G_Browse_MD,G_GuideItem,G_NextContents,G_RS_Page_Playlist,G_SE_MenuService,G_Text,G_ThumbnailOverlayItem} from "../ghi/group_G.js";
import {A_GetSystemMenu,A_NotificationMenuPopup,A_NotificationToast,A_PdgBuyFlow,TA_OpenPopup_Empty} from "../nop_q/Popup.js";
import {SP_GFeedbackServiceParams,SP_GoogleHelpServiceObj} from "../stu/group_S.js";
import {T_AnyObjectOrEmpty,T_Command_TP,T_Icon,T_MapEntry,T_RidFormat} from "../stu/group_T.js";
import {UMA_Item} from "../stu/group_U.js";
import {DC_MusicShelf,DC_PlaylistPanel,D_AccountItem,D_AdActionInterstitial,D_AutomixPreviewVideo,D_BrowserMediaSessionRenderer,D_LiveChatItemList,D_LiveChatMessageInput,D_LiveChatParticipantsList,D_LiveChatTicker,D_MusicResponsiveListItem,D_MusicShelfDivider,D_ReportFormModal,D_VideoMastheadAdV3} from "../z/ZD_empty_obj.js";
import {D_MacroMarkersInfoItem} from "./r_sub/r/D_MacroMarkersInfoItem.js";

//#region base(R)
//#region RCA
export type RCA_RelevantStateTags={relevantStateTags: B_StateTag[];};
//#endregion
//#region RD
export type RD_MenuServiceIconType_1=[
	"NOT_INTERESTED"|"ADD_TO_QUEUE_TAIL",
	"FLAG",
	"CONTENT_CUT",
	"PLAYLIST_ADD",
	"WATCH_LATER",
	"SHARE",
	"REMOVE",
][number];
export type RD_MenuServiceIconType_Sep="SHARE";
export type RD_MenuServiceItem=
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
		hasSeparator: true;
		isDisabled: false;
	};
//#endregion
//#region REG
export type REG_AccountSwitcher={
	responseContext: RC_ResponseContext;
	selectText: G_Text;
	actions: A_GetMultiPageMenu[];
};
export type REG_DatasyncIds={
	responseContext: RC_ResponseContext;
	datasyncIds: (`${number}||${number}`|`${number}||`)[];
};
//#endregion
//#region RG
export type RG_Result=R_Tab|R_ExpandableTab;
//#endregion
//#region RMD
export type RMD_Badge={metadataBadgeRenderer: DMD_Badge;};
export type RMD_RowContainer={metadataRowContainerRenderer: DMD_RowContainer;};
//#endregion
//#region RRC
export type RRC_ResponseContext={responseContext: RC_ResponseContext;};
//#endregion RRC
//#region RSG
export type RSG_AddToPlaylist={
	responseContext: RC_ResponseContext;
	contents: R_AddToPlaylist[];
	trackingParams: string;
};
export type RSG_GetUnseenCount={
	responseContext: RC_ResponseContext;
	actions?: [AU_NotificationsUnseenCount];
	unseenCount?: number;
};
export type RSG_NotificationMenu={
	responseContext: RC_ResponseContext;
	actions: (A_NotificationMenuPopup|A_AppendContinuationItems)[];
	trackingParams: string;
};
export type RSG_PdgBuyFlow={
	responseContext: RC_ResponseContext;
	command: A_PdgBuyFlow;
	trackingParams: string;
	frameworkUpdates: D_FrameworkUpdates;
};
export type RSG_SearchSuggestions={
	responseContext: RC_ResponseContext;
	trackingParams: string;
};
export type RSG_SharePanel={
	responseContext: RC_ResponseContext;
	trackingParams: string;
	actions: TA_OpenPopup_Empty[];
};
export type RSG_Survey={
	responseContext: RC_ResponseContext;
	trackingParams: string;
};
export type RSG_Transcript={
	responseContext: RC_ResponseContext;
	actions: AU_EngagementPanel[];
	trackingParams: string;
};
//#endregion
//#region RSL
export type RSL_Dislike={
	responseContext: RC_ResponseContext;
	actions?: TA_OpenPopup_Empty[];
};
export type RSL_Like={
	responseContext: RC_ResponseContext;
	actions?: (TA_OpenPopup_Empty|A_AddToGuideSection)[];
};
export type RSL_RemoveLike={
	responseContext: RC_ResponseContext;
	actions?: (TA_OpenPopup_Empty|A_RemoveFromGuideSection)[];
};
//#endregion
//#region RSM
export type RSM_ChannelPreference={
	responseContext: RC_ResponseContext;
	actions: A_NotificationToast[];
	channelId: T_IdTemplate<"UC",D_UserIdStr>;
	newNotificationButton: R_SubscriptionNotificationToggleButton;
	trackingParams: string;
	frameworkUpdates: DC_EntityBatchUpdate;
};
//#endregion
//#endregion base(R)
//#region R
//#region Renderer
export type R_AboutThisAd={aboutThisAdRenderer: D_AboutThisAd;};
export type R_AccountItem={accountItemRenderer: D_AccountItem;};
export type R_AccountItemSection={accountItemSectionRenderer: D_AccountItemSection;};
export type R_AccountLinkButton={accountLinkButtonRenderer: D_AccountLinkButton;};
export type R_AccountSectionList={accountSectionListRenderer: Record<"contents",R_AccountItemSection[]>;};
export type R_ActionCompanionAd={actionCompanionAdRenderer: D_ActionCompanionAd;};
export type R_AdActionInterstitial={adActionInterstitialRenderer: D_AdActionInterstitial;};
export type R_AdBreakService={adBreakServiceRenderer: D_AdBreakService;};
export type R_AddToPlaylist={addToPlaylistRenderer: D_AddToPlaylist;};
export type R_AddToPlaylistCreate={addToPlaylistCreateRenderer: D_AddToPlaylistCreate;};
export type R_AdHoverTextButton={adHoverTextButtonRenderer: D_AdHoverTextButton;};
export type R_AdPlacement={adPlacementRenderer: D_AdPlacement;};
export type R_AdPlacementConfig={adPlacementConfig: D_AdPlacementConfig;};
export type R_AdsEngagementPanelContent={adsEngagementPanelContentRenderer: B_Hack;};
export type R_AdSlot={adSlotRenderer: D_AdSlot;};
export type R_AlertWithButton={alertWithButtonRenderer: D_AlertWithButton;};
export type R_AutomixPreviewVideo={automixPreviewVideoRenderer: D_AutomixPreviewVideo;};
export type R_AutoplaySwitchButton={autoplaySwitchButtonRenderer: D_AutoplaySwitchButton;};
export type R_BrowseEndpointContextMusicConfig={browseEndpointContextMusicConfig: D_BrowseEndpointContextMusicConfig;};
export type R_BrowseFeedActions={browseFeedActionsRenderer: D_BrowseFeedActions;};
export type R_BrowserMediaSessionRenderer={browserMediaSessionRenderer: D_BrowserMediaSessionRenderer;};
export type R_C4TabbedHeader={c4TabbedHeaderRenderer: D_C4TabbedHeader;};
export type R_Card={cardRenderer: D_Card;};
export type R_CardCollection={cardCollectionRenderer: D_CardCollection;};
export type R_CarouselLockup={carouselLockupRenderer: D_CarouselLockup;};
export type R_Channel_MD={channelMetadataRenderer: D_Channel_MD;};
export type R_ChannelHeaderLinks={channelHeaderLinksRenderer: D_ChannelHeaderLinks;};
export type R_ChannelOptions={channelOptionsRenderer: D_ChannelOptions;};
export type R_ChannelSwitcherHeader={channelSwitcherHeaderRenderer: D_ChannelSwitcherHeader;};
export type R_ChannelSwitcherPage={channelSwitcherPageRenderer: D_ChannelSwitcherPage;};
export type R_ChannelThumbnailWithLink={channelThumbnailWithLinkRenderer: D_ChannelThumbnailWithLink;};
export type R_Chapter={chapterRenderer: D_Chapter;};
export type R_CheckboxSurveyOption={checkboxSurveyOptionRenderer: D_CheckboxSurveyOption;};
export type R_ChildVideo={childVideoRenderer: D_ChildVideo;};
export type R_ChipCloud={chipCloudRenderer: D_ChipCloud;};
export type R_ChipCloudChip={chipCloudChipRenderer: D_ChipCloudChip;};
export type R_CinematicContainer={cinematicContainerRenderer: D_CinematicContainer;};
export type R_ClientForecastingAd={clientForecastingAdRenderer: D_ClientForecastingAd;};
export type R_ClipAdState={clipAdStateRenderer: D_ClipAdState;};
export type R_ClipCreation={clipCreationRenderer: D_ClipCreation;};
export type R_ClipCreationScrubber={clipCreationScrubberRenderer: D_ClipCreationScrubber;};
export type R_ClipCreationTextInput={clipCreationTextInputRenderer: D_ClipCreationTextInput;};
export type R_ClipSection={clipSectionRenderer: D_ClipSection;};
export type R_Comment={commentRenderer: D_Comment;};
export type R_CommentActionButtons={commentActionButtonsRenderer: D_CommentActionButtons;};
export type R_CommentsEntryPointHeader={commentsEntryPointHeaderRenderer: D_CommentsEntryPointHeader;};
export type R_CommentsEntryPointTeaser={commentsEntryPointTeaserRenderer: D_CommentsEntryPointTeaser;};
export type R_CommentsHeader={commentsHeaderRenderer: D_CommentsHeader;};
export type R_CommentSimplebox={commentSimpleboxRenderer: D_CommentSimplebox;};
export type R_CommentThread={commentThreadRenderer: D_CommentThread;};
export type R_CommonConfig={commonConfig: D_CommonConfig;};
export type R_CompactLink={compactLinkRenderer: D_CompactLink;};
export type R_CompactPlaylist={compactPlaylistRenderer: D_CompactPlaylist;};
export type R_CompactRadio={compactRadioRenderer: D_CompactRadio;};
export type R_CompactVideo={compactVideoRenderer: D_CompactVideo;};
export type R_ConfirmDialog={confirmDialogRenderer: D_ConfirmDialog;};
export type R_ConnectedApp={connectedAppRenderer: D_ConnectedApp;};
export type R_ContinuationItem={continuationItemRenderer: D_ContinuationItem;};
export type R_CopyLink={copyLinkRenderer: D_CopyLink;};
export type R_DecoratedPlayerBar={decoratedPlayerBarRenderer: D_DecoratedPlayerBar;};
export type R_DefaultButton={buttonRenderer: D_Button;};
export type R_DescriptionChaptersItem=T_MapEntry<"DESCRIPTION_CHAPTERS",D_DescriptionChapters>;
export type R_DesktopTopbar={desktopTopbarRenderer: D_DesktopTopbar;};
export type R_DesktopWatchAds={playerLegacyDesktopWatchAdsRenderer: D_DesktopWatchAds;};
export type R_DisplayAd={displayAdRenderer: D_DisplayAd;};
export type R_Dropdown={dropdownRenderer: D_Dropdown_Privacy;};
export type R_ElementUpdate={updates: D_ElementUpdate[];};
export type R_EmojiPicker={emojiPickerRenderer: D_EmojiPicker;};
export type R_Endscreen={endscreenRenderer: D_Endscreen;};
export type R_EndscreenElement={endscreenElementRenderer: D_EndscreenElement;};
export type R_EndScreenPlaylist={endScreenPlaylistRenderer: D_EndScreenPlaylist;};
export type R_EndScreenVideo={endScreenVideoRenderer: D_EndScreenVideo;};
export type R_EngagementPanelSectionList={engagementPanelSectionListRenderer: D_EngagementPanelSectionList;};
export type R_EngagementPanelTitleHeader={engagementPanelTitleHeaderRenderer: D_EngagementPanelTitleHeader;};
export type R_ExpandableSurveyResponse={expandableSurveyResponseRenderer: D_ExpandableSurveyResponse;};
export type R_ExpandableTab={expandableTabRenderer: D_ExpandableTab;};
export type R_ExpandableVideoDescriptionBody={expandableVideoDescriptionBodyRenderer: D_ExpandableVideoDescriptionBody;};
export type R_Factoid={factoidRenderer: D_Factoid;};
export type R_FancyDismissibleDialog={fancyDismissibleDialogRenderer: D_FancyDismissibleDialog;};
export type R_FeedFilterChipBar={feedFilterChipBarRenderer: D_FeedFilterChipBar;};
export type R_FeedNudge={feedNudgeRenderer: D_FeedNudge;};
export type R_FeedTabbedHeader={feedTabbedHeaderRenderer: D_FeedTabbedHeader;};
export type D_FulfilledLayout_Item=R_FulfilledLayoutContent|R_FulfillmentLayoutContent;
export type R_FulfilledLayout={fulfilledLayout: D_FulfilledLayout_Item;};
export type R_FulfilledLayoutContent=R_PageTopAdLayout;
export type R_FulfillmentLayoutContent=R_InFeedAdLayout;
export type R_FusionSearchbox={fusionSearchboxRenderer: D_FusionSearchbox;};
export type R_General=R_SettingsSidebar;
export type R_GhostGrid={ghostGridRenderer: D_GhostGrid;};
export type R_GuideCollapsibleEntry={guideCollapsibleEntryRenderer: D_GuideCollapsibleEntry;};
export type R_GuideCollapsibleSectionEntry={guideCollapsibleSectionEntryRenderer: D_GuideCollapsibleSectionEntry;};
export type R_GuideDownloadsEntry={guideDownloadsEntryRenderer: D_GuideDownloadsEntry;};
export type R_GuideEntry={guideEntryRenderer: D_GuideEntry;};
export type R_GuideEntryData={guideEntryData: D_GuideEntryData;};
export type R_GuideSection={guideSectionRenderer: D_GuideSection;};
export type R_GuideSubscriptionsSection={guideSubscriptionsSectionRenderer: D_GuideSubscriptionsSection;};
export type R_Heatmap={heatmapRenderer: D_Heatmap;};
export type R_HeatSeekerItem=T_MapEntry<"HEATSEEKER",D_HeatSeekerItemData>;
export type R_HeroPlaylistThumbnail={heroPlaylistThumbnailRenderer: D_HeroPlaylistThumbnail;};
export type R_Hint={hintRenderer: D_Hint;};
export type R_HorizontalCardList={horizontalCardListRenderer: D_HorizontalCardList;};
export type R_HotkeyDialog={hotkeyDialogRenderer: D_HotkeyDialog;};
export type R_HotkeyDialogSection={hotkeyDialogSectionRenderer: D_HotkeyDialogSection;};
export type R_HotkeyDialogSectionOption={hotkeyDialogSectionOptionRenderer: D_HotkeyDialogSectionOption;};
export type R_Html5PlaybackOnesieConfig={html5PlaybackOnesieConfig: R_CommonConfig;};
export type R_InFeedAdLayout={inFeedAdLayoutRenderer: D_InFeedAdLayout;};
export type R_InfoCardIcon={infoCardIconRenderer: D_InfoCardIcon;};
export type D_InfoCardIcon=D_TrackingParams;
export type R_InfoRow={infoRowRenderer: D_InfoRow;};
export type R_InlineSurvey={inlineSurveyRenderer: D_InlineSurvey;};
export type R_InstreamVideoAd={instreamVideoAdRenderer: D_InstreamVideoAd;};
export type R_ItemSectionHeader={itemSectionHeaderRenderer: D_ItemSectionHeader;};
export type R_LikeButton={likeButtonRenderer: D_LikeButton;};
export type R_LinearAdSequence={linearAdSequenceRenderer: D_LinearAdSequence;};
export type R_LiveChatAuthorBadge={liveChatAuthorBadgeRenderer: D_LiveChatAuthorBadge;};
export type R_LiveChatHeader={liveChatHeaderRenderer: D_LiveChatHeader;};
export type R_LiveChatItemList={liveChatItemListRenderer: D_LiveChatItemList;};
export type R_LiveChatMessageInput={liveChatMessageInputRenderer: D_LiveChatMessageInput;};
export type R_LiveChatParticipantsList={liveChatParticipantsListRenderer: D_LiveChatParticipantsList;};
export type R_LiveChatPlaceholderItem={liveChatPlaceholderItemRenderer: D_LiveChatPlaceholderItem;};
export type R_LiveChatTextMessage={liveChatTextMessageRenderer: D_LiveChatTextMessage;};
export type R_LiveChatTicker={liveChatTickerRenderer: D_LiveChatTicker;};
export type R_LiveChatViewerEngagementMessage={liveChatViewerEngagementMessageRenderer: D_LiveChatViewerEngagementMessage;};
export type R_MacroMarkersList={macroMarkersListRenderer: D_MacroMarkersList;};
export type R_MacroMarkersListItem={macroMarkersListItemRenderer: D_MacroMarkersListItem;};
export type R_Menu={menuRenderer: D_Menu;};
export type R_MenuFlexibleItem={menuFlexibleItemRenderer: DT_MenuFlexibleItem;};
export type R_MenuNavigationItem={menuNavigationItemRenderer: D_MenuNavigationItem;};
export type R_MenuServiceItem={menuServiceItemRenderer: RD_MenuServiceItem;};
export type R_MerchandiseItem={merchandiseItemRenderer: D_MerchandiseItem;};
export type R_MerchandiseShelf={merchandiseShelfRenderer: D_MerchandiseShelf;};
export type R_Message={messageRenderer: D_Message;};
export type R_MetadataRow={metadataRowRenderer: D_MetadataRow;};
export type R_MicroformatData={microformatDataRenderer: D_Microformat;};
export type R_Miniplayer={miniplayerRenderer: D_Miniplayer;};
export type R_MovingThumbnail={movingThumbnailRenderer: D_MovingThumbnail;};
export type R_MultiMarkersPlayerBar={multiMarkersPlayerBarRenderer: D_MultiMarkersPlayerBar;};
export type R_MusicCarouselShelf={musicCarouselShelfRenderer: D_MusicCarouselShelf;};
export type R_MusicHeader={musicHeaderRenderer: {};};
export type R_MusicQueue={musicQueueRenderer: D_MusicQueue;};
export type R_MusicResponsiveListItem={musicResponsiveListItemRenderer: D_MusicResponsiveListItem;};
export type R_MusicShelf={musicShelfRenderer: D_MusicShelf;};
export type R_MusicShelfDivider={musicShelfDividerRenderer: D_MusicShelfDivider;};
export type R_MusicThumbnail={musicThumbnailRenderer: D_MusicThumbnail;};
export type R_Notification={notificationRenderer: D_Notification;};
export type R_NotificationText={notificationTextRenderer: D_NotificationText;};
export type R_NotificationTopbarButton={notificationTopbarButtonRenderer: D_NotificationTopbarButton;};
export type R_Page={trackingParams: string; contents: R_TwoColumnBrowseResults[];};
export type R_PageIntroduction={pageIntroductionRenderer: D_PageIntroduction;};
export type R_PageTopAdLayout={pageTopAdLayoutRenderer: D_PageTopAdLayout;};
export type R_PdgBuyFlow={pdgBuyFlowRenderer: D_PdgBuyFlow;};
export type R_PdgBuyFlowHeader={pdgBuyFlowHeaderRenderer: D_PdgBuyFlowHeader;};
export type R_PdgColorSlider={pdgColorSliderRenderer: D_PdgColorSlider;};
export type R_PdgCommentChip={pdgCommentChipRenderer: D_PdgCommentChip;};
export type R_PdgCommentOption={pdgCommentOptionRenderer: D_PdgCommentOption;};
export type R_PdgCommentPreview={pdgCommentPreviewRenderer: D_PdgCommentPreview;};
export type R_PivotButton={pivotButtonRenderer: D_PivotButton;};
export type R_PlayerAnnotationsExpanded={playerAnnotationsExpandedRenderer: D_PlayerAnnotationsExpanded;};
export type R_PlayerAttestation={playerAttestationRenderer: D_PlayerAttestation;};
export type R_PlayerCaptionsTracklist={playerCaptionsTracklistRenderer: D_PlayerCaptionsTracklist;};
export type R_PlayerLiveStoryboardSpec={playerLiveStoryboardSpecRenderer: D_PlayerLiveStoryboardSpec;};
export type R_PlayerMicroformat={playerMicroformatRenderer: D_PlayerMicroformat;};
export type R_PlayerOverlay={playerOverlayRenderer: D_PlayerOverlay;};
export type R_PlayerOverlayAutoplay={playerOverlayAutoplayRenderer: D_PlayerOverlayAutoplay;};
export type R_PlayerOverlayVideoDetails={playerOverlayVideoDetailsRenderer: D_PlayerOverlayVideoDetails;};
export type R_PlayerStoryboardSpec={playerStoryboardSpecRenderer: D_PlayerStoryboardSpec;};
export type R_Playlist_MD={playlistMetadataRenderer: D_Playlist_MD;};
export type R_PlaylistAddToOption={playlistAddToOptionRenderer: D_PlaylistAddToOption;};
export type R_PlaylistByline={playlistBylineRenderer: D_PlaylistByline;};
export type R_PlaylistContent={trackingParams: string; contents: R_TwoColumnBrowseResults[];};
export type R_PlaylistHeader={playlistHeaderRenderer: D_PlaylistHeader;};
export type R_PlaylistPanel={playlistPanelRenderer: D_PlaylistPanel;};
export type R_PlaylistPanelVideo={playlistPanelVideoRenderer: D_PlaylistPanelVideo;};
export type R_PlaylistSidebar={playlistSidebarRenderer: D_PlaylistSidebar;};
export type R_PlaylistSidebarPrimaryInfo={playlistSidebarPrimaryInfoRenderer: D_PlaylistSidebarPrimaryInfo;};
export type D_PlaylistSidebarPrimaryInfo={
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
export type R_PlaylistSidebarSecondaryInfo={playlistSidebarSecondaryInfoRenderer: D_PlaylistSidebarSecondaryInfo;};
export type R_PlaylistVideoList={playlistVideoListRenderer: D_PlaylistVideoList;};
export type R_PlaylistVideoThumbnail={playlistVideoThumbnailRenderer: D_PlaylistVideoThumbnail;};
export type R_PrefetchHintConfig={prefetchHintConfig: D_PrefetchHintConfig;};
export type R_PrivacyDropdownItem={privacyDropdownItemRenderer: D_PrivacyDropdownItem;};
export type R_ProductList={productListRenderer: D_ProductList;};
export type R_ProductListItem={productListItemRenderer: D_ProductListItem;};
export type R_ProfileColumn={profileColumnRenderer: D_ProfileColumn;};
export type R_ProfileColumnStats={profileColumnStatsRenderer: D_ProfileColumnStats;};
export type R_ProfileColumnStatsEntry={profileColumnStatsEntryRenderer: D_ProfileColumnStatsEntry;};
export type R_ProfileColumnUserInfo={profileColumnUserInfoRenderer: D_ProfileColumnUserInfo;};
export type R_ProfilePageHeaderButtonRowViewModel={profilePageHeaderButtonRowViewModel: {};};
export type R_ProfilePageHeaderInformationViewModel={profilePageHeaderInformationViewModel: D_ProfilePageHeaderInformation;};
export type R_ProfilePageHeaderMetadataViewModel={profilePageHeaderMetadataViewModel: {};};
export type R_ProfilePageHeaderThumbnailViewModel={profilePageHeaderThumbnailViewModel: {};};
export type R_ProfilePageHeaderTitleViewModel={profilePageHeaderTitleViewModel: D_ProfilePageHeaderTitle;};
export type R_PromotedSparklesWeb={promotedSparklesWebRenderer: D_PromotedSparklesWeb;};
export type R_Radio={radioRenderer: D_Radio;};
export type R_RadioButtonSurveyOption={radioButtonSurveyOptionRenderer: D_RadioButtonSurveyOption;};
export type R_RatingSurvey={ratingSurveyRenderer: D_RatingSurvey;};
export type R_RatingSurveyOption={ratingSurveyOptionRenderer: D_RatingSurveyOption;};
export type R_ReelItem={reelItemRenderer: D_ReelItem;};
export type R_ReelMultimixAttributionLabel={reelMultimixAttributionLabelRenderer: D_ReelMultimixAttributionLabel;};
export type R_ReelPlayerHeader={reelPlayerHeaderRenderer: D_ReelPlayerHeader;};
export type R_ReelPlayerOverlay={reelPlayerOverlayRenderer: D_ReelPlayerOverlay;};
export type R_ReelShelf={reelShelfRenderer: D_ReelShelf;};
export type R_RelatedChipCloud={relatedChipCloudRenderer: D_RelatedChipCloud;};
export type R_ReportFormModal={reportFormModalRenderer: D_ReportFormModal;};
export type R_ResourceStatusInResponseCheck={resourceStatusInResponseCheck: D_ResourceStatusInResponseCheck;};
export type R_RichGrid={richGridRenderer: D_RichGrid;};
export type R_RichItem={richItemRenderer: D_RichItem;};
export type R_RichListHeader={richListHeaderRenderer: D_RichListHeader;};
export type R_RichMetadata={richMetadataRenderer: D_RichMetadata;};
export type R_RichMetadataRow={richMetadataRowRenderer: D_RichMetadataRow;};
export type R_RichSection={richSectionRenderer: D_RichSection;};
export type R_RichShelf={richShelfRenderer: D_RichShelf;};
export type R_RichThumbnail={movingThumbnailRenderer: D_MovingThumbnail;};
export type R_SampledThumbnailColor={sampledThumbnailColor: D_ThumbnailColor;};
export type R_SearchBox={searchBoxRenderer: D_SearchBox;};
export type R_SearchPyv={searchPyvRenderer: D_SearchPyv;};
export type R_SearchResultsTab={tabRenderer: D_SearchResultsTab;};
export type R_SectionList={sectionListRenderer: GD_RC_SectionList;};
export type R_SegmentedLikeDislikeButton={segmentedLikeDislikeButtonRenderer: D_SegmentedLikeDislikeButton;};
export type R_SettingsCheckbox={settingsCheckboxRenderer: D_SettingsCheckbox;};
export type R_SettingsOption={settingsOptionsRenderer: D_SettingsOptions;};
export type R_SettingsRadioOption={settingsRadioOptionRenderer: D_SettingsRadioOption;};
export type R_SettingsSidebar={settingsSidebarRenderer: D_SettingsSidebar;};
export type R_SettingsSwitch={settingsSwitchRenderer: D_SettingsSwitch;};
export type R_SimpleMenuHeader={simpleMenuHeaderRenderer: D_SimpleMenuHeader;};
export type R_SingleColumnMusicWatchNextResults={singleColumnMusicWatchNextResultsRenderer: R_Tabbed;};
export type R_SortFilterSubMenu={sortFilterSubMenuRenderer: D_SortFilterSubMenu;};
export type R_SourcePivotHeader={sourcePivotHeaderRenderer: D_SourcePivotHeader;};
export type R_StructuredDescriptionContent={structuredDescriptionContentRenderer: D_StructuredDescriptionContent;};
export type R_SubFeedOption={subFeedOptionRenderer: D_SubFeedOption;};
export type R_SubFeedSelector={subFeedSelectorRenderer: D_SubFeedSelector;};
export type R_SubscribeButton={subscribeButtonRenderer: D_SubscribeButton;};
export type R_SubscriptionNotificationToggleButton={subscriptionNotificationToggleButtonRenderer: D_SubscriptionNotificationToggleButton;};
export type R_SuperVodBuyFlowContent={superVodBuyFlowContentRenderer: D_SuperVodBuyFlowContent;};
export type R_Tab={tabRenderer: D_Tab;};
export type R_Tabbed={tabbedRenderer: R_WatchNextTabbedResults;};
export type R_TabbedSearchResults={tabbedSearchResultsRenderer: D_TabbedSearchResults;};
export type R_TemplateUpdate={templateUpdate: D_TemplateUpdate;};
export type R_TextInputFormField={textInputFormFieldRenderer: D_TextInputFormField;};
export type R_ThumbnailOverlayBottomPanel={thumbnailOverlayBottomPanelRenderer: D_ThumbnailOverlayBottomPanel;};
export type R_ThumbnailOverlayEndorsement={thumbnailOverlayEndorsementRenderer: D_ThumbnailOverlayEndorsement;};
export type R_ThumbnailOverlayHoverText={thumbnailOverlayHoverTextRenderer: D_ThumbnailOverlayHoverText;};
export type R_ThumbnailOverlayLoadingPreview={thumbnailOverlayLoadingPreviewRenderer: D_ThumbnailOverlayLoadingPreview;};
export type R_ThumbnailOverlayNowPlaying={thumbnailOverlayNowPlayingRenderer: D_ThumbnailOverlayNowPlaying;};
export type R_ThumbnailOverlayResumePlayback={thumbnailOverlayResumePlaybackRenderer: D_ThumbnailOverlayResumePlayback;};
export type R_ThumbnailOverlaySidePanel={thumbnailOverlaySidePanelRenderer: D_ThumbnailOverlaySidePanel;};
export type R_ThumbnailOverlayTimeStatus={thumbnailOverlayTimeStatusRenderer: D_ThumbnailOverlayTimeStatus;};
export type R_ThumbnailOverlayToggleButton={thumbnailOverlayToggleButtonRenderer: D_ThumbnailOverlayToggleButton;};
export type R_ToggleButton={toggleButtonRenderer: D_ToggleButton;};
export type R_ToggleMenuServiceItem={toggleMenuServiceItemRenderer: D_ToggleMenuServiceItem;};
export type R_TopbarLogo={topbarLogoRenderer: D_TopbarLogo;};
export type R_TopbarMenuButton={topbarMenuButtonRenderer: D_TopbarMenuButton;};
export type R_TopicLink={topicLinkRenderer: D_TopicLink;};
export type R_Transcript={transcriptRenderer: D_Transcript;};
export type R_TranscriptFooter={transcriptFooterRenderer: D_TranscriptFooter;};
export type R_TranscriptSearchPanel={transcriptSearchPanelRenderer: D_TranscriptSearchPanel;};
export type R_TranscriptSegment={transcriptSegmentRenderer: D_TranscriptSegment;};
export type R_TranscriptSegmentList={transcriptSegmentListRenderer: D_TranscriptSegmentList;};
export type R_TwoColumnBrowseResults={twoColumnBrowseResultsRenderer: D_TwoColumnBrowseResults;};
export type R_TwoColumnSearchResults={twoColumnSearchResultsRenderer: D_TwoColumnSearchResults;};
export type R_UnifiedSharePanel={unifiedSharePanelRenderer: D_UnifiedSharePanel;};
export type R_Video={videoRenderer: D_Video;};
export type R_VideoDescriptionHeader={videoDescriptionHeaderRenderer: D_VideoDescriptionHeader;};
export type R_VideoDescriptionMusicSection={videoDescriptionMusicSectionRenderer: D_VideoDescriptionMusicSection;};
export type R_VideoMastheadAdV3={videoMastheadAdV3Renderer: D_VideoMastheadAdV3;};
export type R_VideoOwner={videoOwnerRenderer: D_VideoOwner;};
export type R_VideoPrimaryInfo={videoPrimaryInfoRenderer: D_VideoPrimaryInfo;};
export type R_VideoQualityPromo={videoQualityPromoRenderer: D_VideoQualityPromo;};
export type R_VideoSecondaryInfo={videoSecondaryInfoRenderer: D_VideoSecondaryInfo;};
export type R_VideoViewCount={videoViewCountRenderer: D_VideoViewCount;};
export type R_VoiceSearchDialog={voiceSearchDialogRenderer: D_VoiceSearchDialog;};
export type R_VssLoggingContext={vssLoggingContext: D_VssLoggingContext;};
export type R_WatchEndpointMusicConfig={watchEndpointMusicConfig: D_WatchEndpointMusicConfig;};
export type R_WatchNextEndScreen={watchNextEndScreenRenderer: D_WatchNextEndScreen;};
export type R_WatchNextTabbedResults={watchNextTabbedResultsRenderer: D_WatchNextTabbedResults;};
export type R_WebSearchboxConfig={webSearchboxConfig: D_WebSearchboxConfig;};
//#endregion
//#region {pageType:string}
export type NavFinishDetail_Watch={
	pageType: "watch";
	endpoint: E_Watch;
	response: G_RS_WatchPage;
	fromHistory: boolean;
	navigationDoneMs: number;
};
export type G_RS_Page_Browse=RS_VE6827_BrowsePage|RS_VE96368_BrowsePage|RS_Page_Browse;
export type RS_VE6827_BrowsePage={
	rootVe: 6827;
	url: "/feed/library";
	endpoint: E_VE6827;
	page: "browse";
	response: {
		responseContext: RC_ResponseContext;
		contents: R_TwoColumnBrowseResults;
		header: R_FeedTabbedHeader;
		trackingParams: string;
		topbar: R_DesktopTopbar;
	};
	expirationTime: number;
}|{
	page: "browse";
	endpoint: E_VE6827;
	response: {
		responseContext: RC_ResponseContext;
		contents: R_TwoColumnBrowseResults;
		header: R_C4TabbedHeader;
		trackingParams: string;
		topbar: R_DesktopTopbar;
	};
	url: `/feed/trending?bp=${string}`;
	expirationTime: number;
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
	expirationTime: number;
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
	expirationTime: number;
};

export type RS_VE96368_BrowsePage={
	rootVe: 96368;
	url: "/feed/subscriptions";
	endpoint: E_VE96368;
	page: "browse";
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
		cacheMetadata: D_IsCacheHit;
	};
	expirationTime: number;
}|{
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
export type RS_VE3854_BrowsePage={
	page: "browse";
	endpoint: E_VE3854;
	response: RS_Browse;
	url: "/";
	previousCsn: string;
	expirationTime: number;
}|{
	rootVe: 3854;
	url: "/";
	endpoint: E_VE3854;
	page: "browse";
	response: RS_Browse;
	expirationTime: number;
}|{
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
	expirationTime: number;
	graftedVes: D_GraftedVeItem[];
	csn: string;
};
export type G_ResponseBrowse=
	|RS_VE3854_BrowsePage
	|RS_VE6827_BrowsePage
	|RS_VE96368_BrowsePage
	;
;
export type G_RS_ByPageType=G_RS_WatchPage|RS_ChannelPage|G_RS_Page_Playlist|G_RS_SettingsPage|RS_SearchPage|RS_Page_Browse|G_RS_ShortsPage|RS_VE6827_BrowsePage|RS_VE96368_BrowsePage;
//#endregion
//#region RA_
export type RA_Notification={notificationActionRenderer: AD_Notification;};
export type RA_NotificationMulti={notificationMultiActionRenderer: AD_NotificationMulti;};
export type RA_ReelDismissal={reelDismissalActionRenderer: AD_ReelDismissal;};
//#endregion
//#region RC_
//#region Continuation Renderer
export type RC_LiveChat={liveChatContinuation: DC_LiveChat;};
export type RC_MusicShelf={musicShelfContinuation: DC_MusicShelf;};
export type RC_PlaylistPanel={playlistPanelContinuation: DC_PlaylistPanel;};
export type RC_SectionList={sectionListContinuation: GD_RC_SectionList;};
//#endregion
//#region RC
export type RC_ConsistencyTokenJar={encryptedTokenJarContents: string; expirationSeconds: `${D_TokenJarDefaultExpirationSeconds}`;};
export type RC_CsiServiceC={key: "c"; value: RC_ECatcherClientName['value'];};
export type RC_CsiServiceCVer={key: "cver"; value: string;};
export type RC_CsiVarMap={
	yt_li: "1";
	yt_ad: "1";
	yt_fn: D_BrowseEndpointPages;
	[x: T_RidFormat<string>]: `0x${string}`;
};
export type RC_CsiVarTypes={cver: Extract<DRC_CsiVarKV,{key: "cver";}>['value'];};
export type RC_Csi_SPs={
	service: "CSI",
	params: DRC_CsiVarKV[];
};
export type RC_ECatcherClientName={key: "client.name"; value: "WEB"|"WEB_REMIX";};
export type RC_ECatcherClientVersion={key: "client.version"; value: RC_SomeVer<RC_CsiVarTypes['cver']>;};
export type RC_ECatcherServiceType={["client.fexp"]: `${number}`|`${number},${number}`|`${number},${number},${string}`;};
export type RC_ECatcher_ParamItem=RC_ECatcherClientName|RC_ECatcherClientVersion;
export type RC_ECatcher_SPs={service: "ECATCHER"; params: (RC_ECatcher_ParamItem|ToKeyValue<RC_ECatcherServiceType>)[];};
export type RC_GFeedback_SPs={service: "GFEEDBACK"; params: SP_GFeedbackServiceParams[];};
export type RC_GoogleHelp_SPs={service: "GOOGLE_HELP"; params: ToKeyValue<SP_GoogleHelpServiceObj>[];};
export type RC_MainAppWebResponseContext={
	datasyncId: `${number}||${number}`;
	loggedOut: boolean;
	trackingParam?: string;
};
export type RC_ResponseContext={
	mainAppWebResponseContext?: RC_MainAppWebResponseContext;
	serviceTrackingParams?: GRC_ServiceTrackingParams[];
	webResponseContextExtensionData?: RC_WR_ContextExtension;
	consistencyTokenJar?: RC_ConsistencyTokenJar;
	maxAgeSeconds?: number;
	stateTags?: RCA_RelevantStateTags;
};
export type RC_ResponseContext_1={
	mainAppWebResponseContext: RC_MainAppWebResponseContext;
	serviceTrackingParams: GRC_ServiceTrackingParams[];
	webResponseContextExtensionData: RC_WR_ContextExtension;
};
export type RC_SomeVer<T extends string>=T extends `${infer V0}.${infer V1}.${string}.${string}`? `${V0}.${V1}`:T;
export type ToKeyValue<T>={[U in keyof T]: {key: U; value: T[U];};}[keyof T];
export type RC_WR_ContextExtension={
	hasDecorated?: boolean;
	ytConfigData?: D_YtConfig;
	webPrefetchData?: D_WebPrefetch;
};
//#endregion
//#endregion

//#region group_R
export type R_AdFeedback={adFeedbackRenderer: D_AdFeedback;};
//#endregion
export type R_PlaylistLoopButton={playlistLoopButtonRenderer: D_PlaylistLoopButton;};
//#region R_AttachmentElement
export type D_Sources={
	sources: {
		url: "https://www.gstatic.com/youtube/img/watch/yt_favicon.png";
	}[];
};
export type D_Image={image: D_Sources;};
export type D_ImageType={imageType: D_Image;};
export type S_DimensionUnitPoint="DIMENSION_UNIT_POINT";
export type D_DimensionUnit<T_Value,T_Unit=S_DimensionUnitPoint>={
	value: T_Value;
	unit: T_Unit;
};
export type D_LayoutProperties={
	height: D_DimensionUnit<10>;
	width: D_DimensionUnit<14>;
};
export type R_LayoutProperties={layoutProperties: D_LayoutProperties;};
export type D_AttachmentElement={
	type: D_ImageType;
	properties: R_LayoutProperties;
};
export type R_AttachmentElement={
	startIndex: number;
	length: number;
	element: D_AttachmentElement;
	alignment: "ALIGNMENT_VERTICAL_CENTER";
};
//#endregion
export type R_MultiPageMenuNotificationSection={multiPageMenuNotificationSectionRenderer: D_MultiPageMenuNotificationSection;};
export type R_MacroMarkersInfoItem={macroMarkersInfoItemRenderer: D_MacroMarkersInfoItem;};
export type R_DropdownFormField={dropdownFormFieldRenderer: D_DropdownFormField;};
export type R_PaidContentOverlay={paidContentOverlayRenderer: D_PaidContentOverlay;};
//#endregion R
//#region RS
//#region RS (Response)
export type RS_WatchReelItem={
	responseContext: RC_ResponseContext;
	overlay: R_ReelPlayerOverlay;
	status: "REEL_ITEM_WATCH_STATUS_SUCCEEDED";
	trackingParams: string;
	replacementEndpoint?: E_VE37414_ReelWatch;
	sequenceContinuation?: string;
	desktopTopbar: R_DesktopTopbar;
	engagementPanels: R_EngagementPanelSectionList[];
};
export type D_MultiPageMenuSection={
	items: R_CompactLink[];
	trackingParams: string;
};
export type R_MultiPageMenuSection={multiPageMenuSectionRenderer: D_MultiPageMenuSection;};
export type GM_VE12924={
	url: "/select_site";
	webPageType: "WEB_PAGE_TYPE_SETTINGS";
	rootVe: 12924;
};
export type M_VE12924={webCommandMetadata: GM_VE12924;};
export type D_ActiveAccountHeader={
	accountName: G_Text;
	accountPhoto: D_Thumbnail;
	settingsEndpoint: E_ApplicationSettings;
	manageAccountTitle: G_Text;
	trackingParams: string;
	channelHandle: G_Text;
};
export type R_ActiveAccountHeader={activeAccountHeaderRenderer: D_ActiveAccountHeader;};
export type RS_AccountMenu={
	responseContext: RC_ResponseContext;
	actions: A_GetSystemMenu[];
	trackingParams: string;
};
export type RS_AccountsList={
	responseContext: RC_ResponseContext;
	actions: AU_ChannelSwitcherPage[];
	selectText: G_Text;
};
export type RS_AttGet={
	responseContext: RC_ResponseContext;
	challenge: string;
	bgChallenge: D_AttBgChallenge;
};
export type RS_AttLog_RC={responseContext: RC_ResponseContext;};
export type RS_Browse={
	// responseContext,contents,header,metadata,trackingParams,topbar,microformat,onResponseReceivedActions,frameworkUpdates
	responseContext: RC_ResponseContext;
	contents?: G_BrowseContents;
	header?: G_BrowseHeader;
	// continuationContents,metadata,trackingParams,microformat,onResponseReceivedActions,frameworkUpdates
	continuationContents?: RC_SectionList;
	alerts?: R_AlertWithButton[];
	metadata?: G_Browse_MD;
	trackingParams: string;
	onResponseReceivedEndpoints?: C_ReloadContinuationItems[];
	topbar?: R_DesktopTopbar;
	microformat?: R_MicroformatData;
	frameworkUpdates?: DC_EntityBatchUpdate;
	maxAgeStoreSeconds?: number;
	background?: R_MusicThumbnail;
	onResponseReceivedActions?: GA_ResponseReceived[];
	sidebar?: G_BrowseSidebar;
	observedStateTags?: B_StateTag[];
	cacheMetadata?: D_Cache_MD;
};
export type RS_Channel={
	responseContext: RC_ResponseContext;
	contents: R_TwoColumnBrowseResults;
	header: R_C4TabbedHeader;
	metadata: R_Channel_MD;
	trackingParams: string;
	topbar: R_DesktopTopbar;
	microformat: R_MicroformatData;
	frameworkUpdates?: D_FrameworkUpdates;
	onResponseReceivedActions?: C_ResetChannelUnreadCount[];
	cacheMetadata?: D_Cache_MD;
};
export type RS_Feedback={
	responseContext: RC_ResponseContext;
	feedbackResponses: D_FeedbackResponseItem[];
};
export type RS_GetLiveChat={
	responseContext: RC_ResponseContext;
	continuationContents: RC_LiveChat;
	trackingParams?: string;
};
export type RS_Watch={
	responseContext: RC_ResponseContext;
	contents: R_TwoColumnWatchNextResults;
	currentVideoEndpoint: E_Watch;
	trackingParams: string;
	playerOverlays: R_PlayerOverlay;
	onResponseReceivedEndpoints: GE_ResponseReceived[];
	engagementPanels: R_EngagementPanelSectionList[];
	topbar: R_DesktopTopbar;
	pageVisualEffects: R_CinematicContainer[];
	frameworkUpdates: D_FrameworkUpdates;
};
export type RS_Guide={
	responseContext: RC_ResponseContext;
	items: G_GuideItem[];
	trackingParams: string;
};
export type RS_Next={
	responseContext: RC_ResponseContext;
	contents?: G_NextContents;
	continuationContents?: RC_PlaylistPanel;
	currentVideoEndpoint?: E_Watch;
	trackingParams: string;
	playerOverlays?: R_PlayerOverlay;
	videoReporting?: R_ReportFormModal;
	queueContextParams?: string;
	onResponseReceivedEndpoints?: GE_ResponseReceived[];
	engagementPanels?: R_EngagementPanelSectionList[];
	topbar?: R_DesktopTopbar;
	pageVisualEffects?: R_CinematicContainer[];
	frameworkUpdates?: D_FrameworkUpdates;
};
export type D_PaidContentOverlay={
	text: G_Text;
	durationMs: "10000";
	navigationEndpoint: E_Url;
	icon: T_Icon<"MONEY_HAND">;
	trackingParams: string;
};

export type RS_Player={
	responseContext: RC_ResponseContext;
	playabilityStatus: D_PlayabilityStatus;
	streamingData?: DD_Streaming;
	heartbeatParams?: D_HeartbeatParams;
	playerAds?: R_DesktopWatchAds[];
	playbackTracking?: D_PlaybackTracking;
	captions?: R_PlayerCaptionsTracklist;
	videoDetails?: D_VideoDetails;
	playerConfig?: D_PlayerConfig;
	storyboards?: G_PlayerStoryboards;
	microformat?: R_PlayerMicroformat;
	cards?: R_CardCollection;
	trackingParams: string;
	attestation?: R_PlayerAttestation;
	videoQualityPromoSupportedRenderers?: R_VideoQualityPromo;
	adPlacements?: T_AnyObjectOrEmpty<R_AdPlacement>[];
	frameworkUpdates?: D_FrameworkUpdates;
	endscreen?: R_Endscreen;
	paidContentOverlay?: R_PaidContentOverlay|R_PaidContentOverlay;
	annotations?: R_PlayerAnnotationsExpanded[];
	cacheMetadata?: D_IsCacheHit;
};
export type RS_Playlist={
	responseContext: RC_ResponseContext;
	contents: R_TwoColumnBrowseResults;
	header: R_PlaylistHeader;
	alerts?: R_AlertWithButton[];
	metadata: R_Playlist_MD;
	trackingParams: string;
	topbar: R_DesktopTopbar;
	microformat: R_MicroformatData;
	sidebar: R_PlaylistSidebar;
};
export type RS_Reel={
	responseContext: RC_ResponseContext;
	overlay: R_ReelPlayerOverlay;
	status: "REEL_ITEM_WATCH_STATUS_SUCCEEDED";
	trackingParams: string;
	desktopTopbar: R_DesktopTopbar;
	engagementPanels: R_EngagementPanelSectionList[];
};
export type RS_ReelWatchSequence={
	responseContext: RC_ResponseContext;
	entries: T_Command_TP<E_VE37414_ReelWatch>[];
	prevEntries?: T_Command_TP<E_VE37414_ReelWatch>[];
	trackingParams: string;
	continuationEndpoint?: C_Continuation;
};
export type RS_Search=Record<"contents",R_TwoColumnSearchResults>&{
	responseContext: RC_ResponseContext;
	estimatedResults: `${number}`;
	trackingParams: string;
	topbar: R_DesktopTopbar;
	refinements: string[];
	onResponseReceivedCommands: C_AdsControlFlowOpportunityReceived[];
	targetId: "search-page";
};
export type RS_SetSetting={
	responseContext: RC_ResponseContext;
	settingItemId: `${D_AccountSettingIdList[number]}`;
};
export type RS_Settings={
	responseContext: RC_ResponseContext;
	contents: R_TwoColumnBrowseResults;
	trackingParams: string;
	topbar: R_DesktopTopbar;
	onResponseReceivedEndpoints?: {}[];
	sidebar: R_SettingsSidebar;
};
export type RS_Subscribe={
	responseContext: RC_ResponseContext;
	actions: G_RS_Subscribe_Action[];
	newNotificationButton: R_SubscriptionNotificationToggleButton;
	trackingParams: string;
	frameworkUpdates: D_FrameworkUpdates;
};
export type RS_Success={
	responseContext: RC_ResponseContext;
	success: boolean;
};
export type RS_Unsubscribe={
	responseContext: RC_ResponseContext;
	actions: (A_RemoveFromGuideSection|TA_OpenPopup_Empty|AU_SubscribeButton)[];
	trackingParams: string;
	frameworkUpdates: D_FrameworkUpdates;
};
export type RS_Search_1={
	responseContext: RC_ResponseContext;
	contents?: R_TabbedSearchResults;
	continuationContents?: RC_MusicShelf;
	trackingParams: string;
	header?: R_MusicHeader;
};
export type RS_SearchApi=RS_Search_1|RS_Search;
export type RS_UpdateMetadata={
	responseContext: RC_ResponseContext;
	continuation: CD_TimedContinuation;
	actions: UMA_Item[];
};
//#endregion
//#region Response page
export type RS_Page_Settings={
	page: "settings";
	endpoint: E_VE23462;
	response: RS_Settings;
	url: string;
};
export type RS_VE23462_Page_Settings={
	page: "settings";
	endpoint: E_VE23462;
	response: RS_Settings;
	url: string;
	rootVe: 23462;
};
export type RS_Page_Shorts={
	page: "shorts";
	endpoint: E_VE37414_ReelWatch;
	response: RS_Reel;
	playerResponse: RS_Player;
	reelWatchSequenceResponse?: RS_ReelWatchSequence;
	url: `/shorts/${string}`;
	previousCsn?: string;
	cachedReelWatchSequenceResponse?: RS_ReelWatchSequence;
};
// cspell: ignoreRegExp /"([A-Za-z0-9]{27})\."/
export type RS_Page_Watch={
	page: "watch";
	endpoint: E_Watch;
	response: RS_Watch;
	playerResponse: RS_Player;
	url: D_WatchPageUrl;
	previousCsn?: string;
	csn?: "MC4wMjg2Nzc5NzkwNzQ3NjQ1NDg.";
};
export type RS_Page_Browse={
	page: "browse";
	endpoint: GE_Browse;
	response: RS_Browse;
	url: "/";
}|{
	page: "browse";
	endpoint: GE_Browse;
	response: RS_Browse;
	url: "/";
	expirationTime: number;
}|{
	rootVe: 3854;
	url: "/";
	endpoint: GE_Browse;
	page: "browse";
	response: RS_Browse;
	expirationTime: number;
};
export type R_ChannelMetadata=R_Channel_MD;
export type RS_Page_Channel_1={
	page: "channel";
	endpoint: E_VE3611;
	response: RS_Channel;
	url: `/@${string}`;
	previousCsn: string;
	expirationTime: number;
};

export type RS_Page_Channel_2={
	page: "channel";
	endpoint: E_VE3611;
	response: RS_Channel;
	url: GU_VE3611_2;
	expirationTime: number;
};

export type RS_Page_Channel_3={
	rootVe: 3611;
	url: GU_VE3611_3;
	endpoint: E_VE3611;
	page: "channel";
	response: RS_Channel;
	expirationTime: number;
	csn?: string;
};

export type RS_Page_Channel_4={
	page: "channel";
	endpoint: E_VE3611;
	response: RS_Channel;
	url: `/@${string}`;
	expirationTime: number;
	graftedVes: D_GraftedVeItem[];
	csn: string;
};
export type RS_ChannelPage=
	|RS_Page_Channel_1
	|RS_Page_Channel_2
	|RS_Page_Channel_3
	|RS_Page_Channel_4
	|{
		page: "channel";
		endpoint: E_VE3611;
		response: {
			responseContext: RC_ResponseContext;
			contents: R_TwoColumnBrowseResults;
			header: R_C4TabbedHeader;
			metadata: R_ChannelMetadata;
			trackingParams: string;
			topbar: R_DesktopTopbar;
			microformat: R_MicroformatData;
		};
		url: "/@SBMowingShorts/featured";
		expirationTime: number;
	}
	;
;
export type RS_Page_Playlist_R={
	page: "playlist";
	endpoint: E_VE5754;
	response: RS_Playlist;
	url: "/playlist?list=WL";
};
export type RS_PlaylistPage={
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
export type RS_SearchPage={
	page: "search";
	endpoint: E_Search;
	response: RS_Search;
	url: D_ResultsPageUrl;
};
//#endregion
//#region RS_VE (type={rootVe:number})
export type RS_VE3832_Page_Watch={
	rootVe: 3832;
	url: D_WatchPageUrl;
	endpoint: E_Watch;
	page: "watch";
	preconnect?: [DU_VE3832_PreconnectUrl];
	playerResponse: RS_Player;
	response: RS_Watch;
	csn?: string;
};
export type RS_VE5754_Page_Playlist={
	page: "playlist";
	endpoint: E_VE5754;
	response: RS_Playlist;
	url: string;
	rootVe: 5754;
};
export type RS_VE37414_Shorts={
	page: "shorts";
	endpoint: E_VE37414_ReelWatch;
	response: RS_Reel;
	playerResponse: RS_Player;
	reelWatchSequenceResponse: RS_ReelWatchSequence|undefined;
	url: `/shorts/${string}`;
	cachedReelWatchSequenceResponse: RS_ReelWatchSequence;
	rootVe: 37414;
};
//#endregion RS_VE (type={rootVe:number})
//#endregion RS

export type R_SponsorCommentBadge={sponsorCommentBadgeRenderer: D_SponsorCommentBadge;};
export type R_BasicColorPaletteData={basicColorPaletteData: D_BasicColorPaletteData;};
export type R_AuthorCommentBadge={authorCommentBadgeRenderer: D_AuthorCommentBadge;};
export type Ret_w_dss=[any,any];

export type RSB_EditPlaylist={
	responseContext: RC_ResponseContext;
	actions: GA_EditPlaylist[];
	status: "STATUS_SUCCEEDED";
	playlistEditResults: G_PlaylistEditResult[];
	trackingParams: string;
};
export type R_VideoDescriptionCourseSection={videoDescriptionCourseSectionRenderer: D_VideoDescriptionCourseSection;};
export type R_StructuredDescriptionPlaylistLockup={structuredDescriptionPlaylistLockupRenderer: D_StructuredDescriptionPlaylistLockup;};
