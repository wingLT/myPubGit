<script>
  /*接口调用地址*/
  let mainUrl = "http://172.25.15.17:9480";
  // let mainUrl = "http://192.168.1.146:9480";
  
  // let mainUrl = "http://192.168.1.4:9480";

//  let mainUrl = "http://172.25.15.15:9480";

  const dateFormat = (time) => {
    var date = new Date(time);
    var year = date.getFullYear();
    /* 在日期格式中，月份是从0开始的，因此要加0
    * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
    * */
    var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    // 拼接
    return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
  };
  //内容块上下滚动
  const scrollTop = (id1, id2, id3, sp) => {
    var speed = sp;
    var el1 = document.getElementById(id1);
    var el2 = document.getElementById(id2);
    var el3 = document.getElementById(id3);
    el3.innerHTML = el2.innerHTML;

    function Marquee() {
      if (el3.offsetHeight - el1.scrollTop <= 0) {

        el1.scrollTop = 0;
      } else {

        el1.scrollTop++;
      }

    }

    var timer = setInterval(Marquee, speed);
    el1.onmouseover = function () {
      clearInterval(timer);
    };
    el1.onmouseout = function () {
      timer = setInterval(Marquee, speed);
    }
  };
  //内容块左右滚动
  const scrollLeft = (id1, id2, id3, sp) => {
    var speed = sp;
    var el1 = document.getElementById(id1);
    var el2 = document.getElementById(id2);
    var el3 = document.getElementById(id3);
    el3.innerHTML = el2.innerHTML;

    function Marquee() {
      if (el3.offsetWidth - el1.scrollLeft <= 0) {
        el1.scrollLeft = 0;
      } else {
        el1.scrollLeft++;
      }

    }

    var timer = setInterval(Marquee, speed);
    el1.onmouseover = function () {
      clearInterval(timer);
    };
    el1.onmouseout = function () {
      timer = setInterval(Marquee, speed);
    }
  };

  var currentUrl = window.location.href;
//  let token = sessionStorage.getItem('token');
  let token;
  if(currentUrl.indexOf('token')>=0){
    token = currentUrl.substring(currentUrl.indexOf('=')+1,currentUrl.length);
  }else{
    token=''
  }
//  token='f3d2f5def75bddaa950ac23c3fc3d6be'
  const Ajax = (function () {
    return {
      //后台管理请求
      generalAjax(url, data = {}, type = 'GET') {
        return new Promise(function (resolve, reject) {
          let promise;
          let requestUrl = mainUrl + url;
          if (type === 'POST') {
            promise = $.ajax({
              type: type,
              data: JSON.stringify(data),
              url: requestUrl,
              // headers:{
              //   'Content-Type':'application/json;charset=utf-8',
              // },
              beforeSend: function (xmlhttprequest) {
                xmlhttprequest.setRequestHeader('token', token);
                xmlhttprequest.setRequestHeader('Content-Type', "application/json; charset=utf-8")
              }
            })
          } else if (type === 'GET') {
            promise = $.ajax({
              type: type,
              data: data,
              url: requestUrl,
              beforeSend: function (xmlhttprequest) {
                xmlhttprequest.setRequestHeader('token', token);
                xmlhttprequest.setRequestHeader('Content-Type', "application/json; charset=utf-8")
              }
            })
          }

          promise.then(function (response) {
            resolve(response);
          }).catch(function (error) {
            reject(error);
          })
        })
      }
    }
  })();


  export default {
    name: "Common",
    dateFormat,
    scrollTop,
    scrollLeft,
    mainUrl,
    Ajax
  };
</script>
