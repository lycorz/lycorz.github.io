<template>
<el-dialog
  title="图片"
  :visible.sync="dialogVisible"
    :modal="modal"
   width="500px"
   append-to-body>
  <img :src="src">
</el-dialog>

</template>

<script>
export default {
  data() {
    return {
        modal:false,
        dialogVisible: false,
        src:""
    };
  }
};
</script>

<style scoped>
img{
    width: 440px;
    height: 400px;
}
</style>
