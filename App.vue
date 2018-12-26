<template>
	<div class="app-container">
		<!-- 顶部导航栏 -->
		<div class="header">
			<a><img src="../public/img/logo.webp" class="logo"></a>

			<ul class="headerlist">
				<li v-for="(item,i) in header_2_listitem_list" :key="i">
					<p to="/" class="list_item" @click="tpTo(i)">{{item}}</p>
				</li>
			</ul>

		</div>


		<!-- router-view 本身就是容器 帮我接收请求-->
		<router-view class="app_router"></router-view>
		<!-- 固定按钮 -->
		<div class="buttons" ref="buttons">
			<div class="smool" @click="left">
				<img src="http://127.0.0.1:3000/img/left.png" id="fx" ref="lefimg">
			</div>
			<div class="biga">
				<button class="biga_btn">购物车</button>
				<a href="">立即注册</a><a href="">立即登录</a>
				<div></div>
				<p>欢迎来到Flux科技~旨在为每一位使用者带来满意的服务和感受~</p>
			</div>
		</div>


		<!-- 底部tabbar -->
		<div class="footer">
			<div class="footer_title"><span>© Copyright 2012 - 2018 | Avada Theme by Theme Fusion | All Rights Reserved | Powered
					by WordPress</span></div>
		</div>


	</div>
</template>

<script>
	export default {
		data() {
			return {
				header_2_listitem_list: ["立即登录", "现在下单", "相关产品", "设计风格", "技术", "特色", "概况"],
				valx:1,
				uname:""
			}
		},
		methods: {
			// 改变立即登录
			changeTitle(){
				var uname = localStorage.getItem('uname')
				console.log(this.header_2_listitem_list[0])
				if(this.header_2_listitem_list[0]=="立即登录"&&uname!=null){
					this.header_2_listitem_list[0] == uname;
				}else if (this.header_2_listitem_list[0]=="立即登录"&&uname==null){
					this.header_2_listitem_list[0] == "立即登录";
				}
			},
			tpTo(i) {
				if (i == 0) {
					this.$router.push("/login")
				} else if (i == 1) {
					this.$router.push("/buynowa/1")
				}else if(i ==6){
					// this.topage11();
					this.$router.push("/")
				}
			},
			left(){
				if(this.valx ==1){
					this.$refs.buttons.style.transform = "translateX(-278px)";
					this.$refs.buttons.style.transitionDuration="0.5s";
					this.valx =0
				}else if(this.valx ==0){
					this.$refs.buttons.style.transform = "translateX(0px)";
					this.$refs.buttons.style.transitionDuration="0.5s";
					this.valx =1
				}
				
			}
		},
		mounted() {
			this.getY()
		},
		created() {
			this.changeTitle();
			console.log(this.header_2_listitem_list[0])
			console.log(localStorage.uname)
		},
	}
</script>

<style>
	/* header*/
	.header {
		width: 100%;
		height: 110px;
		background-color: #ffffff;
		box-shadow: 1px 1px 1px #999999;
		position: fixed;
		top: 0px;
		left: 0px;
		z-index: 30
	}

	.header .headerlist {
		padding-right: 200px;
		position: relative;
		top: -20px;
		width: 1800px
	}

	.header .headerlist li {
		list-style: none;
		float: right;
		padding-right: 2.5%;
	}

	.header .headerlist li .list_item {
		color: #515b69;
		font-size: 18px;
		font-weight: 500
	}

	.header .headerlist li:nth-child(2) .list_item {
		color: #e9686b;
	}

	.logo {
		position: relative;
		top: 30px;
		left: 5%
	}

	.header .headerlist li .list_item:hover {
		color: #35baf2
	}

	.header .headerlist li:nth-child(2) .list_item:hover {
		color: #e9686b;
		font-weight: 600;
	}


	/* 按钮 */
	.buttons {
		position: fixed;
		top: 200px;
		left: 1856px;
		z-index: 30;
		box-shadow: -3px 0px 5px -2px rgba(0, 0, 0, 0.14);
	}

	.buttons .smool {
		width: 52px;
		height: 52px;
		background-color: #f1f1f1;
		border-radius: 6px;
	}

	#fx {
		width: 30px;
		height: 30px;
		position: absolute;
		top: 11px;
		left: 11px;
	}
	.buttons .biga {
		width: 285px;
		height: 185px;
		background-color: #f1f1f1;
		border-radius: 6px;
		position: absolute;
		top:-60px;left:47px;
	}
	.buttons .biga .biga_btn{
        width:220px;height:45px;
		position: absolute;
		top:30px;left:32.5px;
		border:0px;
		background-color: #7f8795;
		color:#ffffff
	}
    
	.buttons .biga a{
		color: rgba(0,0,0,0.55);
	}
	.buttons .biga a:nth-child(2){
		position: absolute;
		top:90px;left:55px;
	}
	.buttons .biga a:nth-child(3){
		position: absolute;
		top:90px;left:160px;
	}
	.buttons .biga div{
		width:220px;height:1px;
		background-color: rgba(0,0,0,0.35);
		position: absolute;
		top:120px;left:35.5px
	}
	.buttons .biga p{
		width:220px;
		position: absolute;
		top:130px;left:35.5px
	}


	/* footer */
	.footer {
		width: 1903px;
		height: 170px;
		background-color: #dfdfdf
	}

	.footer_title {
		width: 800px;
		margin: 0 auto;
	}

	.footer_title span {
		line-height: 100px;
		color: #747474;
		font-weight: 100
	}
    
	.app_router{
		background: #ffffff
	}


</style>