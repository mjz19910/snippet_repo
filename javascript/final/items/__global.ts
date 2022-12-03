declare global {
	var SharkGame: {
		PlayerResources: {
			get: (want: string) => {
				amount: number;
			};
		};
	};
}

export type Holder=1;
