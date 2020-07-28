$(function () {

    // 点击 去注册账号 
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    
    // 从layui中获取form对象
    var form = layui.form
    var layer = layui.layer
    // 通过form.verify()函数自定义校验规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],

        //校验二次密码是否一致
        repwd: function (value) {
            // 通过形参拿到确认密码框内容，拿到密码框内容，然后比较，判断失败return，
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return "二次密码不一致"
            }
        }
    })
        

    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method:'post',
            url:'/api/reguser',
            data: { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val()},
            success:function(res){
                if (res.status !== 0) {
                    // return console.log(res.message)
                   return layer.msg(res.message);
                }
                // console.log('注册成功！')
                layer.msg('注册成功，请登录');

                $('#link_login').click()
            }
        })
    })


    // 监听登录表单的提交事件
    $('#form_login').submit(function (e) {
        e.preventDefault()
        $.ajax({
            method:'post',
            url:'/api/login',
            data:$(this).serialize(),
            success:function(res){
                if (res.status !== 0) {
                    return layer.msg('登录失败!')
                }
                layer.msg('登录成功')
                // console.log(res.token)
                // 将token字符串存到本地
                localStorage.setItem('token',res.token)

                // 跳转到后台首页
                location.href = '/index.html'

            }
        })
    })


})