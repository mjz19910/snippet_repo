//#region Templates
type T_ChannelIdStr<T extends string>=`UC${T}`;
type T_FeedEntry<T extends string>=`FE${T}`;
//#endregion

//#region Template String
type DU_Browse_Playlist_Id=`VL${DU_Playlist_Id}`;
type DU_Channel_Id=T_ChannelIdStr<D_UserIdStr>;
type DU_FeedBrowse_Id=T_FeedEntry<D_BrowseEndpointPages>;
type DU_Playlist_Id=`PL${string}`;
type DU_Playlist_UserUploads_Id=`UU${string}`;
type DU_Radio_Id=`RD${string}`;
type GU_Radio_Id=`RD${DM_Radio_GeneralId|DM_Radio_ChannelId|DM_Radio_MyMixId}`|DU_Radio_Id;
//#endregion
//#region Template String Mode
type DM_Radio_ChannelId=`CM${DU_Channel_Id}`;
type DM_Radio_GeneralId=`GM${string}`;
type DM_Radio_MyMixId=`MM${string}`;
//#endregion
