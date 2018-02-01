/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // Gets time in milliseconds and returns how many days ago
  function getDaysAgo(timeX) {
    const date = new Date();
    const currentDate = date.getDate();
    const timeUntilNow = currentDate - timeX;
    const daysAgo = Math.round(Math.abs(timeUntilNow / (24 * 60 * 60 * 1000)));

    return daysAgo.toLocaleString();
  }

  // Creates each tweet and return to be rendered into de site
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
    const daysAgo = getDaysAgo(tweetObj.created_at);
    const $date = $('<p>').text(`${daysAgo} days ago`);
    $footer.append($date);


    $tweet.append($header);
    $tweet.append($main);
    $tweet.append($footer);

    return $tweet;
  }

  // Renders the tweets
  function renderTweets(tweets) {

    tweets.forEach(function(tweetObj) {

      const $tweet = createTweetElement(tweetObj);
      // takes return value and appends it to the tweets container
      $('#tweets-container').append($tweet);
    });
  }

  // Fetchs tweets from /tweets
  function loadTweets() {

    $.ajax({ 
      url: '/tweets', 
      method: 'GET', 
      success: function (tweetsJSON) {
        renderTweets(tweetsJSON);
        // Test!
        // console.log('Success: ', tweetsJSON);
      }
    });
  }

  loadTweets();

});

