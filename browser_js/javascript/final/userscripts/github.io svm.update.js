// ==UserScript==
// @name         github.io svm.update
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  try to take over the world!
// @author       You
// @match        https://*.github.io/*
// @grant        none
// @run-at       document-start
// ==/UserScript==
// @ts-nocheck
/* eslint-disable no-undef */

(function() {
	'use strict';
	window.svm={};
	let t=window.svm;
	t.update=()=>{};
	setInterval(()=>svm.update(),33);
	let on_readyState_interactive=function(){};
	class CustomEventTarget {
		constructor(){
			this._listeners={};
		}
		create_for_type(type){
			return this._listeners[type]??=[];
		}
		for_type(type){
			return this._listeners[type];
		}
		addEventListener(type,listener){
			this.create_for_type(type).push({handler:listener,disposed:false});
		}
		removeEventListener(type,listener){
			let list=this.for_type(type)
			let id=list.findIndex(e=>e.handler===listener)
			if(list.length>1){
				let old=list[id]
				old.disposed=true;
				list[id]=list.pop();
			}else{
				list.length=0;
			}
		}
		dispatchEvent(ev){
			let type=ev.type;
			let events=this.for_type(type);
			if(events===void 0)
				return;
			let m_events=events.slice();
			for(let i=0,m_cur_event;i<m_events.length;i++){
				m_cur_event=m_events[i];
				if(m_cur_event.disposed){
					continue;
				}
				let fn=m_cur_event.handler;
				fn(ev);
			}
		}
	}
	let event_target=new CustomEventTarget;
	{
		let state={
			id:0,
			ls:new Map,
		};
		let backing_state={
			rx_port:null,
			tx_port:null,
		};
		{
			let {port1:rx,port2:tx}=new MessageChannel();
			backing_state.rx_port=rx;
			backing_state.tx_port=tx;
		}
		backing_state.rx_port.onmessage=function(e){
			let msg=e.data
			let type=msg.type;
			let obj;
			let ls=state.ls;
			if(type=='post'){
				let id=msg.id;
				obj=ls.get(id);
				let callback=obj.callback;
				callback(obj);
				obj.limit-=1;
				if(obj.limit>=0){
					backing_state.tx_port.postMessage(msg);
				}else{
					ls.delete(id);
				}
			}
		}
		event_target.addEventListener('post',function(event){
			let m_id=state.id++;
			let args=event.detail.arguments;
			let fn=args.callback;
			let m_event={
				id:m_id,
				callback:fn,
				limit:args.limit,
			};
			state.ls.set(m_id,m_event);
			backing_state.tx_port.postMessage({
				type:'post',
				id:m_id,
			});
		});
		event_target.dispatchEvent({
			type:'post',
			detail:{
				arguments:{
					callback:(e)=>{
						if(0)
							console.log(e);
					},
					limit:0,
				}
			},
		});
	}
	function on_load(){
		window.removeEventListener('load',on_load);
	}
	function on_readystatechange(){
		let rs=document.readyState;
		switch(rs){
			case 'loading':
				console.log('document ready state load');
				break;
			case 'interactive':
				on_readyState_interactive();
				break;
			case 'complete':
				break;
		}
	}
	function init(){
		document.addEventListener('readystatechange',on_readystatechange);
		window.addEventListener('load',on_load);
	}
	init();
	// Your code here...
})();