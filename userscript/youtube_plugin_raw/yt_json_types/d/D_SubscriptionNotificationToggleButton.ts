type D_SubscriptionNotificationToggleButton={
	states: [
		{
			stateId: 2;
			nextStateId: 2;
			state: R_Button;
		},
		{
			stateId: 3;
			nextStateId: 3;
			state: R_Button;
		},
		{
			stateId: 0;
			nextStateId: 0;
			state: R_Button;
		}
	];
	currentStateId: 2;
	trackingParams: string;
	command: C_Executor;
	targetId: "notification-bell";
	secondaryIcon: T_Icon<"EXPAND_MORE">;
};