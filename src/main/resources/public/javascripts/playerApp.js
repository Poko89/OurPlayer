var stompClient = null;
var video;
var subscibtion;
var clientID;

$(function(){
    video = $("#video")[0];
    video.oncanplay = onCanPlay;
    $('#playButton')[0].onclick = onPlayPressed;
    $('#pauseButton')[0].onclick = onPausePressed;

    disconnect();
    connect();
});

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

function onCanPlay(){
    stompClient.send('/app/canplay');
}

function onPlayPressed(){
    stompClient.send('/app/play');
}

function onPausePressed(){
    stompClient.send('/app/pause');
}

//var VideoSubscriberData = {
//    username : username,
//}


