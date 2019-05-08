<template>
  <div class="content MGManage">
    <div class="topTitle">
      <span>报告管理</span>
      <div class="right">
        <el-button @click="reportPrint">生成报告</el-button>
        <el-button @click="printBG">打印报告</el-button>
        <el-button @click="batchExport">批量导出</el-button>
        <el-button @click="sendSMS">发送短信</el-button>
        <el-button @click="reportTake">领取报告</el-button>
      </div>
    </div>
    <div class="peopleData">
      <div class="propleSearch">
        <el-input
          placeholder="请搜索"
          v-model="params.Condition"
          class="arcRadius"
					@keyup.enter.native="getData(true)"
          style="width: 150px;"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-select v-model="params.IfPrint" placeholder="是否打印" clearable>
          <el-option label="是" :value="true"></el-option>
          <el-option label="否" :value="false"></el-option>
        </el-select>
        <el-select v-model="params.IfExport" placeholder="是否导出" clearable>
          <el-option label="是" :value="true"></el-option>
          <el-option label="否" :value="false"></el-option>
        </el-select>
        <el-select v-model="params.IfMark" placeholder="是否生成" clearable>
          <el-option label="是" :value="true"></el-option>
          <el-option label="否" :value="false"></el-option>
        </el-select>
        <el-select v-model="params.IfSend" placeholder="是否发送短信" clearable>
          <el-option
            v-for="item in sendStatus"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select v-model="params.TimeType" placeholder="时间类型" clearable>
          <el-option
            v-for="item in reportTimeTypes"
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
						:picker-options="pickerOptions"></el-date-picker>
        </div>
        <el-button @click="getData(true)">查询</el-button>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%;" v-loading="loading" ref="multipleTable" @row-click="clickRow2"  @selection-change="handleSelectionChange">
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
				<template slot-scope="scope">
					<el-popover trigger="hover" placement="bottom">
						<p>领取人: {{ scope.row.takerName }}</p>
						<p>手机号: {{ scope.row.takerTele }}</p>
						<p>身份证号: {{ scope.row.takerIDCardNum }}</p>
						<p>备注信息：{{ scope.row.remark }}</p>
						<div slot="reference" class="name-wrapper">
							{{ scope.row.takeType }}
						</div>
					</el-popover>
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
    <el-dialog title="领取报告" :visible.sync="getBGModal" :close-on-click-modal="false" width="605px" class="bgModal">
      <ul class="modal-con">
        <li class="item">
          <span>领取人：</span>
          <div class="item-list">
            <el-input v-model="peopleInfo.TakeName"></el-input>
          </div>
        </li>
				<li class="item" style="width: 60%;">
          <span>身份证号：</span>
          <div class="item-list" style="width: 242px;">
            <el-input v-model="peopleInfo.IdCardNum" maxlength="18" style="width: 150px;margin-right: 8px;"></el-input>
						<el-button type="primary" @click="getIdentity" class="idHandle">刷身份证</el-button>
          </div>
        </li>
				<li class="item">
          <span>手机号：</span>
          <div class="item-list">
            <el-input v-model="peopleInfo.TakerTele"></el-input>
          </div>
        </li>

        <li class="item"  style="width: 60%;">
          <span>领取方式：</span>
          <div class="item-list" style="width: 242px;">
            <el-select
              v-model="peopleInfo.takeType"
              placeholder="订单类型"
              style="padding-right: 0;"
            >
              <el-option
                v-for="item in takeTypes"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </li>

        <li class="item" style="width: 100%">
          <span>备注信息：</span>
          <div class="item-list" style="width: 100%">
            <el-input v-model="peopleInfo.Remark" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="快递方式、快递号等信息"></el-input>
          </div>
        </li>
      </ul>
      <div slot="footer" class="dialog-footer">
        <el-button @click="getBGModal = false">取 消</el-button>
        <el-button type="primary" @click="reportTakeBtn">确 定</el-button>
      </div>
    </el-dialog>
		<el-dialog title="报告预览" :visible.sync="bgPreview" :close-on-click-modal="false" width="1000px" class="viewModal">
			<div style="max-height: 500px;overflow: auto;">
				<img :src="'data:image/jpeg;base64,' + viewImg" alt="报告预览" style="width: 100%;">
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
			bgPreview: false,
			viewImg: '',
      searchParams: {
        Condition: "",
        IfPrint: "",
        IfExport: "",
        IfMark: true,
        IfSend: "", //0 未发送 =1 已发送 =2 发送失败
        TimeType: "", //1 开始时间，=2审核时间
        BeginTime: "",
        EndTime: "",
        PageIndex: 1,
        PageSize: 10
			},
			params: { // 搜索参数副本
				Condition: "",
        IfPrint: "",
        IfExport: "",
        IfMark: true,
        IfSend: "", //0 未发送 =1 已发送 =2 发送失败
        TimeType: "", //1 开始时间，=2审核时间
        BeginTime: "",
				EndTime: "",
				timeRange: [moment().add(-1, 'weeks').format(),moment().format()]
			},
			peopleInfo: {
				TakeName: "",
				TakerTele: "",
				IdCardNum: "",
				TakeType: 0,
				Remark: "",
				ReportCodes: [],
				OperatorCode: "001"
			},
      loading: false,
      total: 0,
      timeRange: [moment().add(-1, 'weeks').format(),moment().format()],
			sendStatus: [],//发送状态
			takeTypes: [],//报告领取方式
			reportTimeTypes: [], //报告时间类型
			SMSTimeTypes: [],//短信时间类型
			SMSTypes: [],// 短信类型
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
	created(){
		this.getTypeEnum();
		this.getData(true);
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
				this.searchParams.IfPrint = this.params.IfPrint;
				this.searchParams.IfExport = this.params.IfExport;
				this.searchParams.IfMark = this.params.IfMark;
				this.searchParams.IfSend = this.params.IfSend;
				this.searchParams.TimeType = this.params.TimeType;
				this.searchParams.PageIndex = 1;
				this.timeRange = this.params.timeRange;
			} else {
				this.params.Condition = this.searchParams.Condition;
				this.params.IfPrint = this.searchParams.IfPrint;
				this.params.IfExport = this.searchParams.IfExport;
				this.params.IfMark = this.searchParams.IfMark;
				this.params.IfSend = this.searchParams.IfSend;
				this.params.TimeType = this.searchParams.TimeType;
				this.params.timeRange = this.timeRange;
			}

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
          this.$message.error(err.data.message);
        });
		},
		//获取领取方式
		getTypeEnum(){
			this.$getType('TakeType').then(res => {
				if (res.status === 200 && res.data.status === 1) {
					this.takeTypes = res.data.entity;
				}
			})
			this.$getType('SendStatus').then(res => {
				if (res.status === 200 && res.data.status === 1) {
					this.sendStatus = res.data.entity;
				}
			})
			this.$getType('ReportTimeType').then(res => {
				if (res.status === 200 && res.data.status === 1) {
					this.reportTimeTypes = res.data.entity;
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
		//生成报告
		reportPrint() {
			if (this.multipleTable.length === 0) {
				this.$message.error('请选择后点击生成报告');
				return;
			}
			let OrderCodes =  [];
			this.multipleTable.forEach(x => {
				if (x.orderCode) {
					OrderCodes.push(x.orderCode);
				}
			})
			let msg = this.$message({
				message: '报告生成中...',
				duration: 0
			});
			this.$axios.post(this.$api.MakeReportByReturnValue, {
				OrderCodes,
				OperatorCode: '001'
			}).then(res => {
				if(res.data.status === 1) {
					this.getData();
					let sucNum = res.data.entity.successCount;
					let errNum = res.data.entity.errorCount;
					let h = this.$createElement;
					this.$notify({
						title: '生成报告完成！',
						message: h('i', { style: 'color: #606266'},
							`成功${sucNum}条，失败${errNum}条，合计${errNum + sucNum}条。`
						)
					});
				} else {
					this.$message.error(res.data.message);
				}
				msg.close();
			}).catch(err => {
				msg.close();
				this.$message.error(err.data.message);
			})
		},
		//打印报告
		printBG() {
			if (this.multipleTable.length === 0) {
				this.$message.error('请选择后点击打印报告');
				return;
			}
			let ReportCodes =  [];
			this.multipleTable.forEach(x => {
				if (x.reportCode) {
					ReportCodes.push(x.reportCode);
				}
			})
			let msg = this.$message({
				message: '报告打印中...',
				duration: 0
			});
			this.$axios.post(this.$api.ReportPrint, ReportCodes).then(res => {
				if(res.data.status === 1) {
					this.getData();
					let sucNum = res.data.entity.successCount;
					let errNum = res.data.entity.errorCount;
					let h = this.$createElement;
					this.$notify({
						title: '打印报告完成！',
						message: h('i', { style: 'color: #606266'},
							`成功${sucNum}条，失败${errNum}条，合计${errNum + sucNum}条。`
						)
					});
				} else {
					this.$message.error(res.data.message);
				}
				msg.close();
			}).catch(err => {
				msg.close();
				this.$message.error(err.data.message);
			})
		},
		//批量导出
		batchExport() {
			if (this.multipleTable.length === 0) {
				this.$message.error('请选择后点击批量导出');
				return;
			}
			alert('还没有接口')
		},
		//发送短信
		sendSMS(){
			if (this.multipleTable.length === 0) {
				this.$message.error('请选择后点击发送短信');
				return;
			}
			let Codes =  [];
			this.multipleTable.forEach(x => {
				if (x.orderCode) {
					Codes.push(x.orderCode);
				}
			})
			let msg = this.$message({
				message: '短信发送中...',
				duration: 0
			});
			this.$axios.post(this.$api.SendSmsModByReportQuery, {
				Codes,
				OperatorCode: '001'
			}).then(res => {
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
					this.$message.error(res.data.message);
				}
				msg.close();
			}).catch(err => {
				msg.close();
				this.$message.error(err.data.message);
			})
		},
		//领取报告
		reportTake() {
			this.peopleInfo.ReportCodes = [];
			this.peopleInfo.TakeName = '';
			this.peopleInfo.TakerTele = '';
			this.peopleInfo.IdCardNum = '';
			this.peopleInfo.TakeType = '';
			this.peopleInfo.Remark = '';
			if (this.multipleTable.length === 0) {
				this.$message.error('请选择后点击领取报告');
				return;
			}
			if (this.multipleTable.some(x => x.ifTake === '是')) {
				this.$message.error('所选人员中含有已领取报告');
				return;
			}
			this.multipleTable.forEach(x => {
				if (x.reportCode) {
					this.peopleInfo.ReportCodes.push(x.reportCode);
				}
			})
			this.getBGModal = true;
		},
		reportTakeBtn() {
			if (!this.peopleInfo.TakeType) {
				this.peopleInfo.TakeType = 0;
			}
			this.$axios.post(this.$api.ReportTake, this.peopleInfo).then(res => {
				if(res.data.status === 1) {
					this.$message.success('领取报告成功！');
					this.getData();
					this.getBGModal = false;
				} else {
					this.$message.error(res.data.message);
				}
			}).catch(err => {
				this.$message.error(err.data.message);
			})
		},
    //预览
    preview(data) {
			let ReportCodes = [data.reportCode];
			this.$axios.post(this.$api.ReportPrint, ReportCodes).then(res => {
				if(res.data.status === 1) {
					this.viewImg = res.data.entity.image64[0];
					if (this.viewImg) {
						this.bgPreview = true;
					} else {
						this.$message.error('请先生成报告后预览');
					}
				} else {
					this.$message.error(res.data.message);
				}
			}).catch(err => {
					this.$message.error(err.data.message);
			})
		},
		getIdentity () {
			api.getIdcard(this.setIdentity);
		},
		setIdentity(result) {
			let id = JSON.parse(result);
			this.peopleInfo.TakeName = id.Name;
			this.peopleInfo.IdCardNum = id.IdcardNumNum;
		},
    // 处理分页fn
    handleCurrentChange(val) {
			this.searchParams.pageIndex = val;
			this.getData();
    },
    handleSizeChange(val) {
			this.searchParams.PageSize = val;
			this.searchParams.PageIndex = 1;
      this.getData();
		},
		//点击当前行选中
		clickRow2(row, event){
			if(event.label === '操作') {
				return;
			}
			this.$refs.multipleTable.toggleRowSelection(row);
		},
		handleSelectionChange(val) {
			this.multipleTable = val;
		}
	}
};
</script>
<style scoped>
.MGManage .propleSearch .el-select {
  display: inline-block;
  width: 120px;
  margin-left: 16px;
}
.MGManage .bgModal .el-input--suffix .el-input__inner {
  padding-right: 13px;
}
.MGManage .modal-con .item span {
  width: 61px;
}
.modal-con .item .item-list {
	width: 130px;
}
.idHandle {
	padding: 7px 0;
	vertical-align: bottom;
}
.modal-con .item {
	width: 40%;
}
.modal-con .item span{
	width: 60px;
}
</style>

