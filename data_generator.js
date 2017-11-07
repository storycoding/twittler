/*
 * NOTE: This file generates fake tweet data, and is not intended to be part of your implementation.
 * You can safely leave this file untouched, and confine your changes to index.html.
 */

// set up data structures
window.streams = {};
streams.home = [];
streams.users = {};
streams.users.shawndrost = {};
streams.users.shawndrost.tweets = [];
streams.users.shawndrost.href = "https://twitter.com/shawndrost";

streams.users.sharksforcheap = {};
streams.users.sharksforcheap.tweets = [];
streams.users.sharksforcheap.href = "https://twitter.com/sharksforcheap"
//https://twitter.com/sharksforcheap
streams.users.mracus = {};
streams.users.mracus.tweets = [];
streams.users.mracus.href = "https://twitter.com/mracus"
streams.users.douglascalhoun = {};
streams.users.douglascalhoun.tweets = [];
streams.users.douglascalhoun.href = "https://twitter.com/douglascalhoun"

window.users = Object.keys(streams.users);


// utility function for adding tweets to our data structures


var score = 0;

var update = function() {
  $('#timeline').text("");
  displayAllTweets();
  //setTimeout(update, 500); //half second
};


var scoreUpdate = function() {
  score += 0.1;
    $('#scoreHUD').text(score.toFixed(1));
   setTimeout(scoreUpdate, 100);
};

var addTweet = function(newTweet){
  var username = newTweet.user;
  streams.users[username].tweets.push(newTweet);
  streams.home.push(newTweet);
};

// utility function
var randomElement = function(array){
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

// random tweet generator
var opening = ['just', '', '', '', '', 'ask me how i', 'completely', 'nearly', 'productively', 'efficiently', 'last night i', 'the president', 'that wizard', 'a ninja', 'a seedy old man'];
var verbs = ['downloaded', 'interfaced', 'deployed', 'developed', 'built', 'invented', 'experienced', 'navigated', 'aided', 'enjoyed', 'engineered', 'installed', 'debugged', 'delegated', 'automated', 'formulated', 'systematized', 'overhauled', 'computed'];
var objects = ['my', 'your', 'the', 'a', 'my', 'an entire', 'this', 'that', 'the', 'the big', 'a new form of'];
var nouns = ['cat', 'koolaid', 'system', 'city', 'worm', 'cloud', 'potato', 'money', 'way of life', 'belief system', 'security system', 'bad decision', 'future', 'life', 'pony', 'mind'];
var tags = ['#techlife', '#burningman', '#sf', 'but only i know how', 'for real', '#sxsw', '#ballin', '#omg', '#yolo', '#magic', '#soulfood', '', '', ''];

var randomMessage = function(){
  return [randomElement(opening), randomElement(verbs), randomElement(objects), randomElement(nouns), randomElement(tags)].join(' ');
};

// generate random tweets on a random schedule
var generateRandomTweet = function(){
  var tweet = {};
  tweet.user = randomElement(users);
  tweet.message = randomMessage();
  tweet.created_at = new Date();
  tweet.href = streams.users[tweet.user].href;
  addTweet(tweet);
  //add the element to the dom here
};



var displayAllTweets = function() {
  for (var i = 0; i < streams.home.length; i++) {
    var tweet = streams.home[i];
    var $tweet = $('<div></d1iv>');
      $tweet.addClass("tweet");
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
};

//is displaying lots at a time
var scheduleNextTweet = function(){
  generateRandomTweet();
  $("#tweetCounter").text(streams.home.length);
  update();
  tweetSFX.play();
  setTimeout(scheduleNextTweet, Math.floor(Math.random() * (5000 - 1000) + 1000));
};



// utility function for letting students add "write a tweet" functionality
// (note: not used by the rest of this file.)
var writeTweet = function(message){
  if(!visitor){
    throw new Error('set the global visitor property!');
  }
  var tweet = {};
  tweet.user = visitor;
  tweet.message = message;
  addTweet(tweet);
};

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
  }