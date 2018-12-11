<template>
    <div class="app-home">
	    <div class="one_110"></div>
	    <div class="banner"  @mousemove='mouse1'>
		    <img src="../../img/watch_product.webp" id="watch">
			<img src="../../img/glow_shape_1.webp" id="paopao1">
			<img src="../../img/glow_shape_1.webp" id="paopao2">
			<p id="banner_title" ref="mystyle1">Flux Smart</p>
			<p id="banner_title2">Flux科技改变您的生活</p>
			<a href="#" id="banner_button"><button>立即抢购</button></a>	
			
		</div>
	</div>
</template>

<script>
	export default {
	    data: function(){
	        return {
				x:0,
				y:0,
				
	        }
	    },
		methods:{
            mouse1(e){
				
            },	
		    mystyle1(){
			const self = this;
			this.$refs.mystyle1.style.color = '#c40000';
		    }
        },
	    created() {
            this.mystyle1()
		    },
	    }
    

</script>

<style>
    .one_110{
		width:100%;
		height:110px;
	}
	/* banner*/ 
	.banner{
		width:100%;height:700px;
		background-image:url(../../img/bannerbg.webp);
		overflow: hidden;
		position:relative;
	}
	.banner #watch{
		position:relative;
		top:-100px;left:900px;
		z-index:3
	}
	 #paopao1{
		position:relative;
		top:-500px;left:0px;
	}
	 #paopao2{
		position:relative;
		top:-1100px;left:-300px;
		width:600px;
	}
	#banner_title{
		font-size:80px;
		font-weight:600;
		color:#ffffff;
		position:absolute;
		top:200px;left:350px;
	}
	#banner_title2{
		font-size:50px;
		font-weight:100;
		color:#ffffff;
		position:absolute;
		top:280px;left:352px;
	}
	#banner_button{
		position:absolute;
		top:350px;left:352px;
	}
	#banner_button button{
        width:300px;height:60px;
		background:#35baf2;
		border:0px;
		font-size:20px;
		font-weight:500;
		color:#ffffff
	}



</style>
