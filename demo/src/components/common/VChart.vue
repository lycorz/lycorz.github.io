<template>
  <div class="echartsLine"
       :id="id" style="width:100%;height: 100%"
			 :option="option"></div>
</template>
<script>
import echarts from 'echarts';
export default {
  props: {
    id: {
      type: String
    },
    option: {
      type: Object
    }
  },
  data() {
    return {
			MyEcharts: ''
    };
  },
  watch: {
    option: {
      handler(newVal, oldVal) {
				if(newVal != oldVal && this.MyEcharts) {
           this.MyEcharts.setOption(newVal, true);
				} else {
          this.InitCharts();
        }
      },
      deep: true
    }
  },
  mounted() {
    this.InitCharts();
  },
  methods: {
    InitCharts() {
      this.MyEcharts = echarts.init(document.getElementById(this.id));
			this.MyEcharts.clear();
      this.MyEcharts.setOption(this.option, true);
      window.addEventListener("resize", () => {
        this.MyEcharts.resize();
      });
    }
  }
};
</script>
