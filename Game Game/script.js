class Person {
    constructor() {
      this.sum = 0;
      this.aceCount = 0;
    }
  
    getValue(card) {
      let rank = card.slice(0, -1);

      if (isNaN(rank)) {
        if (rank === "A") {
          this.aceCount += 1;
          return 1;
        } else {
          return 10;
        }
      } else {
        return parseInt(rank);
      }
    }
  
    checkAce(card) {
      if (card[0] === "A") {
        return 11;
      }
      return 0;
    }
  
    reduceAce() {
      while (this.sum > 21 && this.aceCount > 0) {
        this.sum -= 10;
        this.aceCount -= 1;
      }
    }
  }
  
  class Player extends Person {
    constructor() {
      super();
    }
  }
  
  class Bot extends Person {
    constructor() {
      super();
    }
  }
  
  class Game {
    constructor() {
      this.dealer = new Bot();
      this.player = new Player();
      this.startingMoney = parseInt(localStorage.getItem("startingMoney")) || 100;
      this.fullVictoryMoney = parseInt(localStorage.getItem("fullVictoryMoney")) || 1000;
      this.money = this.startingMoney;
      this.bet = 0;
      this.deck = [];
      this.canHit = true;
      this.dealerCards = [];
    }
  
    updateTotalMoney() {
      document.getElementById("total-money").innerText = this.money;
    }
  
    buildDeck() {
      let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
      let types = ["C", "D", "H", "S"];
      this.deck = [];
  
      for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
          this.deck.push(values[j] + types[i]);
        }
      }
    }
  
    shuffleDeck() {
      for (let i = 0; i < this.deck.length; i++) {
        let j = Math.floor(Math.random() * this.deck.length);
        let temp = this.deck[i];
        this.deck[i] = this.deck[j];
        this.deck[j] = temp;
      }
      console.log(this.deck);
    }
  
    startGame() {
      this.buildDeck();
      this.shuffleDeck();
  
      for (let i = 0; i < 2; i++) {
        let playerCardImg = document.createElement("img");
        let dealerCardImg = document.createElement("img");
        let playerCard = this.deck.pop();
        let dealerCard = this.deck.pop();
       
        playerCardImg.src = "./cards/" + playerCard + ".png";
        dealerCardImg.src = "./cards/" + dealerCard + ".png";
         
        // playerCardImg.src = "./cards/backside.png";
        // dealerCardImg.src = "./cards/backside.png";
        this.player.sum += this.player.getValue(playerCard);
        this.player.aceCount += this.player.checkAce(playerCard);
        this.dealer.sum += this.dealer.getValue(dealerCard);
        this.dealer.aceCount += this.dealer.checkAce(dealerCard);
        document.getElementById("your-cards").append(playerCardImg);
        document.getElementById("dealer-cards").append(dealerCardImg);
      }
  
      console.log(this.player.sum);

      document.getElementById("hit").disabled = true;
      document.getElementById("stay").disabled = true;
      this.updateTotalMoney();
    }
  
    hit() {
      if (!this.canHit) {
        return;
      }
  
      let cardImg = document.createElement("img");
      let card = this.deck.pop();
      cardImg.src = "./cards/" + card + ".png";
      this.player.sum += this.player.getValue(card);
      this.player.aceCount += this.player.checkAce(card);
      document.getElementById("your-cards").append(cardImg);
  
      if (this.player.sum > 21) {
        this.canHit = false;
        this.stay();
      }
    }
  
    stay() {
      this.player.reduceAce();
      this.dealer.reduceAce();
  
      while (this.dealer.sum < 17) {
        let cardImg = document.createElement("img");
        let card = this.deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        this.dealer.sum += this.dealer.getValue(card);
        this.dealer.aceCount += this.dealer.checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
      }
  
      this.canHit = false;
  
      let message = "";
      if (this.player.sum > 21) {
        message = "You Lose!";
        document.getElementById("stay").disabled = true;
        document.getElementById("hit").disabled = true;
    
      } else if (this.dealer.sum > 21) {
        message = "You Win!";
        this.money += 2 * this.bet;
        document.getElementById("stay").disabled = true;
        document.getElementById("hit").disabled = true;
    
      } else if (this.player.sum === this.dealer.sum) {
        message = "Tie!";
        this.money += this.bet;
        document.getElementById("stay").disabled = true;
        document.getElementById("hit").disabled = true;
    
      } else if (this.player.sum > this.dealer.sum) {
        message = "You Win!";
        this.money += 2 * this.bet;
        document.getElementById("stay").disabled = true;
        document.getElementById("hit").disabled = true;
    
      } else if (this.player.sum < this.dealer.sum) {
        message = "You Lose!";
        document.getElementById("stay").disabled = true;
        document.getElementById("hit").disabled = true;

      }
  
      document.getElementById("dealer-sum").innerText = this.dealer.sum;
      document.getElementById("your-sum").innerText = this.player.sum;
      document.getElementById("results").innerText = message;
      this.updateTotalMoney();
  
      if (this.money <= 0) {
        this.endGame();
      } else if (this.money >= this.fullVictoryMoney) {
        this.fullVictory();
      } else {
        document.getElementById("place-bet").disabled = false;
      }
    }
  
    placeBet() {
      


      let betAmount = 0;
      betAmount = parseInt(document.getElementById("bet-amount").value);
      if (betAmount <= this.money && betAmount > 0) {
        

        document.getElementById("div3").style.display = "none";
        this.bet = betAmount;
        this.money -= this.bet;
        this.updateTotalMoney();
        document.getElementById("game-status").innerText = "Game in progress...";
        document.getElementById("bet-amount").disabled = true;
        document.getElementById("place-bet").disabled = true;
        document.getElementById("hit").disabled = false;
        document.getElementById("stay").disabled = false;
      } else {
        document.getElementById("game-status").innerText = "Invalid bet amount!";
      }
    }
  
    restart() {
      document.getElementById("div3").style.display = "block";
      document.getElementById("div3").style.marginLeft = "39.4%";
      document.getElementById("div3").style.position = "fixed";
      // const playerCards = document.getElementById("your-cards").querySelectorAll(".card");
      // const dealerCards = document.getElementById("dealer-cards").querySelectorAll(".card");

      // playerCards.forEach((card) => card.classList.add("hidden"));
      // dealerCards.forEach((card) => card.classList.add("hidden"));
      
      // Сбросить суммы и счетчики тузов для игрока и дилера
        this.dealer.sum = 0;
        this.dealer.aceCount = 0;
        this.player.sum = 0;
        this.player.aceCount = 0;
      
        // Разрешить игроку снова делать ходы
        this.canHit = true;
      
        // Очистить содержимое элементов карт дилера и игрока
        document.getElementById("dealer-cards").innerHTML = "";
        document.getElementById("your-cards").innerHTML = "";
      
        // Очистить значения суммы карт дилера и игрока, результатов и ставки
        document.getElementById("results").innerText = "";
        document.getElementById("bet-amount").disabled = false;
        document.getElementById("bet-amount").value = 0;
        this.bet = 0;
      
        // Удалить слушатели событий с кнопок
        document.getElementById("hit").removeEventListener("click", () => this.hit());
        document.getElementById("stay").removeEventListener("click", () => this.stay());
        document.getElementById("restart").removeEventListener("click", () => this.restart());
        document.getElementById("place-bet").removeEventListener("click", () => this.placeBet());
      
        // Установить кнопки Hit и Stay в исходное состояние (заблокированы)
        document.getElementById("hit").disabled = true;
        document.getElementById("stay").disabled = true;
      
        // Разблокировать кнопку Place Bet
        document.getElementById("place-bet").disabled = false;
      
        // Начать новую игру
        this.startGame();
      }
  
    endGame() {
      alert("You have lost all your money. Game over.");
      localStorage.clear();
      window.location.replace("lobby.html");
    }
  
    fullVictory() {
      alert("Congratulations! You have reached your goal of " + this.fullVictoryMoney + " money. You win!");
      localStorage.clear();
      
      this.displayAchievement();
      
      setTimeout(() => {
        window.location.replace("lobby.html");
      }, 25000);
    }
    
    displayAchievement() {
        const achievementElement = document.createElement("div");
        achievementElement.className = "achievement";
      
        const achievementImage = document.createElement("img");
        achievementImage.src = "/achievement.png"; 
        achievementElement.appendChild(achievementImage);
      
        const achievementText = document.createElement("p");
        achievementText.innerText = "Achievement Unlocked: Full Victory!";
        achievementElement.appendChild(achievementText);
      
        document.body.appendChild(achievementElement);

        setTimeout(() => {
          document.body.removeChild(achievementElement);
        }, 20000); 
      }
  }
  
  const game = new Game();
  game.updateTotalMoney();
  game.startGame();
  
  document.getElementById("place-bet").addEventListener("click", function () {
    game.placeBet();
  });
  
  document.getElementById("hit").addEventListener("click", function () {
    game.hit();
  });
  
  document.getElementById("stay").addEventListener("click", function () {
    game.stay();
  });
  
  document.getElementById("restart").addEventListener("click", function () {
    game.restart();
  });