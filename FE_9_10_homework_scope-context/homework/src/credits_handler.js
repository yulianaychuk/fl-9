
const taxPerc = 0.5;
const one = 1;
const two = 2;
const three = 3;
const fifty = 50;
const defaultVal = 100;
const hundredPerc = 100;
const threehundred = 300;
const fivehundred = 500;
const eighthundred = 800;
const lang = 'en-GB';
const msgBe = 'Balance exceeded.';
const msgRc = 'Received credits';
const msgTlc = 'Transaction limit change';
const msgTle = 'Transaction limit exceeded.';
const msgWc = 'Withdrawal of credits';
const msgMaxCardsReached = 'The maximum allowed amount of cards is reached.';
const userName1 = 'Bob';

class UserAccount {
  constructor(name) {
    this.name = name;
    this.cards = [];
    this.userMaxCards = three;
  }

  addCard() {
    if (this.cards.length < this.userMaxCards) {
      this.cards.push(userCard(this.cards.length + one));
    } else {
      console.log(msgMaxCardsReached);
    }
  }

  getCardByKey(key) {
    return this.cards[key];
  }
}

function userCard(index) {
  let balance = defaultVal,
      transactionLimit = defaultVal,
      historyLogs = [];       

  return {
    getCardOptions() {
      let key = index;  
      return {balance, transactionLimit, historyLogs, key};
    },

    putCredits(putCreditsAmount) {
      balance += putCreditsAmount;

      historyLogs.push({
        operationType: msgRc,
        credits: putCreditsAmount,
        operationTime: new Date().toLocaleString(lang)
      });
    },

    takeCredits(takeCreditsAmount) {
      balance -= takeCreditsAmount;

      historyLogs.push({
        operationType: msgWc,
        credits: takeCreditsAmount,
        operationTime: new Date().toLocaleString(lang)
      });
    },

    setTransactionLimit(amount) {
      transactionLimit = amount;

      historyLogs.push({
        operationType: msgTlc,
        credits: amount,
        operationTime: new Date().toLocaleString(lang)
      });
    },

    transferCredits(transferCreditsAmount, card) {
      const amountWithTaxes = transferCreditsAmount + transferCreditsAmount * taxPerc / hundredPerc;

      if (amountWithTaxes > balance) {
        console.log(msgBe);
      } else if (amountWithTaxes > transactionLimit) {
        console.log(
            msgTle);
      } else {
        this.takeCredits(amountWithTaxes);
        card.putCredits(transferCreditsAmount);
      }
    }
  }
}


const user = new UserAccount(userName1);
user.addCard();
user.addCard();
user.addCard();
let card1 = user.getCardByKey(one); 
let card2 = user.getCardByKey(two);
let card3 = user.getCardByKey(three);
card1.putCredits(fivehundred);
card1.setTransactionLimit(eighthundred);
card1.transferCredits(threehundred, card2);
card2.takeCredits(fifty);
console.log(card1.getCardOptions());
console.log(card2.getCardOptions());

