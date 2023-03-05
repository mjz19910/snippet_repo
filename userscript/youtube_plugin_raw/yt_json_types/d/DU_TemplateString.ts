//#region Template String
type DU_Browse_Playlist_Id=`VL${DU_Playlist_Id}`;
type DU_Channel_Id=T_ChannelIdStr<D_UserIdStr>;
type DU_Playlist_Id=`PL${string}`;
type DU_Playlist_UserUploads_Id=`UU${string}`;
type DU_Radio_ChannelMode_Id=`CM${DU_Channel_Id}`;
type DU_Radio_ChannelMix_Id=`RD${DU_Radio_ChannelMode_Id}`;
type DU_Radio_GeneralMode_Id=`GM${string}`;
type DU_Radio_GeneralMix_Id=`RD${DU_Radio_GeneralMode_Id}`;
type DU_Radio_MyMix_Id=`RDMM${string}`;
type DU_Radio_Id=`RD${string}`;
//#endregion