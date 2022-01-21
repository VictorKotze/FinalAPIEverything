if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

 let deckId;
 let remainCards;
 let cardImageDiv="1";
 let playerCurrentValue=0;
 let robotCurrentValue=0;
 let robotDrawing=0;
 let aceCount=0;



window.onload = function() {
 closeLightBox();
 
} // window.onload


function startGame(data){
	if(!window.navigator.onLine){
		  offLine();
		  return;
	  }
	let url="https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
	
	  playerCurrentValue=0;
	  robotCurrentValue=0;
	  
	 
	
	fetch(url)
	.then(response => response.json())
	.then(data => update(data) 
	);
}

function update(data){
	
	
	//Id of the currnt deck
	 deckId= data.deck_id;
	
	
	//Number of cards remaining
	remainCards=data.remaining;
	
	
}

function drawCards(deck){
	
	let url2="https://deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=1";
	
	
	fetch(url2)
	.then(response => response.json())
	.then(deck => printCard(deck) 
	);
}

function printCard(deck){
	
	
	document.getElementById("blackJackMain").innerHTML += "<img src=" + deck.cards[0].image + " alt='your cards'>";	
	
	if (deck.cards[0].value == "KING" || deck.cards[0].value == "QUEEN" || deck.cards[0].value == "JACK"){
	deck.cards[0].value=10;
}
    if (deck.cards[0].value == "ACE"){
		deck.cards[0].value=11;
		aceCount++;
	}
	
	if (deck.cards[0].value == "ACE" && aceCount==1){
		deck.cards[0].value=1;
	}



let value= parseInt(deck.cards[0].value);

 playerCurrentValue = playerCurrentValue + value;
 document.getElementById("playerScoreDisplay").innerHTML = "" + playerCurrentValue;

 
 if (playerCurrentValue > 21){
	 showBustBox();
	  
 }
 
}

function showInformation(){
	document.getElementById("information").style.display= "block";
}

function closeInformation(){
	document.getElementById("information").style.display= "none";
}


//Starts code to run robot

function startRobot(deck){
	 
	
	 document.getElementById("draw").style.display= "none";
	 document.getElementById("stand").style.display= "none";
	 robotDrawing++;
	 theThing(deck);
	 
	
}

function theThing(deck){
	if(robotCurrentValue=>17){
		 
		setTimeout(() => { checkWin(); }, 1000);
	}
	
	 if(robotDrawing==1 && robotCurrentValue<17){
	drawRobotCards(deck);
	
	 }
	
}


 function drawRobotCards(deck){
	
	let url3="https://deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=1";
	
	fetch(url3)
	.then(response => response.json())
	.then(deck => printRobotCard(deck) 
	);
}

function printRobotCard(deck){
	
	let backCard="images/card_back1.png";
	document.getElementById("blackJackRobot").innerHTML += "<img src=" + backCard + " alt='Robot Cards'>";	
	
	if (deck.cards[0].value == "KING" || deck.cards[0].value == "QUEEN" || deck.cards[0].value == "JACK"){
	deck.cards[0].value=10;
}
    if (deck.cards[0].value == "ACE"){
		deck.cards[0].value=11;
		aceCount++;
	}
	
	if (deck.cards[0].value == "ACE" && aceCount==1){
		deck.cards[0].value=1;
	}



let value= parseInt(deck.cards[0].value);

 robotCurrentValue = robotCurrentValue + value;
 document.getElementById("robotScoreDisplay").innerHTML = "" + robotCurrentValue;

if (robotCurrentValue > 21){
	 showWinBustBox();
	  
 }else {
	 
	theThing(deck); 
 }


}



function checkWin(){
	 
	let player1= playerCurrentValue;
	let robot2= robotCurrentValue;
	
	if (player1==robot2){
		showTieBox();
		
	}else{
	let arr = [player1, robot2]
    let goal = 21
    let close1 = arr.reduce((prev, curr) => {
    return (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
    });

 close1= parseInt( close1);
if(close1===playerCurrentValue){
	showWinBox();
}

if(close1===robotCurrentValue){
	showLoseBox();
}
	}
	
}



function showWinBox(){
	document.getElementById("lightBoxWin").style.display="block";
	document.getElementById("playerScoreWin").innerHTML = playerCurrentValue;
	document.getElementById("robotScoreWin").innerHTML = robotCurrentValue;
}


function showLoseBox(){
	document.getElementById("lightBoxLose").style.display="block";
	document.getElementById("playerScoreLose").innerHTML = playerCurrentValue;
	document.getElementById("robotScoreLose").innerHTML = robotCurrentValue;
}

function showTieBox(){
	document.getElementById("lightBoxTie").style.display="block";
	document.getElementById("playerScoreTie").innerHTML = playerCurrentValue;
	document.getElementById("robotScoreTie").innerHTML = robotCurrentValue;
}

function showBustBox(){
	document.getElementById("lightBoxBust").style.display="block";
	document.getElementById("playerScoreBust").innerHTML = playerCurrentValue;
}

function showWinBustBox(){
	document.getElementById("lightBoxWinBust").style.display="block";
	document.getElementById("playerScoreWinBust").innerHTML = playerCurrentValue;
	document.getElementById("robotScoreBust").innerHTML = robotCurrentValue;
	
}

function offLine(){
	document.getElementById("offLineBox").style.display="block";
}



function closeLightBox(){
     document.getElementById("lightBoxLose").style.display="none";
	 document.getElementById("lightBoxWin").style.display="none";
	 document.getElementById("lightBoxTie").style.display="none";
	 document.getElementById("lightBoxBust").style.display="none";
	  document.getElementById("lightBoxWinBust").style.display="none";
	  document.getElementById("offLineBox").style.display="none";
	 
	 
	  document.getElementById("blackJackMain").innerHTML="";
	  document.getElementById("blackJackRobot").innerHTML="";
	  
	  document.getElementById("draw").style.display= "block";
	document.getElementById("stand").style.display= "block";
	  
	  document.getElementById("playerScoreDisplay").innerHTML = "";
	  document.getElementById("robotScoreDisplay").innerHTML = "";
	  playerCurrentValue=0;
	  robotCurrentValue=0;
	   robotDrawing=0;
	   player1=0;
	   robot2=0;
	   aceCount=0;
	   startGame();
	   
	   //close1=0;
 } // closeLightBox 



















