function click_on_logo(){

    location.reload();

}

function SHHA() {

  onmousemove = (event) => {
  
  let trap = document.getElementById('trap');
  let body = document.querySelector('body');
  let width = window.innerWidth;
  let height = window.innerHeight;
  let X = event.clientX;
  let Y = event.clientY;
  let side = "";
  let position = "";
  
  if(X > width/2){
  side = "right";
  }
  else{
  side = "left";
  }
  if (Y > height/2){
  position = "bottom";
  }
  else{
  position = "top";
  }
  
  document.getElementById('demo').innerHTML = "x: " + X + " y: " + Y + " side: " + side + " position: " + position;
  trap.style.backgroundPositionX = side; 
  trap.style.backgroundPositionY = position;
  trap.style.transition = 'background-position 10s';

  console.log(Y, X)
  
  
  
  }
  }