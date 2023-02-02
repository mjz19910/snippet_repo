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
^(\s\s)((?!return|debugger|break)\w+);
```
## replace
```js
```
# item
```regexp
^(\s{1})\s((?!continue|break|return|debugger)\w+);$
```
```
$1this.R_TextRuns($2);
```
# replace renderer cfl with data cfl
```regexp
^(\s+)(\w+).+?"R_(\w+)"; this.cfl.+\}
```
```js
$1$2(x) {this.H_("$2",x,this.D_$3);}
$1/** @private @arg {D_$3} x */
$1D_$3(x) {const cf="D_$3"; this.cfl(cf,x);}
```

# save
```regexp
\{(\w+),\.\.\.y\}=this\.s\(cf,x\); this\.g\(y\);
?\s+(.+)\1,((\n|.)+?)
```
```result
this.y(cf,"$1",x,x=>{$2x$3})
```
