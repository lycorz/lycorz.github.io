<template>
  <div class="content MGManage">
    <div class="topTitle">
      <span>报告管理</span>
      <div class="right">
        <el-button>生成报告</el-button>
        <el-button>打印报告</el-button>
        <el-button>批量导出</el-button>
        <el-button>发送短信</el-button>
        <el-button>领取报告</el-button>
      </div>
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
        <el-select v-model="searchParams.ifPrint" placeholder="是否打印" clearable>
          <el-option label="是" :value="true"></el-option>
          <el-option label="否" :value="false"></el-option>
        </el-select>
        <el-select v-model="searchParams.ifExport" placeholder="是否导出" clearable>
          <el-option label="是" :value="true"></el-option>
          <el-option label="否" :value="false"></el-option>
        </el-select>
        <el-select v-model="searchParams.ifMark" placeholder="是否生成" clearable>
          <el-option label="是" :value="true"></el-option>
          <el-option label="否" :value="false"></el-option>
        </el-select>
        <el-select v-model="searchParams.ifSend" placeholder="是否发送短信" clearable>
          <el-option
            v-for="item in ifSend"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          ></el-option>
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
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%;" v-loading="loading" ref="multipleTable">
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column prop="customerName" label="姓名"></el-table-column>
      <el-table-column prop="sex" label="性别"></el-table-column>
      <el-table-column prop="cardNum" label="体检卡号"></el-table-column>
      <el-table-column prop="idCardNum" label="身份证号"></el-table-column>
      <el-table-column prop="tele" label="手机号"></el-table-column>
      <el-table-column prop="unitName" label="单位"></el-table-column>
      <el-table-column prop="deptName" label="部门"></el-table-column>
      <el-table-column prop="createTime" label="生成时间"></el-table-column>
      <el-table-column prop="ifTake" label="领取"></el-table-column>
      <el-table-column prop="takeType" label="领取方式">
				<template  slot-scope="scope">
					<el-tooltip class="item" effect="dark" placement="top" style="border: none;">
						<div slot="content">{{scope.row.remark}}</div>
						<el-button>{{scope.row.takeType}}</el-button>
					</el-tooltip>
				</template>
			</el-table-column>
      <el-table-column prop="ifPrint" label="打印">
        <template slot-scope="scope">
          {{scope.row.ifPrint}}
          <span v-if="scope.row.ifPrint === '是'">x{{scope.row.printCount}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="ifExport" label="导出">
        <template slot-scope="scope">
          {{scope.row.ifExport}}
          <span v-if="scope.row.ifExport === '是'">x{{scope.row.exportCount}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="ifSend" label="短信"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="preview(scope.row)">预览</el-button>
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
    <el-dialog
      title="领取报告"
      :visible.sync="getBGModal"
      :close-on-click-modal="false"
      width="605px"
      class="bgModal"
    >
      <ul class="modal-con">
        <li class="item">
          <span>领取人信息：</span>
          <div class="item-list">
            <el-input></el-input>
          </div>
        </li>
        <li class="item">
          <span>领取方式：</span>
          <div class="item-list">
            <el-select
              v-model="searchParams.OrderType"
              placeholder="订单类型"
              style="padding-right: 0;"
            >
              <el-option
                v-for="item in timeType"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </li>
        <li class="item">
          <span>手机号：</span>
          <div class="item-list">
            <el-input></el-input>
          </div>
        </li>
        <li class="item">
          <span>身份证号：</span>
          <div class="item-list">
            <el-input></el-input>
          </div>
        </li>
        <li class="item" style="width: 100%">
          <span>备注信息：</span>
          <div class="item-list" style="width: 100%">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容"></el-input>
          </div>
        </li>
      </ul>
      <div slot="footer" class="dialog-footer">
        <el-button @click="getBGModal = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import moment from "moment";
export default {
  name: "BGManage",
  data() {
    return {
      getBGModal: false,
      searchParams: {
        condition: "",
        ifPrint: "",
        ifExport: "",
        ifMark: true,
        ifSend: "", //0 未发送 =1 已发送 =2 发送失败
        timeType: "", //1 开始时间，=2审核时间
        beginTime: "",
        endTime: "",
        pageIndex: 1,
        pageSize: 10
      },
      loading: false,
      total: 3,
      timeRange: [moment().format(), moment().format()],
      ifSend: [],
      timeType: [],
      tableData: [],
      multipleTable: []
    };
	},
	created(){
		this.getTypeEnum()
	},
  methods: {
    // 反选
    toggleSelection() {
      if (this.tableData) {
        this.tableData.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    // 获取列表信息
    getData() {
      this.loading = true;
      this.searchParams.beginTime = this.timeRange[0];
      this.searchParams.endTime = this.timeRange[1];
      this.$axios
        .post(this.$api.ReportQuery, this.searchParams)
        .then(res => {
          if (res.data.status === 1 && res.data.entity) {
            this.tableData = res.data.entity.reportMessages;
            this.total = res.data.entity.dataNum;
          } else {
            this.$message.error(res.data.$message);
          }
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          this.$message.error(err.data.$message);
        });
		},
		//获取领取方式
		getTypeEnum(){
			this.$axios.get(this.$api.ReturnTakeTypeEnum).then(res => {
				if (res.data.entity && res.data.status === 1) {

				} else {
					this.$message.error(res.data.message);
				}
			}).catch(err => {
				this.$message.error(err.data.message);
			})
			this.$axios.get(this.$api.ReturnReportTimeTypeEnum).then(res => {
				if (res.data.entity && res.data.status === 1) {
					this.timeType = res.data.entity;
				} else {
					this.$message.error(res.data.message);
				}
			}).catch(err => {
				this.$message.error(err.data.message);
			})
			this.$axios.get(this.$api.ReturnSendStatusEnum).then(res => {
				if (res.data.entity && res.data.status === 1) {
					this.ifSend = res.data.entity;
				} else {
					this.$message.error(res.data.message);
				}
			}).catch(err => {
				this.$message.error(err.data.message);
			})
		},
    //预览
    preview(data) {},
    // 处理分页fn
    handleCurrentChange(val) {
      this.searchParams.pageIndex = val;
    },
    handleSizeChange(val) {
      this.searchParams1.PageSize = val;
      this.getData();
    }
  }
};
</script>
<style>
.MGManage .propleSearch .el-select {
  display: inline-block;
  width: 120px;
  margin-left: 16px;
}
.MGManage .bgModal .el-input--suffix .el-input__inner {
  padding-right: 13px;
}
.MGManage .modal-con .item span {
  width: 75px;
}
</style>

