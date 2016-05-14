package ourplayer.control;

import java.util.Date;

/**
 * Created by ${HananAvramovich} on 14/05/2016.
 */
public class VideoSubsciberData {

    private final String username;
    private Boolean canPlay = false;
    private Date time = new Date();

    public VideoSubsciberData(String username) {
        this.username = username;
    }

    public String getUsername() {
        return username;
    }

    public Boolean isCanPlay() {
        return canPlay;
    }

    public void setCanPlay() {
        this.canPlay = true;
    }

    public void setCannotPlay() {
        this.canPlay = false;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public Date getTime() {
        return time;
    }
}
