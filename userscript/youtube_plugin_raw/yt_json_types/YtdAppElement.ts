type YtdAppElement={
	new(): YtdAppElementI;
	/** @arg {HTMLElement} element @return {YtdAppElement} */
	cast(element: HTMLElement): YtdAppElementI;
};
