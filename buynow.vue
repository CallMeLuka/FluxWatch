<template>
    <div class="app-buynow">
        <div class="one_110"></div>
        <Pro></Pro>
        <Card></Card>
    </div>
</template>

<script>
    import Pro from "./pro_son/pro.vue"
    import Card from "./pro_son/card.vue"

    export default {
        data(){
            return{
			}
		},
        components:{Pro,Card}
		
    }
</script>

<style>
    .one_110{
		width:100%;
		height:110px;
	}
</style>