// sprockets style includes

//=include ../../bower_components/jquery/dist/jquery.js
//=include ../../bower_components/jquery-touch-events/src/jquery.mobile-events.js
//=include ../../bower_components/bootstrap-hover-dropdown/bootstrap-hover-dropdown.js
//=include ../../bower_components/bootstrap-sass/assets/javascripts/bootstrap.js

//=include ./debug.js

$(document).ready(function() {
  
    // Add swipe functionality to Bootstrap carousels
    $(".carousel").swiperight(function() {
        $(this).carousel('prev');
    });
    $(".carousel").swipeleft(function() {  
        $(this).carousel('next');
    });

}); /* END document ready */