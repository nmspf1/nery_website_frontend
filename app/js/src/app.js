var App = (function () {

    var elements = {
        $scPlayer : $('.sc-player')
    };


    function initUi() {
        $('.carousel').carousel();
        $('.bottom-bar').addClass('show');
        $('.landing').addClass('shown');
        $('.carousel').fadeIn();

        setTimeout(function () {
            $('body').fadeIn();
        }, 1000)

        lw();
        $(window).resize(lw);
        function lw() {
            $('.section.landing').css('min-height', $(window).height());
        }

        $('a').click(function () {
            $(this).attr('target', '_blank')
        })
        /*$('.section.landing').viewportChecker({
            offset: '99%',
            invertBottomOffset: true,
            repeat: false,
            callbackFunction: function(elem, action){
                console.log('sss');
                $('.new-album-section').addClass('slideHide');
            }
        });*/
    }

    function initPlayer() {

        var scPlayer = $('.sc-player');

        var scControls = scPlayer.find('.sc-controls'),
            scControlPlay = scControls.find('.sc-play'),
            scControlPause = scControls.find('.sc-pause');

        var scTime = scPlayer.find('.sc-scrubber'),
            scTimeDuration  = scTime.find('.sc-time-indicators').find('.sc-duration').html();

        var scTracks = scPlayer.find('.sc-trackslist'),
            scTrackList = scPlayer.find('.sc-trackslist').find('li'),
            scNumTracks = scTrackList.length;


        function getCurrentTimePosition() {
            return scTime.find('.sc-time-indicators').find('.sc-position').html();
        }

        function getTrackName() {
            return scTracks.find('.active').find('a').html();
        }

        function getTrackLink() {
            return scTracks.find('.active').find('a').attr('href');
        }

        function getArtworkImg() {
            return scPlayer.find('.sc-artwork-list').find('.active').find('img').attr('src');
        }

        //Tests
        /*console.log(scControlPlay[0]);
        console.log(scControlPause[0]);
        console.log(getTrackName(2));
        console.log(getTrackLink(2));
        console.log(getCurrentTimePosition());
        console.log(scTimeDuration);
        console.log(scNumTracks);
        console.log(getArtworkImg());*/

        
        var player = $('.player');
        var controlPLayPause = player.find('.content-controls').find('.play_pause');
        var controlForward = player.find('.content-controls').find('.forward');
        var controlBackward = player.find('.content-controls').find('.backward');

        var contentTime = player.find('.content-time');
        var detailsImage = player.find('.content-details').find('img');
        var detailsLink = player.find('.content-details').find('a');
        var detailsTitle = player.find('.content-details').find('h1');
        
        var progressbar = player.find('.content-progress-bar').find('.progress-bar');

        var iconPlay = 'fa-play';
        var iconPause = 'fa-pause';

        controlPLayPause.click(function () {
            if(!$(this).hasClass('playing')){
                $(this).addClass('playing').find('.fa').removeClass(iconPlay).addClass(iconPause);
            }else{
                $(this).removeClass('playing').find('.fa').addClass(iconPlay).removeClass(iconPause);
            }
            $('#youtube-iframe')[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
            scControlPlay.click();
        });

        var currentTrackNum = 0;
        controlForward.click(function () {
            if(currentTrackNum <= scNumTracks){
                currentTrackNum++;
            }
            scTracks.find('li').eq(currentTrackNum).find('a').click();
            updateDetails()
        });
        controlBackward.click(function () {
            if(currentTrackNum >= 1){
                currentTrackNum--;
            }
            scTracks.find('li').eq(currentTrackNum).find('a').click();
            updateDetails()
        });

        function updateDetails(){
            $('#youtube-iframe')[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');

            if(!controlPLayPause.hasClass('playing')){
                controlPLayPause.addClass('playing').find('.fa').removeClass(iconPlay).addClass(iconPause);
            }
            detailsImage.attr('src', getArtworkImg());
            detailsLink.attr('href', getTrackLink())
            detailsTitle.text(getTrackName());
        }

        setInterval(function () {
            contentTime.text(getCurrentTimePosition().replace('.', ':'));
            progressbar.attr('style', scPlayer.find('.sc-time-span').find('.sc-played').attr('style'))
        },1000)
    }

    return function () {
        initUi();
        setTimeout(function () {
            initPlayer();
        }, 2000)
    }
})();

$(document).ready(App);