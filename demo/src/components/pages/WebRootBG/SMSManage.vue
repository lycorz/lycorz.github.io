<template>
  <div class="content SMSManage">
    <div class="topTitle">
      <span>短信管理</span>
    </div>
    <div class="peopleData">
      <div class="propleSearch">
        <el-input
          placeholder="请搜索"
          v-model="params.Condition"
          class="arcRadius"
          style="width: 150px;"
					@keyup.enter.native="getData(true)"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-select v-model="params.SendStatus" placeholder="发送状态" clearable>
          <el-option
            v-for="item in sendStatus"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select v-model="params.SmsType" placeholder="短信类型" clearable>
          <el-option
            v-for="item in SMSTypes"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select v-model="params.SmsTimeType" placeholder="时间类型" clearable>
          <el-option
            v-for="item in SMSTimeTypes"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
        <div style="display: inline-block;margin: 0 16px;">
          <el-date-picker
            v-model="params.timeRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
						:picker-options="pickerOptions"
          ></el-date-picker>
        </div>
        <el-button @click="getData(true)">查询</el-button>
				<div class="right">
					<el-button @click="sendSMS" type="primary">批量发送</el-button>
				</div>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%;" v-loading="loading" ref="multipleTable" @selection-change="handleSelectionChange" @row-click="clickRow2">
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column prop="customerName" label="客户姓名"></el-table-column>
      <el-table-column prop="cardNum" label="卡号"></el-table-column>
      <el-table-column prop="tele" label="手机号"></el-table-column>
      <el-table-column prop="smsType" label="短信类型"></el-table-column>
      <el-table-column prop="sendContent" label="短信内容"></el-table-column>
      <el-table-column prop="sendTime" label="发送时间">
				<template slot-scope="scope">
          {{scope.row.sendTime | formatDate('YYYY-MM-DD')}}
        </template>
			</el-table-column>
      <el-table-column prop="sendStatus" label="发送状态"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="sendSMS(scope.row)">发送</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="fixBottom">
      <el-button type="text" @click="toggleSelection()">反选</el-button>
      <span class="subitem">
        合计：
        <span class="labelColor ftArial">{{tableData.length || 0}}</span>
      </span>
      <span class="subitem">
        选中：
        <span class="labelColor ftArial">{{multipleTable.length || 0}}</span>
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
import moment from "moment";
export default {
	name: "SMSManage",
	data() {
    return {
      searchParams: {
				Condition: "",
				SendStatus: '',
				SmsType: '',
				SmsTimeType: '',
        BeginTime: "",
        EndTime: "",
        PageIndex: 1,
        PageSize: 10
			},
			params: {
				Condition: '',
				SendStatus: '',
				SmsType: '',
				SmsTimeType: '',
				BeginTime: '',
				EndTime: '',
				timeRange: [moment().add(-1, 'weeks').format(),moment().format()],
			},
      loading: false,
      total: 0,
      timeRange: [moment().add(-1, 'weeks').format(),moment().format()],
			sendStatus: [],//发送状态
			SMSTypes: [],// 短信类型
			SMSTimeTypes: [],//短信时间类型
      tableData: [],
			multipleTable: [],
			pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
    };
	},
	created() {
		this.getData(true);
		this.getTypeEnum();
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
		//获取领取方式
		getTypeEnum(){
			this.$getType('SendStatus').then(res => {
				if (res.status === 200 && res.data.status === 1) {
					this.sendStatus = res.data.entity;
				}
			})
			this.$getType('SMSTimeType').then(res => {
				if (res.status === 200 && res.data.status === 1) {
					this.SMSTimeTypes = res.data.entity;
				}
			})
			this.$axios.get(this.$api.ReturnSMSType).then(res => {
				if (res.data.entity && res.data.status === 1) {
					this.SMSTypes = res.data.entity;
				} else {
					this.$message.error(res.data.message);
				}
			}).catch(err => {
				this.$message.error(err.data.message);
			})
		},
    // 获取列表信息
    getData(key) {
			this.loading = true;
			if (key) {
				if (!this.params.timeRange  || this.params.timeRange.length !== 2) {
					this.searchParams.BeginTime = '';
					this.searchParams.EndTime = '';
				} else {
					this.searchParams.BeginTime = moment(this.params.timeRange[0]).format("YYYY-MM-DD");
					this.searchParams.EndTime = moment(this.params.timeRange[1]).format("YYYY-MM-DD");
				}
				this.searchParams.Condition = this.params.Condition;
				this.searchParams.SendStatus = this.params.SendStatus;
				this.searchParams.SmsType = this.params.SmsType;
				this.searchParams.SmsTimeType = this.params.SmsTimeType;
				this.searchParams.PageIndex = 1;
				this.timeRange = this.params.timeRange;
			} else {
				this.params.Condition = this.searchParams.Condition;
				this.params.SendStatus = this.searchParams.SendStatus;
				this.params.SmsType = this.searchParams.SmsType;
				this.params.SmsTimeType = this.searchParams.SmsTimeType;
				this.params.timeRange = this.timeRange;
			}
      this.$axios
        .post(this.$api.SMSSendQuery, this.searchParams)
        .then(res => {
          if (res.data.status === 1 && res.data.entity) {
            this.tableData = res.data.entity.bgSMSMessages;
            this.total = res.data.entity.dataNum;
          } else {
            this.$message.error(res.data.message);
          }
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          this.$message.error(err.data.message);
        });
    },
    //发送
    sendSMS(data) {
			let params = {
				OperatorCode: '001',
				Codes: []
			};
			if (data.innerCode) {
				params.Codes.push(data.innerCode)
			}
			if (this.multipleTable.length === 0 && !data.innerCode) {
				this.$message.error('请选择后点击批量发送');
				return;
			}
			this.multipleTable.forEach(x => {
				params.Codes.push(x.innerCode);
			})
			let msg = this.$message({
				message: '短信发送中...',
				duration: 0
			});
			this.$axios.post(this.$api.SendSmsModBySMSQuery, params).then(res => {
				if(res.data.status === 1) {
					this.getData();
					let sucNum = res.data.entity.successCount;
					let errNum = res.data.entity.errorCount;
					let h = this.$createElement;
					this.$notify({
						title: '短信发送完成！',
						message: h('i', { style: 'color: #606266'},
							`成功${sucNum}条，失败${errNum}条，合计${errNum + sucNum}条。`
						)
					});
				} else {
					this.$message.error(res.data.message)
				}
				msg.close();
			}).catch(err => {
				this.$message.error(err.data.message);
				msg.close();
			})
		},
    // 处理分页fn
    handleCurrentChange(val) {
			this.searchParams.pageIndex = val;
			this.getData();
    },
    handleSizeChange(val) {
			this.searchParams1.PageSize = val;
			this.searchParams.PageIndex = 1;
      this.getData();
		},
		handleSelectionChange(val) {
			this.multipleTable = val;
		},
		//点击当前行选中
		clickRow2(row, event){
			if(event.label === '操作') {
				return;
			}
			this.$refs.multipleTable.toggleRowSelection(row);
		},
  }
};
</script>
<style scoped>
.SMSManage .propleSearch .el-select {
  display: inline-block;
  width: 120px;
  margin-left: 16px;
}
.SMSManage .bgModal .el-input--suffix .el-input__inner {
  padding-right: 13px;
}
.SMSManage .modal-con .item span {
  width: 75px;
}
</style>

