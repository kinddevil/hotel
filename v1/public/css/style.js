jQuery(document).ready(function($) {

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1) {
            $("#header").addClass("menu_fixed");
        } else {
            $("#header").removeClass("menu_fixed");
        }
    });

});