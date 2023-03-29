export const volume_plugin_style_source=`
	#rh_css {
		--w:calc(100% - 16px - 185px - 728px - 225px);
		--cv:calc(100% / 3.98);
		--fo:0.6px;
		width:calc(var(--w) / 2 - 25px);
		margin-left:calc(var(--w) * -0.5 - 8px - 25px);
		margin-right:calc(var(--w) / -2 + 50px);
		z-index:1
	}
	@media screen and (max-width: calc(1250px + 10px)) {
		#rh_css {
			display:none;
		}
	}
	#i_r_css {
		outline: none;
	}
	@supports selector(::-webkit-slider-thumb) {
		#i_r_css::-webkit-slider-runnable-track{
			padding:0;
			margin:0;
		}
		@media screen and (prefers-color-scheme: light){
			#i_r_css::-webkit-slider-runnable-track,#i_r_css::-moz-range-track{
				background:repeating-linear-gradient(90deg,transparent,transparent var(--fo),#ff000040 var(--cv));
			}
			#i_r_css{
				background:#fff;
			}
		}
		@media screen and (prefers-color-scheme: dark){
			#i_r_css::-webkit-slider-runnable-track{
				background:repeating-linear-gradient(90deg,transparent,#ff000014 var(--fo),#ff000086 var(--cv));
			}
			#i_r_css{
				background:transparent;
			}
		}
		#i_r_css{
			border-style:solid;
			border-width:0 2.5px;
			border-right-color:#f00;
			border-left-color:#f00;
			appearance:none;
			padding:0;
			display:block;
			z-index:1;
		}
		#i_r_css::-webkit-slider-thumb{
			appearance:none;
			width:4px;
			height:8px;
			color:#000;
			background:#000;
			border:0;
		}
	}
	@supports selector(::-moz-range-thumb) {
		#i_r_css::-moz-range-track {
			padding:0;
			margin:0;
			height:8px;
		}
		@media screen and (prefers-color-scheme: light) {
			#i_r_css::-moz-range-track {
				background:repeating-linear-gradient(90deg, transparent, transparent var(--fo), #ff000040 var(--cv));
			}
			#i_r_css{
				background:#fff;
			}
		}
		@media screen and (prefers-color-scheme: dark) {
			#i_r_css::-moz-range-track {
				background:repeating-linear-gradient(90deg, transparent, #ff000014 var(--fo), #ff000086 var(--cv));
			}
			#i_r_css {
				background:transparent;
			}
		}
		#i_r_css {
			height: 8px;
			border-style:solid;
			border-width:0 2.5px;
			border-color:#f00;
			border-right-color:#f00;
			appearance:none;
			padding:0;
			display:block;
		}
		#i_r_css::-moz-range-thumb {
			appearance:none;
			width:4px;
			height:8px;
			color:#000;
			background:#000;
			border:0;
		}
	}
	/\*# sourceURL=youtube_volume_plugin_style_source*\/
`