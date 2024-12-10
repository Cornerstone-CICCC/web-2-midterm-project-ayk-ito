$(function () {
  console.log("About page loaded");

  let currentIndex = 0;
  const trendingImages = JSON.parse(localStorage.getItem("trendingImages")) || [];
  console.log(trendingImages);

  function showNextImage() {
    console.log(trendingImages);

    if (trendingImages.length > 0) {
      do {
        currentIndex = (currentIndex + 1) % trendingImages.length;
        var imageUrl = trendingImages[currentIndex];
      } while (!imageUrl && trendingImages.length > 1); // Skip empty URLs
      if (imageUrl) {
        $("body").css("background-image", `url(${imageUrl})`);
      }
    }
  }

  setInterval(showNextImage, 3000);

  // Initial image
  if (trendingImages.length > 0) {
    $("body").css("background-image", `url(${trendingImages[0]})`);
  }

  function applyDarkMode() {
    if (localStorage.getItem("darkMode") === "true") {
      $("body").addClass("dark-mode");
      $(".navbar").addClass("dark-mode");
      $(".sidebar").addClass("dark-mode");
    }
  }

  $(document).ready(function () {
    $("#home-link").on("click", function (e) {
      e.preventDefault();
      window.location.href = "index.html";
    });

    $("#movie-trend-link").on("click", function (e) {
      e.preventDefault();
      window.location.href = "index.html?media_type=movie";
    });

    $("#show-trend-link").on("click", function (e) {
      e.preventDefault();
      window.location.href = "index.html?media_type=tv";
    });

    $("#day-option").on("click", function (e) {
      e.preventDefault();
      window.location.href = "index.html?time_window=day";
    });

    $("#week-option").on("click", function (e) {
      e.preventDefault();
      window.location.href = "index.html?time_window=week";
    });

    $("#search-form").on("submit", function (e) {
      e.preventDefault();
      const query = $("#search-input").val();
      window.location.href = `index.html?search=${query}`;
    });

    applyDarkMode();
  });
});
