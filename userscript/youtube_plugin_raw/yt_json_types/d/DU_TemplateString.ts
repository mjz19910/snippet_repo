//#region Template String
type DU_BrowseId_Playlist=`VL${DU_Playlist_PL}`;
type DU_ChannelId=T_ChannelIdStr<D_UserIdStr>;
type DU_Playlist_PL=`PL${string}`;
type DU_Playlist_UserUploads=`UU${string}`;
type DU_RadioId_ChannelMix=`RDCM${DU_ChannelId}`;
type DU_RadioId_GeneralMix=`RDGM${string}`;
type DU_RadioId_MyMix=`RDMM${string}`;
type DU_RadioId=`RD${string}`;
//#endregion
