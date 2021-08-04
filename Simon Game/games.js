var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];


// ***************************************************************************************************
//starting game
var level=0;
var started=false;

$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started=true;

  }
});
// generating randomnumbers,animating btns,playing sounds
function nextSequence(){
  level++;
  $("#level-title").text("Level " + level);
  userClickedPattern=[]



  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);


  $("#"+randomChosenColour).fadeOut(200).fadeIn(200);
  playSound(randomChosenColour)
}


// ***************************************************************************************************
// playing button sounds
function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
     audio.play();

}

// ***************************************************************************************************
// storing user response
$(".btn").click(function(){
  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1)

});


// ***************************************************************************************************
//animating pressed button
function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

// ***************************************************************************************************
// function to check answer
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    console.log("success")
    if (userClickedPattern.length === gamePattern.length){

      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }
  }


  else{
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 150);


    $("#level-title").text("Game Over!!!");

    $("#level-title").append("<br><br>Press any key to restart");
    $(document).keypress(function () {
                location.reload(true);})

  }

}
