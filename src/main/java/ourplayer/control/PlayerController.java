package ourplayer.control;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.WebSocketHandler;
import ourplayer.control.utils.ServletUtils;

import javax.servlet.ServletContext;
import javax.websocket.Session;

/**
 * Created by ${HananAvramovich} on 17/02/2016.
 */

@Controller
public class PlayerController {

    @MessageMapping("/canplay")
    @SendTo("/topic/videoplayer")
    public String CanPlay() throws Exception {


        return "CanPlay";
    }

    @MessageMapping("/play")
    @SendTo("/topic/videoplayer")
    public String Play() throws Exception {
        return "Play";
    }

    @MessageMapping("/pause")
    @SendTo("/topic/videoplayer")
    public String Pause() throws Exception {
        return "Pause";
    }
}
