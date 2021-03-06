/*============================================================
#title            : Exercise 7: APi work
#description      : integration with HTML/CSS/JAVASCRIPT
#author           : DUPRE Anthony, PAMFIL Eva, PINEAU Ludovic and SAUMUROT Florian
#date             : 20161212
#version          : Constantly on progress
#usage            : JAVASCRIPT/JQUERY
#notes            : Only working on search engine
=============================================================*/

function domready() {
    var allRadios = document.getElementsByName('rad'),
        allLabel = document.getElementsByName('lab'),
        check = 'n',
        clic_onglet = 'd',
        noto = "yes",
        booRadio = null,
        _artiste;
    
    for (var x=0; x < allLabel.length; x++){
        allLabel[x].onclick = function() {
            if (booRadio != null) {
                $(booRadio).css('background', '#ff5500');
                $(booRadio).css('color', 'white');
            }  
            booRadio = this;
            $(this).css('background', 'white');
            $(this).css('color', '#ff5500');
            var rad = $(this).attr('value');
            $('#' + rad).click();
        };
    }
    
    function top_search() {
        if ($('#searchBar input').val() != undefined && $('#searchBar input').val() != ''){
            if ($('input[name=rad]:checked', '#choice').val() == undefined)
                alert("choose one type search 'artist', 'track' or 'album'");
            else {
                var q = $('#searchBar input').val();
                for (var i=0; i < allRadios.length; i++){
                    if (i == 0 && $('input[name=rad]:checked', '#choice').val() == "0") {
                        youtube_artist(q);
                        soundcloud_artist(q);
                        $('footer').css('display', 'inline-block');
                    } else if (i == 1 && $('input[name=rad]:checked', '#choice').val() == "1") {
                        youtube_track(q);
                        soundcloud_track(q);
                        $('footer').css('display', 'inline-block');
                    }
                }

            }
        } else {
            alert('write something in the search bar');
        }
    }
    
    $('button').click(function (){
        if ($('footer').css('display') == "none") {
            top_search();
        } else {
            console.log("toto");
            if ($('#home').css('display') != "none") {
                if ($('#searchBarf input').val() != undefined && $('#searchBarf input').val() != ''){
                    if ($('input[name=rad]:checked', '#choice').val() == undefined) {
                        alert("choose one type search 'artist', 'track' or 'album'");
                    } else {
                        var q = $('#searchBarf input').val();
                        for (var i=0; i < allRadios.length; i++){
                            if (i == 0 && $('input[name=rad]:checked', '#choice').val() == "0") {
                                youtube_artist(q);
                                soundcloud_artist(q);
                            } else if (i == 1 && $('input[name=rad]:checked', '#choice').val() == "1") {
                                youtube_track(q);
                                soundcloud_track(q);
                            }
                        }
                    }
                } else {
                    top_search();
                } 
            }
        }
    });
    
    $('#youtube-result').on('click', 'ul', function() {
        var _url = $(this).attr('value');
        _url = _url.replace("watch?v=", "embed/");
        var _channel = $($(this).find('p')[0]).html();
        for (var i=0; _channel.charAt(i) != '-'; i++) {
            if (_channel.charAt(i+1) != '-') {
                if (i == 0)
                    _artiste = _channel.charAt(i);
             
                else if (_channel.charAt(i) == ' ')
                    _artiste += '+';
                else
                    _artiste += _channel.charAt(i);
            }
        }
        $('#result-select').append('<iframe width="672" height="378" src="' + _url + '" frameborder="c0" allowfullscreen></iframe>')
        var spotify_url = "https://api.spotify.com/v1/search?query=artist:" + _artiste + "&&limit=50&type=album";
        $.get(spotify_url, function(data){
            for (var i=0; i < data.albums.items.length; i++){
                $('#swipper').append('<div class="swiper-slide"><img src=' + data.albums.items[i].images[1].url + ' data-id=' + data.albums.items[i].id + ' ></div>');
                
                if(i === data.albums.items.length-1){
                    //SWIPPER
                      var swiper = new Swiper('.swiper-container', {
                        pagination: '.swiper-pagination',
                        nextButton: '.swiper-button-next',
                        prevButton: '.swiper-button-prev',
                        pagination: '.swiper-pagination',
                        effect: 'coverflow',
                        initialSlide : 3,
                        grabCursor: true,
                        centeredSlides: true,
                        slidesPerView: 'auto',
                        coverflow: {
                            rotate: 50,
                            stretch: 0,
                            depth: 100,
                            modifier: 1,
                            slideShadows : true
                        }
                    });
                    
                    $(".swiper-slide").click(change_slide);
                }
            }
            if (data.albums.items.length < 1) {
                console.log("toto");
                $(".swiper-container").css("display", "none");
                $("#no-discography a").attr("href", "https://www.google.fr/search?q=" + _artiste);
                $("#no-discography").css('display', 'block');
                noto='no';
            }
        });
        $('#home').css('display', 'none');
        $('#search-result').css('display', 'none');
        $('#result-select').css('display', 'flex');
        $('#disco_bio').css('display', 'block');
        $('footer').css('background-color', '#e52d27');
        $('#searchBarf button').css('color', '#e52d27');
        $('#searchBarf label').css('background-color', '#e52d27');
        $('#searchBarf label:first-child').hover(function (){
            $('#searchBarf label:first-child').css('background-color', 'white');
            $('#searchBarf label:first-child').css('color', '#e52d27');
        }, function(){
            $('#searchBarf label:first-child').css('background-color', '#e52d27');
            $('#searchBarf label:first-child').css('color', 'white');
        });
        $('#searchBarf label:last-child').hover(function (){
            $('#searchBarf label:last-child').css('background-color', 'white');
            $('#searchBarf label:last-child').css('color', '#e52d27');
        }, function(){
            $('#searchBarf label:last-child').css('background-color', '#e52d27');
            $('#searchBarf label:last-child').css('color', 'white');
        });
        check = 'y';
    });
    
    $('#soundcloud-result').on('click', 'ul', function() {
        var _url = $(this).attr('value');
        _artiste = $($(this).find('p')[0]).html();
        var _artiste_url = "http://soundcloud.com/" + _artiste;
        $('#result-select').append('<iframe width="100%" height="400" src=https://w.soundcloud.com/player/?visual=true&url=' + _url + '&show_artwork=true&auto_play=trueframeborder="c0" allowfullscreen></iframe>');
        var spotify_url = "https://api.spotify.com/v1/search?query=artist:" + _artiste + "&&limit=50&type=album";
        $.get(spotify_url, function(data){
            console.log(data.albums.items.length);
            for (var i=0; i < data.albums.items.length; i++){
                $('#swipper').append('<div class="swiper-slide"><img src=' + data.albums.items[i].images[1].url + ' data-id=' + data.albums.items[i].id + ' ></div>');
                
                if(i === data.albums.items.length-1){
                     //SWIPPER
                      var swiper = new Swiper('.swiper-container', {
                        pagination: '.swiper-pagination',
                        nextButton: '.swiper-button-next',
                        prevButton: '.swiper-button-prev',
                        pagination: '.swiper-pagination',
                        effect: 'coverflow',
                        initialSlide : 3,
                        grabCursor: true,
                        centeredSlides: true,
                        slidesPerView: 'auto',
                        coverflow: {
                            rotate: 50,
                            stretch: 0,
                            depth: 100,
                            modifier: 1,
                            slideShadows : true
                        }
                    });
                }
            }
            if (data.albums.items.length < 1) {
                console.log("bouh");
                $("#swiper-parents").css("display", "none");
                $("#no-discography a").attr("href", "https://www.google.fr/search?q=" + _artiste);
                $("#no-discography").css('display', 'block');
                noto='no';
            }
        });
        $('#home').css('display', 'none');
        $('#search-result').css('display', 'none');
        $('#result-select').css('display', 'block');
        $('#disco_bio').css('display', 'block');
        $('#disco').css('background-color', '#ff5500');
        $('#content').css('border-color', '#ff5500');
        $('#content2').css('border-color', '#ff5500');
        $('footer').css('background-color', '#ff5500');
        $('#searchBarf button').css('color', '#ff5500');
        check = 'y';
        $('#home').css('display', 'none');
        $('#search-result').css('display', 'none');
        check = 's';
    });
    
    $('#bio').hover(function() {
            if (check == 'y')
                $('#bio').css('background-color', '#e52d27');
            else
                $('#bio').css('background-color', '#ff5500');
            $('#bio').css('color', 'white');
            $('#bio').css('border-radius', '5px 5px 0px 0px');
        }, function() {
            if (clic_onglet == 'd') {
                $('#bio').css('background-color', 'white');
                $('#bio').css('color', 'black');
            }
        });
    
    $("#bio").click(function () {
        clic_onglet = 'b';
        $('#disco').css('color', 'black');
        $('#disco').css('background-color', 'white');
        $('#bio').css('color', 'white');
        if (check == 'y')
            $('#bio').css('background-color', '#e52d27');
        else
            $('#bio').css('background-color', '#ff5500');
        $('#bio').css('border-radius', '5px 5px 0px 0px');
            
    });
    
    $('#bio').click(function () {
        $('#content4').empty();
        if(noto == "yes") {
            console.log(_artiste);
            $.ajax({
                type: "GET",
                url: "http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=" + _artiste + "&callback=?",
                contentType: "application/json; charset=utf-8",
                async: false,
                dataType: "json",
                success: function (data, textStatus, jqXHR) {

                   var markup = data.parse.text["*"];
                    var blurb = $('<div></div>').html(markup);
                    if ($(blurb).find('p') != ''){
                        console.log($(blurb).find('p'));
                        // remove links as they will not work
                        blurb.find('a').each(function() { $(this).replaceWith($(this).html()); });

                       // remove any references
                        blurb.find('sup').remove();

                       // remove cite error
                        blurb.find('.mw-ext-cite-error').remove();
                        $('#content4').html($(blurb).find('p'));
                    }
                    var spotify_url = "https://api.spotify.com/v1/search?query=artist:" + _artiste + "&&limit=1&type=artist";
                    $.get(spotify_url, function(data1){
                        console.log(data1);
                        $('#content4').append('<img id="img-bio" src="' + data1.artists.items[0].images[1].url + '">'); 
                    });
                    
               },
                error: function (errorMessage) {
                }
            });
            if ($('#content').css('display') == "none")
                $('#content2').css('display', 'none');
            else
                $('#content').css('display', 'none');
            $('#content4').css('display', 'block');
        } else {
            $("#no-discography p").html(":-( Il n'a pas de biographie de disponible");
            $("#no-discography a").attr("href", "https://www.google.fr/search?q=" + _artiste);
        }
    });
    
    $('#disco').click(function () {
        $('#content').css('display', 'block');
        $('#content4').css('display', 'none');
        $('#content2').css('display', 'none');
    });
    
    $('#disco').hover(function() {
            if (check == 'y')
                $('#disco').css('background-color', '#e52d27');
            else
                $('#disco').css('background-color', '#ff5500');
            $('#disco').css('color', 'white');
            $('#disco').css('border-radius', '5px 5px 0px 0px');
        }, function() {
            if (clic_onglet == 'b') { 
                $('#disco').css('background-color', 'white');
                $('#disco').css('color', 'black');
            }
        });
    
    $("#disco").click(function () {
        clic_onglet = 'd';
        $('#bio').css('color', 'black');
        $('#bio').css('background-color', 'white');
        $('#disco').css('color', 'white');
        if (check == 'y')
                $('#disco').css('background-color', '#e52d27');
            else
                $('#disco').css('background-color', '#ff5500');
        $('#disco').css('border-radius', '5px 5px 0px 0px');
            
    });
}
$(document).ready(domready);

    function convertMillisecondsToDigitalClock(ms) {
    minutes = Math.floor((ms % 3600000) / 60000), // 1 Minutes = 60000 Milliseconds
    seconds = Math.floor(((ms % 360000) % 60000) / 1000) // 1 Second = 1000 Milliseconds
        return {
        minutes : minutes,
        seconds : seconds,
        clock : minutes + ":" + seconds
    };
}

