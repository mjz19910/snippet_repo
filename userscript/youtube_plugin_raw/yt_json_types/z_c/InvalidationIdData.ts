type D_InvalidationId={
	objectSource: number;
	objectId: string;
	topic: `chat~${string}~${number}`;
	subscribeToGcmTopics: boolean;
	protoCreationTimestampMs: `${number}`;
};