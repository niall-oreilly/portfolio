$(document).ready(function(){

	var $tabs = $('.tabs > li');
	var $files = $('.file');
	var $codeElem = $('code');

	//attach toggle folder listeners
	$('.expandable').click(function(){
		$(this).toggleClass('open');
		$(this).next('ul').toggleClass('open');
	});

	$tabs.on('click', tabClicked);
	$files.on('click', fileClicked);
	$('.close-tab').on('click', closeTab);


	$.ajax({
		url: 'content/test.html',
		dataType: 'text',
		success: function(response){
			$codeElem.html(response);
			Prism.highlightElement($codeElem[0], false, function(){
				$('code a').attr('contenteditable', false);
			});
		},
		error: function(xhr, status, error){
			console.log('XHR error:', xhr, status, error);
		} 
	});


	function openTab(fileName) {
		$('.tabs').append(`<li>${fileName}<span class="close-tab"></span></li>`);


		//attach listeners to new tabs
		$('.tabs li').off('click').on('click', tabClicked);
		$('.close-tab').off('click').on('click', closeTab);
	}



	function fileClicked(){
		var fileName = $(this).text();

		var alreadyOpen = $('.tabs li').filter(function(){
				return $(this).text() == fileName;
			}).length;

		if( !alreadyOpen ) {
			openTab(fileName);	
		}

		highlightFile(fileName);
	}


	function tabClicked() {
		var fileName = $(this).text();
		highlightFile(fileName);
	}



	function highlightFile(fileName) {
		console.log('highlightFile');
		$('.tabs li').removeClass('active');
		$('.file').removeClass('active');

		$('.tabs li').filter(function(){
			return $(this).text() == fileName;
		}).addClass('active');

		$('.file').filter(function(){
			return $(this).text() == fileName;
		}).addClass('active');

	}


	function closeTab(event) {
		event.stopPropagation();
		var $tab = $(this).parent();
		var activeTab = $tab.hasClass('active');

		if( $('.tabs li').length > 1 ) {
			$tab.addClass('closing');
			setTimeout(function(){
				$tab.remove();
				if(activeTab) {
					$('.tabs li').last().click();
				}
			}, 300);
		};


	}


























});