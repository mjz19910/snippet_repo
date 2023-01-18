# find member to add save_keys to the body

## query 1
```regexp
(\w+)\(x\) \{x;\}
```

## replace 1
```txt
$1(x) {
		this.save_keys("[$1]",x);
	}
```
