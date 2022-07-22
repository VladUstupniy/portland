$(document).ready(function(){
    $('.sidebar-pages-1').click(function(e){
        e.preventDefault();
        $('.open-1').slideToggle(500);
    });

    $('.sidebar-pages-2').click(function(e){
        e.preventDefault();
        $('.open-2').slideToggle(500);
    });

    $('.sidebar-pages-3').click(function(e){
        e.preventDefault();
        $('.open-3').slideToggle(1000);
    });

    $('.sidebar-pages-4').click(function(e){
        e.preventDefault();
        $('.open-4').slideToggle(500);
    });

    $('.sidebar-pages-5').click(function(e){
        e.preventDefault();
        $('.open-5').slideToggle(500);
    });
});