export const player_overlay_style_source=`
	position: absolute;
	top: 80px;
	left: 68px;
	font-size: 1.7rem;
	font-weight: 100;
	font-family: monospace;
	color: var(--c2);
	z-index: 1;
	mix-blend-mode: difference;
	background-blend-mode: normal;
	--p0: 100%;
	--p1: 100%;
	--s0: 0 0 0.8px;
	--s1: 0 0 0.8px;
	--c0: rgb(255 255 255 / var(--p0));
	--c1: rgb(20 20 20 / var(--p1));
	--c2: white;
	--sc0: var(--s0) var(--c0);
	--sc1: var(--s1) var(--c1);
	--f0: drop-shadow(var(--sc0));
	--f1: drop-shadow(var(--sc1));
	filter: var(--f0) var(--f1);
	border: 0px solid black;
	-webkit-mask-clip: text;
	user-select: none;
	width: 10px;
`