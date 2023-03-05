type DU_UrlTypeWithPageType=`page_type_${S_PageTypeStr}`|DU_UrlType;
type DU_UrlType=NonNullable<Ret_ParserService_GetUrlType>;
type DU_TargetId_ShoppingPanel_EntryPoint=`shopping_panel_for_entry_point_${"5"|"22"}`;
type DU_TargetId_2=
	|Extract<D_Menu,{targetId: any;}>["targetId"]
	|A_WatchNextContinuation['targetId']
	|AD_AppendContinuationItems['targetId']
	|AD_UpdateEngagementPanel['targetId']
	|D_Button_targetId
	|D_Button_With_TargetId["targetId"]
	|D_ChipCloudChip_tid['targetId']
	|D_EngagementPanelSectionTargetId
	|D_Menu_TargetId
	|DU_TargetId_ShoppingPanel_EntryPoint
	|D_TranscriptSearchPanel['targetId']
	|DC_ReloadContinuationItems["targetId"]
	|DC_ScrollToEngagementPanel['targetId']
	|DC_SectionList_TargetId
	|G_SI_DB_EngagementPanel['targetId']
	|RS_Search['targetId']
	|TA_Continuation<"browse-feedFEwhat_to_watch",G_BrowseFeed>['targetId']
	;
;
