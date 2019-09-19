// export function MP(ak) {
export function MP() {
    return new Promise(function (resolve, reject) {
      window.onload = function () {
        resolve(BMap)
      }
      var script = document.createElement("script");
      script.type = "text/javascript";
    //   script.src = "http://api.map.baidu.com/api?v=2.0&ak="+ak+"&callback=init";
      script.src = "http://api.map.baidu.com/getscript?v=2.0&ak=P98XaE7Aze6MspqKbXeN9qoFTmqAQbKi";
      script.onerror = reject;
      document.head.appendChild(script);
    })
  }