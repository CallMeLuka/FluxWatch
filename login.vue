<template>
    <div class="app-login">
        <div class="one_110"></div>
        <div class="login">
            <img src="http://127.0.0.1:3000/img/login.png" class="img">
            <div class="loginWindow">
                <p @click="login">登录Avada</p>
                <p>|</p>
                <p @click="reg">注册账号</p>
                <div class="login_a" ref="login">
                    <input type="text" placeholder="用户名称" v-model="login_uname" ref="login1">
                    <p ref="login2">{{login_uname1}}</p>
                    <input type="password" placeholder="密码" v-model="login_upwd" ref="login3">
                    <p>{{login_upwd1}}</p>
                    <Yz></Yz>
                    <input type="button" value="登录" @click="submitlogin">
                </div>

                <div class="reg_a" ref="reg">
                    <input type="text" placeholder="用户名称" v-model="reg_uname" @blur="BlurUname">
                    <p>{{reg_uname1}}</p>
                    <input type="text" placeholder="邮箱" v-model="reg_mail">
                    <p>{{reg_mail1}}</p>
                    <input type="password" placeholder="密码" v-model="reg_upwda">
                    <p>{{reg_upwd1}}</p>
                    <input type="password" placeholder="确认密码" v-model="reg_upwdb">
                    <p>{{reg_upwd2}}</p>
                    <input type="button" value="注册" @click="submitreg">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Yz from "./yanzheng/yz.vue"
    export default {
        data() {
            return {
                // reg
                reg_upwda: "",
                reg_upwdb: "",
                reg_upwd1: "",
                reg_upwd2: "",
                reg_uname1: "",
                reg_mail1: "",
                reg_uname: "",
                reg_mail: "",
                reg_upwd: "",
                regUname: 0,
                regUpwd: 0,
                regUpwd2: 0,
                regUmail: 0,
                reg_value: { uname: false, umail: false, upwd: false, upwd2: false },
                // login
                loginUname: 0,
                loginUpwd: 0,
                login_uname: "",
                login_uname1: "",
                login_upwd: "",
                login_upwd1: "",
                uname: "",
                login_value: { uname: false, upwd: false }


            }
        },
        components: { Yz },

        mounted() {
            this.login();
        },
        methods: {
            login() {
                this.$refs.login.style.display = "block";
                this.$refs.reg.style.display = "none"
            },
            reg() {
                this.$refs.login.style.display = "none";
                this.$refs.reg.style.display = "block"
            },
            pduname() {
                var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/;
                if (this.login_uname == "") {
                    this.login_uname1 = "*请填写用户名";
                    return this.loginUname = 0;
                } else if (!(reg.test(this.login_uname))) {
                    this.login_uname1 = "*用户名需要满足6-10位数字字母组合";
                    return this.loginUname = 0;
                } else {
                    this.login_uname1 = "";
                    this.login_value.uname = true;
                    return this.loginUname = 1;
                }
            },
            pdupwd() {
                if (this.login_upwd == "") {
                    this.login_upwd1 = "*请填写密码";
                    return this.loginUpwd = 0;;
                } else {
                    this.login_upwd1 = "";
                    this.login_value.upwd = true;
                    return this.loginUpwd = 1;
                }
            },
            // 登录方法 ajax
            submitlogin() {
                var login = this.login_value
                this.pdupwd()
                this.pduname()
                var a = this.loginUname;
                var b = this.loginUpwd;
                if (a + b == 2) {
                    for (var i in login) {
                        if (login[i] == true) {
                            var uname = this.login_uname
                            var upwd = this.login_upwd
                            var url = "http://127.0.0.1:3000/login?uname=" + uname + "&upwd=" + upwd;
                            this.axios.get(url).then(result => {
                                if (result.data.code == 1) {
                                    this.$router.push("/");
                                    // console.log(result.data.data[0].id)
                                    location.reload()
   
                                    localStorage.setItem("uid",result.data.data[0].id);
                                    localStorage.setItem("uname",result.data.data[0].uname);
                                } else {
                                    alert("用户名密码错误");
                                    this.login_value.upwd = false;
                                    this.login_value.uname = false;
                                }
                            })
                            return;
                        }
                    }
                }

            },
            // 注册判断
            pdruname() {
                var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/;
                if (this.reg_uname == "") {
                    this.reg_uname1 = "*请填写用户名";
                    return this.regUname = 0;
                } else if (!(reg.test(this.reg_uname))) {
                    this.reg_uname1 = "*用户名需要满足6-10位数字字母组合";
                    return this.regUname = 0;
                } else {
                    this.reg_uname1 = "";
                    this.reg_value.uname = true;
                    return this.regUname = 1;
                }
            },
            // 失去焦点AJAX
            BlurUname() {
                this.pdruname();
                var suname = this.reg_value.uname;
                if (suname == true) {
                    var uname = this.reg_uname;
                    var url = "http://127.0.0.1:3000/pdreg?uname=" + uname;
                    this.axios.get(url).then(result => {
                        if (result.data.code == 1) {
                            this.reg_uname1 = "该名称可用"
                        } else if (result.data.code == -1) {
                            this.reg_uname1 = "*该名称已被注册"
                        }
                    })
                }
            },
            pdrumail() {
                var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                if (this.reg_mail == "") {
                    this.reg_mail1 = "请输入邮箱";
                    return this.regUmail = 0;
                } else if (!(reg.test(this.reg_mail))) {
                    this.reg_mail1 = "请输入正确的邮箱格式";
                    return this.regUmail = 0;
                } else {
                    this.reg_mail1 = "";
                    this.reg_value.umail = true;
                    return this.regUmail = 1;
                }

            },
            pdrupwd1() {
                var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
                if (this.reg_upwda == "") {
                    this.reg_upwd1 = "*请填写密码";
                    return this.regUpwd = 0;
                } else if (!(reg.test(this.reg_upwda))) {
                    this.reg_upwd1 = "*密码需要满足6-16位数字字母组合";
                    return this.regUpwd = 0;
                } else {
                    this.reg_upwd1 = "";
                    this.reg_value.upwd = true;
                    return this.regUpwd = 1;
                }
            },
            pdrupwd2() {
                if (this.reg_upwda != this.reg_upwdb) {
                    this.reg_upwd2 = "两次密码不一致"
                    return this.regUpwd2 = 0;
                } else if (this.reg_upwda == this.reg_upwdb) {
                    if (this.reg_upwdb.length >= 6 && this.reg_upwdb.length < 10) {
                        this.reg_upwd2 = "密码强度：弱";
                        this.reg_value.upwd2 = true;
                        return this.regUpwd2 = 1;
                    } else if (this.reg_upwdb.length >= 10 && this.reg_upwdb.length < 13) {
                        this.reg_upwd2 = "密码强度：中等";
                        this.reg_value.upwd2 = true;
                        return this.regUpwd2 = 1;
                    } else if (this.reg_upwdb.length >= 13 && this.reg_upwdb.length <= 16) {
                        this.reg_upwd2 = "密码强度：高";
                        this.reg_value.upwd2 = true;
                        return this.regUpwd2 = 1;
                    }

                }
            },


            // 注册方法
            submitreg() {
                var reg = this.reg_value;
                this.pdruname();
                this.pdrumail();
                this.pdrupwd1();
                this.pdrupwd2();
                var a = this.regUname;
                var b = this.regUpwd;
                var c = this.regUpwd2;
                var d = this.regUmail;
                console.log(a)
                console.log(b)
                console.log(c)
                console.log(d)
                if (a + b + c + d == 4) {
                    for (var i in reg) {
                        if (reg[i] == true) {
                            var uname = this.reg_uname;
                            var upwd = this.reg_upwd;
                            var uemail = this.reg_mail;
                            var url = "http://127.0.0.1:3000/reg?uname=" + uname + "&uemail=" + uemail + "&upwd=" + upwd;
                            this.axios.get(url).then(result => {
                                if (result.data.code == 1) {
                                    alert("注册成功");
                                    this.login();
                                    return;
                                } else {
                                    alert("注册失败")
                                    return
                                }
                            })
                            return;
                        }
                    }
                }

            }
        }
    }
