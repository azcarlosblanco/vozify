// Tabs
$(document).ready(function() {
    $('.individual').click(function() {
        $('.collective-box').addClass('hide');
        $('.individual-box').removeClass('hide');
        $('.individual').css({
            'background-color': '#016FD1',
        });
        $('.collective').css({
            'background-color': '#00122A',
        });
    });

    $('.collective').click(function() {
        $('.individual-box').addClass('hide');
        $('.collective-box').removeClass('hide');
        $('.individual').css({
            'background-color': '#00122A',
        });
        $('.collective').css({
            'background-color': '#016FD1',
        });
    });


    
});
