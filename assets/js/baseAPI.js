 // 每次调用 jq里面ajax时候 会先调用这个函数
 // 我们可以在此拿到配置对象
$.ajaxPrefilter(function (options) {
    
    // 发起ajax请求前，统一拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    console.log(options.url)
})