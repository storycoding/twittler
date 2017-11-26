//=============================//
//======== DATA STRUCT ========//
//=============================//

window.streams = {};
streams.home = [];
streams.users = {};

streams.users.visitor = {};
streams.users.visitor.tweets = [];

streams.users.shawndrost = {};
streams.users.shawndrost.tweets = [];

streams.users.sharksforcheap = {};
streams.users.sharksforcheap.tweets = [];

streams.users.mracus = {};
streams.users.mracus.tweets = [];

streams.users.douglascalhoun = {};
streams.users.douglascalhoun.tweets = [];

window.users = Object.keys(streams.users);

var opening = ['just', 'ask me how i', 'completely', 'nearly', 'productively', 'efficiently', 'last night i', 'the president', 'that wizard', 'a ninja', 'a seedy old man'];
var verbs = ['downloaded', 'interfaced', 'deployed', 'developed', 'built', 'invented', 'experienced', 'navigated', 'aided', 'enjoyed', 'engineered', 'installed', 'debugged', 'delegated', 'automated', 'formulated', 'systematized', 'overhauled', 'computed'];
var objects = ['my', 'your', 'the', 'a', 'my', 'an entire', 'this', 'that', 'the', 'the big', 'a new form of'];
var nouns = ['cat', 'koolaid', 'system', 'city', 'worm', 'cloud', 'potato', 'money', 'way of life', 'belief system', 'security system', 'bad decision', 'future', 'life', 'pony', 'mind'];
var tags = ['#techlife', '#burningman', '#sf', 'but only i know how', 'for real', '#sxsw', '#ballin', '#omg', '#yolo', '#magic', '#soulfood'];


//what's visible by default
var visibleClass = '.tweet';

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

  //to avoid using visitor as an automatic author
  var generateUser = function() {
    var user = randomElement(users);

    if (user === "visitor") {
      return generateUser();
    }

    return user;
  }

  tweet.user = generateUser();
  tweet.message = randomMessage();
  tweet.created_at = new Date();

  addTweet(tweet);
};


// utility function for adding tweets to our data structures
var addTweet = function(newTweet) {
  var username = newTweet.user;
  streams.users[username].tweets.push(newTweet);
  streams.home.push(newTweet);
};


//appends tweet objects to timeline
var displayAllTweets = function() {


  //WIP
  if (visibleClass === ".tweet") {
    var tweetCount = document.getElementsByClassName("tweet").length;
    var tweetStorage = streams.home;
    //loop through streams.home.length

  } else {
    var user = visibleClass.substring(1);

    var tweetCount = document.getElementsByClassName(user).length;
    var tweetStorage = streams.home; // change this into the user storage and use it
    //loop through user tweets and perform the thing
  }
  //end of WIP

  for (var i = tweetCount; i < tweetStorage.length; i++) {
    var tweet = tweetStorage[i];
    var user = tweetStorage[i].user;

    if (tweetStorage.length > document.getElementsByClassName("tweet").length) {

      var $tweet = $('<div></div>');
      $tweet.addClass("tweet");
      $tweet.addClass(user);


      var $userName = $('<a></a>');
      $userName.text('@' + tweet.user + " ");


      $userName.on("click", function() {

        if (visibleClass === ".tweet") {
          visibleClass = '.' + this.innerHTML.substring(1);
          $('#timeline').text("");

        } else {
           visibleClass = '.tweet';
          $('#timeline').text("");
        }
        
        update();
      })

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


      //if  this.class contains visibleClass append it
      if (visibleClass.includes(user) || visibleClass.includes(".tweet") ) {
        $tweet.appendTo($('#timeline'));
      }
      //repeating other tweets

    }
  }
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


//update the time stamp
var refreshTimeStamps = function() {

  var i = 0;

  $('#timeline').children().each(function () {
    var createdAt = streams.home[i].created_at;
    this.children[2].innerHTML = "   " + timeSince(createdAt) + ' ago';

    i++;
  });

};


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


$(document).keypress(function(key) {
    if(key.which == 13) {
      userInput = $("#input").val();
      $("input")[0].value = "";
      $("input")[0].placeholder = "anything else?";

      var message = userInput;    
      writeTweet(userInput);
    }
});

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
