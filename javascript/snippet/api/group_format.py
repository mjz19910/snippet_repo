class RevPrintf():
	def __init__(self):
		self.m_item_raw=False
	def set_item_raw(self,flag):
		self.m_item_raw=flag
	def item_printf(self,format_str):
		self.m_item_printf_format=format_str
	def file_printf(self,format_str):
		self.m_file_printf_format=format_str
class RevMatch():
	def item_printf(self,format_str):
		self.format_str=format_str
	def match(self,raw_regexp):
		self.regexp_match=raw_regexp
class RevExact():
	def __init__(self):
		pass
def group1(key, rev_key:RevPrintf):
	# example: $_1
	# example: $nuxt_visitor
	def dec_match() -> RevMatch:
		rev_match=RevMatch()
		rev_match.item_printf("$%s")
		rev_match.match(r"$_\d")
		rev_match.file_printf("sub_a/item-%s.js")
		return rev_match
	def exact1() -> RevExact:
		rev_exact=RevExact()
		rev_exact.set_item("$__")
		rev_exact.set_file("sub_b/item-__.js")
		return rev_exact
	def alpha_match() -> RevMatch:
		rev_match=RevMatch()
		rev_match.item_printf("$%s")
		rev_match.match(r"$_[a-z]")
		rev_match.file_printf("sub_c/item-%s.js")
		return rev_match
	rev_key.add_match(dec_match())
	rev_key.add_exact(exact1())
	rev_key.add_match(alpha_match())
	return rev_key.build(key)
def group2(key, rev_key:RevPrintf):
	# example: ,1_
	rev_key.item_printf(",%s_")
	rev_key.file_printf("item_%s.js")
	return rev_key.build(key)
def group3(key, rev_key:RevPrintf):
	# example: parsejs
	rev_key.set_item_raw(True)
	rev_key.file_printf("%s.js")
	return rev_key.build(key)
def group4(key, rev_key:RevPrintf):
	# example: get_node_require
	# requires: electron DevTools
	# req example: DevTools opened in an electron app
	# electron app example: Visual Studio Code
	rev_key.set_item_raw(True)
	rev_key.file_printf("%s.js")
	return rev_key.build(key)