// sprockets style includes

//=include ../../bower_components/jquery/dist/jquery.js
//=include ../../bower_components/jquery-touch-events/src/jquery.mobile-events.js
//=include ../../bower_components/bootstrap-sass/assets/javascripts/bootstrap.js
//=include ../../bower_components/js-cookie/src/js.cookie.js

//=include ./optinmonster.js
//=include ./luckyorange.js
//=include ./bounce-exchange.js


//=include ./debug.js

$(document).ready(function() {

    // Add swipe functionality to Bootstrap carousels
    $(".carousel").swiperight(function() {
        $(this).carousel('prev');
    });
    $(".carousel").swipeleft(function() {  
        $(this).carousel('next');
    });
    
    // Toggle the navigation dropdowns on hover and click, still allowing for tap open on mobile
    $('.dropdown').on('mouseenter mouseleave click', function() {
        $(this).toggleClass("open");
        console.log("hover");
    });
    
    // Tooltip
    $('[data-toggle="tooltip"]').tooltip();




}); /* END document ready */