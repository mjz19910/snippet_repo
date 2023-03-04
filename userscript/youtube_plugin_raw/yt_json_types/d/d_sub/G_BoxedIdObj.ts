type G_BoxedIdObj=
	|D_BoxedUpdateId
	|D_BoxedVEStore
	|D_BoxedStringStore
	|D_BoxedNumberStore
	|D_BoxedBooleanStore
	|D_BoxedKeysStore
	|D_BoxedBigintStore
	|D_BoxedUpdateId
	|{
		key: `boxed_id:video_time:${number}s`;
	}
	|{
		type: "boxed_id";
		tag: "hashtag_id";
		key: `boxed_id:hashtag_id:${string}`;
		value: string;
	}
	|{
		type: "boxed_id";
		tag: "video_referral";
		key: `boxed_id:video_referral:${string}`;
		value: D_VideoReferralUrlInfo;
	}
	|{
		type: "boxed_id";
		tag: "video_time";
		key: `boxed_id:video_time:${number}s`;
		value: D_InfoVideoTime;
	}
	|{
		tag: "video";
		key: `boxed_id:video:null:${string}`;
		value: DI_VideoId;
	}
	|{
		type: "boxed_id";
		tag: "video";
		key: `boxed_id:video:normal:${string}`;
		value: D_VideoIdNormal;
	}
	|{
		type: "boxed_id";
		tag: "video";
		key: `boxed_id:video:short:${string}`;
		value: D_InfoVideoIdShorts;
	}
	|{
		type: "boxed_id",
		tag: string,
		extra: "any";
		key: `boxed_id:${string}:${string}`,
		value: G_UrlInfo,
	}
	;
;