function change_slide() {
        var _ids = $(this).find('img').attr('data-id');
        album = $(this).find('img').attr('src');
        $("#content").css('display', 'none');
        $('#content2').empty();
        $('#content2').append('<img id="albumImg" src="' + album + '">');
        var _url = "https://api.spotify.com/v1/albums/?ids=" + _ids ;
             $.get(_url, function(data){
                 console.log(data);
                $('#content2').append('<div id="content3"><audio id="player-audio"></audio><p id="name-album">' + data.albums[0].name + '-</p><p id="name-artist">' + data.albums[0].artists[0].name + '</p><ul id="category"><li class ="number_tracks">N°</li><li class="name_tracks">Titre</li><li>Durée</li><li>Extrait(s)</li></ul>');
                for (var i=0; i < data.albums[0].tracks.items.length; i++) {
                    $('#content3').append('<ul class="num_track"><li class="number_tracks">' + (i+1) + '</li><li class="name_tracks">' + data.albums[0].tracks.items[i].name + '</li><li class="duree">' + convertMillisecondsToDigitalClock(data.albums[0].tracks.items[i].duration_ms).clock + '</li> <li class="play" data=' + data.albums[0].tracks.items[i].preview_url + '><img src="images/play-red.png"></li></ul></div>');
                }
                $('#content2').css('display', 'flex');
        });
    }

