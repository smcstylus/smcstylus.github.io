(function ($) {
  const removeHash = () => {
    var noHashURL = window.location.href.replace(/#.*$/, "");
    window.history.replaceState("", document.title, noHashURL);
  };

  const scrollToEl = (el) => {
    if ($(el).length) {
      window.scrollTo({
        top: $(el).offset()["top"] - $("#header").outerHeight(),
        behavior: "smooth",
      });
      if (window.location.hash) {
        removeHash();
      }
    } else {
      removeHash();
    }
  };

  /**
   * Sticky Header
   */
  $(".js-sticky-header").sticky({ topSpacing: 0 });

  /**
   * Main Menu
   */
  var initMainMenu = function () {
    // Clone for mobile
    $(".js-clone-nav").each(function () {
      $(this)
        .clone()
        .attr("class", "site-nav-wrap")
        .appendTo(".site-mobile-menu-body");
    });

    // Add collapsible menu
    setTimeout(function () {
      let counter = 0;
      $(".site-mobile-menu .has-children").each(function () {
        let el = $(this);
        el.prepend('<span class="arrow-collapse collapsed" >');
        el.find(".arrow-collapse").attr({
          "data-bs-toggle": "collapse",
          "data-bs-target": "#collapseItem-" + counter,
        });

        el.find("> ul").attr({
          class: "collapse",
          id: "collapseItem-" + counter,
        });

        counter++;
      });
      $(".site-mobile-menu .social").each(function () {
        $(this).removeClass("hidden");
      });
    }, 1000);

    const removeCanvas = () => {
      $("body").removeClass("offcanvas-menu");
      $("#header").removeClass("blur");
      $("#hero").removeClass("blur");
      $("#main").removeClass("blur");
    };
    //
    $(".arrow-collapse").on("click", function (e) {
      let el = $(this);
      if (el.closest("li").find(".collapse").hasClass("show")) {
        el.removeClass("active");
      } else {
        el.addClass("active");
      }
      e.preventDefault();
    });

    // Show/hide mobile menu on responsive
    $(window).resize(function () {
      if ($(this).width() > 768) {
        if ($("body").hasClass("offcanvas-menu")) {
          removeCanvas();
        }
      }
    });

    // Toggle mobile menu
    $(".js-menu-toggle").on("click", function (e) {
      let el = $(this);
      e.preventDefault();

      if ($("body").hasClass("offcanvas-menu")) {
        removeCanvas();
        el.removeClass("active");
      } else {
        $("body").addClass("offcanvas-menu");
        $("#header").addClass("blur");
        $("#hero").addClass("blur");
        $("#main").addClass("blur");

        el.addClass("active");
      }
    });

    // Close mobile menu when click outisde offcanvas
    $(document).mouseup(function (e) {
      let container = $(".site-mobile-menu");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($("body").hasClass("offcanvas-menu")) {
          removeCanvas();
        }
      }
    });
    let navbarlinks = $("#main-nav .scrollto");
    const navbarlinksActive = () => {
      let position = window.scrollY + 74;
      navbarlinks.each(function (index) {
        let hs = this.hash;
        let section = $(hs);
        if (!section) return;
        if (
          position >= section.offset()["top"] &&
          position <= section.offset()["top"] + section.outerHeight()
        ) {
          $(this).addClass("active");
        } else {
          $(this).removeClass("active");
        }
      });
    };
    window.addEventListener("load", navbarlinksActive);
    $(document).scroll(navbarlinksActive);
  };
  initMainMenu();

  $(".scrollto").on("click", function (e) {
    if (this.hash) {
      e.preventDefault();
      if ($("body").hasClass("offcanvas-menu")) {
        setTimeout(function () {
          $("#site-mobile-menu-close").trigger("click");
        }, 300);
      }
      scrollToEl(this.hash);
    }
  });

  window.addEventListener("load", () => {
    if (window.location.hash) {
      if ($(window.location.hash)) {
        scrollToEl(window.location.hash);
      }
    }
  });
  // Load animations
  window.addEventListener("load", () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  });

  // Lights
  $(".switch").on("click", function () {
    if ($("body").hasClass("light")) {
      $("body").removeClass("light");
      $(".switch").removeClass("switched");
    } else {
      $("body").addClass("light");
      $(".switch").addClass("switched");
    }
  });

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  let progressPath = document.querySelector(".progress-wrap path");
  let pathLength = progressPath.getTotalLength();
  progressPath.style.transition = progressPath.style.WebkitTransition = "none";
  progressPath.style.strokeDasharray = pathLength + " " + pathLength;
  progressPath.style.strokeDashoffset = pathLength;
  progressPath.getBoundingClientRect();
  progressPath.style.transition = progressPath.style.WebkitTransition =
    "stroke-dashoffset 10ms linear";
  const updateProgress = () => {
    let scroll = window.scrollY;
    let height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    let progress = pathLength - (scroll * pathLength) / height;
    progressPath.style.strokeDashoffset = progress;
  };
  updateProgress();
  window.addEventListener("load", updateProgress);
  $(document).scroll(updateProgress);

  const scroolProgress = () => {
    if (window.scrollY > 100) {
      $(".progress-wrap").addClass("active-progress");
    } else {
      $(".progress-wrap").removeClass("active-progress");
    }
  };
  window.addEventListener("load", scroolProgress);
  $(window).scroll(scroolProgress);
  $(".progress-wrap").on("click", scrollToTop);
})(jQuery);
