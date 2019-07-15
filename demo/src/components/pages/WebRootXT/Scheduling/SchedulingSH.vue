<template>
	<div class="content">
		<div class="topTitle">
      <span>总检排班</span>
    </div>
		<div class="peopleData">
      <div class="propleSearch">
				<el-date-picker
					v-model="time"
					type="month"
					:disabled="isSave || isHistorySave"
					value-format="yyyy-MM-dd"
					style="width: 120px"
					placeholder="选择月">
				</el-date-picker>
				<el-date-picker
					type="dates"
					style="margin: 0 16px;"
					v-model="datas"
					:disabled="isSave || isHistorySave"
					@blur="saveHoliday"
					value-format="yyyy-MM-dd"
					placeholder="标记节假日">
				</el-date-picker>
        <el-button type="primary" :disabled="isSave || isHistorySave" @click="openSchudling">快速排班</el-button>
        <!-- <el-button type="primary" @click="delCurScheduling">删除排班</el-button> -->
				<div class="right">
        	<el-button v-if="!isSave" :disabled="isHistorySave" @click="editScheduling">编辑排班</el-button>
        	<el-button v-else @click="saveScheduling">保存排班</el-button>
				</div>
      </div>
    </div>
		<el-table :data="tableData" style="width: 100%;" v-loading="loading" :row-style="isHolidays">
			<el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="scheduleDate" label="日期" width="120"></el-table-column>
      <el-table-column label="星期" width="80">
				<template slot-scope="scope">
					{{scope.row.scheduleDate | getWeek}}
				</template>
			</el-table-column>
      <el-table-column label="类型" width="100">
				<template slot-scope="scope">
					{{scope.row.scheduleDate | filterHoliday(datas)}}
				</template>
			</el-table-column>
      <el-table-column label="排班医生">
				<template slot-scope="scope">
					<div>
						<div v-if="isSave" style="display: inline">
							<span v-if="isHistory(scope.row.scheduleDate)"><span style="margin-right: 16px;" v-for="(item,index) in scope.row.scheduleDoctorCode" :key="index">{{item | getDoctorName(doctors2)}}</span></span>
							<div style="display: inline" v-else>
								<div style="display: inline" v-for="(item,index) in scope.row.scheduleDoctorCode" :key="index" >
									<el-tag v-if="!isHave(tableData[scope.$index].scheduleDoctorCode[index])" style="margin-right: 8px;" closable type="danger" @close="handleClose(scope.row,item,scope.$index,index)">{{tableData[scope.$index].scheduleDoctorCode[index] | getDoctorName(doctors2)}}</el-tag>
									<el-select v-else v-model="tableData[scope.$index].scheduleDoctorCode[index]" placeholder="请选择" clearable @change="changeDoctor($event,scope.$index)">
										<el-option
											v-for="(doctor,i) in doctors"
											:key="i"
											:label="doctor.userName"
											:value="doctor.operatorCode">
										</el-option>
									</el-select>
								</div>
								<el-button type="text" @click="addDoctor(scope.$index)">新增</el-button>
							</div>
						</div>
						<div v-else style="display: inline">
							<span v-show="!scope.row.isSave"><span style="margin-right: 16px;" v-for="(item,index) in scope.row.scheduleDoctorCode" :key="index">{{item | getDoctorName(doctors2)}}</span></span>
							<div style="display: inline" v-show="scope.row.isSave">
								<div style="display: inline" v-for="(item,index) in scope.row.scheduleDoctorCode" :key="index">
									<el-tag v-if="!tableData[scope.$index].canEdit[index]" type="warning" style="margin-right: 8px;">{{item | getDoctorName(doctors2)}}</el-tag>
									<el-tag v-else-if="!isHave(tableData[scope.$index].scheduleDoctorCode[index])" style="margin-right: 8px;" closable type="danger" @close="handleClose(scope.row,item,scope.$index,index)">{{tableData[scope.$index].scheduleDoctorCode[index] | getDoctorName(doctors2)}}</el-tag>
									<el-select v-else v-model="tableData[scope.$index].scheduleDoctorCode[index]" placeholder="请选择" clearable  @change="changeDoctor($event,scope.$index)">
										<el-option
											v-for="(doctor,i) in doctors"
											:key="i"
											:label="doctor.userName"
											:value="doctor.operatorCode">
										</el-option>
									</el-select>
								</div>
								<el-button type="text" @click="addDoctor(scope.$index)">新增</el-button>
							</div>
						</div>
						<!-- <el-button v-if="isSave" type="text" @click="addDoctor(scope.$index)">新增</el-button> -->
					</div>
				</template>
			</el-table-column>
      <el-table-column  prop="scheduleDate" label="操作" width="60">
        <template slot-scope="scope">
          <el-button v-if="isHistory(scope.row.scheduleDate) && !scope.row.isSave" :disabled="isSave" type="text" size="small" @click="editDay(scope.row, scope.$index)">修改</el-button>
          <el-button v-if="isHistory(scope.row.scheduleDate) && scope.row.isSave" type="text" size="small" @click="saveDay(scope.row, scope.$index)">保存</el-button>
          <el-button v-if="!isHistory(scope.row.scheduleDate)" :disabled="!isSave" type="text" size="small"  @click="reset(scope.row, scope.$index)">重置</el-button>
        </template>
      </el-table-column>
    </el-table>
		<el-dialog title="按照星期快速排班" :visible.sync="viewModal" :close-on-click-modal="false" width="800px" class="viewModal">
			<ul class="con">
				<li class="item" v-for="(list,index) in weeks" :key="list.key">
					<span>{{list.title}}</span>
					<el-select clearable v-model="weeks[index].doctors[i]" placeholder="请选择" v-for="(item,i) in list.doctors" :key="i">
						<el-option
							v-for="item in doctors"
							:key="item.operatorCode"
							:label="item.userName"
							:value="item.operatorCode">
						</el-option>
					</el-select>
					<el-button icon="el-icon-plus" style="width: 100%" @click="addWeek(index)">添加</el-button>
				</li>
			</ul>
			<div slot="footer" class="dialog-footer">
				<div style="float: left;margin-left: 17px;"><el-checkbox v-model="isHoliday">排除节假日</el-checkbox></div>
				<el-button @click="viewModal = false" style="margin-right: 16px;">取 消</el-button>
				<el-popover
					placement="top"
					width="160"
					v-model="visible">
					<p>您确定要将新排班覆盖之前的吗？</p>
					<div style="text-align: right; margin: 0">
						<el-button size="mini" type="text" @click="visible = false">取消</el-button>
						<el-button type="primary" size="mini" @click="schudlingBtn">确定</el-button>
					</div>
					<el-button slot="reference" type="primary">确定</el-button>
				</el-popover>
			</div>
		</el-dialog>
	</div>