$('#content2').on('click', 'ul li:last-child', function () {
    if ($($(this).find('img')).attr('src') == "images/play-red.png") {
        $($(this).find('img')).attr('src', 'images/pause-red.png');
        var url_audio = $(this).attr('data');
        var player = document.querySelector('#player-audio');
        $('#player-audio').attr('src', url_audio);
        $('#player-audio').attr('type', 'audio/mp3');
        player.play();
    } else {
        $($(this).find('img')).attr('src', 'images/play-red.png');
        var player = document.querySelector('#player-audio');
        player.pause();
    }
});

function youtube_artist(q) {
    var request = gapi.client.youtube.search.list({
        q: q,
        part: 'snippet'
    });
    request.execute(function(response) {
        $('#youtube-result').empty();
        for (var i=0; i < response.result.items.length; i++) {
            if (response.result.items[i].id.kind == "youtube#video") {
                var channel = response.result.items[i].snippet.channelTitle;
                var legit = channel.slice(channel.length-4, channel.length);
                var good_artist = channel.slice(0, channel.length-4);
                if (legit == "VEVO"){
                    $('#youtube-result').append('<ul value="https://www.youtube.com/watch?v=' + response.result.items[i].id.videoId + '"><li><img src="' + response.result.items[i].snippet.thumbnails.medium.url + '" class="img-youtube"></li><li><p>' + response.result.items[i].snippet.title + '</p><p>' + channel + '</p><img src="images/youtube-logo.png" class="logo-youtube"></li>');
                }
            }

        }
    });

}

