/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
 $(document).ready(function() {

function renderTweets(tweets) {
  $('#tweets').empty();
  for (let tweet in tweets){
    $(createTweetElement(tweets[tweet])).prependTo('#tweets');
  }
}

function createTweetElement(tweet) {
  // let $article = $('<article class="tweet"></article>');
  //   $article.append(createHeader(tweet))
  //           .append(createBody(tweet))
  //           .append(createFooter(tweet))
  //   return $article;
  return $('<article>', {
    class: "tweet",
    html: [
      createHeader(tweet),
      createBody(tweet),
      createFooter(tweet)
    ]
  })
}

function createHeader(data) {
  var $header = $('<header></header>')
    $header.append($('<img>').addClass('avatar').attr('src', data.user.avatars.small))
           .append($('<h3></h3>').text(data.user.name))
           .append($('<span>').addClass("user-handle").text(`${data.user.handle}`));
    return $header;
}

function createBody(data) {
  var $body = $('<div>')
    $body.append($('<p>').text(data.content.text));
  return $body;
}

function createFooter(data) {
  var $footer = $('<footer>')
    $footer.append($('<p>').text(data.created_at));
  return $footer;
}

function loadTweets() {
  $.ajax ({
    method: 'GET',
    url: '/tweets',
    success: function(tweets) {
      renderTweets(tweets);
    },
    error: function() {
      // alert('error');
    }
  })
}
//event handlers

$('#usr-nav').on('click', function(e){
    $('section.new-tweet').slideToggle();
    $('section textarea').focus();
  });

$('.new-tweet form').on('submit', function (e) {
  e.preventDefault();

  $('#error').text("");
  var $newTweet = $('.new-tweet textarea');
  var $newTweetText = $newTweet.val().trim();
  alert($newTweetText);
  if ($newTweetText.length === 0) {
    $('#error').text("Tweet area cannot be empty.");
  } else if ($newTweetText.length > 140) {
    $('#error').text("Tweet exceeds 140 characters.");
  } else {
  $.ajax ({
    method: 'POST',
    url: '/tweets',
    data: {
      text: $newTweetText
    },
    success: function() {
      // alert('success');
      loadTweets();
    },
    error: function() {
      // alert('error');
    }
  })
}
});

loadTweets();

})
