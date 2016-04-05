var stompClient = null;
var video;

$(function(){
    video = $("#video")[0];
    $('#playButton')[0].onclick = onPlayPressed;
    $('#pauseButton')[0].onclick = onPausePressed;

    //$.ajax({
    //    url: "/session",
    //    context: "Subscibe to session"
    //}).done(function() {
    //    console.log("HttpSession subscribed");
    //});

    disconnect();
    connect();
});

function connect(){
    var socket = new SockJS('/connect');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function(frame){
        console.log("Connected: " + frame);
        stompClient.subscribe('/topic/videoplayer', function(message) {
            console.log("Server sent:" + message.body);
            if(message !== undefined){
                if(message.body === "Play") {
                    video.play();
                }
                else if(message.body === "Pause") {
                    video.pause();
                }
            }
        });
    });
}

function disconnect(){
    if(stompClient != null){
        stompClient.disconnect();
    }
    //do something after disconnecting
    console.log("Disconnected");
}

function onPlayPressed(){
    stompClient.send('/app/play');
}

function onPausePressed(){
    stompClient.send('/app/pause');
}



