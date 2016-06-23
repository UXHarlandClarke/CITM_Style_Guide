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
    

    // Click and Tap functionality for dropdowns
    // ---------------------------------------------------
    
    // UTK top menu 
    // (disable click so menu stays open if clicking while hovering)
    $('#utk-menu .dropdown-toggle').click(function() { 
        return false; 
    });
    
    // UTK top menu 
    // (allow menu to be opened on mobile 'touchstart')
    $('#utk-menu .dropdown').on('touchstart', function() { 
        $(this).toggleClass('open');
    });
 
}); /* END document ready */