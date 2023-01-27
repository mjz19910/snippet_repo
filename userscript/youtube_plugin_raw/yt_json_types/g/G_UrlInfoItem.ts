type G_UrlInfoItem=D_UrlInfoPlaylist|D_UrlInfoVideo|{
	_tag:"video-referral";
	id: string; 
}|{
	_tag:"play-next";
	value: string;
};