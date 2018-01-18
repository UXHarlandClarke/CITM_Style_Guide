//$(document).ready(function(){
(function(){
	var path = window.location.pathname;
	var page = path.split("/").pop();

	var landingPage ="index.html";
	var checkoutPage ="templates.html";

	console.log(page);

	if(page==landingPage && Cookies.get('FTO') == 0){
		Cookies.set('FTO', '5.49', 'Promo','NEW549', 'Seen', 'False', {expires: 30, path:'/'});
		console.log(Cookies.get());
	}
	if(Cookies.get('FTO')==1 && $('.price').length()==1){
		$('gallery-item').append("<div class='flag flag-sale'>Sale</div>");
		
		$('.price').removeClass('.price--lg').addClass('price--xs');
		$('.price--xs').css({'text-decoration':'line-through'});
	//	$('.price__dollar').css({'text-decoration':'line-through'});
	//	$('.price__sup').css({'text-decoration':'line-through'});
		$('.price-group').before(
			"<p class='price-group'>From <span class='price price--lg'>
			<sup class='price__currency'>$</sup>
			<span class='price__dollar'>5</span>
			<span class='price__mark'>.</span>
			<sup class='price__sup'>49</sup>
			</span></p>"
			);
		$('.price--lg').html($.cookie('FTO'));
	}
	if(window.location.href.index0f(checkoutPage) && Cookies.get('FTO') == 1){
		$.cookie('Seen', 'True');
	}
})();