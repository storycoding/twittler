//=============================//
//======== DATA STRUCT ========//
//=============================//

window.streams = {};
streams.home = [];
streams.users = {};

streams.users.visitor = {}; //where user tweets are stored
streams.users.visitor.tweets = [];

streams.users.shawndrost = {};
streams.users.shawndrost.tweets = [];
streams.users.shawndrost.href = "https://twitter.com/shawndrost";

streams.users.sharksforcheap = {};
streams.users.sharksforcheap.tweets = [];
streams.users.sharksforcheap.href = "https://twitter.com/sharksforcheap"

streams.users.mracus = {};
streams.users.mracus.tweets = [];
streams.users.mracus.href = "https://twitter.com/mracus"

streams.users.douglascalhoun = {};
streams.users.douglascalhoun.tweets = [];
streams.users.douglascalhoun.href = "https://twitter.com/douglascalhoun"

window.users = Object.keys(streams.users);

var opening = ['just', '', '', '', '', 'ask me how i', 'completely', 'nearly', 'productively', 'efficiently', 'last night i', 'the president', 'that wizard', 'a ninja', 'a seedy old man'];
var verbs = ['downloaded', 'interfaced', 'deployed', 'developed', 'built', 'invented', 'experienced', 'navigated', 'aided', 'enjoyed', 'engineered', 'installed', 'debugged', 'delegated', 'automated', 'formulated', 'systematized', 'overhauled', 'computed'];
var objects = ['my', 'your', 'the', 'a', 'my', 'an entire', 'this', 'that', 'the', 'the big', 'a new form of'];
var nouns = ['cat', 'koolaid', 'system', 'city', 'worm', 'cloud', 'potato', 'money', 'way of life', 'belief system', 'security system', 'bad decision', 'future', 'life', 'pony', 'mind'];
var tags = ['#techlife', '#burningman', '#sf', 'but only i know how', 'for real', '#sxsw', '#ballin', '#omg', '#yolo', '#magic', '#soulfood', '', '', ''];



//=============================//
//========= FUNCTIONS =========//
//=============================//

var randomElement = function(array) {
  var randomIndex = Math.floor(Math.random() * array.length);

  return array[randomIndex];
};

//merges random elements into one message
var randomMessage = function() {
  return [randomElement(opening), randomElement(verbs), randomElement(objects), randomElement(nouns), randomElement(tags)].join(' ');
};


// generate random tweets on a random schedule
var generateRandomTweet = function() {

  var tweet = {};
  tweet.user = randomElement(users);
  tweet.message = randomMessage();
  tweet.created_at = new Date();
  tweet.href = streams.users[tweet.user].href;

  addTweet(tweet);
};

// utility function for adding tweets to our data structures
var addTweet = function(newTweet) {
  var username = newTweet.user;
  streams.users[username].tweets.push(newTweet);
  streams.home.push(newTweet);
};




//reappends all the tweets to the timeline
var displayAllTweets = function() {

  var tweetCount = document.getElementsByClassName("tweet").length;

  for (var i = tweetCount; i < streams.home.length; i++) {
    var tweet = streams.home[i];

    // var message = tweet.message;
    // if (document.getElementsByClassName("tweet").length > 0) {
    //   var domTweet = document.getElementsByClassName("tweet")[i].children[1].textContent; // returning undefined when i is greater than childnodes
    //   if (message === domTweet) {
    //   console.log("checks");
    //   } else {
    //   }
    // }

    if (streams.home.length > document.getElementsByClassName("tweet").length) {

      var $tweet = $('<div></d1iv>');
      $tweet.addClass("tweet");
      $tweet.addClass(streams.home[i].user);

      var profileLink = "http://www.twitter.com/" + tweet.user;

      var $userName = $('<a></a>');
      $userName.text('@' + tweet.user + " ");
      $userName.addClass('userName');
      $userName.attr("href",profileLink);

      var $userTweet = $('<span></span>');
      $userTweet.addClass('tweetText');
      $userTweet.text(tweet.message);

      var $userTimeStamp = $('<span></span>');
      $userTimeStamp.addClass('tweetTimeStamp');
      $userTimeStamp.text("   " + timeSince(tweet.created_at) + ' ago');

      //appending
      $userName.appendTo($tweet);
      $userTweet.appendTo($tweet);
      $userTimeStamp.appendTo($tweet);
      $tweet.appendTo($('#timeline'));
    }

  }

    //document.getElementsByClassName("tweet")[0].children[1].textContent
    //compare with
    //streams.home[0].message
    //if there are new tweets not already appended to the parent node
        //append them
};


var update = function() {
  displayAllTweets();
  refreshTimeStamps();
};


var scheduleNextTweet = function() {
  generateRandomTweet();
  update();
  //tweetSFX.play(); - fun idea, but too annoying
  setTimeout(scheduleNextTweet, Math.floor(Math.random() * (5000 - 1000) + 1000));
};

//user tweets
var writeTweet = function(message) {
  if(!streams.users.visitor){
    throw new Error('set the global visitor property!');
  }

  var tweet = {};
  tweet.user = "visitor";
  tweet.message = message;
  tweet.created_at = new Date();

  addTweet(tweet);

  update();
};


//WIP

//stamps 1
  var updateTimeStamps = function() {

    var tweetCount = document.getElementsByClassName("tweet").length;

    for (var i = 0; i < tweetCount; i++) {
      var timeStamp = document.getElementsByClassName("tweet")[i].children[2];

      //select the time stamp

      timeStamp.textContent = "   " + timeSince(tweet.created_at) + ' ago'; // START HERE
      timeStamp.text();  //access tweetTime

      //update it
    }
  }

//stamps 2


//whenever a new tweet is created
//iterate through all the tweets
//update the time stamp

var refreshTimeStamps = function() {

  var i = 0;

  $('#timeline').children().each(function () {
    var createdAt = streams.home[i].created_at;
    this.children[2].innerHTML = timeSince(createdAt);

    i++;
  });

};

//what's visible by default
var isVisible = '.tweet';

//if hiding is on, only show the items of classvalue
//toggle hidden
//toggle visible
////////

//change the user text into a button type to show tweets of that user
  //the tweet node text value should update with each recursion of scheduleNextTweet
  //allow the filter to stop the appeding of new tweets

//apply this function to the userText
function showUserTweets(userClass) {
  $('.tweet').hide();
  $(userClass).show();
}


//if I use a function expression it runs last and causes crashing
function addButtons() {

  //userTweet
  $("#submit").on("click", function() {
    userInput = $("#input").val();
    $("input")[0].value = "";
    $("input")[0].placeholder = "anything else?";

    var message = userInput;    
    writeTweet(userInput);
  });
}




var tweetSFX = new Audio();
tweetSFX.src = "audio/smw_map_move_to_spot.wav";


//imported from original twitter
function timeSince(timeStamp) {

    var now = new Date(),
      secondsPast = (now.getTime() - timeStamp.getTime()) / 1000;

    if(secondsPast < 60){
      return parseInt(secondsPast) + 's';
    }

    if(secondsPast < 3600){
      return parseInt(secondsPast/60) + 'm';
    }

    if(secondsPast <= 86400){
      return parseInt(secondsPast/3600) + 'h';
    }

    if(secondsPast > 86400){
        day = timeStamp.getDate();
        month = timeStamp.toDateString().match(/ [a-zA-Z]*/)[0].replace(" ","");
        year = timeStamp.getFullYear() == now.getFullYear() ? "" :  " "+timeStamp.getFullYear();

      return day + " " + month + year;
    }
    return "Something went wrong with timeSince()"
  }
