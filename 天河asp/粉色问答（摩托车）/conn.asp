<%
'on error resume next
dim conn,dbpath
set conn=Server.CreateObject("adodb.connection")
connstr="provider=microsoft.jet.oledb.4.0;data source="&Server.MapPath("qq.not3")
conn.open connstr

Function msg(str)
Response.Write "<script language=""javascript"">" & vbCrLf
If not isempty(str) then  Response.Write "alert(""" & str & """);" & vbCrLf
Response.Write "</script>" & vbCrLf
Response.End
End Function


'POST表单的过滤
Function Pstr(str)
Pstr=dvHTMLEncode(Trim(request.Form(str)))
End Function


'GET表单的过滤
Function Gstr(str)
Gstr=dvHTMLEncode(Trim(request.querystring(str)))
End Function


Function msgurl(msg,msgurls)
Response.Write "<script language=""javascript"">" & vbCrLf
If not isempty(msg) then Response.Write "alert(""" & msg & """);" & vbCrLf
Response.Write "location.href='"&msgurls&"';" & vbCrLf
Response.Write "</script>" & vbCrLf
Response.End
End Function


'提交数据过滤函数：  
'示例：sub_to=dvHTMLEncode(Trim(Request.Form("name")))
function dvHTMLEncode(fString)
if not isnull(fString) then
    fString = replace(fString,">", "&gt;")
    fString = replace(fString,"<", "&lt;")
    fString = replace(fString,"'","""")
    'fString = Replace(fString, CHR(32), "&nbsp;")
    'fString = Replace(fString, CHR(9), "&nbsp;")
    fString = Replace(fString, CHR(34), "&quot;")
    fString = Replace(fString, CHR(39), "&#39;")
    'fString = Replace(fString, CHR(13), "")
    'fString = Replace(fString, CHR(10) & CHR(10), "</P><P> ")
    'fString = Replace(fString, CHR(10), "<BR> ")
    dvHTMLEncode = fString
end if
end function

%>