let source = document.getElementById('subreddit-template').innerHTML;
let template = Handlebars.compile(source);
Handlebars.registerHelper("numberFormat", function(number) {
  return number.toLocaleString();
});

$(document).ready(function() {
  var search = getParameterByName("subreddit");
  $("#loading").css("display", "block");
  $.ajax({
   type: "GET",
    url: `https://www.reddit.com/r/${search}.json`,
    data: $(this).serialize(),
    success: function(response) {
      //console.log(response.data.children);
      let renderedPosts = template({
        posts: response.data.children
      });
      $('#post_container').append(renderedPosts);
    },
    error: function() {
      $("#post_container").text("Oops! Something went wrong!");
    },
    complete: function(data) {
      $("#loading").css("display", "none");
    }
  })
})

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
