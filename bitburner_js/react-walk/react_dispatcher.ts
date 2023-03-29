const react_context_sym: unique symbol=Symbol("react.context");
const react_provider_sym: unique symbol=Symbol("react.provider");

type ReactContext={
	$$typeof: typeof react_context_sym,
	Consumer: ReactContext;
	Provider: ReactProviderType<ReactContext>;
	_currentValue: any;
	_currentValue2: any;
};
type ReactProviderType<T>={
	$$typeof: typeof react_provider_sym,
	_context: T;
};
type ReactJi={
	context: ReactContext;
	observedBits: number;
	next: null;
};