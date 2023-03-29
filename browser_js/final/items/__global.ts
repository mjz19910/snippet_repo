declare global {
	var SharkGame: {
		PlayerResources: {
			get: (want: string) => {
				amount: number;
			};
		};
	};
}

export {any} from "./support/any";
