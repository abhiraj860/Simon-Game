var buttonColors = ["red", "blue", "green", "yellow"];
var gamePatterns = [];
var userClickedPattern = [];
var level = 0;

$("body").keypress(function() {
    nextSequence();
});

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    var lastIndex = userClickedPattern.length - 1;
    checkAnswer(lastIndex);
    
});

function startOver() {
    gamePatterns.length = 0;
    userClickedPattern.length = 0;
    level = 0;
}

function checkAnswer(currentLevel) {
    if(gamePatterns[currentLevel] === userClickedPattern[currentLevel]) {
        if(gamePatterns.length === userClickedPattern.length) {
            setTimeout(nextSequence, 1000);
            userClickedPattern.length = 0;
        }
    } else {
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press any Key to start.");
        playSound("wrong");
        startOver();
    }
}

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePatterns.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(55).fadeIn(55);
    playSound(randomChosenColor);
    level++;
    $("h1").text("Level " + level);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    var self = $("#" + currentColour);
    self.addClass("pressed");
    setTimeout(function() {
        self.removeClass("pressed");
    }, 100);
}
