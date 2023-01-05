type YtUrlInfoItem={
	_tag: "playlist";
	type:YtUrlInfoItemType;
	id: string;
}|{
	_tag: "video";
	id: string;
};