(function($) {
    "use strict";

var map;
    var windowHeight;
    var windowWidth;
    var contentHeight;
    var contentWidth;
    var isDevice = true;

    // calculations for elements that changes size on window resize
    var windowResizeHandler = function() {
        
        windowHeight = window.innerHeight;
        windowWidth = $(window).width();
        contentHeight = windowHeight - $('#header').height();
        contentWidth = $('#content').width();
       // console.log(contentHeight);
       
        setTimeout(function() {
             $('#leftSide').height(contentHeight);
        $('.closeLeftSide').height(contentHeight);
        $('#wrapper').height(contentHeight);
        $('#mapView').height(contentHeight);
        $('#content').height(contentHeight);
         
            $('.commentsFormWrapper').width(contentWidth);
        }, 300);

        

        // Add custom scrollbar for left side navigation
        if(windowWidth > 767) {
            $('.bigNav').slimScroll({
                height : contentHeight - $('.leftUserWraper').height()
            });
        } else {
            $('.bigNav').slimScroll({
                height : contentHeight
            });
        }
        if($('.bigNav').parent('.slimScrollDiv').size() > 0) {
            $('.bigNav').parent().replaceWith($('.bigNav'));
            if(windowWidth > 767) {
                $('.bigNav').slimScroll({
                    height : contentHeight - $('.leftUserWraper').height()
                });
            } else {
                $('.bigNav').slimScroll({
                    height : contentHeight
                });
            }
        }

       
    }

    windowResizeHandler();

    if($.cookie("css")) {
        $("#app").attr("href",$.cookie("css"));
    }
    var themeColorPath = $("#app").attr("href");
    var themeColorFile = themeColorPath.replace("css/app-", "");
    var themeColor = themeColorFile.replace(".css", "");
    var markerImg = "marker-green.png";

   

    
  

    // custom infowindow object
    
    // function that adds the markers on map
    

    var repositionTooltip = function(e, ui) {
        var div = $(ui.handle).data("bs.tooltip").$tip[0];
        var pos = $.extend({}, $(ui.handle).offset(), { 
                        width: $(ui.handle).get(0).offsetWidth,
                        height: $(ui.handle).get(0).offsetHeight
                    });
        var actualWidth = div.offsetWidth;

        var tp = {left: pos.left + pos.width / 2 - actualWidth / 2}
        $(div).offset(tp);

        $(div).find(".tooltip-inner").text( ui.value );
    }
   $(document).ready(function(){

      windowResizeHandler();
   });
    
    $(window).resize(function() {
        windowResizeHandler();
    });

   

    if(!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch)) {
        $('body').addClass('no-touch');
        isDevice = false;
    }

    // Header search icon transition
    $('.search input').focus(function() {
        $('.searchIcon').addClass('active');
    });
    $('.search input').blur(function() {
        $('.searchIcon').removeClass('active');
    });

    // Notifications list items pulsate animation
    $('.notifyList a').hover(
        function() {
            $(this).children('.pulse').addClass('pulsate');
        },
        function() {
            $(this).children('.pulse').removeClass('pulsate');
        }
    );

    // Exapnd left side navigation
    // var navExpanded = false;
    // $('.navHandler, .closeLeftSide').click(function() {
    //     if(!navExpanded) {
    //         $('.logo').addClass('expanded');
    //         $('#leftSide').addClass('expanded');
    //         if(windowWidth < 768) {
    //             $('.closeLeftSide').show();
    //         }
    //         $('.hasSub').addClass('hasSubActive');
    //         $('.leftNav').addClass('bigNav');
    //         if(windowWidth > 767) {
    //             $('.full').addClass('m-full');
    //         }
    //         windowResizeHandler();
    //         navExpanded = true;
    //     } else {
    //         $('.logo').removeClass('expanded');
    //         $('#leftSide').removeClass('expanded');
    //         $('.closeLeftSide').hide();
    //         $('.hasSub').removeClass('hasSubActive');
    //         $('.bigNav').slimScroll({ destroy: true });
    //         $('.leftNav').removeClass('bigNav');
    //         $('.leftNav').css('overflow', 'visible');
    //         $('.full').removeClass('m-full');
    //         navExpanded = false;
    //     }
    // });

    // functionality for map manipulation icon on mobile devices
   

    // Expand left side sub navigation menus
    $(document).on("click", '.hasSubActive', function() {
        $(this).toggleClass('active');
        $(this).children('ul').toggleClass('bigList');
        $(this).children('a').children('.arrowRight').toggleClass('fa-angle-down');
    });

    if(isDevice) {
        $('.hasSub').click(function() {
            $('.leftNav ul li').not(this).removeClass('onTap');
            $(this).toggleClass('onTap');
        });
    }

    // functionality for custom dropdown select list
    $('.dropdown-select li a').click(function() {
        if (!($(this).parent().hasClass('disabled'))) {
            $(this).prev().prop("checked", true);
            $(this).parent().siblings().removeClass('active');
            $(this).parent().addClass('active');
            $(this).parent().parent().siblings('.dropdown-toggle').children('.dropdown-label').html($(this).text());
        }
    });

   
   

    $('#content').scroll(function() {
        if ($('.comments').length > 0) {
            var visible = $('.comments').visible(true);
            if (visible) {
                $('.commentsFormWrapper').addClass('active');
            } else {
                $('.commentsFormWrapper').removeClass('active');
            }
        }
    });

    $('.btn').click(function() {
        if ($(this).is('[data-toggle-class]')) {
            $(this).toggleClass('active ' + $(this).attr('data-toggle-class'));
        }
    });

   

    $("ul.colors li a").click(function() {
        $("#app").attr("href",$(this).attr('data-style'));
        $.cookie("css",$(this).attr('data-style'), {expires: 365, path: '/'});
        location.reload();
        return false;
    });

  
  
   

  

    

    $('.isThemeBtn').addClass("btn-" + themeColor.replace("css/app", "green"));
    $('.isThemeText').addClass("text-" + themeColor.replace("css/app", "green"));

    // functionality for autocomplete address field
    

   
})(jQuery);