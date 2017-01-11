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


	function openFile(fileName){
		var fileExtension = fileName.match(/[^.]*$/)[0];
		if(fileExtension == 'ico') { //image
			$('pre').hide();
			$('img').show();
		} else{
			$.ajax({
				url: 'content/'+fileName,
				dataType: 'text',
				success: function(response){

					$codeElem.html(response);
					
					var syntax = 'html';
					switch(fileExtension){
						case 'json':
							syntax = 'javascript';
							break;
						case 'js':
							syntax = 'javascript';
							break;
						case 'scss':
							syntax = 'css';
							break;
					}

					$codeElem.attr('class','language-'+syntax);
					$('img').hide();
					$('pre').show();
					Prism.highlightElement($codeElem[0], false, function(){
						$('code a').attr('contenteditable', false).attr('target', '_blank');

					});	

				},
				error: function(xhr, status, error){
					console.log('XHR error:', xhr, status, error);
				} 
			});
		}
	}


	function openTab(fileName) {
		$('.tabs').append(`<li><span class="tabName">${fileName}</span><span class="close-tab"></span></li>`);

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
		
		openFile(fileName);
		highlightFile(fileName);
	}


	function tabClicked() {
		var fileName = $(this).text();
		openFile(fileName);
		highlightFile(fileName);
	}



	function highlightFile (fileName) {
		function highlight(list){
			list.removeClass('active');
			list.filter(function(){
				return $(this).text() == fileName;
			}).addClass('active');
		};
		highlight($('.tabs li'));
		highlight($('.file'));
	}


	function closeTab (event) {
		event.stopPropagation();
		var $tab = $(this).parent();
		var isActive = $tab.hasClass('active');

		if( $('.tabs li').length > 1 ) {
			$tab.addClass('closing');
			setTimeout( function(){
				$tab.remove();
				if( isActive ) {
					$('.tabs li').last().click();
				}
			}, 300);
		}
	}

	//load initial file
	$('.tabs li').click();

	$('.my_cv').off('click').click( function(){
		window.open('content/Niall_OReilly_CV.pdf');
	})

});