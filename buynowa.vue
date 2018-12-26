<template>
    <div class="app-buynow">
        <div class="one_110"></div>
        <!-- pro -->
        <div class="app-buynow-pro">
            <button id="button_L" @click="left" class="buttonlf" ref="btn1" @mouseover="btnshow" @mouseout="btnnone"><</button>
                    <button id="button_R" @click="right" class="buttonlf" ref="btn2" @mouseover="btnshow" @mouseout="btnnone">></button>

                    <div v-for="(item,i) in list" :key="item.id" id="imgdiv" @mouseover="btnshow" @mouseout="btnnone">
                        <Pic :imgurl="item.img_url" :magurl="item.img_url" id="img1"></Pic>
                    </div>


                    <div class="img_list">
                        <a v-for="(item,i) in list2" :key="item.id" @click="change1(i)">
                            <img :src="item.img_url" id="img2">
                        </a>
                    </div>


                    <p id="pro_name">{{list3.pro_name}}</p>
                    <div id="hr"></div>
                    <p id="pro_container">{{list3.container}}</p>

                    <div class="buy">
                        <span id="old_price">{{list3.old_price}}</span>
                        <span id="new_price">￥{{list3.new_price}}</span><br><br>

                        <span id="sele_choose">颜色:</span>
                        <select class="sel_color">
                            <option value='黑色'>黑色</option>
                            <option value='白色'>白色</option>
                            <option value='绿色'>绿色</option>
                            <option value='蓝色'>蓝色</option>
                        </select><br>

                        <button class="buttonad1" @click="sub">-</button>
                        <input type="number" id="shopinput" value="1" v-model="val">
                        <button class="buttonad1" @click="add">+</button>
                        <button id="appToCart" @click="addCart">加入购物车</button>
                    </div>
        </div>
        <!-- card -->
        <div class="app-buynow-card">
            <div class="card_name">
                <a href="JavaScript:void(0)" @click="blue1()" ref="f1">产品信息</a>
                <a href="JavaScript:void(0)" @click="blue2()" ref="f2">售后服务</a>
            </div>

            <div class="card_cantainer" ref="show1">
                <p class="card_cantainer_title">产品信息</p>
                <span class="card_cantainer_container1">重量</span><span class="card_cantainer_container2">15.0kg</span><br>
                <br>
                <span class="card_cantainer_container3">尺寸</span><span class="card_cantainer_container4">12*13*14厘米</span>
            </div>

            <div class="card_cantainer2" ref="show2">
                <p class="card_cantainer2_title">售后服务</p>
                <span class="card_cantainer2_container1">全国质保</span><span class="card_cantainer2_container2">本产品全国联保，享受三包服务，质保期为：一年质保</span><br>
                <br>
                <span class="card_cantainer2_container3">免费退换</span><span class="card_cantainer2_container4">如因质量问题或故障，凭厂商维修中心或特约维修点的质量检测证明，享受7天内退货</span>
            </div>
        </div>
        <!-- other -->
        <div class="app-buynow-other">
            <p class="app-buynow-other_title">所有产品</p>
            <p class="line1"></p>

            <div class="oth_product">
                <div class="pro_a" @click="jumDetail(i+1)" v-for="(item,i) in ohterimg_list" :key="item.id">
                    <img :src="item.img_url" class="pro_a_img">
                    <p>{{item.pro_name}}</p>
                    <span>{{item.old_price}}</span><span>￥{{item.new_price}}</span>
                    <div></div>
                    <button>查看相信</button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import Pic from "./pro_son/big/big.vue"


    export default {
        data() {
            return {
                id: 1,
                img_id: 1,
                list: [],
                list2: [],
                list3: [],
                isblue: true,
                img_iid: 0,
                ohterimg_list: [],
                val: 1
            }
        },
        components: { Pic },

        created() {
            this.getProImg(),
                this.getProImg2(),
                this.getMore(),
                this.getContainer()
        },
        mounted() {
            this.blue1();
        },
        updated() {
        },

        methods: {
            // +-按钮
            sub() {
                if (this.val > 1) {
                    this.val--
                }
            },
            add() {
                if (this.val <= 998) {
                    this.val++
                }
            },
            // 加入购物车////////////////////////////////////////////
            addCart(){
            //获取参数 用户编号 商品编号 数量
            },
            left() {
                if (this.id > 1) {
                    this.id--;
                } else {
                    this.id = 4
                }
                this.getProImg()
            },

            right() {
                if (this.id < 4) {
                    this.id++;
                } else {
                    this.id = 1
                }
                this.getProImg()
            },

            getProImg() {
                var id = this.id;
                var img_id = this.img_id;
                var url = "http://127.0.0.1:3000/proimg?id=" + id + "&img_id=" + img_id;
                this.axios.get(url).then(result => {
                    var rows = result.data.data;
                    this.list = rows;
                })
            },

            getProImg2() {
                var img_id = this.img_id;
                var url = "http://127.0.0.1:3000/proimga?img_id=" + img_id;
                this.axios.get(url).then(result => {
                    var rows = result.data.data;
                    this.list2 = rows;
                })
            },

            getContainer() {
                var id = this.img_id;
                var url = "http://127.0.0.1:3000/getContainer?id=" + id;
                this.axios.get(url).then(result => {
                    var rows = result.data.data[0];
                    this.list3 = rows;

                })
            },

            change1(i) {
                this.id = i + 1;
                this.getProImg()
            },
            btnshow() {
                this.$refs.btn1.style.opacity = 1;
                this.$refs.btn2.style.opacity = 1;
            },
            btnnone() {
                this.$refs.btn1.style.opacity = 0;
                this.$refs.btn2.style.opacity = 0;
            },


            blue1() {
                this.$refs.f1.className = "blue";
                this.$refs.f2.className = "";
                this.$refs.show1.style.display = "block"
                this.$refs.show2.style.display = "none"
            },
            blue2() {
                this.$refs.f2.className = "blue";
                this.$refs.f1.className = "";
                this.$refs.show1.style.display = "none";
                this.$refs.show2.style.display = "block"
            },


            jumDetail(i) {
                this.$router.push("/buynowa/" + i)
                this.img_iid = i;
                this.img_id = i;
                this.getProImg();
                this.getProImg2();
                this.getContainer();
                //  console.log(this.img_iid)
                //  console.log(this.$store.commit.pid)
            },

            getMore() {
                // var pid = this.img_iid;
                var url = "http://127.0.0.1:3000/getmore";
                this.axios.get(url).then(result => {
                    var rows = result.data.data;
                    this.ohterimg_list = rows;
                    //  console.log(this.ohterimg_list)
                })
            },

        }
    }
