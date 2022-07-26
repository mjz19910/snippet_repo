// https://www.youtube.com/hashtag/softwaredesign
// Command Design Pattern
// bad design, maybe use command design pat, or transaction design pat
// spell:words ArjanCodes __pycache__ dataclasses dataclass
function main() {
	class FSObject {
		/** @virtual */
		class_name() {
			throw new Error("Unable to use virtual function")
		}
	}
	class File extends FSObject {
		constructor(name,content) {
			super()
			this.name=name
			this.content=content
		}
		toArray() {
			return [this.class_name(),this.name,this.content]
		}
		class_name() {
			return "File"
		}
	}
	class Directory extends FSObject {
		constructor(name,init_func) {
			super()
			this.name=name
			this.children=[]
			if(init_func) {
				init_func(this)
			}
		}
		push(dir_child) {
			this.children.push(dir_child)
		}
		toArray() {
			let children=[]
			for(let i=0;i<this.children.length;i++) {
				let cur=this.children[i]
				children.push(cur.toArray())
			}
			return [this.class_name(),this.name].concat(children)
		}
		class_name() {
			return "Directory"
		}
	}
	function dir_add_child(dir,dir_child) {
		dir.children.push(dir_child)
	}
	let fs_root=new Directory("/",function(dir) {
		let ex_dir=new Directory("example")
		dir_add_child(dir,ex_dir)
		let cur_dir
		cur_dir=new Directory(".vscode")
		dir_add_child(ex_dir,cur_dir)
		dir_add_child(ex_dir,new Directory("banking",function(dir) {
			dir_add_child(dir,new Directory("__pycache__"))
			dir_add_child(dir,new File("__init__.py",null))
			dir_add_child(dir,new File("account.py",`
from dataclasses import dataclass


@dataclass
class Account:
	name: str
	number: str
	balance: int = 0

	def deposit(self, amount: int) -> None:
		self.balance += amount

	def withdraw(self, amount: int) -> None:
		if amount > self.balance:
			raise ValueError("Insufficient funds")
		self.balance -= amount

`))
			dir_add_child(dir,new File("bank.py",`
import random
import string
from dataclasses import dataclass, field

from banking.account import Account


@dataclass
class Bank:
	accounts: dict[str, Account] = field(default_factory=dict)

	def create_account(self, name: str) -> Account:
		number = "".join(random.choices(string.digits, k=12))
		account = Account(name, number)
		self.accounts[number] = account
		return account

	def get_account(self, account_number: str) -> Account:
		return self.accounts[account_number]
`))
		}
		))
		dir_add_child(ex_dir,new File("main.py",`
from banking.bank import Bank


def main() -> None:
	
	# create a bank
	bank = Bank()

	# create some accounts
	account1 = bank.create_account("ArjanCodes")
	account2 = bank.create_account("Google")
	account3 = bank.create_account("Microsoft")

	account1.deposit(100000)
	account2.deposit(100000)
	account3.deposit(100000)

	account2.withdraw(50000)
	account1.deposit(50000)

	account1.withdraw(150000)

	print(bank)


if __name__ == "__main__":
	main()
`))
	}
	)
	return fs_root.children[0].toArray()
}
main()
