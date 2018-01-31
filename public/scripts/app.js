/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

// Fake data taken from tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

// Gets time in milliseconds and returns how many days ago is
function getDaysAgo(timeX) {
  const date = new Date();
  const currentDate = date.getDate();
  const timeUntilNow = currentDate - timeX;
  const daysAgo = Math.round(Math.abs(timeUntilNow / (24 * 60 * 60 * 1000)));


  return daysAgo.toLocaleString();
}

function createTweetElement(tweetObj) {
  const $tweet = $('<article>').addClass("tweet");

  const $header = $("<header>");
  const $name = $("<h1>").text(tweetObj.user.name);
  const $handle = $("<p>").text(tweetObj.user.handle);
  
  $header.prepend(`<img alt="avatar" src="${tweetObj.user.avatars.regular}" />`);
  $header.append($name);
  $header.append($handle);
  $header.append('<div class="clearfix"></div>');
  
  const $main = $("<main>");
  const $content = $("<p>").text(tweetObj.content.text);
  $main.append($content);

  const $footer = $("<footer>");
  // const dateCreatedAt = tweetObj.created_at;
  // const date = new Date();
  // const currentDate = date.getDate();
  // const timeUntilNow = currentDate - dateCreatedAt;
  // console.log(timeUntilNow);
  const daysAgo = getDaysAgo(tweetObj.created_at);
  const $date = $('<p>').text(`${daysAgo} days ago`);
  $footer.append($date);


  $tweet.append($header);
  $tweet.append($main);
  $tweet.append($footer);

  return $tweet;
}


function renderTweets(tweets) {

  tweets.forEach(function(tweetObj) {

    const $tweet = createTweetElement(tweetObj);
    // takes return value and appends it to the tweets container
    $('#tweets-container').append($tweet);
  });
}

renderTweets(data);

});
