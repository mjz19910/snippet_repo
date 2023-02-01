type D_InFeedAdLayout={adLayoutMetadata: M_AdLayout_PlayerBytes; renderingContent: R_DisplayAd;};
type R_DisplayAd={displayAdRenderer: D_DisplayAd;};
type D_LinearAdSequence={adLayoutMetadata: M_AdLayout_PlayerBytes; linearAds: G_LinearAdsItem[];};
type D_AdSlotAndLayoutItem={adLayoutMetadata: MMD_AdLayout_TopImage[]; adSlotMetadata: DMD_AdSlot;};
type MG_AdLayout=M_AdLayout_PlayerBytes|MMD_AdLayout_TopImage;
type M_AdLayout_PlayerBytes={layoutType: "LAYOUT_TYPE_COMPOSITE_PLAYER_BYTES"; layoutId: string;};
type MMD_AdLayout_TopImage={layoutType: "LAYOUT_TYPE_DISPLAY_TOP_LANDSCAPE_IMAGE"; layoutId: string; adLayoutLoggingData: D_AdLayoutLoggingData;};
