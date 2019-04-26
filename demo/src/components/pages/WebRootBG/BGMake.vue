<template>
  <div class="content BGMake">
    <div class="topTitle">
      <span>短信管理</span>
    </div>
    <div class="peopleData">
      <div class="propleSearch">
        <el-input
          placeholder="请搜索"
          v-model="searchParams.condition"
          class="arcRadius"
          style="width: 150px;"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-select v-model="searchParams.ifPrint" placeholder="发送状态" clearable>
          <el-option label="是" :value="true"></el-option>
          <el-option label="否" :value="false"></el-option>
        </el-select>
        <el-select v-model="searchParams.ifExport" placeholder="短信类型" clearable>
          <el-option label="是" :value="true"></el-option>
          <el-option label="否" :value="false"></el-option>
        </el-select>
        <el-select v-model="searchParams.timeType" placeholder="时间类型" clearable>
          <el-option
            v-for="item in timeType"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
        <div style="display: inline-block;margin: 0 16px;">
          <el-date-picker
            v-model="timeRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </div>
        <el-button @click="getData">查询</el-button>
        <div class="right">
          <el-button @click="getData" type="primary">批量发送</el-button>
        </div>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%;" v-loading="loading" ref="multipleTable">
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column prop="customerName" label="客户姓名"></el-table-column>
      <el-table-column prop="cardNum" label="卡号"></el-table-column>
      <el-table-column prop="tele" label="手机号"></el-table-column>
      <el-table-column prop="ifSend" label="短信类型"></el-table-column>
      <el-table-column prop="ifSend" label="短信内容"></el-table-column>
      <el-table-column prop="createTime" label="发送时间"></el-table-column>
      <el-table-column prop="createTime" label="发送状态"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="preview(scope.row)">发送</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="fixBottom">
      <el-button type="text" @click="toggleSelection()">反选</el-button>
      <span class="subitem">
        合计：
        <span class="labelColor ftArial"></span>
      </span>
      <span class="subitem">
        选中：
        <span class="labelColor ftArial"></span>
      </span>
      <div class="right">
        <el-pagination
          @current-change="handleCurrentChange"
          layout="total,sizes, prev, pager, next"
          :total="total"
          :page-sizes="[10,20,50, 100]"
          @size-change="handleSizeChange"
          :current-page="searchParams.PageIndex"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "BGMake"
};
</script>
<style scoped>
</style>

