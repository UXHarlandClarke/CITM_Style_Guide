// sprockets style includes

//=include ../../bower_components/jquery/dist/jquery.js
//=include ../../bower_components/jquery-touch-events/src/jquery.mobile-events.js
//=include ../../bower_components/bootstrap-sass/assets/javascripts/bootstrap.js
//=include ../../bower_components/js-cookie/src/js.cookie.js

//=include ./optinmonster.js
//=include ./luckyorange.js
//=include ./bounce-exchange.js
//=include ./sale.js


//=include ./debug.js

$(document).ready(function() {

    // if (window.location.hostname == "localhost") {
    //     var s = {}
    //     s.pageType = "index";
    // }
    
    // if ((typeof s !== "undefined")) {

    //     console.log(s.pageType);
        
    //     if ((s.pageType == "index") && (typeof Cookies.get("FTO") === "undefined")) {
    //         console.log("set FTO cookie")
    //         Cookies.set('FTO', '5.49', 'Promo','NEW549', 'Seen', 'False', {expires: 30, path:'/'});
    //         console.log(Cookies.get('FTO'));
    //     } else {
    //         console.log("FTO cookie already set")
    //         console.log(Cookies.get('FTO'));
    //          $('.gallery-item').append("<div class='flag flag-sale'>Sale</div>");
        
    //         $('.price').removeClass('price--lg').removeClass('price--sm').addClass('price--xs');
    //         $('.price-group').css({'text-decoration':'line-through'});
    //         $('.price-group').before(
    //         "<p class='price-group'>From <span class='price price--lg'><sup class='price__currency'>$</sup><span class='price__dollar'>5</span><span class='price__mark'>.</span><sup class='price__sup'>49</sup></span></p>"
    //         );
    //     }

    // }

     

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