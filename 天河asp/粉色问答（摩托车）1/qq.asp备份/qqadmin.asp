<%@ codepage=936%>
<!-- #include file="conn.asp" -->

<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
<%
password="lish4186" '�����޸�����
if Gstr("action")="login" then
   if Pstr("password")<>password then
      
      response.write msgurl("��������¼ʧ��",Request.ServerVariables("SCRIPT_NAME")):response.end
   else
      session("password")=Pstr("password")
      response.write msgurl("��¼�ɹ�",Request.ServerVariables("SCRIPT_NAME")):response.end
   end if
end if
if Gstr("action")="fgpwd" then
   response.write msgurl(password,Request.ServerVariables("SCRIPT_NAME")):response.end
end if
if session("password")="" then
%>
<form action="?action=login" method="post">
<center>
����������:<input name="password" type="password"> <input type="submit" value="��¼">
</center>
</form>
<%
response.end
end if
%>


<%
submitstr="���"
actionurl="?action=add"
if request.querystring("id")<>"" then id=clng(request.querystring("id"))
action=request.querystring("action")

if action="add" then
   response.write msgurl("�����Ȩ��",Request.ServerVariables("SCRIPT_NAME"))
elseif action="edit" and id<>"" then
   if Pstr("name")="" then msg("�ͷ����Ʋ���Ϊ��")
   if Pstr("qq")="" then msg("�˺Ų���Ϊ��")
   if Pstr("weixin")="" then msg("�����Ӳ���Ϊ��")
   if Pstr("pixed")="" then msg("���ز���Ϊ��")
   if Pstr("switch")="" then msg("���β���Ϊ��")
   conn.execute("update qq set name='"&Pstr("name")&"',xsa="&Pstr("xsa")&" where id="&id)
   conn.execute("update qq set switch='"&Pstr("switch")&"', pixed='"&Pstr("pixed")&"' where 1=1")
   response.write msgurl("�޸ĳɹ�",Request.ServerVariables("SCRIPT_NAME"))
elseif action="zt" and id<>"" then
   '��������ߵĻ� ���ٱ���һ��
   if Gstr("str")="1" then
      sx=conn.execute("select count(*) from qq where zt=0")(0)
      if sx=1 then
         response.write msgurl("����ȫ�����ߣ��뱣��һ��������״̬",Request.ServerVariables("SCRIPT_NAME"))
         response.end
      end if
   end if
   conn.execute("update qq set zt="&Gstr("str")&" where id="&id)
   response.write msgurl("����״̬�ɹ�",Request.ServerVariables("SCRIPT_NAME")) 
elseif action="clear" then
   conn.execute("update qq set xsa=0")
   response.write msgurl("����ɹ�",Request.ServerVariables("SCRIPT_NAME")) 
elseif id<>"" then
   set thisqq=conn.execute("select * from qq where id="&id)
   name=thisqq("name")
   qq=thisqq("qq")
   weixin=thisqq("weixin")
   pixed=thisqq("pixed")
   switch=thisqq("switch")
   xsa=thisqq("xsa")
submitstr="�޸�"
actionurl="?action=edit&id="&id
else
   xsa=0
end if
%>
<style>
a:visited{
   color: rgb(0,0,238);
}
table {
    table-layout:fixed;
    WORD-BREAK:break-all;
}
.thead td{border:1px solid #fff; background-color:#ABB6C8; border-radius:4px; color:#fff;}
</style>
<table width="1280" border="0" cellspacing="1" cellpadding="2" bgcolor="#000000" align="center" style="margin-top:10px;">
<tr class="thead" bgcolor="#FFFFFF" align=center>
  <td>���</td>
  <td>״̬</td>
  <td>��ע</td>
  <td>�˺�</td>
  <td>������</td>
  <td>����(Ӣ�Ķ��ŷָ�)</td>
  <td>��������(0Ϊ��)</td>
  <td>��ʾ����</td>
  <td>��ʾ����</td>
  <td>����</td>
</tr>
<form action="<%=actionurl%>" method="post">
<tr bgcolor="#FFFFFF">
  <td style="text-align:center; font-size:14px;"><a href="?action=clear" onClick="return window.confirm('��ȷ��Ҫ������?');">������ʾ����</a></td>
  <td></td>
  <td><input value="<%=name%>" name="name" style="width:100%;"></td>
  <td><input value="<%=qq%>" name="qq" style="width:100%;"></td>
  <td><input value="<%=weixin%>" name="weixin" style="width:100%;"></td>
  <td><input value="<%=pixed%>" name="pixed" style="width:100%;"></td>
  <td><input value="<%=switch%>" name="switch" style="width:100%;"></td>
  <td><input value="<%=xsa%>" name="xsa" style="width:100%;"></td>
  <td></td>
  <td><input type="submit" value="<%=submitstr%>"></td>
</tr>
</form>
<%
set qq=conn.execute("select * from qq order by id desc")
if not(qq.bof and qq.eof) then
    do while not qq.eof or qq.bof
%>
<tr bgcolor="#FFFFFF" align=center>
  <td style="font-size:14px;"><%=qq("id")%></td>
  <td style="font-size:14px; font-weight:bold"><%if qq("zt")=0 then%><a href="?action=zt&id=<%=qq("id")%>&str=1">����</a><%else%><a href="?action=zt&id=<%=qq("id")%>&str=0"><font color=red>����</font></a><%end if%></td>
  <td style="font-size:14px;"><%=qq("name")%></td>
  <td style="font-size:14px;"><%=qq("qq")%></td>
  <td style="font-size:14px;"><%=qq("weixin")%></td>
  <td style="font-size:14px;"><%=qq("pixed")%></td>
  <td style="font-size:14px;"><%=qq("switch")%></td>
  <td style="font-size:14px;"><%=qq("xsa")%></td>
  <td style="font-size:14px;"><%=qq("xsb")%></td>
  <td style="font-size:14px; font-weight:bold"><a href="?id=<%=qq("id")%>">�༭</a></td>
</tr>
<%
  qq.movenext
  loop
else
%>
<tr bgcolor="#FFFFFF">
  <td colspan=8>������</td>
</tr>
<%end if%>
</table>