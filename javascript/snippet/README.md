# Group format, described in python3
```py3
def group1(key):
	return f"$_{key.rev_printf("item_%u")}"
def group2(key):
	return f",{key.rev_printf("item_%u")}_"
```