function soundcloud_artist(q) {
        SC.initialize({
            client_id: '1c1fbacee3dd327615fd1b22af834084'
        });

        var page_size = 5;
        SC.get('/users', { q: q, license: '', limit: page_size }).then(function(tracks) {
            $('#soundcloud-result').empty();
            for (var i=0; i < tracks.length; i++){
                if (tracks[i].kind == "user") {
                    $('#soundcloud-result').append('<ul value="' + tracks[i].permalink_url + '"><li><img src="' + tracks[i].avatar_url + '" class="img-soundcloud"></li><li><p>' + tracks[i].permalink + '</p><img src="images/soundcloud-logo.png" class="logo-soundcloud"></li>');
                }
            }
        });
    }

function youtube_track(q) {
    var request = gapi.client.youtube.search.list({
        q: q,
        part: 'snippet'
    });
    request.execute(function(response) {
        $('#youtube-result').empty();
        for (var i=0; i < response.result.items.length; i++) {
            if (response.result.items[i].id.kind == "youtube#video") {
                var channel = response.result.items[i].snippet.channelTitle;
                var legit = channel.slice(channel.length-4, channel.length);
                if (legit == "VEVO"){
                    $('#youtube-result').append('<ul value="https://www.youtube.com/watch?v=' + response.result.items[i].id.videoId + '"><li><img src="' + response.result.items[i].snippet.thumbnails.medium.url + '"  class="img-youtube"></li><li><p>' + response.result.items[i].snippet.title + '</p><p>' + channel + '</p><img src="images/youtube-logo.png" class="logo-youtube"></li>');
                }
            }

        }
    });

}

function soundcloud_track(q) {
        SC.initialize({
            client_id: '1c1fbacee3dd327615fd1b22af834084'
        });

        var page_size = 5;
        SC.get('/tracks', { q: q, license: '', limit: page_size }).then(function(tracks) {
            $('#soundcloud-result').empty();
            for (var i=0; i < tracks.length; i++){
                if (tracks[i].kind == "track"){
                    console.log(tracks[i].permalink_url);
                    $('#soundcloud-result').append('<ul value="' + tracks[i].permalink_url + '"><li><img src="' + tracks[i].artwork_url + '"  class="img-youtube"></li><li><p>' + tracks[i].title + '</p><p>' + tracks[i].user.permalink + '</p><img src="images/soundcloud-logo.png" class="logo-soundcloud"></li>');
                }  
            }
        });
    }

function handleAPILoaded() {
    $('button').attr('disabled', false);
}
