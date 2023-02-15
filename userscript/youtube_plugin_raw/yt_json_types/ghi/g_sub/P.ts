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

type reel_watch_sequence_a15_a6={
	1: T_VW<"RTuwQTgt3WE">;
	2: T_VW<{
		6: T_VW<26>;
	}>;
	3: T_VW<{
		1: T_VW<1675106330>;
		2: T_VW<89574000>;
	}>;
	4: T_VW<{
		1: T_VW<1676410041>;
	}>;
	5: T_VW<{
		1: T_VW<63>;
		2: T_VW<1>;
	}>;
	7: T_VW<{
		1: [
			{
				1: T_VW<182>;
			},
			{
				1: T_VW<930>;
			}
		];
	}>;
	8: T_VW<{
		1: T_VW<{
			1: T_VW<204>;
		}>;
		2: T_VW<1>;
	}>;
	9: T_VW<{
		1: T_VW<{
			1: T_VW<204>;
		}>;
		2: T_VW<1>;
	}>;
	10: T_VW<{
		1: T_VW<{
			1: T_VW<204>;
		}>;
		2: T_VW<1>;
	}>;
	11: T_VW<{
		2: T_VW<{
			1: T_VW<2>;
		}>;
	}>;
};

type reel_watch_sequence_a15={
	1: T_VW<12>;
	3: T_VW<11>;
	6: T_VW<reel_watch_sequence_a15_a6>;
};

type reel_watch_sequence_a3={
	1: T_VW<"RTuwQTgt3WE">;
	3: T_VW<10>;
	4: T_VW<2>;
	6: T_VW<V_Bigint<bigint>>;
};

type P_continuation_request_reel_watch_sequence_token={
	1: T_VW<"gKyQXCkdZl0">,
	3: T_VW<reel_watch_sequence_a3>,
	5: T_VW<{
		3: T_VW<12>;
	}>,
	15: T_VW<reel_watch_sequence_a15>;
};
