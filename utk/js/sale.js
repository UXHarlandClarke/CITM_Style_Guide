jQuery(function(){
	if (window.location.hostname == "localhost") {
        var s = {}
        s.pageType = "index";
    }
    
    if (typeof s !== "undefined") {
        
        if ((s.pageType == "index") && (typeof Cookies.get("FTO") === "undefined")) {
            console.log("set FTO cookie")
            Cookies.set('FTO', 5.49, 'Promo','NEW549', 'Seen', 'False', {expires: 30, path:'/'});
            console.log(Cookies.get('FTO'));
        } else {
            console.log("FTO cookie already set")
            console.log(Cookies.get('FTO'));
        	$('.gallery-item-title').css({'clear':'both'});
            $('.price-group .price').removeClass('price--lg').removeClass('price--sm').addClass('price--xs');
            $('.price-group').css({'text-decoration':'line-through','padding-top':'1.4em'});

            $('.price-group').before(
            "<p class='price-group sale' style='float:left'>Now <span class='price sale price--lg'><sup class='price__currency'>$</sup>"+
            "<span class='price__dollar'>"+Cookies.get('FTO').split('.')[0]+"</span><span class='price__mark'>.</span>"+
            "<sup class='price__sup'>"+Cookies.get('FTO').split('.')[1]+"</sup></span></p>"
            );
            $('.gallery-item').prepend("<div class='flag flag-sale'>Sale</div>");
        }

        if((typeof Cookies.get("FTO") !== "undefined") && (Cookies.get('FTO').Seen =='False')){
        	var price = Cookies.get('FTO');
        	if(s.pageName=="product"){
        		$('[id*=ctl00_spnPrice]').css({'text-decoration':'line-through'}).before(
	            "<span class='price-group sale' style='position: absolute; right: 5em;'><span class='price sale price--lg'><sup class='price__currency'>$</sup>"+
	            "<span class='price__dollar'>"+price.toString().split('.')[0]+"</span><span class='price__mark'>.</span>"+
	            "<sup class='price__sup'>"+price.toString().split('.')[1]+"</sup></span></span>"
	            );

	            price += price;
	            $('[id*=ctl01_spnPrice]').css({'text-decoration':'line-through'}).before(
	            "<span class='price-group sale' style='position: absolute; right: 5em;'><span class='price sale price--lg'><sup class='price__currency'>$</sup>"+
	            "<span class='price__dollar'>"+price.toString().split('.')[0]+"</span><span class='price__mark'>.</span>"+
	            "<sup class='price__sup'>"+price.toString().split('.')[1]+"</sup></span></span>"
	            );

	            price += price;
	            $('[id*=ctl02_spnPrice]').css({'text-decoration':'line-through'}).before(
	            "<span class='price-group sale' style='position: absolute; right: 5em;'><span class='price sale price--lg'><sup class='price__currency'>$</sup>"+
	            "<span class='price__dollar'>"+price.toString().split('.')[0]+"</span><span class='price__mark'>.</span>"+
	            "<sup class='price__sup'>"+price.toString().split('.')[1]+"</sup></span></span>"
	            );
        	}

        	if((s.pageType == "cart")){
	        	$('.PromoTxt').val(Cookies.get('FTO').Promo);
	        	javascript:__doPostBack('ctl00$ContentPlaceHolder1$ctlCart$ucPromotions$lbPromoCode','');
	        }
        }
        
        
    }
	
	if ((s.pageType == "checkout") && (typeof Cookies.get("FTO") === "undefined")){
		Cookies.set('Seen', 'True');
	}
});