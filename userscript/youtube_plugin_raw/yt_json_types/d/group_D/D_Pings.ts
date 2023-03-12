type D_Pings={
	impressionPings: T_BaseUrl<`https://www.youtube.com/pagead/adview?${string}`>[];
	errorPings: T_BaseUrl<`https://www.youtube.com/pagead/interaction/?${string}`>[];
	mutePings: T_BaseUrl<`https://www.youtube.com/pagead/interaction/?${string}`>[];
	unmutePings: T_BaseUrl<`https://www.youtube.com/pagead/interaction/?${string}`>[];
	pausePings: T_BaseUrl<`https://www.youtube.com/pagead/interaction/?${string}`>[];
	rewindPings: T_BaseUrl<`https://www.youtube.com/pagead/interaction/?${string}`>[];
	resumePings: T_BaseUrl<`https://www.youtube.com/pagead/interaction/?${string}`>[];
	skipPings: T_BaseUrl<`https://www.youtube.com/pagead/interaction/?${string}`>[];
	closePings: T_BaseUrl<`https://www.youtube.com/pagead/interaction/?${string}`>[];
	progressPings: T_BaseUrl<`https://www.youtube.com/pagead/interaction/?${string}`>[];
	fullscreenPings: T_BaseUrl<`https://www.youtube.com/pagead/interaction/?${string}`>[];
	activeViewViewablePings: T_BaseUrl<`https://www.youtube.com/pcs/activeview?${string}`>[];
	endFullscreenPings: T_BaseUrl<`https://www.youtube.com/pagead/interaction/?${string}`>[];
	activeViewMeasurablePings: T_BaseUrl<`https://www.youtube.com/pcs/activeview?${string}`>[];
	abandonPings: T_BaseUrl<`https://www.youtube.com/pagead/interaction/?${string}`>[];
	activeViewFullyViewableAudibleHalfDurationPings: T_BaseUrl<`https://www.youtube.com/pcs/activeview?${string}`>[];
	completePings: T_BaseUrl<`https://www.youtube.com/pagead/interaction/?${string}`>[];
	activeViewTracking: D_TrafficType|D_TrafficType;
};
