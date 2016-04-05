package ourplayer.control.utils;

import javax.servlet.ServletContext;

/**
 * Created by leppa on 3/31/2016.
 */
public class ServletUtils {

    private static ServletUtils instance;
    public static ServletContext context;

    private ServletUtils() {}

    public ServletUtils getInstance() {
        if (instance == null){
            synchronized(ServletUtils.class){
                if (instance == null){
                    instance = new ServletUtils();
                }
            }
        }

        return instance;
    }

    public static void SetContext(ServletContext i_context) {
        if (context == null){
            context = i_context;
        }
    }

    public static ServletContext GetContext() {
        return context;
    }
}
