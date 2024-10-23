const apiKey = "NCDke6ngkaQCyst+W3Mv+Q==bXkZnDNKc9mCGm1w";
const apiUrl = "https://api.api-ninjas.com/v1/quotes?category=happiness";

let currentQuote = "";

function fetchQuote() {
  $.ajax({
    method: "GET",
    url: apiUrl,
    headers: { "X-Api-Key": apiKey },
    contentType: "application/json",
    success: function (result) {
      const quote = result[0];
      currentQuote = quote; // Store the current quote globally
      $("#quote-text").text(`"${quote.quote}"`);
      $("#quote-author").text(`${quote.author}`);
    },
    error: function (jqXHR) {
      console.error("Error fetching the quote: ", jqXHR.responseText);
      $("#quote-text").text("Failed to load quote.");
      $("#quote-author").text("");
    },
  });
}

// Fetch a quote when the page loads
$(document).ready(function () {
  fetchQuote();

  // Fetch a new quote when the button is clicked
  $("#new-quote").click(function () {
    fetchQuote();
  });

  // Tweet the current quote when the Tweet button is clicked
  $("button img")
    .parent()
    .click(function () {
      tweet();
    });
});

function tweet() {
  if (currentQuote) {
    const tweetText = encodeURIComponent(
      `"${currentQuote.quote}" - ${currentQuote.author}`
    );
    const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
    window.open(tweetUrl, "Tweet Window", "width=600, height=300");
  } else {
    alert("No quote available to tweet!");
  }
}
