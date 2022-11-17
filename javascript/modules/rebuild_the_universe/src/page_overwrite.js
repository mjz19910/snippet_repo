// ==UserScript==
// @name         rebuild the universe overwrite with my version
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://rebuildtheuniverse.com
// @match        http://rebuildtheuniverse.com/?type=real
// @match        http://rebuildtheuniverse.com/*
// @match        https://rebuildtheuniverse.com
// @match        https://rebuildtheuniverse.com/?type=real
// @match        https://rebuildtheuniverse.com/*
// @match        https://ssh.login.local:9342/mirror/rebuildtheuniverse.com/
// @grant        none
// @run-at       document-start
// ==/UserScript==
/*eslint-disable no-undef*/

/**
 * @param {(arg0: string) => any} value
 */
function use_jquery(value) {
	Object.defineProperty(window,'$',{
		value,
		writable: true,
		enumerable: true,
		configurable: true
	});
	if(!value) return;
	if(typeof value!='function') return;
	let res=value('head');
	let r_proto=Object.getPrototypeOf(res);
	r_proto.lazyload=function(/** @type {any[]} */ ..._a) {};
}
function set_jq_proxy() {
	let val=window.$;
	Object.defineProperty(window,'$',{
		get() {
			return val;
		},
		/**@arg {JQueryStatic|undefined} value */
		set(value) {
			val=value;
			if(value) use_jquery(value);
			return true;
		},
		enumerable: true,
		configurable: true
	});
}
function do_real_page_action() {
	document.stop=function() {};
	set_jq_proxy();
	console.log('done');
}
function page_url_no_protocol() {
	return location.href.slice(location.protocol.length);
}
function do_just_reset() {
	location.href="//rebuildtheuniverse.com/?type=mjz_version";
	document.write("");
	document.close();
}
function do_local_mirror_write() {
	document.write(`
		<h1>Mirror</h1>
			<a href="//ssh.login.local:9342/mirror/rebuildtheuniverse.com/">my page</a><br>
			<a href="//ssh.login.local:9342/mirror/rebuildtheuniverse.com/?type=inject">mjz version (inject)</a><br>
			<a href="//ssh.login.local:9342/mirror/rebuildtheuniverse.com/?type=mjz_version">mjz version</a><br>
			<a href="//ssh.login.local:9342/mirror/rebuildtheuniverse.com/?type=real">real_version</a><br>
			<a href="//ssh.login.local:9342/mirror/rebuildtheuniverse.com/?type=skip">skip_version</a><br>
		<h1>Real</h1>
			<a href="https://rebuildtheuniverse.com/">my page (https)</a><br>
			<a href="http://rebuildtheuniverse.com/">my page (http)</a><br>
			<a href="//rebuildtheuniverse.com/?type=mjz_version">mjz version</a><br>
			<a href="//rebuildtheuniverse.com/?type=real">real_version</a><br>
			<a href="//rebuildtheuniverse.com/?type=skip">skip_version</a><br>
	`);
	document.close();
}
function main() {
	console.log('re action 0');
	let non_proto_url=page_url_no_protocol();
	if(history.state&&history.state.real_page) {
		do_real_page_action();
	} else if(localStorage.justReset) {
		do_just_reset();
	} else if(history.state&&history.state.prev) {
		do_just_reset();
	} else if(non_proto_url=='//rebuildtheuniverse/?type=real') {
		history.pushState({real_page: true},'',non_proto_url);
		do_real_page_action();
	} else if(location.href=="https://ssh.login.local:9342/mirror/rebuildtheuniverse.com/?type=real") {
		history.pushState({real_page: true},'',non_proto_url);
		do_real_page_action();
	} else if(location.href=="https://ssh.login.local:9342/mirror/rebuildtheuniverse.com/") {
		do_local_mirror_write();
	} else {
		do_local_mirror_write();
	}
}
main();
