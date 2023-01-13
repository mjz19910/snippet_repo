type NextContinuation={
	continuation: string;
	clickTrackingParams: string;
};

type NextContinuationData={
	nextContinuationData: NextContinuation;
};

type SectionListData={
	contents: SectionListItem[];
	continuations?: NextContinuationData[];
	trackingParams: string;
};