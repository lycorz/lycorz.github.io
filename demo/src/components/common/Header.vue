<template>
    <div class="header">
        <el-radio-group v-model="isCollapse" size="mini" fill="#fff" text-color="#2F3A4A" style="vertical-align: top;margin-top: 16px;margin-right:16px;">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
        <el-menu :default-active="activeIndex" class="el-menu-demo isGoto" background-color="#2F3A4A" text-color="#fff" active-text-color="#E5A23B" mode="horizontal" @select="handleSelect" router>
            <el-menu-item v-for="item in Menus" :index="item.path" :key="item.part">
                {{item.name}}
            </el-menu-item>
        </el-menu>
        <div class="right isGoto">
            <el-button style="background: none;color: #fff;">数据同步</el-button>
            <el-button style="background: none;color: #fff;">进度查询</el-button>
            <el-button icon="el-icon-location" style="background: none;color: #fff;">客户到检</el-button>
        </div>
    </div>
</template>
<script>
    import {mapState, mapMutations,mapActions } from 'vuex'
    export default {
        data() {
            return {
                isCollapse: false
            }
        },
        created() {
            this.getMenu();
        },
        methods:{
            ...mapMutations([
                'changeCollapse',
                'changeActiveIndex'
            ]),
            ...mapActions([
                'getMenu'
            ]),
            handleSelect(key) {
                if (key == this.activeIndex) {
                    return;
                }
                this.$store.commit('changeActiveIndex', key);
            }
        },
        watch: {
             // 侧边栏折叠
            isCollapse(val, oldVal) {
                if (val != oldVal) {
                    this.$store.commit('changeCollapse', val);
                }
            },
            collapse (val, oldVal) {
                if (val != oldVal) {
                    this.isCollapse = this.collapse;
                }
            }
        },
        computed: {
            ...mapState([
                'collapse',
								'Menus',
								'activeIndex'
						])

        }
    }
</script>
