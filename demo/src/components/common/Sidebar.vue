<template>
    <div class="sidebar">
        <div class="sideInfo" :class="{sideMini: collapse}">
					<i class="toggle-icon" :class="[collapse ? 'el-icon-s-unfold' : 'el-icon-s-fold']" @click="changeCollapse(!collapse)"></i>
					<span>{{USERINFO.loginName || '未登录'}}</span>
					<div class="right">
						<img :src="USERINFO.photo" alt="" v-if="USERINFO.photo">
						<img src="../../assets/img/default.jpg" alt="" v-else>
					</div>
        </div>
        <div class="sideBar-con" ref="sideBar">
            <el-menu class="sidebar-el-menu" background-color="#fff" text-color="#606266" active-text-color="#419FFF" unique-opened :default-active="$route.path"  :default-openeds="openList"
                style="border-right: none;" :collapse="collapse" router @select="handleSelect">
                <template v-for="item in sideBarMenus">
                    <template v-if="item.childrenNodes.length">
                        <el-submenu :index="item.url" :key="item.url">
                            <template slot="title">
                                <i :class="item.icon"></i><span slot="title">{{ item.funcName }}</span>
                            </template>
                            <template v-for="subItem in item.childrenNodes">
                                <el-submenu v-if="subItem.childrenNodes.length" :index="subItem.url" :key="subItem.url">
                                    <template slot="title">{{ subItem.funcName }}</template>
                                    <el-menu-item v-for="(threeItem,i) in subItem.childrenNodes" :key="i" :index="threeItem.url">
                                        {{ threeItem.funcName }}
                                    </el-menu-item>
                                </el-submenu>
                                <el-menu-item v-else :index="subItem.url" :key="subItem.url">
                                    {{ subItem.funcName }}
                                </el-menu-item>
                            </template>
                        </el-submenu>
                    </template>
                    <template v-else>
                        <el-menu-item :index="item.url" :key="item.url">
                            <i :class="item.icon"></i><span slot="title">{{ item.funcName }}</span>
                        </el-menu-item>
                    </template>
                </template>
            </el-menu>
        </div>
        <div class="copyright" :class="{sideMini: collapse}">
            <span>当前版本：V3.0</span>
            <div class="right">
                <a href="#" style="color: #F56C6C;">【立即升级】</a>
            </div>
            <p>V3.0</p>
        </div>
				<div class="isGoto" @click="GotoHandle" v-show="!isGoto"></div>
    </div>
</template>

<script>
import consts from '../../utils/const'
    import {mapState, mapGetters,mapMutations} from 'vuex'
    export default {
        methods: {
					...mapMutations([
						'GotoHandle',
						'changeCollapse'
					]),
					handleSelect (key) {
							if (key == this.$route.path) {
									return;
							}
					}
				},
				created() {
					let TWidth = window.innerWidth;
					if(TWidth < 1200) {
						this.changeCollapse(true);
					}
				},
        computed:{
					...mapState([
							'collapse',
							'sideBarMenus',
							'openList',
							'isGoto',
							'USERINFO'
					])
        }
    }
</script>

<style scoped>
	.toggle-icon {
		font-size: 18px;
		padding: 0 4px;
		cursor: pointer;
	}
	.sidebar{
			display: flex;
			flex-direction: column;
			position: absolute;
			left: 0;
			top: 60px;
			bottom:0;
			overflow-y: scroll;
			border-right: 1px solid #DCDFE5;
	}
	.sidebar::-webkit-scrollbar{
			width: 0;
	}
	.sidebar-el-menu:not(.el-menu--collapse){
			width: 240px;
	}
	.sidebar > ul {
			height:100%;
	}
	.sideBar-con {
			max-width: 240px;
			flex: 1;
			overflow-y: auto;
	}
	.sideInfo {
			flex: 0 0 48px;
	}
	.copyright {
			flex: 0 0 40px;
	}
</style>
