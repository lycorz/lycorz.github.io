<template>
  <div class="header">
    <el-radio-group
      v-model="isCollapse"
      size="mini"
      fill="#fff"
      text-color="#2F3A4A"
      style="vertical-align: top;margin-top: 16px;margin-right:16px;display: none"
    >
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      background-color="#2F3A4A"
      text-color="#8F8F8F"
      active-text-color="#fff"
      mode="horizontal"
      @select="handleSelect"
      router
    >
      <el-menu-item v-for="item in Menus" :index="item.path" :key="item.part">{{item.name}}</el-menu-item>
    </el-menu>
    <div class="right">
      <el-button style="background: none;color: #fff;">数据同步</el-button>
      <el-button style="background: none;color: #fff;" @click="process">进度查询</el-button>
      <el-button icon="el-icon-location" style="background: none;color: #fff;" @click="checkin">客户到检</el-button>
    </div>
    <div class="isGoto" @click="GotoHandle" v-show="!isGoto"></div>
    <process ref="process"></process>
    <checkin ref="checkin"></checkin>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
// 引入进度查询界面
import process from "@/components/pages/WebRootFZ/Process.vue";
import checkin from "@/components/pages/WebRootFZ/CheckIn.vue";
export default {
  components: { process, checkin },
  data() {
    return {
      isCollapse: false
    };
  },
  created() {
    this.getMenu(this.USERINFO.operatorCode);
  },
  methods: {
    ...mapMutations(["changeCollapse", "changeActiveIndex", "GotoHandle"]),
    ...mapActions(["getMenu"]),
    handleSelect(key) {
      if (key == this.activeIndex) {
        return;
      }
      this.$store.commit("changeActiveIndex", key);
    },
    process() {
      this.$refs.process.processShow = true;
    },
    checkin() {
      this.$refs.checkin.checkInVisible = true;
    }
  },
  watch: {
    // 侧边栏折叠
    isCollapse(val, oldVal) {
      if (val != oldVal) {
        this.$store.commit("changeCollapse", val);
      }
    },
    collapse(val, oldVal) {
      if (val != oldVal) {
        this.isCollapse = this.collapse;
      }
    }
  },
  computed: {
    ...mapState(["collapse", "Menus", "activeIndex", "isGoto", "USERINFO"])
  }
};
</script>
