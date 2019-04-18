$(document).ready(function() {
  // Position 630 for Deloitte
  $(window).scroll(function() {
    let position = $(this).scrollTop();
    console.log(position);
    if (position >= 150) {
      $(".deloitte-logo").addClass("show-deloitte-logo");
      $(".deloitte-text").addClass("show-deloitte-text");
    } else {
      $(".deloitte-logo").removeClass("show-deloitte-logo");
      $(".deloitte-text").removeClass("show-deloitte-text");
    }
  });
  // Position 980 for UN
  $(window).scroll(function() {
    let position = $(this).scrollTop();
    if (position >= 600) {
      $(".un-logo").addClass("show-un-logo");
      $(".un-text").addClass("show-un-text");
    } else {
      $(".un-logo").removeClass("show-un-logo");
      $(".un-text").removeClass("show-un-text");
    }
  });
  // Position 1245 for RBC
  $(window).scroll(function() {
    let position = $(this).scrollTop();
    if (position >= 790) {
      $(".rbc-logo").addClass("show-rbc-logo");
      $(".rbc-text").addClass("show-rbc-text");
    } else {
      $(".rbc-logo").removeClass("show-rbc-logo");
      $(".rbc-text").removeClass("show-rbc-text");
    }
  });
  // Position 1590 for PwC
  $(window).scroll(function() {
    let position = $(this).scrollTop();
    if (position >= 1150) {
      $(".pwc-logo").addClass("show-pwc-logo");
      $(".pwc-text").addClass("show-pwc-text");
    } else {
      $(".pwc-logo").removeClass("show-pwc-logo");
      $(".pwc-text").removeClass("show-pwc-text");
    }
  });

  // Gallery
  $(".gallery-category").click(function() {
    let value = $(this).attr("data-filter");
    if (value === "all") {
      $(".filter").show(300);
    } else {
      $(".filter")
        .not("." + value)
        .hide(300);
      $(".filter")
        .filter("." + value)
        .show(300);
    }
  });
});

/*-------------------------------
            Preloader
---------------------------------*/

$(window).on("load", () => {
  $("#status").fadeOut();
  $("#preloader")
    .delay(350)
    .fadeOut("slow");
});

/*-------------------------------
            WOW
---------------------------------*/

//Initialize WOW
$(() => {
  new WOW().init();
});

/*-------------------------------
            Animation
---------------------------------*/

// Animate the arrow down
$(window).on("load", () => {
  $("#arrow-down i").addClass("animated fadeInDown infinite");
});

/*-------------------------------
            Google Map
---------------------------------*/

$(window).on("load", () => {
  // Penn Address
  const pennAddress = "University of Pennsylvania, Philadelphia, PA 19104";
  // The location of Penn
  const pennLocation = { lat: 39.952217, lng: -75.193214 };
  // The map, centered at Penn
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: pennLocation
  });
  // The marker, positioned at Penn
  const marker = new google.maps.Marker({
    position: pennLocation,
    map: map,
    title: "Click to see address"
  });
  // Info Window
  const infowindow = new google.maps.InfoWindow({
    content: pennAddress
  });
  // Add click event when hovering onto the marker to show the info
  marker.addListener("click", () => {
    infowindow.open(map, marker);
  });
});

/*-------------------------------
            Navigation Bar
---------------------------------*/
$(() => {
  $(window).scroll(() => {
    if ($(window).scrollTop() > 50) {
      // Add white-navbar class
      $("nav").addClass("white-navbar");
      // Show back to home button
      $("#back-to-home").fadeIn();
    } else {
      // Remove white-navbar class
      $("nav").removeClass("white-navbar");
      $("#back-to-home").fadeOut();
    }
  });
});

/*-------------------------------
            Smooth Scroll
---------------------------------*/

$(() => {
  $("a.smooth-scroll").click(function(e) {
    e.preventDefault();
    const sectionId = $(this).attr("href");
    $("html, body").animate(
      {
        scrollTop: $(sectionId).offset().top - 64
      },
      1200
    );
  });
});