</template>
<script>
import moment from 'moment';
import _ from 'lodash';
import {mapMutations} from 'vuex';
export default {
	name: 'SchedulingSH',
	data () {
		return {
			isSave: false,// 是否在编辑排班状态下
			visible: false,
			viewModal: false,
			loading: false,
			isHoliday: false,
			time: moment().format('YYYY-MM-DD'),
			datas: [],
			datas2: [],
			doctors: [],
			doctors2: [],
			tableData: [],//显示的数据
			tableDays: [],//获取的数据
			weeks: [
				{
					title: '周一',
					key: '一',
					doctors: ['','','','']
				},
				{
					title: '周二',
					key: '二',
					doctors: ['','','','']
				},
				{
					title: '周三',
					key: '三',
					doctors: ['','','','']
				},
				{
					title: '周四',
					key: '四',
					doctors: ['','','','']
				},
				{
					title: '周五',
					key: '五',
					doctors: ['','','','']
				},
				{
					title: '周六',
					key: '六',
					doctors: ['','','','']
				},{
					title: '周日',
					key: '日',
					doctors: ['','','','']
				}
			]
		}
	},
	created(){
		this.getDoctors();
		this.getHolidays();
	},
	methods: {
		changeDoctor(val, index){
			let arr = this.tableData[index].scheduleDoctorCode.filter(x => x);
			if(_.uniq(arr).length != arr.length) {
				this.$message.warning('一天中请勿重复选择同意医生');
				this.tableData[index].scheduleDoctorCode = _.uniq(arr);
			}
			this.$set(this.tableData, index, this.tableData[index]);
		},
		handleClose(data, v, index, i) {
			data.scheduleDoctorCode = data.scheduleDoctorCode.filter(x => x != v);
			data.canEdit = data.canEdit.filter((x, ind) => ind != i);
			this.$set(this.tableData, index, data);
		},
		// ...mapMutations(['changeGoto']),
		getData() {
			if(!this.time) return;
			this.loading = true;
			let DateRange = [moment(this.time).startOf('month').format('YYYY-MM-DD'),moment(this.time).endOf('month').format('YYYY-MM-DD')];
			this.$axios.post(this.$api.QuerySHScheduleFinalByDateRange, {DateRange}).then(res => {
				if (res.data.status === 1) {
						this.tableDays = res.data.entity;
						this.fillMonthList();
				} else {
					this.$message.error(res.data.message);
				}
				this.loading = false;
			}).catch(err => {
					this.$message.error(err.data.message);
					this.loading = false;
			})
		},
		getHolidays() {
			this.$axios.post(this.$api.GetTjHoliday).then(res => {
				if(res.data.status === 1) {
					this.datas2 = res.data.entity;
					this.datas = this.datas2.map(x => {
						return moment(x.holiday).format('YYYY-MM-DD');
					})
					if(!this.tableData.length) {
						this.getData();
					}
				} else {
					this.$message.error(res.data.message);
				}
			}).catch(err => {
				this.$message.error(err.data.message);
			})
		},
		//获取值班医生名单
		getDoctors() {
			this.$axios.post(this.$api.GetSHFinalDoctor).then(res => {
				if (res.data.status === 1) {
					this.doctors = res.data.entity;
				} else {
					this.$message.error(res.data.message);
				}
			}).catch(err => {
					this.$message.error(err.data.message);
			})
			this.$axios.post(this.$api.GetAllUser).then(res => {
				if (res.data.status === 1) {
					this.doctors2 = res.data.entity;
				} else {
					this.$message.error(res.data.message);
				}
			}).catch(err => {
					this.$message.error(err.data.message);
			})
		},
		//保存节假日
		saveHoliday() {
			let arr = this.datas.map(x => {
				return {
					Holiday: x,
					Remark: ''
				}
			})
			this.$axios.post(this.$api.DeleteTjHoliday,this.datas2).then(res => {
				if (res.data.status === 1) {
					this.$axios.post(this.$api.InsertTjHoliday,arr).then(res2 => {
						if (res2.data.status === 1) {
							this.getHolidays();
						} else {
							this.$message.error(res2.data.message);
						}
					}).catch(err2 => {
						this.$message.error(err2.data.message);
					})
				} else {
					this.$message.error(res.data.message);
				}
			}).catch(err => {
				this.$message.error(err.data.message);
			})
		},
		//保存排班
		saveScheduling() {
			this.tableData = this.tableData.filter(x => {
				x.scheduleDoctorCode = x.scheduleDoctorCode.filter(y => y);
				return x.scheduleDoctorCode.length;
			})
			let delData = [ moment(this.time).startOf('month').format('YYYY-MM-DD'), moment(this.time).endOf('month').format('YYYY-MM-DD')];
			this.$axios.post(this.$api.DeleteShScheduleFinalByDateRange, {DateRange: delData}).then(res => {
				if (res.data.status === 1) {
						this.$axios.post(this.$api.BatchSaveSHScheduleFinal, this.tableData).then(res1 => {
							if (res1.data.status === 1) {
								this.getData();
							} else {
								this.$message.error(res1.data.message);
							}
							this.isSave = false;
						}).catch(err1 => {
							this.$message.error(err1.data.message);
						})
				} else {
					this.$message.error(res.data.message);
				}
			}).catch(err => {
				this.$message.error(err.data.message);
			});

		},
		editScheduling() {
			if (moment(this.time).endOf('month').valueOf() < moment().valueOf()) {
				this.$message.error('往期排班不允许再次批量编辑');
				return;
			}
			this.isSave = true;

			this.tableData = this.tableData.map(x => {
				if (!this.datas.some(y => y === x.scheduleDate)&&x.isSave) {
					if(x.scheduleDoctorCode.length === 0 ) {
						x.scheduleDoctorCode = ['','','',''];
					}
				}
				return x;
			})
		},
		// 修改历史某一天的排班
		editDay(data, index){
			if(this.isHistorySave) {
				this.$message.error('请先保存后点击修改本条内容');
				return;
			}
			this.$axios.post(this.$api.CheckCanEditScheduleSH, data).then(res => {
				if(res.data.status === 1) {
					data.canEdit = [];
					data.isSave = true;
					let scheduleDoctorCode = res.data.entity.scheduleDoctorCode;
					if (scheduleDoctorCode.length === 0) {
						data.canEdit = [true, true, true, true];
						data.scheduleDoctorCode = ['','','',''];
						data.isEmpty = true;
					} else {
						if(scheduleDoctorCode.some(x => !this.isHave(x.scheduleDoctorCode)) && scheduleDoctorCode.length === 1) {
							data.isEmpty = true;
						} else {
							data.isEmpty = false;
						}
						scheduleDoctorCode.forEach(x => {
							data.canEdit.push(x.canEdit);
						})
					}
					this.$store.commit('changeGoto', false);
					this.$set(this.tableData, index, data);
				} else {
					this.$message.error(res.data.message);
					return;
				}
			}).catch(err => {
					this.$message.error(err.data.message);
					return;
			})
		},
		saveDay(data, index){
			data.scheduleDoctorCode = data.scheduleDoctorCode.filter(y => y);
			if(!data.isEmpty && data.scheduleDoctorCode.length==0) {
				this.$message.error('请先选择医生后保存');
				data.scheduleDoctorCode = [''];
				return;
			}
			this.$axios.post(this.$api.UpdateSHScheduleFinal, data).then(res => {
				if (res.data.status !== 1) {
					this.$message.error(res.data.message);
				} else {
					this.getData();
					this.$store.commit('changeGoto', true);
				}
			}).catch(err => {
				this.$message.error(err.data.message);
			})
			data.isSave = false;
			this.$store.commit('changeGoto', true);
		},
		//删除当月排班
		delCurScheduling() {
			let DateRange = [moment(this.time).startOf('month').format('YYYY-MM-DD'),moment(this.time).endOf('month').format('YYYY-MM-DD')];
			this.$axios.post(this.$api.DeleteShScheduleFinalByDateRange, {DateRange}).then(res => {
				if(res.data.status === 1) {
					this.$message.success('删除成功！');
					this.getData();
				}
			})
		},
		//重置
		reset(data, index) {
			 this.$confirm('确定要重置以清空当前日期排班？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.tableData[index].scheduleDoctorCode = ['','','',''];
					let DateRange = [data.scheduleDate, data.scheduleDate];
					this.$axios.post(this.$api.DeleteShScheduleFinalByDateRange,{DateRange}).then(res => {
						if (res.data.status != 1) {
							this.$message.error(res.data.message);
						}
					}).catch(err => {
							this.$message.error(err.data.message);
					})
        }).catch(() => {});
		},
		//补充当月剩余排班列表
		fillMonthList() {
			let DValue = Number(moment(this.time).endOf('month').format('DD'));
			this.tableData = [];
			if (this.tableDays.length === DValue) {
				this.tableData = this.tableDays.map(x => {
					x.doctors = _.cloneDeep(this.doctors);
					x.canEdit = []
					return x;
				});
				return;
			}
			let startDay = moment(this.time).startOf('month').format('YYYY-MM-DD');
			for(let i = 0; i < DValue; i ++) {
				let scheduleDate = startDay.substr(0, 8) + (Number(startDay.substr(8)) + i + '').padStart(2, '0');
				if(!this.tableDays.some((x,index) => x.scheduleDate == scheduleDate)) {
					if (this.isHistory(scheduleDate)) {
						this.tableData.push({
							scheduleDate,
							isSave: false,
							scheduleDoctorCode: [],
							canEdit: [],
							operatorCode: '001'
						})
					} else {
						this.tableData.push({
							scheduleDate,
							scheduleDoctorCode: [],
							canEdit: [],
							operatorCode: '001'
						})
					}
				} else {
					let obj = {};
					for(let j = 0; j < this.tableDays.length; j++) {
						if (this.tableDays[j].scheduleDate == scheduleDate) {
							obj = this.tableDays[j];
						}
					}
					obj.doctors = _.cloneDeep(this.doctors);
					obj.canEdit = [];
					for(let i = 0; i < obj.scheduleDoctorCode.length; i++) {
						obj.canEdit.push(true);
					}
					this.tableData.push(obj);
				}
			}
		},
		// 打开快速排班模态框
		openSchudling() {
			if (moment(this.time).endOf('month').valueOf() < moment().valueOf()) {
				this.$message.error('往期排班不允许再次编辑');
				return;
			}
			this.weeks.forEach((x, i) => {
				this.weeks[i].doctors = ['','','',''];
			})
			this.viewModal = true;
		},
		// 快速排班添加按钮
		addWeek(key) {
			this.weeks[key].doctors.push('');
		},
		// 添加按钮
		addDoctor(index) {
			this.tableData[index].scheduleDoctorCode.push('');
			this.tableData[index].canEdit.push(true);
		},
		// 判断是否是周末或节假日
		isHolidays({row,rowIndex}) {
			if(this.datas.indexOf(row.scheduleDate) > -1){
				return 'background: rgb(236, 236, 236);'
			}
		},
		schudlingBtn(){
			this.viewModal = false;
			this.visible = false;
			this.weeks = this.weeks.map(x => {
				x.doctors = x.doctors.filter(y => y);
				return x;
			});
			this.tableData.forEach((x, index) => {
				if(!this.isHistory(x.scheduleDate)) {
					if(this.isHoliday) {
						if(this.datas.indexOf(x.scheduleDate) === -1) {
							this.weeks.forEach(y => {
								if(moment(x.scheduleDate).locale('zh-cn').format('ddd') == y.title) {
									this.tableData[index].scheduleDoctorCode = y.doctors;
								}
							})
						} else {
							this.weeks.forEach(y => {
								if(moment(x.scheduleDate).locale('zh-cn').format('ddd') == y.title) {
									this.tableData[index].scheduleDoctorCode = [];
								}
							})
						}
					} else {
						this.weeks.forEach(y => {
							if(moment(x.scheduleDate).locale('zh-cn').format('ddd') == y.title) {
								this.tableData[index].scheduleDoctorCode = y.doctors;
							}
						})
					}
				}
			})
			this.saveScheduling();
		},
		//判断是否是过去的时间
		isHistory(date){
			if (moment(date).valueOf() > moment(moment().format('YYYY-MM-DD')).valueOf()) {
				return false;
			} else {
				return true;
			}
		},
		//是否存在这个角色
		isHave(code) {
			if(!code) {
				return true;
			} else {
				return this.doctors.some(x => code == x.operatorCode);
			}
		}
	},
	computed: {
		isHistorySave: function(){
			return this.tableData.some(x => x.isSave);
		}
	},
	watch: {
		time: function(val, oldVal) {
			if (val !== oldVal) {
				this.getData();
				this.isHoliday = false;
			}
		}
	}
}
</script>
<style scoped>
	.el-table::before{
		display: none;
	}
	.content .el-table .el-select{
			width: 88px;
			display: inline-block;
			margin-right: 8px;
			margin-bottom: 5px;
	}
	.content .el-table .disable .el-select >>> .el-input__inner{
		border: none;
	}
	.content .el-table .disable .el-select >>> .el-input__suffix {
		display: none;
	}
	.con {
		max-height: 500px;
		overflow: auto;
	}
	.con .item {
		padding: 5px;
		width: 12.9%;
		float: left;
	}
	.con .item span {
		font-size: 12px;
		text-align: center;
		line-height: 30px;
		display: block;
		color: #606266;
	}
	.con .item .el-select {
		margin-bottom: 5px;
	}
	.item >>> .el-input__inner{
		padding: 0 5px;
	}
	.item >>> .el-input--suffix .el-input__inner {
		padding-right: 20px;
	}
	.item >>> .el-input__suffix {
		right: 0;
	}
	.propleSearch >>> .el-input__suffix{
		display: none;
	}
</style>
