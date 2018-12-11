<template>
    <div class="app-buynow-pro">
        <button id="button_L" @click="left" class="buttonlf"><</button>
                <button id="button_R" @click="right" class="buttonlf">></button>
                <img :src="item.img_url" v-for="(item,i) in list" :key="item.id" id="img1">

                <div class="img_list">
                    <a v-for="(item,i) in list2" :key="item.id" @click="change1(i)">
                        <img :src="item.img_url" id="img2">
                    </a>
                </div>


                <p id="pro_name">Flux Watch</p>
                <div id="hr"></div>
                <p id="pro_container">Flux Watch除了一些标准配置(如NFC)外，还将拥有传感器功能.不仅如此，Flux Watch还将拥有一个连Apple Watch都没有实现的功能，那就是利用脉搏波特征实现身份识别。</p>

                <div class="buy">
                    <span id="old_price">￥1999</span>
                    <span id="new_price">￥999</span><br><br>
                    <button class="buttonad1">-</button>
                    <input type="number" id="shopinput" placeholder="1">
                    <button class="buttonad1">+</button>
                    <button id="appToCart">加入购物车</button>
                </div>


                <select class="sel_color">
                    <option value='黑色'>黑色</option>
                    <option value='白色'>白色</option>
                    <option value='绿色'>绿色</option>
                    <option value='蓝色'>蓝色</option>
                </select>


    </div>
</template>

<script>
    export default {
        data() {
            return {
                id: 1,
                img_id: 1,
                list: [],
                list2: []
            }
        },

        methods: {
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
                var url = "http://127.0.0.1:3000/proimg?id=" + id;
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
                    console.log(this.list2)
                })
            },

            change1(i) {
                this.id = i + 1;
                this.getProImg()
            }

        },
        created() {
            this.getProImg(),
                this.getProImg2()
        }

    }
</script>

<style>
    .app-buynow-pro {
        width: 100%;
        height: 700px;
        background: #ffffff;
        position: relative;
    }

    .app-buynow-pro #img1 {
        width: 500px;
        height: 500px;
        position: absolute;
        top: 50px;
        left: 350px
    }

    .app-buynow-pro .buttonlf {
        width: 30px;
        height: 130px;
        z-index: 8;
        background: rgba(0, 0, 0, 0.4);
        color: #ffffff;
        border: 0px;
        transition: 0.5s;
    }

    .app-buynow-pro #button_L {
        position: absolute;
        top: 200px;
        left: 350px
    }

    .app-buynow-pro #button_R {
        position: absolute;
        top: 200px;
        left: 820px
    }

    .app-buynow-pro .img_list {
        width: 500px;
        height: 100px;
        position: absolute;
        top: 520px;
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
        top: 400px;
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

    .sel_color {
        position: absolute;
        top: 600px;
        left: 950px;
        width:460px;height:45px;
        background:#ffffff;
        border:1px solid #999999
    }
    .sel_color option{
        width:460px;height:45px;
        background:#999999;
        border:1px solid #dbe2ea
    }
</style>