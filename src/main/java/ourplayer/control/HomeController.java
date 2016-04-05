package ourplayer.control;

import org.springframework.boot.autoconfigure.web.ServerProperties;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ourplayer.control.utils.ServletUtils;

import javax.servlet.ServletContext;
import javax.servlet.annotation.HttpConstraint;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 * Created by leppa on 3/31/2016.
 */

@RestController
public class HomeController {

    @RequestMapping("/session")
    public String SubscibeSession(HttpServletRequest request) {

        ServletUtils.SetContext(request.getServletContext());
        HttpSession session = request.getSession();

        String sessionID = session.getId();
        if (ServletUtils.GetContext().getAttribute(sessionID) != "subscibed"){
            ServletUtils.GetContext().setAttribute(sessionID, "subscibed");
        }
        return "Session subscibed";
    }
}
