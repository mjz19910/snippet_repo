class location {
	location_setup() {
		return new location_setup;
	}
}

class location_setup {};

class window {
	location() {
		return new location;
	}
}

class fake {
	window() {
		return new window;
	}
}

class dom_impl_badge {}

class page_load_state {
	fake() {
		return new fake;
	}
	dom_impl_badge() {
		return new dom_impl_badge;
	}
}

export class ModuleState {
	base_state() {
		return new base_state;
	}
}
class create_window {
	m_top!: {};
	m_location!: location;
	set_location(location: location) {
		this.m_location=location;
	}
	set_m_top(m_top:{}) {
		this.m_top=m_top;
	}
}

class base_state {
	page_load_state() {
		return new page_load_state;
	}
	create_window() {
		return new create_window;
	}
}

export class Template {
	func() {
		return new class {};
	}
}
