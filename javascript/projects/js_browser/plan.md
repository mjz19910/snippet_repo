
<div class="mermaid">
requirementDiagram

element _3_ {
    type: 3 Semantics, structure, and APIs of HTML documents
}

element _3_2_ {
	type: 3.2 Elements
}

element _3_2_2_ {
	type: Elements in the DOM
}

element _7_ {
    type: ref
}

element html {
    type: HTML Standard
}

html - contains -> _3_
_3_ - contains -> _3_2_
_3_2_ - contains -> _3_2_2_
html - contains -> _7_










</div>
