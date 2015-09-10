app.controller('faqController', ['$scope', '$http', '$filter', '$location', function($scope, $http, $filter, $location) {
  $scope.scrollTo = function(element) {
  var offset = -70; //Offset of 20px
    $( 'html, body').animate({
      scrollTop: $(element).offset().top + offset
    }, 2000);
  } ;
  $scope.openThis = function($event){
    $($event.target).next('.cd-faq-content').slideToggle(200).end().parent('li').toggleClass('content-visible');

  }
  var faqsSections = $('.cd-faq-group'),
    faqTrigger = $('.cd-faq-trigger'),
    faqsContainer = $('.cd-faq-items'),
    faqsCategoriesContainer = $('.cd-faq-categories'),
    faqsCategories = faqsCategoriesContainer.find('a'),
    closeFaqsContainer = $('.cd-close-panel');

  $(window).on('scroll', function(){
		if ( $(window).width() >1024 ) {
			(!window.requestAnimationFrame) ? updateCategory() : window.requestAnimationFrame(updateCategory);
		}
	});
  function updateCategory(){
		updateCategoryPosition();
		updateSelectedCategory();
	}

	function updateCategoryPosition() {
		var top = $('.cd-faq').offset().top,
			height = jQuery('.cd-faq').height() - jQuery('.cd-faq-categories').height(),
			margin = 70;
		if( top - margin <= $(window).scrollTop() && top - margin + height > $(window).scrollTop() ) {
			var leftValue = faqsCategoriesContainer.offset().left,
				widthValue = faqsCategoriesContainer.width();
			faqsCategoriesContainer.addClass('is-fixed').css({
				'left': leftValue,
				'top': margin,
				'-moz-transform': 'translateZ(0)',
			    '-webkit-transform': 'translateZ(0)',
				'-ms-transform': 'translateZ(0)',
				'-o-transform': 'translateZ(0)',
				'transform': 'translateZ(0)',
			});
		} else if( top - margin + height <= $(window).scrollTop()) {
			var delta = top - margin + height - $(window).scrollTop();
			faqsCategoriesContainer.css({
				'-moz-transform': 'translateZ(0) translateY('+delta+'px)',
			    '-webkit-transform': 'translateZ(0) translateY('+delta+'px)',
				'-ms-transform': 'translateZ(0) translateY('+delta+'px)',
				'-o-transform': 'translateZ(0) translateY('+delta+'px)',
				'transform': 'translateZ(0) translateY('+delta+'px)',
			});
		} else {
			faqsCategoriesContainer.removeClass('is-fixed').css({
				'left': 0,
				'top': 0,
			});
		}
	}

	function updateSelectedCategory() {

		faqsSections.each(function(){
			var actual = $(this),
				margin = parseInt($('.cd-faq-title').eq(1).css('marginTop').replace('px', '')),
				activeCategory = $('.cd-faq-categories a[data-href="#'+actual.attr('id')+'"]'),
				topSection = (activeCategory.parent('li').is(':first-child')) ? 0 : Math.round(actual.offset().top);

			if ( ( topSection - 170 <= $(window).scrollTop() ) && ( Math.round(actual.offset().top) + actual.height() + margin - 170 > $(window).scrollTop() ) ) {
				activeCategory.addClass('selected');

			}else {
				activeCategory.removeClass('selected');
			}
		});
	}

$scope.name = "rohit";
}]);
