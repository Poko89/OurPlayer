package ourplayer.control;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by ${HananAvramovich} on 14/05/2016.
 */
public class WebSocketSessionHandler {

    private static WebSocketSessionHandler instance;
    private Map<String, VideoSubsciberData> subscribers = new HashMap<String, VideoSubsciberData>();

    private WebSocketSessionHandler() {};

    public static WebSocketSessionHandler getInstance() {
        if (instance == null) {
            synchronized (WebSocketSessionHandler.class) {
                if (instance == null) {
                    instance = new WebSocketSessionHandler();
                }
            }
        }

        return instance;
    }

    public Map<String, VideoSubsciberData> getSubscribers() {
        return subscribers;
    }

    public void setSubscribers(Map<String, VideoSubsciberData> subscribers) {
        this.subscribers = subscribers;
    }

    public boolean allSubscribersCanPlay() {

        Boolean allCanPlay = true;

        for (VideoSubsciberData vsd : subscribers.values()) {
            if (!vsd.isCanPlay()) {
                allCanPlay = false;
                break;
            }
        }

        return allCanPlay;
    }
}
