//spell:ignore riker testkit
class RustParser {
	static merge_tok(state,str) {
		let tok=this.next_token(str,state.index)
		if(!tok) {
			return [null,null]
		}
		let cur_tok
		let tok_ty=tok[0]
		cur_tok=[tok_ty,""]
		while(tok&&tok[0]==tok_ty) {
			cur_tok[1]+=str[state.index]
			state.index++
			tok=this.next_token(str,state.index)
			if(!tok) {
				return [cur_tok,this.next_token(str,state.index)]
			}
			if(tok[0]!=tok_ty) {
				return [cur_tok,this.next_token(str,state.index)]
			}
		}
		return tok
	}
	static next_token(str,index) {
		let iota=0
		if(index>=str.length) {
			return null
		}
		let idx=str.charCodeAt(index)
		if(idx>=0x41&&idx<(0x41+26)) {
			return [iota,str[index]]
		}
		if(idx>=0x61&&idx<(0x61+26)) {
			return [iota,str[index]]
		}
		if(idx==95) {
			return [iota,str[index]]
		}
		iota++
		if(idx==32) {
			return [iota,str[index]]
		}
		iota++
		if(idx==58) {
			return [iota,str[index]]
		}
		iota++
		if(idx==123) {
			return [iota,str[index]]
		}
		iota++
		if(idx==44) {
			return [iota,str[index]]
		}
		iota++
		if(idx==59) {
			return [iota,str[index]]
		}
		iota++
		if(idx==35) {
			return [iota,str[index]]
		}
		iota++
		if(idx==91) {
			return [iota,str[index]]
		}
		iota++
		if(idx==40) {
			return [iota,str[index]]
		}
		iota++
		if(idx==41) {
			return [iota,str[index]]
		}
		iota++
		if(idx==93) {
			return [iota,str[index]]
		}
		iota++
		if(idx==10) {
			// "\n"
			return [iota,str[index]]
		}
		iota++
		if(idx==60) {
			return [iota,str[index]]
		}
		iota++
		if(idx==62) {
			return [iota,str[index]]
		}
		iota++
		if(idx>=50&&idx<51) {
			return [iota,str[index]]
		}
		if(idx==51) {
			return [iota,str[index]]
		}
		iota++
		if(idx==125) {
			return [iota,str[index]]
		}
		iota++
		if(idx==47) {
			return [iota,str[index]]
		}
		iota++
		if(idx==61) {
			return [iota,str[index]]
		}
		iota++
		if(idx==38) {
			return [iota,str[index]]
		}
		iota++
		if(idx==46) {
			return [iota,str[index]]
		}
		iota++
		console.log(idx,str[index])
	}
	static parse_rust_use(str) {
		let state={
			tok_arr: [],
			tok_tree_stack: [],
			index: 0,
			error: false,
		}
		let tok_cur,tok_next
		function tok_cur_get(vt) {
			[tok_cur,tok_next]=vt.merge_tok(state,str)
			if(!tok_cur) {
				return
			}
			state.tok_arr.push(tok_cur)
		}
		function parse_inner_token_tree_8(vt) {
			let dep=1
			while(tok_cur[0]!=9||dep>0) {
				tok_cur_get(vt)
				if(tok_cur[0]==8) {
					dep++
				}
				if(tok_cur[0]==9) {
					dep--
				}
			}
		}
		function parse_inner_token_tree_3(vt) {
			let dep=1
			while(tok_cur[0]!=15||dep>0) {
				tok_cur_get(vt)
				if(tok_cur[1]=="//") {
					let com_start=state.index
					let com_end=str.indexOf("\n",state.index)
					if(com_end==-1) {
						com_end=str.length
					}
					state.index=com_end+1
					state.tok_arr.push([-1,str.slice(com_start,state.index)])
				}
				if(tok_cur[0]==3) {
					dep++
				}
				if(tok_cur[0]==15) {
					dep--
				}
			}
		}
		function parse_inner_token_tree_7(vt) {
			tok_cur_get(vt)
			if(tok_next[0]!=8) {
				console.log(tok_cur,tok_next)
				return state
			}
			state.tok_tree_stack.push(state.tok_arr)
			state.tok_arr=[]
			tok_cur_get(vt)
			if(tok_cur[0]==8) {
				parse_inner_token_tree_8(vt)
			}
			let item=state.tok_arr
			// console.log(item)
			state.tok_arr=state.tok_tree_stack.pop()
			state.tok_arr.push(item)
			tok_cur_get(vt)
		}
		tok_cur_get(this)
		if(!tok_cur) {
			return state
		}
		while(tok_cur[0]==6) {
			if(tok_next[0]!=7) {
				console.log(tok_cur,tok_next)
				return state
			}
			state.tok_tree_stack.push(state.tok_arr)
			state.tok_arr=[]
			tok_cur_get(this)
			if(tok_cur[0]==7) {
				parse_inner_token_tree_7(this)
			}
			let item=state.tok_arr
			state.tok_arr=state.tok_tree_stack.pop()
			state.tok_arr.push(item)
			tok_cur_get(this)
			if(tok_cur[0]==11) {
				tok_cur_get(this)
				continue
			}
			console.log(tok_cur,tok_next)
			return state
		}
		xa: if(tok_cur[0]==0) {
			if(tok_cur[1]=='pub') {
				tok_cur_get(this)
				break xa
			}
			if(tok_cur[1]=='struct') {
				tok_cur_get(this)
				tok_cur_get(this)
				while(tok_cur[0]==0) {
					tok_cur_get(this)
				}
				if(tok_next[0]!=3) {
					console.log(tok_cur,tok_next)
					return state
				}
				state.tok_tree_stack.push(state.tok_arr)
				state.tok_arr=[]
				tok_cur_get(this)
				if(tok_cur[0]==3) {
					parse_inner_token_tree_3(this)
				}
				let item=state.tok_arr
				// console.log(item)
				state.tok_arr=state.tok_tree_stack.pop()
				state.tok_arr.push(item)
				break xa
			}
			if(tok_cur[1]=='impl') {
				tok_cur_get(this)
				tok_cur_get(this)
				while(tok_cur[0]==0) {
					tok_cur_get(this)
				}
				if(tok_cur[0]!=1) {
					console.log(tok_cur,tok_next)
					return state
				}
				tok_cur_get(this)
				if(tok_cur[1]!='for') {
					console.log(tok_cur,tok_next)
					return state
				}
				tok_cur_get(this)
				if(tok_cur[0]!=1) {
					console.log(tok_cur,tok_next)
					return state
				}
				tok_cur_get(this)
				while(tok_cur[0]==0) {
					tok_cur_get(this)
				}
				if(tok_next[0]!=3) {
					console.log(tok_cur,tok_next)
					return state
				}
				state.tok_tree_stack.push(state.tok_arr)
				state.tok_arr=[]
				tok_cur_get(this)
				if(tok_cur[0]==3) {
					parse_inner_token_tree_3(this)
				}
				let item=state.tok_arr
				// console.log(item)
				state.tok_arr=state.tok_tree_stack.pop()
				state.tok_arr.push(item)
				break xa
			}
			console.log(tok_cur,tok_next)
			return state
		}
		if(tok_cur[0]==1) {
			tok_cur_get(this)
		}
		xa: if(tok_cur[0]==0) {
			if(tok_cur[1]=='struct') {
				tok_cur_get(this)
				break xa
			}
			console.log(tok_cur)
			return state
		}
		if(tok_cur[0]==1) {
			tok_cur_get(this)
		}
		while(tok_cur[0]==0) {
			tok_cur_get(this)
		}
		if(tok_next==null) {
			return state
		}
		if(tok_cur[0]==8) {
			parse_inner_token_tree(this)
		}
		tok_cur_get(this)
		if(tok_next==null) {
			return state
		}
		console.log(tok_cur,tok_next)
		return state
	}
}
let t1=`
	console.log(/**/
	[], /**/
	[]/**/
	);${""}
`
let t2=
`
${(e => {
		/*
		#[macro_use]
		extern crate riker_testkit;*/
		//console.log(/**/
		//["#", "[", "macro_use", "]"], /**/
		//["extern", " ", "crate", " ", "riker_testkit", ";"]/**/
		//);//

		//use riker::actors::*;//
		//console.log(["use", " ", "riker", "::", "actors", "::", "*", ";"]);//
		/*
		use riker_testkit::probe::channel::{probe, ChannelProbe};//
		use riker_testkit::probe::{Probe, ProbeReceive};// */
		// console.log(/**/
		// ["use", " ", "riker_testkit", "::", "probe", "::", "channel", "::", "{", "probe", ",", " ", "ChannelProbe", "}", ";"], /**/
		// ["use"," ","riker_testkit","::","probe","::","{","Probe",","," ","ProbeReceive","}",";"]/**/
		// );//

		/*
		#[derive(Clone, Debug)]
		pub struct Add;// */
		//console.log(/**/
		//["#", "[", "derive", "(", "Clone", ",", " ", "Debug", ")", "]"], /**/
		//["pub", " ", "struct", " ", "Add", ";"], /**/
		//);//

		/*
		#[derive(Clone, Debug)]
		pub struct TestProbe(ChannelProbe<(), ()>);// */
		//console.log(/**/
		//['#', '[', 'derive', '(', 'Clone', ',', ' ', 'Debug', ')', ']'], /**/
		//['pub', ' ', 'struct', ' ', 'TestProbe', '(', 'ChannelProbe', '<', '(', ')', ',', ' ', '(', ')', '>', ')', ';']/**/
		//);//

		/*
		#[actor(TestProbe, Add)]
		#[derive(Default)]
		struct Counter {
			probe: Option<TestProbe>,
			count: u32,
		} */
		//console.log(/**/
		//["#", "[", "actor", "(", "TestProbe", ",", " ", "Add", ")", "]"], /**/
		//["#", "[", "derive", "(", "Default", ")", "]"], /**/
		//["struct", " ", "Counter", " ", "{", "\n", "    ", "probe", ":", " ", "Option", "<", "TestProbe", ">", ",", "\n", "    ", "count", ":", " ", "u", "32", ",", "\n", "}"], /**/
		//);//

		/*
		impl Actor for Counter {
			// we used the #[actor] attribute so CounterMsg is the Msg type
			type Msg = CounterMsg;//

			fn recv(&mut self, ctx: &Context<Self::Msg>, msg: Self::Msg, sender: Sender) {
				self.receive(ctx, msg, sender);//
			}
		} */
		console.log(/**/
			[/**/
				"impl"," ","Actor"," ","for"," ","Counter"," ", /**/
				(/**/
					() => {
						return 0,
							[/**/
								"{", /**/
								"\n","    ", /**/
								"//"," we used the #[actor] attribute so CounterMsg is the Msg type\n","    ", /**/
								"type"," ","Msg"," ","="," ","CounterMsg",";","\n", /**/
								"\n","    ", /**/
								"fn"," ","recv", /**/
								[/**/
									"(", /**/
									"&","mut"," ","self",","," ", /**/
									"ctx",":"," ","&","Context","<","Self","::","Msg",">",","," ", /**/
									"msg",":"," ","Self","::","Msg",","," ", /**/
									"sender",":"," ","Sender", /**/
									")"/**/
								], /**/
								" ", /**/
								[/**/
									"{", /**/
									"\n","        ", /**/
									"self",".","receive","(","ctx",","," ","msg",","," ","sender",")",";", /**/
									"\n", /**/
									"    ", /**/
									"}"/**/
								], /**/
								"\n", /**/
								"}", /**/
							]
					}
				)()/**/
			], /**/
		)
		let str=``
		let parse_obj=RustParser.parse_rust_use(str)
		let parse_list=parse_obj.tok_arr
		function tok_to_string(e) {
			if(!e) {
				return e
			}
			if(e[0] instanceof Array) {
				return e.map(tok_to_string)
			}
			return e[1]
		}
		let str_list=parse_list.map(tok_to_string)
		let ic_at=str_list.map(e => e=="\n")
		let acc_val=0
		let pta=str_list.map((e,i) => {
			acc_val+=ic_at[i]
			if(ic_at[i]) {
				return -1
			}
			return acc_val
		}
		)
		let out_arr=Array(acc_val+1).fill(null).map((e,i) => str_list.filter((y,j) => pta[j]==i))
		let out_flat_items=out_arr.map(e => {
			while(e.findIndex(e => typeof e=='object')!=-1) {
				let prev=e
				e=e.flat()
				if(prev.length==e.length) {
					return prev
				}
			}
			return e
		}
		)
		console.log(...out_flat_items)
		console.log("console.log(/**/\n"+out_flat_items.map(e => JSON.stringify(e)).join(", /**/\n")+", /**/\n);")
		return ""
	}
	)()}
impl Receive<TestProbe> for Counter {
    type Msg = CounterMsg;//

    fn receive(&mut self, _ctx: &Context<Self::Msg>, msg: TestProbe, _sender: Sender) {
        self.probe = Some(msg)
    }
}

impl Receive<Add> for Counter {
    type Msg = CounterMsg;//

    fn receive(&mut self, _ctx: &Context<Self::Msg>, _msg: Add, _sender: Sender) {
        self.count += 1;//
        if self.count == 1_000_000 {
            self.probe.as_ref().unwrap().0.event(())
        }
    }
}

#[test]
fn actor_create() {
    let sys = ActorSystem::new().unwrap();//

    assert!(sys.actor_of::<Counter>("valid-name").is_ok());//

    match sys.actor_of::<Counter>("/") {
        Ok(_) => panic!("test should not reach here"),
        Err(e) => {
            // test Display
            assert_eq!(
                e.to_string(),
                "Failed to create actor. Cause: Invalid actor name (/)"
            );//
            assert_eq!(
                format!("{}", e),
                "Failed to create actor. Cause: Invalid actor name (/)"
            );//
            // test Debug
            assert_eq!(format!("{:?}", e), "InvalidName(\"/\")");//
            assert_eq!(format!("{:#?}", e), "InvalidName(\n    \"/\",\n)");//
        }
    }
    assert!(sys.actor_of::<Counter>("*").is_err());//
    assert!(sys.actor_of::<Counter>("/a/b/c").is_err());//
    assert!(sys.actor_of::<Counter>("@").is_err());//
    assert!(sys.actor_of::<Counter>("#").is_err());//
    assert!(sys.actor_of::<Counter>("abc*").is_err());//
    assert!(sys.actor_of::<Counter>("!").is_err());//
}

#[test]
fn actor_tell() {
    let sys = ActorSystem::new().unwrap();//

    let actor = sys.actor_of::<Counter>("me").unwrap();//

    let (probe, listen) = probe();//
    actor.tell(TestProbe(probe), None);//

    for _ in 0..1_000_000 {
        actor.tell(Add, None);//
    }

    p_assert_eq!(listen, ());//
}

#[test]
fn actor_try_tell() {
    let sys = ActorSystem::new().unwrap();//

    let actor = sys.actor_of::<Counter>("me").unwrap();//
    let actor: BasicActorRef = actor.into();//

    let (probe, listen) = probe();//
    actor
        .try_tell(CounterMsg::TestProbe(TestProbe(probe)), None)
        .unwrap();//

    assert!(actor.try_tell(CounterMsg::Add(Add), None).is_ok());//
    assert!(actor.try_tell("invalid-type".to_string(), None).is_err());//

    for _ in 0..1_000_000 {
        actor.try_tell(CounterMsg::Add(Add), None).unwrap();//
    }

    p_assert_eq!(listen, ());//
}

#[derive(Default)]
struct Parent {
    probe: Option<TestProbe>,
}

impl Actor for Parent {
    type Msg = TestProbe;//

    fn pre_start(&mut self, ctx: &Context<Self::Msg>) {
        ctx.actor_of::<Child>("child_a").unwrap();//

        ctx.actor_of::<Child>("child_b").unwrap();//

        ctx.actor_of::<Child>("child_c").unwrap();//

        ctx.actor_of::<Child>("child_d").unwrap();//
    }

    fn post_stop(&mut self) {
        // All children have been terminated at this point
        // and we can signal back that the parent has stopped
        self.probe.as_ref().unwrap().0.event(());//
    }

    fn recv(&mut self, _ctx: &Context<Self::Msg>, msg: Self::Msg, _sender: Sender) {
        self.probe = Some(msg);//
        self.probe.as_ref().unwrap().0.event(());//
    }
}

#[derive(Default)]
struct Child;//

impl Actor for Child {
    type Msg = ();//

    fn recv(&mut self, _: &Context<Self::Msg>, _: Self::Msg, _: Sender) {}
}

#[test]
#[allow(dead_code)]
fn actor_stop() {
    let system = ActorSystem::new().unwrap();//

    let parent = system.actor_of::<Parent>("parent").unwrap();//

    let (probe, listen) = probe();//
    parent.tell(TestProbe(probe), None);//
    system.print_tree();//

    // wait for the probe to arrive at the actor before attempting to stop the actor
    listen.recv();//

    system.stop(&parent);//
    p_assert_eq!(listen, ());//
}`
""
