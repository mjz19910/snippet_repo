class ProxyHandlers {
	set_(call_args: any[], from: any) {
		return Reflect.set(call_args[0], call_args[1], call_args[2], call_args[3]);
	}
	get_(call_args: any[], from: any) {
		return Reflect.get(call_args[0], call_args[1], call_args[2]);
	}
	apply_(call_args: any[], from: any) {
		return Reflect.apply(call_args[0], call_args[1], call_args[2]);
	}
	defineProperty_(call_args: any[], from: any) {
		return Reflect.defineProperty(call_args[0], call_args[1], call_args[2]);
	}
	getOwnPropertyDescriptor_(call_args: any[], from: any) {
		return Reflect.getOwnPropertyDescriptor(call_args[0], call_args[1]);
	}
}
