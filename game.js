var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;


//GAME START
$(document).on("keydown", function() {

    nextSequence();
})

function nextSequence() {

    userClickedPattern = [];

    var randomNum = Math.floor((Math.random() * 3) + 1)
    var randomChosenColour = buttonColors[randomNum];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    $("h2").text("Level " + level);
    level++;
}


// USER CHOOSING ANSWER
$(".btn").on("click", function(event) {

    var userChosenColor = String(event.target.id);
    userClickedPattern.push(userChosenColor);
    // rather than using event keyword , we can use this keyword;
    // var userChosenColour = $(this).attr("id");

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
})

function startOver() {
    level = 0;
    gamePattern = [];
}

function checkAnswer(currentLevel) {

    console.log(userClickedPattern);
    console.log(gamePattern);
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");

        //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length) {

            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function() {
                nextSequence();
            }, 1000);

        }

    } else {

        console.log("wrong");
        $("body").addClass("game-over");
        playSound("wrong");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
        $("h2").text("Game Over, Press Any Key to Restart");
    }
}


function playSound(colorName) {

    var audio = new Audio("sounds/" + colorName + ".mp3");
    audio.play();
}

function animatePress(colorName) {

    $("#" + colorName).addClass("pressed");

    setTimeout(function() {
        $("#" + colorName).removeClass("pressed");
    }, 100);
}