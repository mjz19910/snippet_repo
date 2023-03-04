type G_NavFinishDetail=
	|NavFinishDetail_Browse
	|NavFinishDetail_Channel
	|NavFinishDetail_Playlist
	|NavFinishDetail_Settings
	|NavFinishDetail_Shorts
	|NavFinishDetail_Watch
	|NavFinishDetail_Search
	;
;
//#region derived
type E_Page=G_NavFinishDetail['endpoint'];
type S_PageTypeStr=G_NavFinishDetail["pageType"];
//#endregion