</script>
<style>
    .one_110 {
        width: 100%;
        height: 110px;
    }

    .login {
        width: 1903px;
        height: 645px;
        position: relative;
    }

    .img {
        position: absolute;
        top: 60px;
        left: 384px;
    }

    .loginWindow {
        width: 410px;
        height: 525px;
        border: 1px solid #bac5d0;
        position: absolute;
        top: 60px;
        left: 1109px;
    }

    .loginWindow p {
        font-size: 24px;
        color: #72849c;
        font-family: "Source Sans Pro", Arial, Helvetica, sans-serif;
        font-weight: 100;
    }

    .loginWindow p:nth-child(1) {
        position: absolute;
        top: 30px;
        left: 72px;
    }

    .loginWindow p:nth-child(2) {
        position: absolute;
        top: 30px;
        left: 205px;
    }

    .loginWindow p:nth-child(3) {
        position: absolute;
        top: 30px;
        left: 230px;
    }

    .loginWindow .login_a {
        position: absolute;
        top: 80px;
        text-align: center
    }

    .loginWindow .login_a input:nth-child(1) {
        width: 346px;
        height: 48px;
        border-radius: 0;
        font-size: 14px;
        color: #72849c
    }

    .loginWindow .login_a p:nth-child(2) {
        font-size: 14px;
        color: #e9686b;
        position: absolute;
        top: 50px;
        left: 46px;
        display: block;
    }

    .loginWindow .login_a input:nth-child(3) {
        width: 346px;
        height: 48px;
        border-radius: 0;
        font-size: 14px;
        color: #72849c;
        position: relative;
        top: 10px;
    }

    .loginWindow .login_a p:nth-child(4) {
        font-size: 14px;
        color: #e9686b;
        position: absolute;
        top: 123px;
        left: 46px;
        display: block;
    }

    .loginWindow .login_a input:nth-child(6) {
        width: 346px;
        height: 48px;
        border-radius: 0;
        font-size: 14px;
        color: #ffffff;
        position: relative;
        top: 100px;
        background: #8ea1d4
    }

    .loginWindow .reg_a {
        position: absolute;
        top: 80px;
        text-align: center
    }

    .loginWindow .reg_a input:nth-child(1) {
        width: 346px;
        height: 48px;
        border-radius: 0;
        font-size: 14px;
        color: #72849c
    }

    .loginWindow .reg_a p:nth-child(2) {
        font-size: 14px;
        color: #e9686b;
        position: absolute;
        top: 50px;
        left: 46px;
        display: block;
    }

    .loginWindow .reg_a input:nth-child(3) {
        width: 346px;
        height: 48px;
        border-radius: 0;
        border: 1px solid #cccccc;
        font-size: 14px;
        color: #72849c;
        position: relative;
        top: 10px;
    }

    .loginWindow .reg_a p:nth-child(4) {
        font-size: 14px;
        color: #e9686b;
        position: absolute;
        top: 122px;
        left: 46px;
        display: block;
    }

    .loginWindow .reg_a input:nth-child(5) {
        width: 346px;
        height: 48px;
        border-radius: 0;
        border: 1px solid #cccccc;
        font-size: 14px;
        color: #72849c;
        position: relative;
        top: 20px;
    }

    .loginWindow .reg_a p:nth-child(6) {
        font-size: 14px;
        color: #e9686b;
        position: absolute;
        top: 198px;
        left: 46px;
        display: block;
    }

    .loginWindow .reg_a input:nth-child(7) {
        width: 346px;
        height: 48px;
        border-radius: 0;
        border: 1px solid #cccccc;
        font-size: 14px;
        color: #72849c;
        position: relative;
        top: 30px;
    }

    .loginWindow .reg_a p:nth-child(8) {
        font-size: 14px;
        color: #e9686b;
        position: absolute;
        top: 270px;
        left: 46px;
        display: block;
    }

    .loginWindow .reg_a input:nth-child(9) {
        width: 346px;
        height: 48px;
        border-radius: 0;
        border: 1px solid #cccccc;
        font-size: 14px;
        color: #ffffff;
        position: relative;
        top: 40px;
        background: #8ea1d4
    }
</style>