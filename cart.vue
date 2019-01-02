<template>
    <div class="app-cart">
        <div class="one_110"></div>
        <div class="cartWindow">

            <div class="cart1">
                <p>购物车</p>
                <div></div>
                <p>当前购物车有{{sum}}件商品</p>
                <p>产品名称</p>
                <p>单价</p>
                <p>数量</p>
                <p>总价</p>

                <!-- 购物车商品列表 -->
                <ul class="cartPro" v-for="(item,i) of cartPro_list" :key="item.id">
                    <li>
                        <img src="http://127.0.0.1:3000/img/black_product.jpg">
                        <span>{{item.pname}}</span>
                        <span>添加时间:{{item.addtime | datetimeFilter}}</span>
                        <span>￥{{item.price}}</span>
                        <span>{{item.count}}</span>
                        <span>￥{{item.aprice}}</span>
                        <span @click="dePro(item.addtime)">x</span>
                    </li>
                </ul>

            </div>

            <button class="buyn">立即下单</button>

        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                cartCount: 0,
                cartPro_list: [],
                sum: 0
            }
        },
        created() {
            this.getCart();
        },
        methods: {
            // 删除
            dePro(i) {
                if (confirm("确定删除么?")){
                    var addtime = i;
                    console.log(addtime)
                    var usid = localStorage.getItem('uid');
                    var url = "http://127.0.0.1:3000/deCart?usid=" + usid + "&addtime=" + addtime;
                    this.axios.get(url).then(result => {
                        alert("删除成功")
                        location.reload()
                    })
                }

            },
            // 查询购物车
            getCart() {
                var usid = localStorage.getItem('uid');
                var url = "http://127.0.0.1:3000/seCart?usid=" + usid;
                this.axios.get(url).then(result => {
                    if (result.data.code == 1) {
                        this.cartPro_list = result.data.data;
                        console.log(this.cartPro_list)
                        var sum = 0
                        for (var i = 0; i < result.data.data.length; i++) {
                            var counts = result.data.data[i].count
                            sum += counts
                        }
                        this.sum = sum
                        // console.log(sum)
                

                    }
                })

            }


        },

    }
</script>
<style>
    .one_110 {
        width: 100%;
        height: 110px;
    }

    .cartWindow {
        width: 1903px;
        height: 800px;
    }

    .cart1 {
        width: 1170px;
        height: 600px;
        border: 1px solid #dbe2ea;
        margin: 0 auto;
        margin-top: 70px;
        position: relative;
        overflow: auto;
    }

    .cart1::-webkit-scrollbar {
        width: 4px;
    }

    .cart1::-webkit-scrollbar-thumb {
        background: #8ea1d4
    }

    .cart1::-webkit-scrollbar-track {
        background: #ffffff
    }


    .cart1 p:nth-child(1) {
        font-size: 30px;
        font-family: "Source Sans Pro", Arial, Helvetica, sans-serif;
        font-weight: 100;
        color: #72849c;
        margin-top: 50px;
        margin-left: 50px;
        margin-bottom: 20px;
    }

    .cart1 div:nth-child(2) {
        width: 1108px;
        height: 1px;
        background-color: #dbe2ea;
        margin: 0 auto;
        margin-bottom: 20px;
    }

    .cart1 p:nth-child(3) {
        font-size: 30px;
        font-family: "Source Sans Pro", Arial, Helvetica, sans-serif;
        font-weight: 100;
        color: #72849c;
        position: absolute;
        top: 0px;
        left: 0px;
        margin-top: 50px;
        margin-left: 800px;
        margin-bottom: 20px;
    }

    .cart1 p:nth-child(4) {
        font-size: 18px;
        font-family: "Source Sans Pro", Arial, Helvetica, sans-serif;
        font-weight: 300;
        color: #72849c;
        position: absolute;
        top: 0px;
        left: 0px;
        margin-top: 110px;
        margin-left: 50px;
        margin-bottom: 20px;
    }

    .cart1 p:nth-child(5) {
        font-size: 18px;
        font-family: "Source Sans Pro", Arial, Helvetica, sans-serif;
        font-weight: 300;
        color: #72849c;
        position: absolute;
        top: 0px;
        left: 0px;
        margin-top: 110px;
        margin-left: 550px;
        margin-bottom: 20px;
    }

    .cart1 p:nth-child(6) {
        font-size: 18px;
        font-family: "Source Sans Pro", Arial, Helvetica, sans-serif;
        font-weight: 300;
        color: #72849c;
        position: absolute;
        top: 0px;
        left: 0px;
        margin-top: 110px;
        margin-left: 750px;
        margin-bottom: 20px;
    }

    .cart1 p:nth-child(7) {
        font-size: 18px;
        font-family: "Source Sans Pro", Arial, Helvetica, sans-serif;
        font-weight: 300;
        color: #72849c;
        position: absolute;
        top: 0px;
        left: 0px;
        margin-top: 110px;
        margin-left: 1050px;
        margin-bottom: 20px;
    }

    .cartPro {
        margin: 0 auto;
        width: 1108px;
        height: 150px;
        border-top: 1px solid #dbe2ea;
        border-bottom: 1px solid #dbe2ea;
        margin-top: 50px;
        position: relative;
    }

    .cartPro li {
        list-style: none;
        display: block;
    }

    .cartPro li img:nth-child(1) {
        width: 90px;
        height: 90px;
        position: absolute;
        top: 30px;
        left: 0px;
    }

    .cartPro li span:nth-child(2) {
        position: absolute;
        top: 40px;
        left: 110px;
        font-size: 28px;
        font-family: "Source Sans Pro", Arial, Helvetica, sans-serif;
        font-weight: 300;
        color: #72849c;
    }

    .cartPro li span:nth-child(3) {
        position: absolute;
        top: 80px;
        left: 110px;
        font-size: 18px;
        font-family: "Source Sans Pro", Arial, Helvetica, sans-serif;
        font-weight: 300;
        color: #72849c;
    }

    .cartPro li span:nth-child(4) {
        position: absolute;
        top: 60px;
        left: 510px;
        font-size: 18px;
        font-family: "Source Sans Pro", Arial, Helvetica, sans-serif;
        font-weight: 300;
        color: #72849c;
    }

    .cartPro li span:nth-child(5) {
        position: absolute;
        top: 60px;
        left: 734px;
        font-size: 18px;
        font-family: "Source Sans Pro", Arial, Helvetica, sans-serif;
        font-weight: 300;
        color: #72849c;
    }

    .cartPro li span:nth-child(6) {
        position: absolute;
        top: 60px;
        left: 980px;
        font-size: 18px;
        font-family: "Source Sans Pro", Arial, Helvetica, sans-serif;
        font-weight: 300;
        color: #72849c;
    }

    .cartPro li span:nth-child(7) {
        position: absolute;
        top: 60px;
        left: 1095px;
        font-size: 18px;
        font-family: "Source Sans Pro", Arial, Helvetica, sans-serif;
        font-weight: 300;
        color: #72849c;
    }

    .buyn {
        background: #8ea1d4;
        color: #ffffff;
        font-size: 16px;
        font-family: "Source Sans Pro", Arial, Helvetica, sans-serif;
        font-weight: 300;
        position: absolute;
        top: 800px;
        left: 1380px;
        width: 150px;
        height: 45px;
    }
</style>