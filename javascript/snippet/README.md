# Group format, described in python3
```py3
def group_1(key):
	return f"$_{key.rev_printf("item_%u")}"
def group_2(key):
	return f",{key.rev_printf("item_%u")}_"
```
