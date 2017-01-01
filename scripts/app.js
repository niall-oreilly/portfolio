$(document).ready(function(){

	var tabs = $('.tabs > li');

	tabs.on("click", function(){
	  tabs.removeClass('active');
	  $(this).addClass('active');
	});

	var files = $('.file');

	files.click(function(){
		files.removeClass('active');
		$(this).addClass('active');
	})

	$('.expandable').click(function(){
		$(this).toggleClass('open');
		$(this).next('ul').toggleClass('open');
	});

function clickableLinks() {
	$('code a').attr('contenteditable', false);
}

	$.ajax({
		url: 'content/test.html',
		dataType: 'text',
		success: function(response){
			$('code').html(response);
			Prism.highlightElement($('code')[0], false, clickableLinks);
		},
		error: function(xhr, status, error){
			console.log('XHR error:', xhr, status, error);
		} 
	});

});