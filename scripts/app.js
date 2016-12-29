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

});