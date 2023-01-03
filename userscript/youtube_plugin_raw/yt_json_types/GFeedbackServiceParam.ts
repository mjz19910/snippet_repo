type GFeedbackServiceRouteParam={
	key: "route";
	value: ChanLoc;
};

type GFeedbackServiceParam=GFeedbackServiceRouteParam;
type ChanLoc=`channel.${ChanSub1}`;
type ChanSub1="videos"|"featured";
