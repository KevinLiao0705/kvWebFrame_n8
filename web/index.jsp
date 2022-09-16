<%-- 
    Document   : index.jsp
    Created on : 2018/12/6, 下午 10:03:02
    Author     : kevin
--%>

<%@page import="java.io.FileReader"%>
<%@page import="java.io.BufferedReader"%>
<%@page import="java.io.FileInputStream"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.Enumeration"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ page import="org.kevin.*" %>


<!DOCTYPE html>
<html>
    <%

        String strPath;
        String webRootPath = application.getRealPath("/").replace('\\', '/');
        String str = "";
        Enumeration headerNames = request.getHeaderNames();
        ArrayList<String> paraList = new ArrayList();
        String paraStr = "";
        while (headerNames.hasMoreElements()) {
            String paraName = (String) headerNames.nextElement();
            String paraValue = request.getHeader(paraName);
            str = paraName + "<~>" + paraValue;
            paraList.add(str);
            paraStr += "<p>" + str + "</p>";
        }
        //out.println(paraStr);
        //WebBase cla = new WebBase(paraList,webRootPath);
        Root cla = new Root(paraList, webRootPath);
        //=================================
        String file = webRootPath + "root.html";
        BufferedReader reader = new BufferedReader(new FileReader(file));
        StringBuilder stringBuilder = new StringBuilder();
        String line = null;
        String ls = System.getProperty("line.separator");
        while ((line = reader.readLine()) != null) {
            stringBuilder.append(line);
            stringBuilder.append(ls);
        }
        stringBuilder.deleteCharAt(stringBuilder.length() - 1);
        reader.close();
        String content = stringBuilder.toString();
        out.println(content);
        //=================================
    %>     

</html>
