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
    var allRadios = document.getElementsByName('re'),
        booRadio;
    
    for(var x = 0; x < allRadios.length; x++){
        allRadios[x].onclick = function() {
            if(booRadio == this) {
                this.checked = false;
                booRadio = null;
            } else {
                booRadio = this;
            }
        };
    }
    
    
    
    $('button').click(function (){
        if ($('#search').val() != undefined && $('#search').val() != ''){
            for (var i=0; i < allRadios.length; i++){
                if ($('input[name=re]:checked', '#radio-button').val() != undefined){
                    if (i == 0 && $('input[name=re]:checked', '#radio-button').val() == "0")
                        console.log('artist');
                        //search_artist($('#search').value);
                    else if (i == 1 && $('input[name=re]:checked', '#radio-button').val() == "1") {
                        var q = $('#search').val();
                        youtube_track(q);
                    }
                    else if (i == 2  && $('input[name=re]:checked', '#radio-button').val() == "2")
                        console.log('album');
                        //search_album($('#search').value);
                }
            }
            if ($('input[name=re]:checked', '#radio-button').val() == undefined)
                console.log("choose one type search 'artist', 'track' or 'album'");
        }
        else {
            console.log('write something in the search bar');
        }
    });
}
$(document).ready(domready);

function youtube_track(q) {
    var request = gapi.client.youtube.search.list({
        q: q,
        part: 'snippet'
    });
    request.execute(function(response) {
        for (var i=0; i < response.result.items.length; i++) {
            if (response.result.items[i].id.kind == "youtube#video") {
                var channel = response.result.items[i].snippet.channelTitle;
                var legit = channel.slice(channel.length-4, channel.length);
                if (legit == "VEVO")
                    $('#toto').append('<img src="' + response.result.items[i].snippet.thumbnails.medium.url + '" value="https://www.youtube.com/watch?v=' + response.result.items[i].id.videoId + '"><p>' + response.result.items[i].snippet.title + '</p><p>' + channel + '</p>');
            }

        }
    });
}

function handleAPILoaded() {
    $('button').attr('disabled', false);
}
