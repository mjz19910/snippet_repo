let done = 0;
/** @type {{[x:string]:{}}} */
let unk_obj = {}
let my_console = {}
my_console.t = {}
/** @typedef {(...x:TemplateStringsArray[])=>Formatter} Formatter */
/** @arg {Formatter} e */
function todo_debug_api(e) {
	e`MAX_SETTING_SIZE``DBG_VERSION``Bridge[Init,Start,Alloc,Free,GetDbgVersion]``BridgeSetting[Get,GetUint,Set,SetUint,Flush,Read]``MAX_[LABEL,COMMENT,MODULE,IMPORT,BREAKPOINT,CONDITIONAL_[EXPR,TEXT],SCRIPT_LINE,THREAD_NAME,WATCH_NAME,STRING,ERROR,SECTION,COMMAND_LINE,MNEMONIC]._SIZE``PAGE_SIZE``[initialized,paused,running,stopped]``SEG_[DEFAULT,ES,DS,FS,GS,CS,SS]``flag[module,label,comment,bookmark,$function,loop,args,NoFuncOffset]``bp_[none,normal,hardware,memory,dll,exception]``FUNC_[NONE,BEGIN,MIDDLE,END,SINGLE]``LOOP_[NONE,BEGIN,MIDDLE,ENTRY,END,SINGLE]``XREF_[NONE,DATA,JMP,CALL]``ARG_[NONE,BEGIN,MIDDLE,END,SINGLE]`

	"DBG_ ARRAY START"
	//cspell:disable
	e`DBG_[SCRIPT_LOAD[UNLOAD,RUN,STEP,BPTOGGLE,BPGET,CMDEXEC,ABORT,GETLINETYPE,SETIP,GETBRANCHINFO],SYMBOL_ENUM,ASSEMBLE_AT,
MODBASE_FROM_NAME,DISASM_AT,STACK_COMMENT_GET,SETTINGS_UPDATED,DISASM_FAST_AT,MENU_ENTRY_CLICKED,
FUNCTION_[GET,OVERLAPS,ADD,DEL],
SET_[AUTO_COMMENT,AUTO_LABEL,AUTO_BOOKMARK,AUTO_FUNCTION]._AT,
LOOP_[GET,OVERLAPS,ADD,DEL],IS_[RUN_LOCKED,BP_DISABLED],
DELETE_[AUTO_COMMENT,AUTO_LABEL,AUTO_BOOKMARK,AUTO_FUNCTION]._RANGE,WIN_EVENT[,_GLOBAL],[,DE]INITIALIZE_LOCKS,
SYMBOL_ENUM_FROMCACHE,DELETE_[COMMENT,LABEL,BOOKMARK]._RANGE,XREF_[ADD,DEL_ALL,GET],
ENCODE_[TYPE,SIZE]._GET,
[DELETE_,(0,1),,2,RELEASE_,3,GET_,3]ENCODE_TYPE_[RANGE,SEG,GET,BUFFER],
ARGUMENT_[GET,OVERLAPS,ADD,DEL],SELCHANGED,
GET_[THREAD_LIST,TIME_WASTED_COUNTER,STRING_AT,FUNCTIONS,XREF_COUNT_AT,XREF_TYPE_AT,
WATCH_LIST,PROCESS_HANDLE,THREAD_HANDLE,PROCESS_ID,THREAD_ID,[PEB,TEB]._ADDRESS],
ANALYZE_FUNCTION,MENU_PREPARE]`
	e`
linecommand
linebranch
linelabel
linecomment
lineempty``scriptnobranch
scriptjmp
scriptjnejnz
scriptjejz
scriptjbjl
scriptjajg
scriptjbejle
scriptjaejge
scriptcall``instr_normal
instr_branch
instr_stack``arg_normal
arg_memory``str_none
str_ascii
str_unicode``_PriorityIdle
_PriorityAboveNormal
_PriorityBelowNormal
_PriorityHighest
_PriorityLowest
_PriorityNormal
_PriorityTimeCritical
_PriorityUnknown``_Executive
_FreePage
_PageIn
_PoolAllocation
_DelayExecution
_Suspended
_UserRequest``_WrExecutive
_WrFreePage
_WrPageIn
_WrPoolAllocation
_WrDelayExecution
_WrSuspended
_WrUserRequest
_WrEventPair
_WrQueue``_WrLpcReceive
_WrLpcReply``_WrVirtualMemory
_WrPageOut
_WrRendezvous``_Spare2
_Spare3
_Spare4
_Spare5``_WrCalloutStack
_WrKernel
_WrResource
_WrPushLock
_WrMutex
_WrQuantumEnd
_WrDispatchInt
_WrPreempted
_WrYieldExecution
_WrFastMutex
_WrGuardedMutex
_WrRundown``size_byte
size_word
size_dword
size_qword``enc_unknown
enc_byte
enc_word
enc_dword
enc_fword
enc_qword
enc_tbyte
enc_oword
enc_mmword
enc_xmmword
enc_ymmword
enc_zmmword
enc_real4
enc_real8
enc_real10
enc_ascii
enc_unicode
enc_code
enc_junk
enc_middle``TYPE_UINT
TYPE_INT
TYPE_FLOAT
TYPE_ASCII
TYPE_UNICODE
TYPE_INVALID``MODE_DISABLED
MODE_ISTRUE
MODE_ISFALSE
MODE_CHANGED
MODE_UNCHANGED``hw_access
hw_write
hw_execute``mem_access
mem_read
mem_write
mem_execute``dll_load
dll_unload
dll_all``ex_firstchance
ex_secondchance
ex_all``hw_byte
hw_word
hw_dword
hw_qword`
	//cspell:enable
}
function create_dbg_api() {
	class ListInfo {
	}
	//SWIG
	class SwigPyIterator {
	}
	//cspell:disable
	function ListInfo_swigregister() { }
	function SwigPyIterator_swigregister() { }
	class ThreadVector {
	}
	function ThreadVector_swigregister() { }
	function GetThreadInfoList() {
		// @ts-expect-error(2403)
		_.getThreadInfoList(1)
	}
	//cspell:enable
	function BridgeInit() { }
	function BridgeStart() { }
	/** @arg {any} size */
	function BridgeAlloc(size) {
		void size
	}
	/** @arg {any} ptr */
	function BridgeFree(ptr) {
		void ptr
	}
	/** @arg {any} section @arg {any} key @arg {any} value */
	function BridgeSettingGet(section, key, value) {
		void section, key, value
	}
	/** @arg {any} section @arg {any} key @arg {any} value */
	function BridgeSettingGetUint(section, key, value) {
		void section, key, value
	}
	/** @arg {any} section @arg {any} key @arg {any} value */
	function BridgeSettingSet(section, key, value) {
		void section, key, value
	}
	/** @arg {any} section @arg {any} key @arg {any} value */
	function BridgeSettingSetUint(section, key, value) {
		void section, key, value
	}
	function BridgeSettingFlush() { }
	/** @arg {any} errorLine */
	function BridgeSettingRead(errorLine) {
		void errorLine
	}
	function BridgeGetDbgVersion() { }
	//cspell:disable
	return {
		ListInfo, ListInfo_swigregister,
		SwigPyIterator, SwigPyIterator_swigregister,
		ThreadVector, ThreadVector_swigregister,
		GetThreadInfoList,
		BridgeInit,
		BridgeStart,
		BridgeAlloc,
		BridgeFree,
		BridgeSettingGet,
		BridgeSettingGetUint,
		BridgeSettingSet,
		BridgeSettingSetUint,
		BridgeSettingFlush,
		BridgeSettingRead,
		BridgeGetDbgVersion,
		/** @arg {string} value */
		eval_fn(value) {
			return eval(value)
		}
	}
	//cspell:enable
}
let x64dbg_api = create_dbg_api()

