# find member to add save_keys to the body

## query 1
```regexp
(\w+)\(x\) \{x;\}
```

## replace 1
```js
$1(x) {
		this.save_keys("[$1]",x);
	}
```

# find members to replace with save_keys body

## query 1
```regexp
/\*\* @arg \{\w+\} x \*/
\s(\w+)\(x\) \{x;\}
```
## replace 1
```js
/** @arg {$1} x */
	$1(x) {
		this.save_keys("[$1]",x);
	}
```

# find save_keys members
## query 1
```regexp

	/\*\* @arg \{\w+\} x \*/
	\w+\(x\) \{
		this.save_keys\("\[\w+\]",x\);
	\}
```

# find words followed by ;
## query 1
```regexp
		(\w+);
```