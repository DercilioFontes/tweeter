/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // Get the data after submitted from the new tweet form 
  $('.new-tweet form').on('submit', function(event) {

    // Prevent the default behaviour
    event.preventDefault();

    // Get the data from the form
    const data = $('.new-tweet form').serialize();

    // Checks if empty or with more then 140 characters and alert the user
    if (data === 'text=') {
      alert(`Sorry! You can't submit a empty tweet!`);
    } else if (data.length > 145) {
      alert(`Sorry! You can't submit a tweet with more the 140 characters!`);
    } else {

      // Submit using AJAX
      $.ajax({ 
        url: '/tweets', 
        method: 'POST',
        data: data, 
        success: function (result) {
          // Empties the tweets and loads all tweets again (with the new one sent to database)
          $('#tweets-container').empty();
          loadTweets();
          $('.new-tweet form textarea').val("");
        }
      });
    }

  });

  // Gets time in milliseconds and returns how many days ago
  function getDaysAgo(timeX) {
    const currentDate = Date.now();
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
      // takes return value and prepends it to the tweets container
      $('#tweets-container').prepend($tweet);
    });
  }

  // Fetchs tweets from /tweets
  function loadTweets() {

    $.ajax({ 
      url: '/tweets', 
      method: 'GET', 
      success: function (tweetsJSON) {
        renderTweets(tweetsJSON);
      }
    });
  }

  loadTweets();

});

