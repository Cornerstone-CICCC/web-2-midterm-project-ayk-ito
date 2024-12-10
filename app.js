$(function () {
  let time_window = "day"; //defalut
  let media_type = "all"; //defalut
  let trendingImages = [];

  const genreContainer = $("#genre");
  const serachTypeContainer = $("#search-type");
  const genreListContainer = $("#genre-list");

  const urlParams = new URLSearchParams(window.location.search);

  const media_typeParam = urlParams.get("media_type");
  const time_windowParam = urlParams.get("time_window");

  const searchParam = urlParams.get("search");
  console.log(media_typeParam, time_windowParam, searchParam);

  if (media_typeParam) {
    media_type = media_typeParam;
  }

  if (time_windowParam) {
    time_window = time_windowParam;
  }

  if (searchParam) {
    search(searchParam);
  } else {
    getAllTrending();
  }
  console.log(media_type, time_window);

  function updateSelectedLink() {
    $("#movie-trend-link").removeClass("selected");
    $("#show-trend-link").removeClass("selected");

    if (media_type === "movie") {
      $("#movie-trend-link").addClass("selected");
    } else if (media_type === "tv") {
      $("#show-trend-link").addClass("selected");
    }
  }

  function applyDarkMode() {
    if (localStorage.getItem("darkMode") === "true") {
      $("body").addClass("dark-mode");
      $(".navbar").addClass("dark-mode");
      $(".sidebar").addClass("dark-mode");
    }
  }

  // Toggle sidebar visibility on hamburger menu click
  $("#hamburger-menu").on("click", function () {
    $(".sidebar").toggleClass("active");
  });

  // Close sidebar when clicking outside of it
  $(document).on("click", function (e) {
    if (!$(e.target).closest(".sidebar, #hamburger-menu").length) {
      $(".sidebar").removeClass("active");
    }
  });

  // Get trending movies and tv shows
  function getAllTrending() {
    $.ajax({
      url: `https://api.themoviedb.org/3/trending/${media_type}/${time_window}?language=en-US`,
      type: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NDMwYTBmNTY1MmFhMjJjN2Q1Nzc2ODc3ZDc4M2I0NyIsIm5iZiI6MTczMzE1ODI2OC42NDEsInN1YiI6IjY3NGRlNTdjNjQ5Y2FjOTNjYjY0MzBhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.J1yDmC441OHot3rvmiK8TLZOeDz68DO41UWd10FhrDk",
        accept: "application/json",
      },

      success: function (response) {
        console.log(response.results);
        let results = response.results;
        const isMobile = window.matchMedia("only screen and (max-width: 768px)").matches;
        trendingImages = results.map((result) =>
          isMobile
            ? `https://image.tmdb.org/t/p/w500/${result.poster_path}`
            : `https://image.tmdb.org/t/p/w500/${result.backdrop_path}`
        );
        // Save trending images to localStorage
        localStorage.setItem("trendingImages", JSON.stringify(trendingImages));

        displayResults(results);
      },
      error: function (error) {
        console.log(error);
      },
    });
  }
  // Get trending movies
  function getMovieTrending() {
    $.ajax({
      url: `https://api.themoviedb.org/3/trending/${media_type}/${time_window}?language=en-US`,
      type: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NDMwYTBmNTY1MmFhMjJjN2Q1Nzc2ODc3ZDc4M2I0NyIsIm5iZiI6MTczMzE1ODI2OC42NDEsInN1YiI6IjY3NGRlNTdjNjQ5Y2FjOTNjYjY0MzBhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.J1yDmC441OHot3rvmiK8TLZOeDz68DO41UWd10FhrDk",
        accept: "application/json",
      },

      success: function (response) {
        console.log(response.results);
        let results = response.results;
        displayResults(results);
      },
      error: function (error) {
        console.log(error);
      },
    });
  }

  // Get trending tv shows
  function getShowTrending() {
    $.ajax({
      url: `https://api.themoviedb.org/3/trending/${media_type}/${time_window}?language=en-US`,
      type: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NDMwYTBmNTY1MmFhMjJjN2Q1Nzc2ODc3ZDc4M2I0NyIsIm5iZiI6MTczMzE1ODI2OC42NDEsInN1YiI6IjY3NGRlNTdjNjQ5Y2FjOTNjYjY0MzBhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.J1yDmC441OHot3rvmiK8TLZOeDz68DO41UWd10FhrDk",
        accept: "application/json",
      },

      success: function (response) {
        console.log(response.results);
        let results = response.results;
        displayResults(results);
      },
      error: function (error) {
        console.log(error);
      },
    });
  }

  // search form event
  function getGenres(e) {
    $.ajax({
      url: `https://api.themoviedb.org/3/genre/movie/list?language=en`,
      type: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NDMwYTBmNTY1MmFhMjJjN2Q1Nzc2ODc3ZDc4M2I0NyIsIm5iZiI6MTczMzE1ODI2OC42NDEsInN1YiI6IjY3NGRlNTdjNjQ5Y2FjOTNjYjY0MzBhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.J1yDmC441OHot3rvmiK8TLZOeDz68DO41UWd10FhrDk",
        accept: "application/json",
      },

      success: function (response) {
        console.log(response.genres);
        let results = response.genres;
        displayGenres(results);
      },
      error: function (error) {
        console.log(error);
      },
    });
  }
  function displayGenres(genres) {
    genreListContainer.empty();
    genres.forEach((genre) => {
      const genreItem = `
        <div class="col-12 mb-2">
          <div class="genre-item">
          <a href="#" class="genre-link" data-genre-id="${genre.id}">${genre.name}</a>
          </div>
        </div>
      `;
      genreListContainer.append(genreItem);
    });
    genreListContainer.show();

    // Add click event to genre links
    $(".genre-link").on("click", function (e) {
      e.preventDefault();
      $(".genre-link").removeClass("selected");
      $(this).addClass("selected");

      const genreId = $(this).data("genre-id");
      searchByGenre(genreId);
      media_type = "all";
      updateSelectedLink();
    });
  }

  function searchByGenre(genreId) {
    $.ajax({
      url: `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&language=en-US`,
      type: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NDMwYTBmNTY1MmFhMjJjN2Q1Nzc2ODc3ZDc4M2I0NyIsIm5iZiI6MTczMzE1ODI2OC42NDEsInN1YiI6IjY3NGRlNTdjNjQ5Y2FjOTNjYjY0MzBhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.J1yDmC441OHot3rvmiK8TLZOeDz68DO41UWd10FhrDk",
        accept: "application/json",
      },
      success: function (response) {
        console.log(response.results);
        let results = response.results;
        displayResults(results);
      },
      error: function (error) {
        console.log(error);
      },
    });
  }

  function search(keyword) {
    $.ajax({
      url: `https://api.themoviedb.org/3/search/multi?query=${keyword}&language=en-US`,
      type: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NDMwYTBmNTY1MmFhMjJjN2Q1Nzc2ODc3ZDc4M2I0NyIsIm5iZiI6MTczMzE1ODI2OC42NDEsInN1YiI6IjY3NGRlNTdjNjQ5Y2FjOTNjYjY0MzBhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.J1yDmC441OHot3rvmiK8TLZOeDz68DO41UWd10FhrDk",
        accept: "application/json",
      },
      success: function (response) {
        console.log(response.results);
        let results = response.results;
        displaySearchResults(results);
      },
      error: function (error) {
        console.log(error);
      },
    });
  }

  function searchByType(type, keyword) {
    $.ajax({
      url: `https://api.themoviedb.org/3/search/${type}?query=${keyword}&language=en-US`,
      type: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NDMwYTBmNTY1MmFhMjJjN2Q1Nzc2ODc3ZDc4M2I0NyIsIm5iZiI6MTczMzE1ODI2OC42NDEsInN1YiI6IjY3NGRlNTdjNjQ5Y2FjOTNjYjY0MzBhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.J1yDmC441OHot3rvmiK8TLZOeDz68DO41UWd10FhrDk",
        accept: "application/json",
      },
      success: function (response) {
        console.log(type, keyword);
        console.log(response);
        console.log(response.results);
        let results = response.results;
        displaySearchResults(results);
      },
      error: function (error) {
        console.log(error);
      },
    });
  }

  // Display results
  function displayResults(results) {
    const resultsContainer = $("#results");
    resultsContainer.empty();
    results.forEach((result, index) => {
      if (result.backdrop_path == null) {
        return;
      }
      const colClass = index < 2 ? "col-6" : "col-4";
      const resultItem = `
        <div class="${colClass} mb-4" style="animation-delay: ${index * 0.2}s;">
          <div class="result-item">
            <img src="https://image.tmdb.org/t/p/w500/${result.backdrop_path}" alt="${
        result.title || result.name
      }" />
            <div class="result-title">
              <h3>${result.title || result.name}</h3>
            </div>
          </div>
        </div>
      `;
      resultsContainer.append(resultItem);
    });
    // Add click event to result items
    $(".result-item").on("click", function () {
      const id = $(this).data("id");
      getDetail(id);
    });
  }
  function getDetail(id) {
    $.ajax({
      url: `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
      type: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NDMwYTBmNTY1MmFhMjJjN2Q1Nzc2ODc3ZDc4M2I0NyIsIm5iZiI6MTczMzE1ODI2OC42NDEsInN1YiI6IjY3NGRlNTdjNjQ5Y2FjOTNjYjY0MzBhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.J1yDmC441OHot3rvmiK8TLZOeDz68DO41UWd10FhrDk",
        accept: "application/json",
      },
      success: function (response) {
        console.log(response);
        displayDetail(response);
      },
      error: function (error) {
        console.log(error);
      },
    });
  }

  // Display results
  function displaySearchResults(results) {
    const resultsContainer = $("#results");
    resultsContainer.empty();
    results.forEach((result, index) => {
      if (result.poster_path == null && result.release_date != null) {
        return;
      }
      const colClass = "col-2";
      const resultItem = `
            <div class="${colClass} mb-4" style="animation-delay: ${index * 0.2}s;">
              <div class="result-item">
                <img src="https://image.tmdb.org/t/p/w500/${
                  result.poster_path || result.profile_path
                }" alt="${result.title || result.name}" />
                <div class="result-title">
                  <h3>${result.title || result.name}</h3>
                </div>
              </div>
            </div>
          `;
      resultsContainer.append(resultItem);
    });
  }

  // home link click event
  $("#home-link").on("click", function (e) {
    e.preventDefault();
    media_type = "all";
    getAllTrending();
    updateSelectedLink();
    genreContainer.show();
    genreListContainer.hide();
    serachTypeContainer.hide();
  });

  // movie trend link click event
  $("#movie-trend-link").on("click", function (e) {
    e.preventDefault();
    media_type = "movie";
    updateSelectedLink();
    getMovieTrending();
    genreContainer.show();
    genreListContainer.hide();
    serachTypeContainer.hide();
  });

  // show trend link click event
  $("#show-trend-link").on("click", function (e) {
    e.preventDefault();
    media_type = "tv";
    updateSelectedLink();
    getShowTrending();
    genreContainer.show();
    genreListContainer.hide();
    serachTypeContainer.hide();
  });
  // Genre link click event
  $("#genre-link").on("click", function (e) {
    e.preventDefault();
    const genreListContainer = $("#genre-list");
    if (genreListContainer.is(":visible")) {
      genreListContainer.hide();
    } else {
      getGenres();
    }
  });

  // Dropdown menu click events
  $("#day-option").on("click", function (e) {
    e.preventDefault();
    time_window = "day";
    $("#dropdownMenuButton").text("Day");
    getAllTrending();
    genreContainer.show();
    genreListContainer.hide();
    serachTypeContainer.hide();
  });

  $("#week-option").on("click", function (e) {
    e.preventDefault();
    time_window = "week";
    $("#dropdownMenuButton").text("Week");
    getAllTrending();
    genreContainer.show();
    genreListContainer.hide();
    serachTypeContainer.hide();
  });

  // Search form submit event
  $("#search-form").on("submit", function (e) {
    e.preventDefault();
    const keyword = $("#search-input").val();
    search(keyword);

    genreContainer.hide();
    serachTypeContainer.show();
  });

  // Search type link click events
  $(".search-type-link").on("click", function (e) {
    e.preventDefault();
    const searchType = $(this).attr("search-type-id");
    const keyword = $("#search-input").val();
    console.log(searchType, keyword);

    searchByType(searchType, keyword);
  });

  // Toggle dark mode
  $("#toggle-dark-mode").on("click", function () {
    $("body").toggleClass("dark-mode");
    $(".navbar").toggleClass("dark-mode");
    $(".sidebar").toggleClass("dark-mode");
    const darkModeEnabled = $("body").hasClass("dark-mode");
    localStorage.setItem("darkMode", darkModeEnabled);
  });

  // Initial
  getAllTrending();
  updateSelectedLink();
  applyDarkMode();
});
