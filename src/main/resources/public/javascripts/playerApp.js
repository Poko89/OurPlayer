var stompClient = null;
var subscription;
var clientID;

var video;
var videoControls;
var playButton;
var pauseButton;
var stopButton;
var muteButton;
var volumeinc;
var volumedec;
var progressBar;
var fullscreenButton;

$(function(){
    disconnect();
    connect();

    initializePlayer();
});

function initializePlayer(){
    video = $('#video')[0];
    videoControls = $('#video-controls')[0];

    playButton = $('#play-button')[0];
    pauseButton = $('#pause-button')[0];
    stopButton = $('#stop-button')[0];
    muteButton = $('#mute-button')[0];
    volumeinc = $('#vol-inc-button')[0];
    volumedec = $('#vol-dec-button')[0];
    progressBar = $('#progress-bar')[0];
    fullscreenButton = $('#fullscreen')[0];

    video.controls = false;

    video.oncanplay = onCanPlay;
    playButton.onclick = onPlayPressed;
    pauseButton.onclick = onPausePressed;
    stopButton.onclick = onStopPressed;
    muteButton.onclick = toggleMute;
    video.ontimeupdate = updateProgressBar;
    video.onvolumechange = function() {
        if (video.muted)
            changeButtonType(muteButton, 'unmute');
        else
            changeButtonType(muteButton, 'mute');
    };
}

function onCanPlay(){
    stompClient.send('/app/canplay');
}

function onPlayPressed(){
    stompClient.send('/app/play');
}

function onPausePressed(){
    stompClient.send('/app/pause');
}

function onStopPressed(){
    //change it to apply with stomp
    video.pause();
    video.currentTime = 0;
    progressBar.value = 0;
}

function onVolumeChanged(direction){
    if(direction === '+'){
        video.volume += (video.volume == 1 ? 0 : 0.1);
    }
    else{
        video.volume -= (video.volume == 0 ? 0 : 0.1);
    }
    video.volume = parseFloat(video.volume).toFixed(1);
}

function toggleMute(){
    if (video.muted){
        changeButtonType(muteButton, 'mute');
        video.muted = false;
    } else{
        changeButtonType(muteButton, 'unmute');
        video.muted = true;
    }
}

function changeButtonType(button, value){
    button.innerHTML = value;
    button.setAttribute("class", value);
    button.setAttribute("type", value);
}

function updateProgressBar(){
    var percentage = Math.floor((100 / video.duration) * video.currentTime);
    var innerHtml = percentage + '% played';
    progressBar.value = percentage;
    progressBar.innerHTML = innerHtml;
}

function connect(){
    var socket = new SockJS('/connect');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function(frame){
        console.log("Connected: " + frame);
        subscibtion = stompClient.subscribe('/topic/videoplayer', subscribtionCallBack);
    });
}

function subscribtionCallBack(message, headers) {
    console.log("Server sent:" + message.body);
    if(message !== undefined){
        if(message.body === "Play") {
            video.play();
        }
        else if(message.body === "Pause") {
            video.pause();
        }
    }
}

function disconnect(){
    if(stompClient != null){
        stompClient.disconnect();
    }
    //do something after disconnecting
    console.log("Disconnected");
}



//var VideoSubscriberData = {
//    username : username,
//}


