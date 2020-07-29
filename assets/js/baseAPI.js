 // 每次调用 jq里面ajax时候 会先调用这个函数
 // 我们可以在此拿到配置对象
$.ajaxPrefilter(function (options) {
    
    // 发起ajax请求前，统一拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    // console.log(options.url)


    // 统一为有权限的接口设置header请求头
    if(options.url.indexOf('/my/') !==-1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }


    // 全局统一挂在complete回调函数
    options.complete = function (res) {
        // console.log('执行了complete函数')
        // console.log(res)
        // 在complete回调函数中可以使用 res.responseJSON拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 强制清空token
            localStorage.removeItem('token')
            // 强制跳转到登录页面
            location.href = '/login.html'
        }
    }
})