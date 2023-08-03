document.getElementById("start-game").addEventListener("click", () => {
    const startingMoney = parseInt(document.getElementById("starting-money").value);
    const fullVictoryMoney = parseInt(document.getElementById("full-victory-money").value);
  
    localStorage.setItem("startingMoney", startingMoney);
    localStorage.setItem("fullVictoryMoney", fullVictoryMoney);
  
    window.location.replace("BlackJack.html");
  });
  