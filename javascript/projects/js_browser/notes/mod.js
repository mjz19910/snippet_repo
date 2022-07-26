class classes {
  get Document() {
    return get_Document()
  }
  get DocumentAndElementEventHandlers() {
    return class DocumentAndElementEventHandlers {
      static idl=`
interface mixin DocumentAndElementEventHandlers {
  attribute EventHandler oncopy${";"}
  attribute EventHandler oncut${";"}
  attribute EventHandler onpaste${";"}
};`
      static todo=new TODOClass("DocumentAndElementEventHandlers")
    }
  }
}
class TODOClass {
  /**
   * @param {string} err_str
   */
  constructor(err_str) {
    throw new Error(err_str)
  }
}
function get_Document() {
  // https://html.spec.whatwg.org/multipage/dom.html#the-document-object
  return class Document {
    static idl=`enum DocumentReadyState { "loading", "interactive", "complete" }${";"}
enum DocumentVisibilityState { "visible", "hidden" }${";"}
typedef (HTMLScriptElement or SVGScriptElement) HTMLOrSVGScriptElement${";"}

[LegacyOverrideBuiltIns]
partial interface Document {
  // resource metadata management
  [PutForwards=href, LegacyUnforgeable] readonly attribute Location? location${";"}
  attribute USVString domain${";"}
  readonly attribute USVString referrer${";"}
  attribute USVString cookie${";"}
  readonly attribute DOMString lastModified${";"}
  readonly attribute DocumentReadyState readyState${";"}

  // DOM tree accessors
  getter object (DOMString name)${";"}
  [CEReactions] attribute DOMString title${";"}
  [CEReactions] attribute DOMString dir${";"}
  [CEReactions] attribute HTMLElement? body${";"}
  readonly attribute HTMLHeadElement? head${";"}
  [SameObject] readonly attribute HTMLCollection images${";"}
  [SameObject] readonly attribute HTMLCollection embeds${";"}
  [SameObject] readonly attribute HTMLCollection plugins${";"}
  [SameObject] readonly attribute HTMLCollection links${";"}
  [SameObject] readonly attribute HTMLCollection forms${";"}
  [SameObject] readonly attribute HTMLCollection scripts${";"}
  NodeList getElementsByName(DOMString elementName)${";"}
  readonly attribute HTMLOrSVGScriptElement? currentScript; // classic scripts in a document tree only

  // dynamic markup insertion
  [CEReactions] Document open(optional DOMString unused1, optional DOMString unused2); // both arguments are ignored
  WindowProxy? open(USVString url, DOMString name, DOMString features)${";"}
  [CEReactions] undefined close()${";"}
  [CEReactions] undefined write(DOMString... text)${";"}
  [CEReactions] undefined writeln(DOMString... text)${";"}

  // user interaction
  readonly attribute WindowProxy? defaultView${";"}
  boolean hasFocus()${";"}
  [CEReactions] attribute DOMString designMode${";"}
  [CEReactions] boolean execCommand(DOMString commandId, optional boolean showUI = false, optional DOMString value = "")${";"}
  boolean queryCommandEnabled(DOMString commandId)${";"}
  boolean queryCommandIndeterm(DOMString commandId)${";"}
  boolean queryCommandState(DOMString commandId)${";"}
  boolean queryCommandSupported(DOMString commandId)${";"}
  DOMString queryCommandValue(DOMString commandId)${";"}
  readonly attribute boolean hidden${";"}
  readonly attribute DocumentVisibilityState visibilityState${";"}

  // special event handler IDL attributes that only apply to Document objects
  [LegacyLenientThis] attribute EventHandler onreadystatechange${";"}
  attribute EventHandler onvisibilitychange${";"}

  // also has obsolete members
}${";"}
Document includes GlobalEventHandlers${";"}
Document includes DocumentAndElementEventHandlers;`
    static policy_container=new TODOClass("new policy container")
    static description=`
The Document has a policy container (a policy container), initially a new policy container, which contains policies which apply to the Document.

The Document has a permissions policy, which is a permissions policy, which is initially empty.

The Document has a module map, which is a module map, initially empty.

The Document has a cross-origin opener policy, which is a cross-origin opener policy.

The Document has an is initial about:blank, which is a boolean, initially false. A browsing context browsingContext is still on its initial about:blank Document if browsingContext's session history's size is 1 and browsingContext's session history[0]'s document's is initial about:blank is true.

The Document has a navigation id, which is a navigation id or null.`
    static todo=new TODOClass("Document")
  }
}
class GlobalEventHandlers {
  static idl=`interface mixin GlobalEventHandlers {
  attribute EventHandler onabort${";"}
  attribute EventHandler onauxclick${";"}
  attribute EventHandler onblur${";"}
  attribute EventHandler oncancel${";"}
  attribute EventHandler oncanplay${";"}
  attribute EventHandler oncanplaythrough${";"}
  attribute EventHandler onchange${";"}
  attribute EventHandler onclick${";"}
  attribute EventHandler onclose${";"}
  attribute EventHandler oncontextlost${";"}
  attribute EventHandler oncontextmenu${";"}
  attribute EventHandler oncontextrestored${";"}
  attribute EventHandler oncuechange${";"}
  attribute EventHandler ondblclick${";"}
  attribute EventHandler ondrag${";"}
  attribute EventHandler ondragend${";"}
  attribute EventHandler ondragenter${";"}
  attribute EventHandler ondragleave${";"}
  attribute EventHandler ondragover${";"}
  attribute EventHandler ondragstart${";"}
  attribute EventHandler ondrop${";"}
  attribute EventHandler ondurationchange${";"}
  attribute EventHandler onemptied${";"}
  attribute EventHandler onended${";"}
  attribute OnErrorEventHandler onerror${";"}
  attribute EventHandler onfocus${";"}
  attribute EventHandler onformdata${";"}
  attribute EventHandler oninput${";"}
  attribute EventHandler oninvalid${";"}
  attribute EventHandler onkeydown${";"}
  attribute EventHandler onkeypress${";"}
  attribute EventHandler onkeyup${";"}
  attribute EventHandler onload${";"}
  attribute EventHandler onloadeddata${";"}
  attribute EventHandler onloadedmetadata${";"}
  attribute EventHandler onloadstart${";"}
  attribute EventHandler onmousedown${";"}
  [LegacyLenientThis] attribute EventHandler onmouseenter${";"}
  [LegacyLenientThis] attribute EventHandler onmouseleave${";"}
  attribute EventHandler onmousemove${";"}
  attribute EventHandler onmouseout${";"}
  attribute EventHandler onmouseover${";"}
  attribute EventHandler onmouseup${";"}
  attribute EventHandler onpause${";"}
  attribute EventHandler onplay${";"}
  attribute EventHandler onplaying${";"}
  attribute EventHandler onprogress${";"}
  attribute EventHandler onratechange${";"}
  attribute EventHandler onreset${";"}
  attribute EventHandler onresize${";"}
  attribute EventHandler onscroll${";"}
  attribute EventHandler onsecuritypolicyviolation${";"}
  attribute EventHandler onseeked${";"}
  attribute EventHandler onseeking${";"}
  attribute EventHandler onselect${";"}
  attribute EventHandler onslotchange${";"}
  attribute EventHandler onstalled${";"}
  attribute EventHandler onsubmit${";"}
  attribute EventHandler onsuspend${";"}
  attribute EventHandler ontimeupdate${";"}
  attribute EventHandler ontoggle${";"}
  attribute EventHandler onvolumechange${";"}
  attribute EventHandler onwaiting${";"}
  attribute EventHandler onwebkitanimationend${";"}
  attribute EventHandler onwebkitanimationiteration${";"}
  attribute EventHandler onwebkitanimationstart${";"}
  attribute EventHandler onwebkittransitionend${";"}
  attribute EventHandler onwheel${";"}
};`
}
/**@type {<T, U>(t:T, b:U)=>T&U|null} */
function make_includes(t,u) {
  /**@type {any} */
  let t_any = t
  /**@type {{}} */
  let x=t_any
  /**@type {any} */
  let u_fix = u
  let cc=Object.keys(u_fix)
  console.log(cc)
  /**@type {any} */
  let x_any = x
  /**@type {typeof t&typeof u} */
  let x_ret = x_any
  return x_ret
}

class WindowEventHandlers {
  static idl=`interface mixin WindowEventHandlers {
  attribute EventHandler onafterprint${";"}
  attribute EventHandler onbeforeprint${";"}
  attribute OnBeforeUnloadEventHandler onbeforeunload${";"}
  attribute EventHandler onhashchange${";"}
  attribute EventHandler onlanguagechange${";"}
  attribute EventHandler onmessage${";"}
  attribute EventHandler onmessageerror${";"}
  attribute EventHandler onoffline${";"}
  attribute EventHandler ononline${";"}
  attribute EventHandler onpagehide${";"}
  attribute EventHandler onpageshow${";"}
  attribute EventHandler onpopstate${";"}
  attribute EventHandler onrejectionhandled${";"}
  attribute EventHandler onstorage${";"}
  attribute EventHandler onunhandledrejection${";"}
  attribute EventHandler onunload${";"}
};`
}

const tmp_idl=``

export {
  GlobalEventHandlers,
  WindowEventHandlers,
  get_Document,
  classes
}


export function use_constants() {
  return [
    tmp_idl,
  ]
}

export function use_type_helpers() {
  return [
    make_includes,
  ]
}
