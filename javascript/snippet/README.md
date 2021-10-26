# Group format, described in python3
```py3
def group1(key):
	return f"$_{key.rev_printf("item_%s")}"
def group2(key):
	return f",{key.rev_printf("item_%s")}_"
```
# cSpell comments
```js

// cspell:disable-next-line
// cspell:disable
// cspell:enable

// this checks the spelling config for changes
// cspell:enableCompoundWords
```

# Commit format

G{group number}: {description}
{%(commit prefix)s joined with %(+)t}: {description}

%(commit prefix) can be any of
- README 
- JSSnippet
- CommitDSL
- Yak

# CommitDSL
- the DSL for my commit format
```
[]
	this is valid in a description, it is type-like
	only valid with a word prepended to describe the array
	it defines something as an array
-
	this marks the start of a description option
#
	the following word is defined for use in the following token description
/"/
	regex matching the token for a string
	this is a single char, but parses as a token pair containing a string
	this starts the string, when it is encountered again
	it goes back to the previous token pair
/[()]/
	regex matching the token pair chars for any char in "()"
...
  	this token has a list of option[]
		- anything inside a paired token

		- the part before is used to match,
		this is greedy,
		it will eat tokens until it runs into the token pair
		that contains the ellipsis
[%(...)...]
	%(...)
		any word[] seperated by " "
	...
#[...]
	an optional value
%
	a syntax error, nothing following the format specifier
	also a syntax error if followed by a word or whitespace
%...#[suffix]
	any token pair can have a suffix appended to it
%(...)t
	A list of any token, a string, each char or grapheme is token like
%(...)s [joined with %(...(2))t]
  the first part can be defined with %(...)
  [joined with...]
```