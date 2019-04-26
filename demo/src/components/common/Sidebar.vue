<template>
    <div class="sidebar isGoto">
        <div class="sideInfo" :class="{sideMini: collapse}">
            <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1752813724,2836321587&fm=26&gp=0.jpg" alt="">
            <span>用户名</span>
            <div class="right">
                <el-button type="text" style="color: #909398">设置</el-button>
            </div>
        </div>
        <div class="sideBar-con" ref="sideBar">
            <el-menu class="sidebar-el-menu" background-color="#fff" text-color="#606266" active-text-color="#419FFF" unique-opened :default-active="$route.path"  :default-openeds="openList"
                style="border-right: none;" :collapse="collapse" router @select="handleSelect">
                <template v-for="item in sideBarMenus">
                    <template v-if="item.childrenNodes">
                        <el-submenu :index="item.gotoUrl" :key="item.part">
                            <template slot="title">
                                <i :class="item.icon"></i><span slot="title">{{ item.name }}</span>
                            </template>
                            <template v-for="subItem in item.childrenNodes">
                                <el-submenu v-if="subItem.childrenNodes" :index="subItem.gotoUrl" :key="subItem.part">
                                    <template slot="title">{{ subItem.name }}</template>
                                    <el-menu-item v-for="(threeItem,i) in subItem.childrenNodes" :key="i" :index="threeItem.gotoUrl">
                                        {{ threeItem.name }}
                                    </el-menu-item>
                                </el-submenu>
                                <el-menu-item v-else :index="subItem.gotoUrl" :key="subItem.part">
                                    {{ subItem.name }}
                                </el-menu-item>
                            </template>
                        </el-submenu>
                    </template>
                    <template v-else>
                        <el-menu-item :index="item.gotoUrl" :key="item.part">
                            <i :class="item.icon"></i><span slot="title">{{ item.name }}</span>
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
    </div>
</template>

<script>
    import {mapState, mapGetters} from 'vuex'
    export default {
        methods: {
            handleSelect (key) {
               if (key == this.$route.path) {
                    return;
                }
            }
        },
        computed:{
            ...mapState([
                'collapse',
                'sideBarMenus',
                'openList'
            ])
        }
    }
</script>

<style scoped>
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
        flex: 1;
        overflow-y: auto;
    }
    .sideInfo {
        flex: 0 0 57px;
    }
    .copyright {
        flex: 0 0 40px;
    }
</style>
