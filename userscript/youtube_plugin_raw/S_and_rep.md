# find member to add save_keys to the body
## search_and_replace
```regexp
(\w+)\(x\) \{x;\}
```
```js
$1(x) {
		this.save_keys("[$1]",x);
	}
```
# find members to replace with save_keys body
## search_and_replace
```regexp
/\*\* @arg \{\w+\} x \*/
\s(\w+)\(x\) \{x;\}
```
```js
/** @arg {$1} x */
	$1(x) {
		this.save_keys("[$1]",x);
	}
```
# find nullable if case
## search_and_replace
```regexp
if\((\w+)\) this\.(\w+)\(\w+\);
```
```js
this.t($1,this.$2)
```
# find save_keys members
## search
```regexp

	/\*\* @arg \{\w+\} x \*/
	\w+\(x\) \{
		this.save_keys\("\[\w+\]",x\);
	\}
```
# find words followed by ;
## search
```regexp
		(\w+);
```
```regexp
^\s\s((?!return|debugger|break)\w+);
```
