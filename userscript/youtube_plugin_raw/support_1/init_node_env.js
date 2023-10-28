const r_window = window;
r_window;
/** @type {any} */
const t_ = new EventTarget();
/** @type {any} */
const na = {};
// deno-lint-ignore no-global-assign
navigator = na;
{
	/** @type {import("./partial_window_node_env.ts").PartialWindow} */
	const window = t_;
	{
		class Storage {
			map = new Map();
			/** @type {{ [x: string]: any; }} */
			index_arr = [];
			/** @arg {string} str */
			getItem(str) {
				return this.map.get(str);
			}
			get length() {
				return this.map.size;
			}
			/** @arg {unknown} key @arg {unknown} value */
			setItem(key, value) {
				this.map.set(key, value);
			}
			/** @arg {unknown} key */
			removeItem(key) {
				this.map.delete(key);
			}
			/** @arg {string|number} index */
			key(index) {
				return this.index_arr[index];
			}
			clear() {
				this.map.clear();
			}
		}
		window.localStorage = new Storage();
	}
	{
		class HTMLElement {}
		window.HTMLElement = HTMLElement;
		class Image {}
		window.Image = Image;
		class Document extends EventTarget {
			/** @arg {string} tagName */
			createElement(tagName) {
				const element = new Element();
				element._setup(tagName);
				return element;
			}
			getElementsByTagNameNS() {
				return [];
			}
		}
		class Element {
			get style() {
				return {};
			}
			/** @arg {string} tn */
			_setup(tn) {
				this.tagName = tn;
			}
			/** @type {unknown[]} */
			children = [];
			/** @arg {unknown} other_ele */
			append(other_ele) {
				this.children.push(other_ele);
			}
		}
		window.document = new Document();
		class HTMLDivElement extends HTMLElement {}
		window.HTMLDivElement = HTMLDivElement;
		class History {
			/** @type {{}|null} */
			_state = null;
			/** @type {({}|null)[]} */
			history_list = [];
			get state() {
				return this._state;
			}
			/** @arg {{}|null} state */
			pushState(state) {
				this.history_list.push(this._state);
				this._state = state;
				console.log("history push state base");
			}
			/** @arg {{}|null} state */
			replaceState(state) {
				console.log("history replace state base");
				this.history_list[this.history_list.length - 1] = state;
			}
		}
		window.history = new History();
		history = window.history;
		window.History = History;
	}
	{
		class AudioNode {
			/** @type {[AudioNode,number?,number?][]} */
			destinations = [];
			//  connect(destinationNode: AudioNode, output?: number, input?: number): AudioNode;
			/** @arg {AudioNode} destinationNode @arg {number} [output] @arg {number} [input] */
			connect(destinationNode, output, input) {
				this.destinations.push([destinationNode, output, input]);
			}
		}
		class DynamicsCompressorParameters {
			knee = {};
			release = {};
			attack = {};
			ratio = {};
			threshold = {};
		}
		class DynamicsCompressorNode extends AudioNode {
			/** @arg {AudioContext} ctx */
			constructor(ctx) {
				super();
				this.context = ctx;
				this.p = new DynamicsCompressorParameters();
			}
			get knee() {
				if (this.p.knee) return this.p.knee;
				this.p.knee = {};
				return this.p.knee;
			}
			get attack() {
				if (this.p.attack) return this.p.attack;
				this.p.attack = {};
				return this.p.attack;
			}
			get release() {
				if (this.p.release) return this.p.release;
				this.p.release = {};
				return this.p.release;
			}
			get ratio() {
				if (this.p.ratio) return this.p.ratio;
				this.p.ratio = {};
				return this.p.ratio;
			}
			get threshold() {
				if (this.p.threshold) return this.p.threshold;
				this.p.threshold = {};
				return this.p.threshold;
			}
		}
		class Gain extends AudioNode {
			/** @arg {AudioContext} ctx */
			constructor(ctx) {
				super();
				this.ctx = ctx;
			}
		}
		class AudioContext {
			createGain() {
				return new Gain(this);
			}
			createDynamicsCompressor() {
				return new DynamicsCompressorNode(this);
			}
		}
		window.AudioContext = AudioContext;
	}
}
/** @arg {MessageChannel} message_channel */
function destroy_env(message_channel) {
	const ports = [message_channel.port1, message_channel.port2];
	for (const port of ports) {
		port.close();
		port.onmessage = null;
	}
	eval(`()=>{
		delete window;
		delete navigator;
	}`);
	do_node_exit(0);
}
/** @arg {number} exit_status */
async function do_node_exit(exit_status) {
	/** @arg {string} x */
	function dyn_import(x) {
		return import(x);
	}
	const do_node_exit = false;
	if (do_node_exit) {
		/** @type {{exit:(v:number)=>void}} */
		const process = await dyn_import("process");
		process.exit(exit_status);
	}
}
export { destroy_env };
export { t_ as window };