if (typeof exports === "object") {
	exports._export_x64dbg_api = x64dbg_api;
}
while (!done) {
	let res;
	try {
		res = todo_debug_api((function () {
			/** @arg {TemplateStringsArray} e */
			var fn = function (e) {
				if (e[0].indexOf("\n") > -1) {
					var ar = e[0].split("\n")
					var dist = 1
					/** @type {string[]} */
					var results = []
					ar.forEach(e => {
						if (results.indexOf(e.slice(0, dist)) == -1) {
							results.push(e)
						}
					}
					)
					console.log(results)
				} else {
					console.log(e)
				}
				return fn
			}
			return fn
		}
		)())
		done = 1
	} catch (e_x) {
		if (!(e_x instanceof Error)) {
			throw e_x;
		}
		let e = e_x;
		/** @arg {Error} e */
		function add_message(e) {
			if (e.message.indexOf("' of undefined") > -1) {
				var unq_name = e.message.match(/.+'(.+)'.+/)?.[1];
				if (!unq_name) {
					debugger;
					return;
				}
				if (typeof unk_obj[unq_name] == "undefined")
					unk_obj[unq_name] = {}
				Object.defineProperty(unk_obj[unq_name], unq_name, {
					get: function () {
						my_console.t = `.${unq_name}`;
						console.log(unq_name);
						return JSON.parse(`{"${unq_name}":{}}`)
					},
					set: function () { }
				})
				done = 0
			}
		}
		/** @arg {Error} e */
		function add_def(e) {
			if (e.message.indexOf(" is not defined") > -1) {
				var unq_obj_t = e.message.slice(0, e.message.indexOf(" is not defined"))
				Object.defineProperty(window, unq_obj_t, {
					get: function () {
						console.log(my_console.t);
						my_console.t = unq_obj_t;
						return unk_obj;
					},
					set: function () { }
				})
			} else {
				done = 1
			}
		}
		add_def(e)
		add_message(e)
		console.log(e)
		my_console.t = e
	}
	console.log(res);
}
(function () {
	let my_console = {}
	var logger = function () {
		var ar = Array.from(Object.keys(Object.getOwnPropertyDescriptors(window)))
		var ard = ar.indexOf("done")
		console.log(ar.slice(ard))
	}
	my_console.logger = logger;
	/** @type {string[]} */
	my_console.before = [];
	/** @arg {number} cnt */
	var wait_for_api = function (cnt) {
		var ar = Object.getOwnPropertyNames(window)
		var ard = ar.indexOf("done")
		my_console.before = ar.slice(ard)
		if (my_console.notify_get) {
			var result = my_console.notify_get()
			console.log("console_api in:" + cnt)
			console.log(result)
			return
		}
		setTimeout(wait_for_api, 50, cnt + 1)
	}
	var ar = Object.getOwnPropertyNames(window)
	var ar2 = ar
	var ard = ar.indexOf("done")
	var val = ar.slice(ard)
	/** @type {{[x:string]:any}} */
	var c_api = {}
	/** @type {{[x:string]:()=>any}} */
	var gc_api = {}
	/** @type {{[x:string]:(v:any)=>void}} */
	var sc_api = {}
	console.log(val)
	if (val.indexOf("$_") > -1) {
		var cap_n = val.slice(3)
		console.log(cap_n.length)
		for (var i of cap_n) {
			var dsc = Object.getOwnPropertyDescriptor(window, i)
				, gs = 0
			if (!dsc) continue;
			if (dsc.get) {
				gc_api[i] = dsc.get
				gs = 1
			}
			if (dsc.set) {
				sc_api[i] = dsc.set
				gs = 1
			}
			if (!gs) {
				c_api[i] = dsc.value
			}
		}
	}
	if (my_console.before) {
		my_console.notify_get = function () {
			var ar = Object.getOwnPropertyNames(window)
			var ard = ar.indexOf("done")
			var ary = ar2.indexOf("done")
			void ary
			var val = ar.slice(ard)
			return [val, {
				n: c_api,
				g: gc_api,
				s: sc_api
			}]
		}
	} else {
		wait_for_api(1)
	}
}
)()
