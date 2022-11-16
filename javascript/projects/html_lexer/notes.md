# 13.2.5 Tokenization
## https://html.spec.whatwg.org/multipage/parsing.html#tokenization
<div>

1. Implementations must act as if they used the following state machine to tokenize HTML. The state machine must start in the data state. Most states consume a single character, which may have various side-effects, and either switches the state machine to a new state to reconsume the current input character, or switches it to a new state to consume the next character, or stays in the same state to consume the next character. Some states have more complicated behavior and can consume several characters before switching to another state. In some cases, the tokenizer state is also changed by the tree construction stage.

2. When a state says to reconsume a matched character in a specified state, that means to switch to that state, but when it attempts to consume the next input character, provide it with the current input character instead.

3. The exact behavior of certain states depends on the insertion mode and the stack of open elements. Certain states also use a temporary buffer to track progress, and the character reference state uses a return state to return to the state it was invoked from.

4. The output of the tokenization step is a series of zero or more of the following tokens:
 DOCTYPE,
 start tag,
 end tag,
 comment,
 character,
 end-of-file.
DOCTYPE tokens have
  a name, 
  a public identifier, 
  a system identifier,
  and a force-quirks flag.
 When a DOCTYPE token is created, 
  its name, 
  public identifier, 
  and system identifier 
 must be marked as missing 
 (which is a distinct state from the empty string), 
and the force-quirks flag must be set to off (its other state is on). 
Start and end tag tokens have
 a tag name, 
 a self-closing flag, 
 and a list of attributes, 
  each of which has a name and a value. 
 When a start or end tag token is created, 
 its self-closing flag must be unset (its other state is that it be set), 
 and its attributes list must be empty. 
Comment and character tokens have data.

5. When a token is emitted, it must immediately be handled by the tree construction stage. The tree construction stage can affect the state of the tokenization stage, and can insert additional characters into the stream. (For example, the script element can result in scripts executing and using the dynamic markup insertion APIs to insert characters into the stream being tokenized.)

6. <note> Creating a token and emitting it are distinct actions. It is possible for a token to be created but implicitly abandoned (never emitted), e.g. if the file ends unexpectedly while processing the characters that are being parsed into a start tag token. </note>

7. When a start tag token is emitted with its self-closing flag set, if the flag is not acknowledged when it is processed by the tree construction stage, that is a non-void-html-element-start-tag-with-trailing-solidus parse error.

8. When an end tag token is emitted with attributes, that is an end-tag-with-attributes parse error.

9. When an end tag token is emitted with its self-closing flag set, that is an end-tag-with-trailing-solidus parse error.

10. An appropriate end tag token is an end tag token whose tag name matches the tag name of the last start tag to have been emitted from this tokenizer, if any. If no start tag has been emitted from this tokenizer, then no end tag token is appropriate.

11. A character reference is said to be consumed as part of an attribute if the return state is either attribute value (double-quoted) state, attribute value (single-quoted) state or attribute value (unquoted) state.

12. When a state says to flush code points consumed as a character reference, it means that for each code point in the temporary buffer (in the order they were added to the buffer) user agent must append the code point from the buffer to the current attribute's value if the character reference was consumed as part of an attribute, or emit the code point as a character token otherwise.

13. Before each step of the tokenizer, the user agent must first check the parser pause flag. If it is true, then the tokenizer must abort the processing of any nested invocations of the tokenizer, yielding control back to the caller.

14. The tokenizer state machine consists of the states defined in the following subsections.
</div>

## State machine
- Starts in _data state_


# 13.2.5.1 Data state

## https://html.spec.whatwg.org/multipage/parsing.html#data-state

