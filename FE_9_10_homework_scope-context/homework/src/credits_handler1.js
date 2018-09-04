
function userCard(key) {
  let balance = 100,
      transactionLimit = 100,
      historyLogs = [],
      tax = 0.5,
      hundredPercent = 100;

  return {
    getCardOptions() {
      return {balance, transactionLimit, historyLogs, key};
    },

    putCredits(amount) {
      balance += amount;

      historyLogs.push({
        operationType: 'Received credits',
        credits: amount,
        operationTime: new Date().toLocaleString('en-GB')
      });
    },

    takeCredits(amount) {
      balance -= amount;

      historyLogs.push({
        operationType: 'Withdrawal of credits',
        credits: amount,
        operationTime: new Date().toLocaleString('en-GB')
      });
    },

    setTransactionLimit(amount) {
      transactionLimit = amount;

      historyLogs.push({
        operationType: 'Transaction limit change',
        credits: amount,
        operationTime: new Date().toLocaleString('en-GB')
      });
    },

    transferCredits(amount, card) {
      const amountPlusTaxes = amount * tax / hundredPercent + amount;

      if (amountPlusTaxes > balance) {
        console.log(`Error: You can't transfer credits - balance exceeded.`);
      } else if (amountPlusTaxes > transactionLimit) {
        console.log(
            `Error: You can't transfer credits - transaction limit exceeded.`);
      } else {
        this.takeCredits(amountPlusTaxes);
        card.putCredits(amount);
      }
    }
  };
}

class UserAccount {
  constructor(name) {
    this.name = name;
    this.cards = [];
    this.MAX_CARDS = 3;
  }

  addCard() {
    if (this.cards.length < this.MAX_CARDS) {
      this.cards.push(userCard(this.cards.length + 1));
    } else {
      console.log(`Error: You've reached maximum amount of cards!`);
    }
  }

  getCardByKey(key) {
    return this.cards[key - 1];
  }
}

// const card3 = userCard(3);
// const card1 = userCard(1);
// card3.getCardOptions();
// card3.putCredits(150);
// card3.takeCredits(100);
// card3.setTransactionLimit(5000);
// card3.transferCredits(50, card1);
const user = new UserAccount('Bob');
user.addCard();
user.addCard();
user.addCard();
let card1 = user.getCardByKey(1); 
let card2 = user.getCardByKey(2);
let card3 = user.getCardByKey(3);
card1.putCredits(500);
card1.setTransactionLimit(800);
card1.transferCredits(300, card2);
card2.takeCredits(50);
console.log(card1.getCardOptions());
console.log(card2.getCardOptions());

