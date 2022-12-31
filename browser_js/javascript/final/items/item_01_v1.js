/* spell:words
--- version_list item 1 ---
v1 (cur): snippet_repo/javascript/final/items/item_01_v1.js
*/
class RustProcess {
	/** @type {(()=>void)|null} */
	callable=null;
	/**@arg {()=>void} value */
	static fromCallable(value) {
		let obj=new this;
		obj.callable=value;
		return obj;
	}
	run() {
		if(this.callable) {
			this.callable();
		}
	}
}
class RustStdLibrary {
	/**@type {RustProcess[]} */
	processes=[];
	/**
	 * @arg {any} value
	 */
	print(value) {
		console.log(value);
	}
	/**
	 * @arg {RustProcess} new_process
	 */
	start_process(new_process) {
		this.processes.push(new_process);
	}
	poll_processes() {
		if(!this.processes.length)
			return 0;
		for(let i=0;i<128;i++) {
			if(!this.processes.length)
				return i;
			let current_process=this.processes.shift();
			if(!current_process) throw new Error("Unreachable");
			current_process.run();
		}
		return 0;
	}
}
let std_lib=new RustStdLibrary;
class RustModelDescription {
	/**
	 * @arg {string} name
	 */
	constructor(name) {
		this.name=name;
		this.data={};
	}
}
class RustComputerScience {
	/**
	 * @type {any[]}
	 */
	model_description_vec=[];
	/**
	 * @arg {RustModelDescription} model_description
	 */
	addModel(model_description) {
		this.model_description_vec.push(model_description);
	}
}
class RustActor {
	/**
	 * @type {(_f: any, transmitted_actor: RustActor, _a: any, _ec: any) => void}
	 */
	callable;
	/**
	 * @arg {((_f: any, transmitted_actor: RustActor, _a: any, _ec: any) => void)} callable
	 */
	constructor(callable) {
		this.callable=callable;
	}
	/**
	 * @arg {(_f: any, transmitted_actor: RustActor, _a: any, _ec: any) => void} callable
	 */
	static fromCallable(callable) {
		return new this(callable);
	}
	/**
	 * @arg {RustActor} target_actor
	 * @arg {RustActor} transmitted_actor
	 * @arg {{ is_root: () => any; }} activator
	 * @arg {number} event_count
	 */
	process_event(target_actor,transmitted_actor,activator,event_count) {
		if(this.callable) {
			this.callable(target_actor,transmitted_actor,activator,event_count);
		}
		if('continuation' in transmitted_actor) {
			throw new Error("TODO");
			/* let result=transmitted_actor.compute_result();
			let actor=transmitted_actor.continuation.then_to;
			std_lib.start_process(() => {
				actor.process_event(actor,result,activator,event_count+1);
			}
			);*/
		}
		if(activator.is_root()) {
			console.log('actor event',target_actor,transmitted_actor,activator,event_count);
		}
	}
	compute_result() {
		return null;
	}
}
class RustActivator {
}
let comp_sci=new RustComputerScience;
{
	class ActorInterface {
		state={};
		impl=new RustActor(()=>{});
		/**
		 * @returns {void}
		 * @arg {RustActor} target_actor
		 * @arg {RustActor} transmitted_actor
		 * @arg {RustActivator} transmitted_actor
		 * @arg {number} event_count
		 * @arg {any} activator
		 */
		on_receive_event(target_actor,transmitted_actor,activator,event_count) {
			this.impl.process_event(target_actor,transmitted_actor,activator,event_count);
		}
	}
	let item_data={
		url: "https://en.wikipedia.org/wiki/Actor_model",
		uses: ["message","cell","optional semaphore","activator",],
		requires: ["start process",],
		default_actors: {
			print: RustActor.fromCallable(function(/** @type {any} */ _f,/** @type {RustActor} */ transmitted_actor,/** @type {any} */ _a,/** @type {any} */ _ec) {
				console.log('actor',transmitted_actor);
				throw new Error("TODO: transmitted_actor.apply_value")
				// std_lib.print(transmitted_actor.apply_value);
			})
		},
		can: [//
			"send message", //
			"create actor", //
			"create activator", //
		],
		code_snippets: [//
			"(apply: message (then-to: continuation))", //
			"<f (apply: x (then-to: (X(y) (1 + y)) )) a ec>", //
			"<print (apply: 3) a 0>", //
		],
		interface: new ActorInterface,
		interface_type: {
			on_receive_event: "@returns {void} @arg {RustActor} target_actor @arg {RustActor} transmitted_actor @arg {RustActivator} transmitted_actor @arg {number} event_count",
			get_response: "@returns message",
			state: "@private",
			impl: "@type {RustActor}",
		},
		creates: ["actor","activator"],
		sends: ["message"],
		tags: [//
			"universal primitive of concurrent computation","fork actor", //
			"continuation is the actor to which another actor can be sent", //
		]
	};
	let item=new RustModelDescription("Actor model");
	item.data=item_data;
	comp_sci.addModel(item);
}
comp_sci.model_description_vec[0].data.default_actors.print.callable(null,{
	apply_value: 4
},null,0);
