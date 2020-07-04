

class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    // Calculate the balance using the transaction objects.
    let balance = 0;
    for (let transaction of this.transactions) {
      balance += transaction.value;
    }
    return balance;

  }

  addTransaction(transaction) {
    this.transactions.push(transaction);

  }

}



class Transaction {

  constructor(amount, account) {
    this.amount  = amount;
    this.account = account;
  }

  commit() {
    if (this.isAllowed()) {
      // Keep track of the time of the transaction
      this.time = new Date();
      // Add the transaction to the account
      this.account.addTransaction(this);
      return true;
    } else {
      return false;
    }
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
  isAllowed() {
    return true;
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
  isAllowed() {
    return (this.account.balance - this.amount >= 0);
  }
}





// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("snow-patrol");
console.log('starting acct balance = ', myAccount.balance);

console.log("Attempting to withdraw $50.25 should fail");
const t1 = new Withdrawal(50.25, myAccount);
console.log("commit result = ", t1.commit());
console.log('Balance after T1', myAccount.balance);


console.log("Attempt 120 deposit should work");
const t3 = new Deposit(120.00, myAccount);
console.log("commit result = ", t3.commit());
console.log('Balance after T3', myAccount.balance);

console.log("Now withdraw 9.99");
const t4 = new Withdrawal(9.99, myAccount);
console.log("commit result = ", t4.commit());
console.log('Balance after T4', myAccount.balance);