</script>

<style>
    .one_110 {
        width: 100%;
        height: 110px;
    }

    .app-buynow {
        background: #ffffff
    }

    /* pro部分 */
    .app-buynow-pro {
        width: 100%;
        height: 700px;
        background: #ffffff;
        position: relative;
    }

    #htb {
        width: 500px;
        height: 500px;
        position: absolute;
        top: 50px;
        left: 350px;
    }

    #btnbg {
        width: 500px;
        height: 500px;
        position: absolute;
        top: 50px;
        left: 350px;
    }

    .app-buynow-pro #imgdiv #img1 {
        width: 500px;
        height: 500px;
        position: absolute;
        top: 50px;
        left: 350px;
    }

    .app-buynow-pro .buttonlf {
        width: 30px;
        height: 130px;
        z-index: 22;
        background: rgba(0, 0, 0, 0.4);
        color: #ffffff;
        border: 0px;
        transition: 0.5s;
    }

    .app-buynow-pro #button_L {
        position: absolute;
        top: 200px;
        left: 350px;
        opacity: 0;
        transition: 0.5s;
    }

    .app-buynow-pro #button_R {
        position: absolute;
        top: 200px;
        left: 820px;
        opacity: 0;
        transition: 0.5s;
    }

    .app-buynow-pro .img_list {
        width: 500px;
        height: 100px;
        position: absolute;
        top: 550px;
        left: 350px;
        display: flex;
        justify-content: space-between
    }

    .app-buynow-pro .img_list a #img2 {
        width: 100px;
        height: 100px;
        opacity: 0.7
    }

    .app-buynow-pro .img_list a #img2:hover {
        opacity: 1
    }

    #pro_name {
        font-size: 52px;
        font-weight: 100;
        color: #7f8795;
        position: absolute;
        top: 100px;
        left: 950px;
    }

    #hr {
        width: 640px;
        height: 8px;
        border-top: 1px solid #8da3d4;
        border-bottom: 1px solid #8da3d4;
        position: absolute;
        top: 180px;
        left: 950px;
    }

    #pro_container {
        font-family: "Source Sans Pro", Arial, Helvetica, sans-serif;
        width: 640px;
        font-size: 22px;
        font-weight: 100;
        color: #7f8795;
        position: absolute;
        top: 220px;
        left: 950px;
        line-height: 40px;
    }

    .buy {
        position: absolute;
        top: 460px;
        left: 950px;

    }

    #shopinput {
        width: 53px;
        height: 53px;
        text-align: center;
        border-radius: 0px;
        border-left: none;
        border-right: none
    }

    .buttonad1 {
        width: 53px;
        height: 53px;
        background: #dbe2ea;
        border-radius: 0px;
        color: #666666
    }

    .buttonad1:hover {
        background: #ffffff;
        border-radius: 0px;
    }

    #appToCart {
        background: #72849c;
        color: #ffffff;
        width: 180px;
        height: 53px;
        margin-left: 30px;
        font-size: 22px;
        font-weight: 100
    }

    #appToCart:hover {
        background: #35baf2
    }

    #old_price {
        font-size: 22px;
        font-weight: 100;
        color: #999999;
        text-decoration: line-through
    }

    #new_price {
        margin-left: 10px;
        color: #35baf2
    }

    #sele_choose {
        font-size: 22px;
        font-weight: 100;
        color: #999999;
    }

    .sel_color {
        font-size: 22px;
        font-weight: 100;
        width: 460px;
        height: 45px;
        background: #ffffff;
        border: 1px solid #999999;
        color: #999999;
    }

    .sel_color option {
        font-size: 22px;
        font-weight: 100;
        width: 460px;
        height: 45px;
        border: 1px solid #dbe2ea;
        color: #999999;
    }

    /* CARD部分 */

    /* 绑定属性 */
    .blue {
        color: #35baf2 !important
    }



    /*常规属性*/
    .app-buynow-card {
        position: relative
    }

    .card_name {
        height: 500px;
    }

    .card_name a {
        color: #72849c;
        font-size: 22px;
        font-family: "Source Sans Pro", Arial, Helvetica, sans-serif;
        font-weight: 100;
        width: 220px;
        height: 50px;
        border-bottom: 1px solid #dbe2ea
    }

    .card_name a:nth-child(1) {
        position: absolute;
        top: 100px;
        left: 350px;
    }

    .card_name a:nth-child(2) {
        position: absolute;
        top: 180px;
        left: 350px;
    }

    .card_name a:hover {
        color: #35baf2
    }

    .app-buynow-card .card_cantainer {
        width: 900px;
        height: 45%;
        border: 1px solid #dbe2ea;
        position: absolute;
        top: 100px;
        left: 650px;
    }

    .app-buynow-card .card_cantainer .card_cantainer_title {
        text-align: left;
        padding-left: 50px;
        color: #72849c;
        font-family: "Source Sans Pro", Arial, Helvetica, sans-serif;
        font-weight: 100;
        line-height: 100px;
        font-size: 30px;
        margin-bottom: 0
    }

    .app-buynow-card .card_cantainer span {
        color: #72849c;
        padding-left: 50px;
    }

    .app-buynow-card .card_cantainer .card_cantainer_container1 {
        font-size: 22px;
        font-weight: 600;
    }

    .app-buynow-card .card_cantainer .card_cantainer_container2 {
        font-size: 16px;
        font-weight: lighter;
        padding-left: 100px;
    }

    .app-buynow-card .card_cantainer .card_cantainer_container3 {
        font-size: 22px;
        font-weight: 600;
    }

    .app-buynow-card .card_cantainer .card_cantainer_container4 {
        font-size: 16px;
        font-weight: lighter;
        padding-left: 100px;
    }




    .app-buynow-card .card_cantainer2 {
        width: 900px;
        height: 45%;
        border: 1px solid #dbe2ea;
        position: absolute;
        top: 100px;
        left: 650px;
    }

    .app-buynow-card .card_cantainer2 .card_cantainer2_title {
        text-align: left;
        padding-left: 50px;
        color: #72849c;
        font-family: "Source Sans Pro", Arial, Helvetica, sans-serif;
        font-weight: 100;
        line-height: 100px;
        font-size: 30px;
        margin-bottom: 0
    }

    .app-buynow-card .card_cantainer2 span {
        color: #72849c;
        padding-left: 50px;
    }

    .app-buynow-card .card_cantainer2 .card_cantainer2_container1 {
        font-size: 22px;
        font-weight: 600;
    }

    .app-buynow-card .card_cantainer2 .card_cantainer2_container2 {
        font-size: 16px;
        font-weight: lighter;
        padding-left: 100px;
    }

    .app-buynow-card .card_cantainer2 .card_cantainer2_container3 {
        font-size: 22px;
        font-weight: 600;
    }

    .app-buynow-card .card_cantainer2 .card_cantainer2_container4 {
        font-size: 16px;
        font-weight: lighter;
        padding-left: 100px;
    }

    /* other部分 */
    .app-buynow-other {
        background: #ffffff;
        width: 100%;
        height: 750px;
        position: relative;
    }

    .app-buynow-other .app-buynow-other_title {
        color: #72849c;
        font-size: 30px;
        font-family: "Source Sans Pro", Arial, Helvetica, sans-serif;
        font-weight: 100;
        margin-bottom: 0px;
        position: absolute;
        top: 0px;
        left: 350px;
    }

    .app-buynow-other .line1 {
        width: 63.15%;
        height: 1px;
        background: #d4d4d4;
        position: absolute;
        top: 60px;
        left: 350px;
    }

    .app-buynow-other .oth_product {
        width: 63.15%;
        height: 400px;
        position: absolute;
        top: 100px;
        left: 350px;
        display: flex;
        justify-content: space-between
    }

    .app-buynow-other .oth_product .pro_a {
        width: 264px;
        height: 100%;
        background: #ffffff;
        border: 1px solid #d4d4d4
    }

    .app-buynow-other .oth_product .pro_a .pro_a_img {
        width: 262px;
        height: 262px;
    }

    .app-buynow-other .oth_product .pro_a p {
        font-family: "Source Sans Pro", Arial, Helvetica, sans-serif;
        color: #72849c;
        font-size: 24px;
        font-weight: lighter;
        padding-left: 10px;
    }

    .app-buynow-other .oth_product .pro_a span:nth-child(3) {
        font-size: 18px;
        font-weight: 100;
        color: #999999;
        text-decoration: line-through;
        padding-left: 10px;
    }

    .app-buynow-other .oth_product .pro_a span:nth-child(4) {
        font-size: 14px;
        font-weight: 100;
        color: #35baf2;
        padding-left: 10px;
    }

    .app-buynow-other .oth_product .pro_a div {
        width: 242px;
        height: 5px;
        border-top: 1px solid #d6d6d6;
        border-bottom: 1px solid #d6d6d6;
        margin: 10px;
    }

    .app-buynow-other .oth_product .pro_a button {
        border: 0px;
        color: #72849c;
        margin-left: 180px;
    }
</style>