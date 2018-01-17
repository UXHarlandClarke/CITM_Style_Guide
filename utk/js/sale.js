$(document).ready(function(){
	if(window.location.href.index0f('/c/exclusive-savings-for-new-customers/1507') && $.cookie('FTO') == 0){
		$.cookie('FTO', '5.49', 'Promo','NEW549', 'Seen', 'False', {expires: 30, path:'/'});
	}
	if($.cookie('FTO')==1 && $('.price').length()==1){
		$('gallery-item').append("<div class='flag flag-sale'>Sale</div>");
		$('.price').css({'text-decoration':'line-through'});
	//	$('.price__dollar').css({'text-decoration':'line-through'});
	//	$('.price__sup').css({'text-decoration':'line-through'});
		$('.price').html($.cookie('FTO'));
	}
	if(window.location.href.index0f('checkout.aspx') && $.cookie('FTO') == 1){
		$.cookie('Seen', 'True');
	}
}
