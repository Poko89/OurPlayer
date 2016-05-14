package ourplayer.control;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.WebSocketHandler;
import ourplayer.control.utils.ServletUtils;

import javax.servlet.ServletContext;
import javax.websocket.Session;
import java.security.Principal;
import java.util.Dictionary;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by ${HananAvramovich} on 17/02/2016.
 */

@Controller
public class PlayerController {

    WebSocketSessionHandler WSSH = WebSocketSessionHandler.getInstance();

    @MessageMapping("/canplay")
    @SendTo("/topic/videoplayer")
    public String CanPlay(Principal principal) throws Exception {

        WSSH.getSubscribers().get(principal.getName()).setCanPlay();

        return "CanPlay updated";
    }

    @MessageMapping("/play")
    @SendTo("/topic/videoplayer")
    public String Play() throws Exception {

        while (!WSSH.allSubscribersCanPlay()) {
        }

        return "Play";
    }

    @MessageMapping("/pause")
    @SendTo("/topic/videoplayer")
    public String Pause() throws Exception {
        return "Pause";
    }
}
