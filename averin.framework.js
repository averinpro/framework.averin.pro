/*
English:

Part of the framweork.averin.pro 
Basic Tables CSS framweork.averin.pro
Version: 0.1 
Author: Artemiy Averin (ya@averin.pro)
Company: Design studio Artemy Averin (https://averin.pro/) 

Docs & Examples: http://framework.averin.pro/ 

Русский:

Часть от фреймворка framweork.averin.pro
Основные таблицы CSS framweork.averin.pro
Версия 0.1
Дизайн студия Артемия Аверина (ya@averin.pro)

Документая и примеры: http://framework.averin.pro/
*/


/*
Part of the framweork.averin.pro
AverinElevator — jQuery plugin
Version: 0.1
Docs & Examples: https://framework.averin.pro/
*/

$(document).ready(function () {
    $('[data-title]').hover(function () {
        var title = $(this).data('title');
        $(this).data('tipText', title);
        $('<p class="tooltip_box"></p>').text(title).appendTo('body').fadeIn('slow');
    }, function () {
        $('.tooltip_box').remove();
        }).mousemove(function (e) {
        var mousex = e.pageX - 0;
        var mousey = e.pageY + 0;
        $('.tooltip_box').css({
            top: mousey,
            left: mousex
        })
    });
});





/*
Part of the framweork.averin.pro
AverinScrollpage — jQuery plugin
Version: 0.1
Docs & Examples: https://framework.averin.pro/
*/

$(function () {
	$(window).scroll(function () {
		if ($(this).scrollTop() > 600) {
			$('.averinelevator').fadeIn();
		} else {
			$('.averinelevator').fadeOut(400);
		}
	});
	$('.averinelevator').click(function () {
		$('body,html').animate({
			scrollTop: 0
		}, 800);
		return false;
	});
});





/*
Part of the framweork.averin.pro
AverinViewport — jQuery plugin
Version: 0.1
Docs & Examples: https://framework.averin.pro/
*/

function AverinViewport() {
    if(window.innerHeight > window.innerWidth){
        $("meta[name='viewport']").attr('content', $("meta[name='viewport']").data('viewport_landscape'));
    } else {
        $("meta[name='viewport']").attr('content', $("meta[name='viewport']").data('viewport_portrait'));
    }
}

$(document).ready(function() {
    $(window).on('orientationchange', function(event) {
        AverinViewport();
    });
});

AverinViewport();





/*
Part of the framweork.averin.pro
AverinSwipeMenu — jQuery plugin
Version: 0.1
Docs & Examples: https://framework.averin.pro/
*/

(function($) {
    
    var default_options = {
        'side' : 'left' // В какую сторону открывать меню
    };
    
    var methods = {
        open : function(options) {
            var options = $.extend({}, default_options, options);
            this.show();
            
            id = this.attr('id');
            
            $('body').addClass("is-no-scroll");
            $('body').addClass("is-offcanvasTransition");
            
            if (options.side == "left") { this.css("left", "-250px"); translateX = "250px"; }  
            if (options.side == "right") { this.css("right", "-250px"); translateX = "-250px"; }
            $('body').css("transform", "translateX("+translateX+")");  
            
            $('body').prepend('<div class="averinswipemenu_overlay" onclick="$(\'.averinswipemenu_overlay\').AverinSwipeMenu(\'close\',{ \'id\' : \''+id+'\', \'side\' : \''+options.side+'\' });"  ></div>');
                
            this.css("top", $(window).scrollTop());
            
        },
        close : function(options) { 
            var options = $.extend({}, default_options, options);
            
            $('body').css("transform", "");  
            
            $('.averinswipemenu_overlay').remove(); 
            
            setTimeout(function() {  
                $('body').removeClass("is-no-scroll");
                $('body').removeClass("is-offcanvasTransition");
                $('#'+options.id).hide();
                $('#'+options.id).css("top", '');
            }, 500);
        },
        init : function( options ) {
            var options = $.extend({}, default_options, options);
        }
    };
    
    var options = $.extend({}, default_options, options);
    
	$.fn.AverinSwipeMenu = function(method) {

		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method==='object' || !method) {
			return methods['open'].apply(this, arguments);
		} else {
			$.error('jquery.AverinSwipeMenu: Method ' + method + ' does not exist');
		}

	};

})(jQuery);





/*
Part of the framweork.averin.pro
AverinWindow — jQuery plugin
Version: 0.1
Docs & Examples: https://framework.averin.pro/
*/

(function($) {
    
    var default_options = {
        'buttonClose': true, // Кнопка закрытие в углу
        'closeOnEsc': true // Закрытие кнопкой Escape
    };
    
    var methods = {
        open : function(options) {
            var options = $.extend({}, default_options, options);
            this.fadeIn(100); 
            
            id = this.attr('id');
            
    		if (options.buttonClose == true) {
                this.append('<div class="close" onclick="$(\'.averinwindow_overlay\').AverinWindow(\'close\',{ \'id\' : \''+id+'\' });">𐄂</div>');
            }
            
            $('body').addClass("is-no-scroll");
            
            $('body').prepend('<div class="averinwindow_overlay" onclick="$(\'.averinwindow_overlay\').AverinWindow(\'close\',{ \'id\' : \''+id+'\' });"></div>');
            $('.averinwindow_overlay').fadeIn(100); 
            
        },
        close : function(options) { 
            var options = $.extend({}, default_options, options);
            
            $('.averinwindow_overlay').fadeOut(100); 
            $('.averinwindow').fadeOut(100);
            $('body').removeClass("is-no-scroll");
            $('.averinwindow_overlay').remove(); 
        },
        init : function( options ) {
            var options = $.extend({}, default_options, options);
        }
    };
    
    var options = $.extend({}, default_options, options);

	$(document).bind('keyup.averinwindow_overlay', function(e) {
		if (options.closeOnEsc == true) {
    		if (e.keyCode===27) $('.averinwindow_overlay').AverinWindow('close');
		}
	});
    
	$.fn.AverinWindow = function(method) {

		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method==='object' || !method) {
			return methods['open'].apply(this, arguments);
		} else {
			$.error('jquery.AverinWindow: Method ' + method + ' does not exist');
		}

	};

})(jQuery);