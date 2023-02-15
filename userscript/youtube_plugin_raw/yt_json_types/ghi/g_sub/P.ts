type P_ReelParams={
	1: T_VW<12>;
	6: T_VW<2>;
}|{
	1: T_VW<12>,
	3: T_VW<V_BinaryTimestamp>,
	5: T_VW<{}>;
};
type P_ReelPlayerParams={
	30: T_VW<1>;
	71: T_VW<12>;
};
type P_ReelSequenceParams={
	1: T_VW<"gKyQXCkdZl0">;
	5: {3: T_VW<12>;};
};
type P_LikeParams={
	1: T_VW<{1: T_VW<"gKyQXCkdZl0">;}>;
	4: T_VW<0>;
	5: T_VW<1>;
	6: T_VW<{
		1: T_VW<number>,
		2: T_VW<number>;
	}>;
	7: T_VW<1>;
};
type P_dislike_params={
	1: T_VW<{
		1: T_VW<"gKyQXCkdZl0">;
	}>,
	2: T_VW<0>,
	3: T_VW<1>,
	4: T_VW<{
		1: T_VW<number>,
		2: T_VW<number>;
	}>,
	5: T_VW<1>;
};
type P_remove_like_params={
	1: T_VW<{
		1: T_VW<"gKyQXCkdZl0">;
	}>,
	3: T_VW<0>,
	4: T_VW<1>,
	5: T_VW<{
		1: T_VW<number>,
		2: T_VW<number>;
	}>,
	6: T_VW<1>;
};
type P_subscribe_params={
	2: T_VW<{
		1: T_VW<12>;
	}>,
	3: T_VW<0>;
};
type P_unsubscribe_params={
	1: T_VW<{
		1: T_VW<12>;
	}>,
	3: T_VW<0>;
};
type P_continuation_request_browse_token={
	80226972: T_VW<{
		2: T_VW<"FEcomment_shorts_web_top_level">,
		3: T_VW<string>;
	}>;
};
type P_playability_status_context_params={
	1: T_VW<1>,
	2: T_VW<{
		1: T_VW<2>;
	}>;
};
type P_entity_key_normal={
	2: T_VW<{
		1: T_VW<"gKyQXCkdZl0">;
	}>,
	4: T_VW<246>,
	5: T_VW<1>;
};
type P_entity_key={
	2: T_VW<{
		1: T_VW<"gKyQXCkdZl0">;
	}>,
	4: T_VW<246>,
	5: T_VW<1>;
};
