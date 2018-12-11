<template>
    <div class="app-buynow-card">
        <div class="card_name">
            <a href="JavaScript:void(0)" :class="{blue:isblue}">产品信息</a>
            <a href="JavaScript:void(0)">评论</a>
        </div>




    </div>
</template>

<script>
    export default {
        data() {
            return {
                isblue: true
            }
        }
    }
</script>

<style>
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
</style>