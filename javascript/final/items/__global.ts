export {};

declare global {
	var SharkGame: {
		PlayerResources: {
			get: (want: string) => {
				amount: number;
			};
		};
	};
}

export type Holder={
	use(): void;
};
