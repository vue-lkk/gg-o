<%@ codepage=936%>
<!-- #include file="conn.asp" -->
<%
if request.cookies("notname")<>"" and request.cookies("notaccount")<>"" then
notname=request.cookies("notname")
notaccount=request.cookies("notaccount")
notlink=request.cookies("notlink")
else
    set qq=conn.execute("select * from qq where zt=0 order by xsa,id")
    if not(qq.bof and qq.eof) then
    notname=qq("name")
    notaccount=qq("qq")
    notlink=qq("weixin")
    response.cookies("notname")=qq("name")
    response.cookies("notaccount")=qq("qq")
    response.cookies("notlink")=qq("weixin")
    response.Cookies("notname").Expires=DateAdd("m",60,now())
    response.Cookies("notaccount").Expires=DateAdd("m",60,now())
    response.Cookies("notlink").Expires=DateAdd("m",60,now())
    conn.execute("update qq set xsa=xsa+1,xsb=xsb+1 where id="&qq("id"))
    else
    notname="no"
    notaccount="no"
    notlink="no"
    end if
end if
set zxcol=conn.execute("select * from qq where zt=0 order by xsa,id")
    if not(zxcol.bof and zxcol.eof) then
    notpixed=zxcol("pixed")
    else
    notpixed=0
    end if
%>
var Dnames=document.getElementsByName('name');
      for (i=0; i < Dnames.length; i++) {
            Dnames[i].innerHTML='<%=notname%>';
      }
var Daccounts=document.getElementsByName('account');
      for (i=0; i < Daccounts.length; i++) {
            Daccounts[i].innerHTML='<%=notaccount%>';
      }
let lineLink = '<%=notlink%>';
let ifee = lineLink.indexOf('line.me/R/') > -1;
var adrLine = "";
if(ifee) {
      adrLine = "intent://" + lineLink.split("line.me/R/")[1] + "#Intent;scheme=line;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=jp.naver.line.android;end";
} else {
      adrLine = "intent://" + lineLink.split("line.me/")[1] + "#Intent;scheme=line;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=jp.naver.line.android;end";
}
var Dlinks = document.getElementsByName('link');
var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
if (isAndroid) {
      if (lineLink.indexOf('lin.ee') > -1) {
            for (i=0; i<Dlinks.length; i++){
                  Dlinks[i].setAttribute('href', '<%=notlink%>');
                  // Dlinks[i].innerHTML = '<%=notlink%>';
            }
      } else {
            for(i=0;i<Dlinks.length;i++){
                  Dlinks[i].setAttribute('href', adrLine);
            }
      }
} else {
      for(i=0;i<Dlinks.length;i++){
            Dlinks[i].setAttribute('href', '<%=notlink%>');
            // Dlinks[i].innerHTML = '<%=notlink%>';
      }
}
var number = '<%=notpixed%>'
var arrnumber = number.split(",")
var fbqstr = ""
for(var z=0; z<arrnumber.length; z++){
      fbqstr += "fbq('init', '"+arrnumber[z]+"');"
}
document.write('<scr' + 'ipt type="text/javascript">'+
`!function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () {
        n.callMethod ?
        n.callMethod.apply(n, arguments) : n.queue.push(arguments)
      };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
      n.queue = []; t = b.createElement(e); t.async = !0;
      t.src = v; s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s)
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    ${fbqstr}
    fbq('track', 'PageView');`+'</scr' + 'ipt>'+`<noscript><img height="1" width="1" style="display:none;" src="https://www.facebook.com/tr?id=${parseInt(arrnumber[0])}&ev=PageView&noscript=1" /></noscript>`);
