//$(document).ready(function() {
$( window ).on( "load", function(){
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
            $('.gallery-item-home .price-group').css({'line-height':'0.75em','padding-bottom':'0.75em'});
        	$('.gallery-item-title').css({'clear':'both'});
            $('.price-group .price').removeClass('price--lg').removeClass('price--sm').addClass('price--xs').css({'opacity':'0.5'});

            // $('.price-group .price').css({'opacity':'0.5','padding-top':'1.4em'});
            // $('.price-group').before(
            // "<p class='price-group sale' style='float:left; line-height:0.5; padding-top:1.4em;'>Now <span class='price sale price--lg'><sup class='price__currency'>$</sup>"+
            // "<span class='price__dollar'>"+Cookies.get('FTO').split('.')[0]+"</span><span class='price__mark'>.</span>"+
            // "<sup class='price__sup'>"+Cookies.get('FTO').split('.')[1]+"</sup></span></p>"
            // );

            $('.price-group').prepend(
            "Now <span class='price sale'><sup class='price__currency'>$</sup>"+
            "<span class='price__dollar'>"+Cookies.get('FTO').split('.')[0]+"</span><span class='price__mark'>.</span>"+
            "<sup class='price__sup'>"+Cookies.get('FTO').split('.')[1]+"</sup></span>"
            );
            $('.gallery-item').prepend("<div class='flag flag-sale'>Sale</div>");
        }

        if((typeof Cookies.get("FTO") !== "undefined") && (Cookies.get('FTO').Seen =='False')){
        	if(s.pageName=="product"){
        		// var price = Cookies.get('FTO');
        		// $('[id*=ctl00_spnPrice]').before(
	         //    "<span class='price-group sale' style='position: absolute; right: 5em;'><span class='price><sup class='price__currency'>$</sup>"+
	         //    "<span class='price__dollar'>"+price.toString().split('.')[0]+"</span><span class='price__mark'>.</span>"+
	         //    "<sup class='price__sup'>"+price.toString().split('.')[1]+"</sup></span></span>"
	         //    );

	         //    price = Cookies.get('FTO')*2;
	         //    $('[id*=ctl01_spnPrice]').before(
	         //    "<span class='price-group sale' style='position: absolute; right: 5em;'><span class='price'><sup class='price__currency'>$</sup>"+
	         //    "<span class='price__dollar'>"+price.toString().split('.')[0]+"</span><span class='price__mark'>.</span>"+
	         //    "<sup class='price__sup'>"+price.toString().split('.')[1]+"</sup></span></span>"
	         //    );

	         //    price = Cookies.get('FTO')*3;
	         //    $('[id*=ctl02_spnPrice]').before(
	         //    "<span class='price-group sale' style='position: absolute; right: 5em;'><span class='price '><sup class='price__currency'>$</sup>"+
	         //    "<span class='price__dollar'>"+price.toString().split('.')[0]+"</span><span class='price__mark'>.</span>"+
	         //    "<sup class='price__sup'>"+price.toString().split('.')[1]+"</sup></span></span>"
	         //    );

          //       price = Cookies.get('FTO')*4;
          //       $('[id*=ctl03_spnPrice]').before(
          //       "<span class='price-group sale' style='position: absolute; right: 5em;'><span class='price '><sup class='price__currency'>$</sup>"+
          //       "<span class='price__dollar'>"+price.toString().split('.')[0]+"</span><span class='price__mark'>.</span>"+
          //       "<sup class='price__sup'>"+price.toString().split('.')[1]+"</sup></span></span>"
          //       );

                for(var i = 1; i<=$('.product_option_price').length; i++){
                    var price = Cookies.get('FTO')*i;
                    var p = i-;
                    $('[id*=ctl0'+p+'_spnPrice]').before(
                    "<span class='price-group sale' style='position: absolute; right: 5em;'><span class='price '><sup class='price__currency'>$</sup>"+
                    "<span class='price__dollar'>"+price.toString().split('.')[0]+"</span><span class='price__mark'>.</span>"+
                    "<sup class='price__sup'>"+price.toString().split('.')[1]+"</sup></span></span>"
                    );
                }
        	}

        	if((s.pageType == "cart")){
	        	$('.PromoTxt').val(Cookies.get('FTO').Promo);
	        	javascript:__doPostBack('ctl00$ContentPlaceHolder1$ctlCart$ucPromotions$lbPromoCode','');
	        }
        }
        
        if ((s.pageType == "checkout") && (typeof Cookies.get("FTO") === "undefined")){
			Cookies.set('Seen', 'True');
		}
    }
	

});