<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content-box" :class="{'content-collapse':collapse}">
            <transition name="move" mode="out-in">
                <keep-alive :include="tagsList">
                    <router-view></router-view>
                </keep-alive>
            </transition>
        </div>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    import {mapState} from 'vuex'
    export default {
			name: 'Home',
			data(){
					return {
							tagsList: []
					}
			},
			components:{
					vHead, vSidebar
			},
			computed: {
					...mapState([
							'collapse'
					])
			}
    }
</script>
