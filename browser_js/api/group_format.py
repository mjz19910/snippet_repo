from parse import compile
import re

class RevPrintf():
	def __init__(self, rev_format_str):
		self.rev_format_str=rev_format_str
class RevMatch():
	def set_conversion_rev_printf(
		self,
		snippet_name_format_str,
		filename_format_str
	):
		self.snippet_name_format_str=snippet_name_format_str
		self.filename_format_str=filename_format_str
	def match(self,raw_regexp):
		self.regexp_match=raw_regexp
class SnippetFilenameGenerator():
	is_raw=False
	def set_conversion(
		self, snippet_name=None, filename=None, *,
		raw=False, name_filter=None, append=None
		):
		self.append=append
		self.name_filter=name_filter
		self.is_raw=raw
		self.snippet_name=snippet_name
		self.filename=filename
		if snippet_name:
			self.parser=compile(snippet_name)
	def generate_filename(self, *, snippet_name):
		if self.append:
			return snippet_name+self.append
		if self.is_raw:
			if self.snippet_name == snippet_name:
				return self.filename
		if self.name_filter and not re.match(self.name_filter, snippet_name):
			return None
		parse_result=self.parser.parse(snippet_name)
		if not parse_result:
			return None
		return self.filename.format(parse_result.fixed[0])
class GeneratorList():
	items=[]
	def add_generator(self, generator):
		self.items.append(generator)
	def generate_filename(self, *args, **kwargs):
		for x in self.items:
			res=x.generate_filename(*args, **kwargs)
			if res:
				return res
def group1(key):
	# example: $_1
	# example: $nuxt_visitor
	def sub_a_dir() -> SnippetFilenameGenerator:
		gen=SnippetFilenameGenerator()
		gen.set_conversion("${}", "sub_a/item-{}.js", name_filter=r"\$_\d")
		return gen
	def sub_b_dir() -> SnippetFilenameGenerator:
		gen=SnippetFilenameGenerator()
		gen.set_conversion("$__", "sub_b/item-__.js", raw=True)
		return gen
	def sub_c_dir() -> SnippetFilenameGenerator:
		gen=SnippetFilenameGenerator()
		gen.set_conversion("${}", "sub_c/item-{}.js", name_filter=r"\$_[a-z]")
		return gen
	gen_list=GeneratorList()
	gen_list.add_generator(sub_a_dir())
	gen_list.add_generator(sub_b_dir())
	gen_list.add_generator(sub_c_dir())
	return gen_list.generate_filename(snippet_name=key)
assert group1("$_1") == "sub_a/item-_1.js"
assert group1("$__") == "sub_b/item-__.js"
assert group1("$_a") == "sub_c/item-_a.js"
def group2(key):
	# example: ,1_
	gen=SnippetFilenameGenerator()
	gen.set_conversion(",{}_", "item_{}.js")
	return gen.generate_filename(snippet_name=key)
assert group2(",1_") == "item_1.js"
def group3(key):
	# example: parsejs
	gen=SnippetFilenameGenerator()
	gen.set_conversion(append=".js")
	return gen.generate_filename(snippet_name=key)
def group4(key):
	# example: get_node_require
	# requires: DevTools attached to an electron app
	# requires example: DevTools attached to Visual Studio Code
	gen=SnippetFilenameGenerator()
	gen.set_conversion(append=".js")
	return gen.generate_filename(snippet_name=key)
assert group3("parsejs") == "parsejs.js"
assert group4("get_node_require") == "get_node_require.js"
def main():
	print("Passed")
if __name__ == "__main__":
	main()