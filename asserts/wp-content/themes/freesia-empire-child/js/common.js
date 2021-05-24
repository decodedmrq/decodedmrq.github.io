// JavaScript Document


/*-------------------------------------------
TOPスクロール TAB/SP
-------------------------------------------*/
$(function() {
    var pageTop = $('.totop');
    pageTop.hide();
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            pageTop.fadeIn();
        } else {
            pageTop.fadeOut();
        }
    });
    pageTop.click(function () {
        $('body, html').animate({scrollTop:0}, 500, 'swing');
        return false;
    });
});



/*-------------------------------------------
他の言語に翻訳する
-------------------------------------------*/
$(window).on('load', function() {
    var url = $(location).attr('href');
    if(url.indexOf("?id=") != -1){
        var id = url.split("?id=");
        var $target = $('#' + id[id.length - 1]);
        if($target.length){
            var pos = $target.offset().top;
            $("html, body").animate({scrollTop:pos}, 1500);
        }
    }
});


/*-------------------------------------------
カレント
-------------------------------------------*/

document.write('<script src="./asserts/ajax/libs/jquery-url-parser/2.3.1/purl.min.js"></script>');

$(function(){
	$page = $.url().attr('file');
	if(!$page) {
		$page = 'index-2.html';
	}
	$('.side ul li a').each(function(){
		var $href = $(this).attr('href');
		if ( ($href == $page) || ($href == '') ) {
			$(this).addClass('selected');
		} else {
			$(this).removeClass('selected');
		}
	});
});


