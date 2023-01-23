type YtUrlInfoItem=YtUrlInfoPlaylist|YtUrlInfoVideo|{
	_tag:"video-referral";
	id: string; 
}|{
	_tag:"play-next";
	value: string;
};