type D_LiveBroadcastDetails={
	isLiveNow: true;
	startTimestamp: string;
}|{
	isLiveNow: false;
	startTimestamp: string;
	endTimestamp: string;
};