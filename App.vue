<template>
 <div class="app-container">
   <!-- 顶部导航栏 -->
   <div class="header">
      <a><img src="../public/img/logo.webp" class="logo"></a>

	    <ul class="headerlist">
          <li v-for="(item,i) in header_2_listitem_list" :key="i" >
		      <router-link to="home" class="list_item">{{item}}</router-link>
		  </li>
       </ul>

	 </div>

	 
   <!-- router-view 本身就是容器 帮我接收请求-->
   <router-view class="app_router"></router-view>
   <!-- 底部tabbar -->
   <div class="footer">
       <div class="footer_title"><span>© Copyright 2012 - 2018   |   Avada Theme by Theme Fusion   |   All Rights Reserved   |   Powered by WordPress</span></div>
   </div>

    
 </div>
</template>

<script>
    export default {
        data(){
            return{
				header_2_listitem_list:["立即登录","现在下单","相关产品","设计风格","技术","特色","概况"]
			}
		},
		
    }
</script>

<style>
/* header*/ 
    .header{
		width:100%;
		height:110px;
		background-color:#ffffff;
		box-shadow: 1px 1px 1px #999999;
		position: fixed;
		top:0px;left:0px;
		z-index:10
	}
	.header .headerlist{
		padding-right:200px;
		position:relative;
		top:-20px;
		width:1800px
	}
	.header .headerlist li {
		list-style:none;
		float:right;
		padding-right:2.5%;
	}
	.header .headerlist li .list_item{
		color:#515b69;
		font-size:18px;
		font-weight:500
	}
    .header .headerlist li:nth-child(2) .list_item{
		color:#e9686b;
	}
	
	.logo{
		position: relative;
	top:30px;left:5%
	}

    .header .headerlist li .list_item:hover{
		color:#35baf2
	}
	.header .headerlist li:nth-child(2) .list_item:hover{
		color:#e9686b;
		font-weight:600;
	}
	/* footer */ 
	.footer{
		width:1903px;height:170px;
		background-color:#dfdfdf
	}
	.footer_title{
		width:800px;
		margin: 0 auto;
	}
	.footer_title span{
		line-height:100px;
		color:#747474;
		font-weight:100                        
	}
	

	
</style>
