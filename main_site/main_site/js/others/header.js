var BC={};
var k = $(document.body);
BC.header={
  miniHeaderInit: function() {
    i.find('a[title="home"]').html('<i class="fa-home"></i>')
},
miniHeaderShow: function() {
    k.addClass("has-mini-header");
  //  k.addClass("has-mini-header");
            $('.mininavigation').css("display", "block");

                    $('.mininavigation').css("-webkit-transform", "translate3d(0, 0, 0)");
           $('.mininavigation').animate({
                top: "0"
            }, 400)
            console.log("called")
},
miniHeaderHide: function() {
k.removeClass("has-mini-header");
           $('.mininavigation').animate({
               top: "-80"
           }, 400);
           setTimeout(function() {
              $('.mininavigation').css("display", "none")
           }, 600)
}};

jQuery(window).scroll(function() {

                if ((jQuery(this).scrollTop() > 300) && !k.hasClass("has-mini-header") ) {
                //  console.log("value is greater than 300")
                    BC.header.miniHeaderShow()
                } else {
                    if ((jQuery(this).scrollTop() < 300) && k.hasClass("has-mini-header")) {
                      BC.header.miniHeaderHide()
                    }
                }
            });
        
