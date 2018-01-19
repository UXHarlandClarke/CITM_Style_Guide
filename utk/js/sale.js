jQuery(function(){
	if (window.location.hostname == "localhost") {
        var s = {}
        s.pageType = "index";
    }
    
    if ((typeof s !== "undefined")) {

        console.log(s.pageType);
        
        if ((s.pageType == "index") && (typeof Cookies.get("FTO") === "undefined")) {
            console.log("set FTO cookie")
            Cookies.set('FTO', '5.49', 'Promo','NEW549', 'Seen', 'False', {expires: 30, path:'/'});
            console.log(Cookies.get('FTO'));
        } else {
            console.log("FTO cookie already set")
            console.log(Cookies.get('FTO'));
        	$('.gallery-item-title').css({'clear':'both'});
            $('.price-group .price').removeClass('price--lg').removeClass('price--sm').addClass('price--xs');
            $('.price-group').css({'text-decoration':'line-through','padding-top':'1.4em'});

            $('.price-group').before(
            "<p class='price-group sale' style='float:left'>Now <span class='price price--lg'><sup class='price__currency'>$</sup>"+
            "<span class='price__dollar'>"+Cookies.get('FTO').split('.')[0]+"</span><span class='price__mark'>.</span>"+
            "<sup class='price__sup'>"+Cookies.get('FTO').split('.')[1]+"</sup></span></p>"
            );
            $('.gallery-item').prepend("<div class='flag flag-sale'>Sale</div>");
        }
    }
	
	if ((s.pageType == "checkout") && (typeof Cookies.get("FTO") === "undefined")){
		Cookies.set('Seen', 'True');
	}
});