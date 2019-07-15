<template>
	<div class="content">
		<div class="topTitle">
      <span>主检排班</span>
    </div>
		<div class="peopleData">
      <div class="propleSearch">
				<el-date-picker
					v-model="time"
					type="month"
					:disabled="isSave||isSave2"
					value-format="yyyy-MM-dd"
					style="width: 120px"
					placeholder="选择月">
				</el-date-picker>
				<el-date-picker
					type="dates"
					:disabled="isSave||isSave2"
					style="margin: 0 16px;"
					v-model="datas"
					@blur="saveHoliday"
					value-format="yyyy-MM-dd"
					placeholder="标记节假日">
				</el-date-picker>
        <el-button type="primary" :disabled="isSave||isSave2" @click="openSchudling">快速排班</el-button>
        <!-- <el-button type="primary" @click="delCurScheduling">删除排班</el-button>  -->
				<div class="right">
        	<el-button v-show="!isSave" @click="editScheduling" :disabled="isSave2">编辑排班</el-button>
        	<el-button v-show="isSave" @click="saveScheduling">保存排班</el-button>
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
							<el-select :disabled="!scope.row.isSave" v-model="tableData[scope.$index].scheduleDoctorCode[index]" placeholder="请选择" clearable v-for="(item,index) in scope.row.scheduleDoctorCode" :key="index">
								<el-option
									v-for="(item,index) in tableData[scope.$index].doctors"
									:key="index"
									:label="item.userName"
									@change="changeDoctor"
									:value="item.operatorCode">
								</el-option>
							</el-select>
						</div>
						<div v-else style="display: inline">
							<span v-if="!scope.row.isSave2"><span style="margin-right: 16px;" v-for="(item,index) in scope.row.scheduleDoctorCode" :key="index">{{item | getDoctorName(doctors2)}}</span></span>
							<div v-else>
								<div style="display: inline-block" v-for="(item,i) in scope.row.scheduleDoctorCode" :key="i">
									<el-tag v-if="!tableData[scope.$index].canEdit[i]" closable type="danger" @close="handleClose(scope.row,item,scope.$index,i)">{{tableData[scope.$index].scheduleDoctorCode[i] | getDoctorName(doctors2)}}</el-tag>
									<el-select v-else v-model="tableData[scope.$index].scheduleDoctorCode[i]" placeholder="请选择" clearable @change="changeDoctor(scope.$index)">
										<el-option
											v-for="(item,index) in tableData[scope.$index].doctors"
											:key="index"
											:label="item.userName"
											:value="item.operatorCode">
										</el-option>
									</el-select>
								</div>

								<el-button type="text" @click="addDoctor(scope.$index)">新增</el-button>
							</div>
						</div>
						<el-button v-if="isSave" v-show="scope.row.isSave" type="text" @click="addDoctor(scope.$index)">新增</el-button>
					</div>
				</template>
			</el-table-column>
      <el-table-column  prop="scheduleDate" label="操作" width="60">
        <template slot-scope="scope">
          <el-button type="text" size="small" v-if="!scope.row.isSave && !scope.row.isSave2" @click="editDay(scope.row, scope.$index)" :disabled="isSave">修改</el-button>
          <el-button type="text" size="small" v-if="!scope.row.isSave && scope.row.isSave2" @click="saveDay(scope.row, scope.$index)">保存</el-button>
          <el-button type="text" size="small" v-if="scope.row.isSave" @click="reset(scope.row, scope.$index)" :disabled="!isSave">重置</el-button>
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
	name: 'SchedulingPG',
	data () {
		return {
			visible: false,
			isSave: false,
			isSave2: false,
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
		changeDoctor(index){
			let obj = this.tableData[index];
			obj.doctors = this.doctors.filter((x, i) => {
				return !obj.scheduleDoctorCode.some(y => y === x.operatorCode);
			})
		},
		handleClose(data, v, index, i) {
			data.scheduleDoctorCode = data.scheduleDoctorCode.filter(x => x != v);
			data.canEdit = data.canEdit.filter((x, ind) => ind != i);
			this.$set(this.tableData, iindex, data);
		},
		// ...mapMutations(['changeGoto']),
		getData() {
			if(!this.time) return;
			this.loading = true;
			let DateRange = [moment(this.time).startOf('month').format('YYYY-MM-DD'),moment(this.time).endOf('month').format('YYYY-MM-DD')];
			this.$axios.post(this.$api.QueryPGScheduleMasterByDateRange, {DateRange}).then(res => {
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
			this.$axios.post(this.$api.GetPGMasterDoctor).then(res => {
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
			if (!this.isSave) return;
			this.tableData = this.tableData.filter(x => {
				x.scheduleDoctorCode = x.scheduleDoctorCode.filter(y => y);
				return x.scheduleDoctorCode.length && x.isSave;
			})
			let delData = ['', moment(this.time).endOf('month').format('YYYY-MM-DD')];
			if(moment().format('DD') != '01') {
				delData[0] = moment().format('YYYY-MM-DD');
			} else {
				delData[0] = moment(this.time).startOf('month').format('YYYY-MM-DD');
			}
			this.$axios.post(this.$api.DeletePGScheduleMasterByDateRange, {DateRange: delData}).then(res => {
				if (res.data.status === 1) {
						this.$axios.post(this.$api.BatchSavePGScheduleMaster, this.tableData).then(res1 => {
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
				if (x.isSave) {
				// if (!this.datas.some(y => y === x.scheduleDate)&&x.isSave) {
					if(x.scheduleDoctorCode.length === 0 ) {
						x.scheduleDoctorCode = ['','','',''];
					}
				}
				return x;
			})
		},
		// 修改历史某一天的排班
		editDay(data, index){
			if (this.tableData.some(x => x.isSave2)) {
				this.$message.warning('请先保存其他修改后再修改此项');
				return;
			}
			this.$axios.post(this.$api.CheckCanEditSchedulePG, data).then(res => {
				if(res.data.status === 1) {
					data.canEdit = [];
					res.data.entity.scheduleDoctorCode.forEach(x => {
						data.canEdit.push(x.canEdit);
					})
					if (res.data.entity.scheduleDoctorCode.length === 0) {
						data.canEdit = [true, true, true, true];
					}
					this.$store.commit('changeGoto', false);
					this.changeDoctor(index);
					if(data.scheduleDoctorCode.length === 0) {
						data.scheduleDoctorCode = ['','','',''];
					}
					data.isSave2 = true;
					this.isSave2 = true;
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
			data.isSave2 = false;
			this.isSave2 = false;
			data.scheduleDoctorCode = data.scheduleDoctorCode.filter(y => y);
			this.$axios.post(this.$api.UpdatePGScheduleMaster, data).then(res => {
				if (res.data.status !== 1) {
					this.$message.error(res.data.message);
				}
			}).catch(err => {
				this.$message.error(err.data.message);
			})
			this.$store.commit('changeGoto', true);
			this.$set(this.tableData, index, data);
		},
		//删除当月排班
		delCurScheduling() {
			let DateRange = [moment(this.time).startOf('month').format('YYYY-MM-DD'),moment(this.time).endOf('month').format('YYYY-MM-DD')];
			this.$axios.post(this.$api.DeletePGScheduleMasterByDateRange, {DateRange}).then(res => {
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
					this.$axios.post(this.$api.DeletePGScheduleMasterByDateRange,{DateRange}).then(res => {
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
					if (moment(x.scheduleDate).valueOf() > moment().valueOf()) {
						x.isSave = true;
					} else {
						x.isSave = false;
						x.isSave2 = false;
					}
					x.doctors = _.cloneDeep(this.doctors);
					return x;
				});
				return;
			}
			let startDay = moment(this.time).startOf('month').format('YYYY-MM-DD');
			for(let i = 0; i < DValue; i ++) {
				let scheduleDate = startDay.substr(0, 8) + (Number(startDay.substr(8)) + i + '').padStart(2, '0');
				let isSave = true;
				if(!this.tableDays.some((x,index) => x.scheduleDate == scheduleDate)) {
					if (moment(scheduleDate).valueOf() > moment(moment().format('YYYY-MM-DD')).valueOf()) {
						this.tableData.push({
							scheduleDate,
							isSave,
							scheduleDoctorCode: [],
							operatorCode: '001',
							doctors: this.doctors
						})
					} else {
						this.tableData.push({
							scheduleDate,
							isSave: !isSave,
							isSave2: false,
							scheduleDoctorCode: [],
							operatorCode: '001',
							doctors: this.doctors
						})
					}
				} else {
					let obj = {};
					for(let j = 0; j < this.tableDays.length; j++) {
						if (this.tableDays[j].scheduleDate == scheduleDate) {
							obj = this.tableDays[j];
						}
					}
					if (moment(scheduleDate).valueOf() > moment(moment().format('YYYY-MM-DD')).valueOf()) {
						obj.isSave = true;
					} else {
						obj.isSave = false;
					}
					obj.doctors = _.cloneDeep(this.doctors);
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
				if (x.isSave) {
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
				}

			})
			this.isSave = true;
			this.saveScheduling();
		}
	},
	watch: {
		time: function(val, oldVal) {
			if (val !== oldVal) {
				this.getData();
				this.isHoliday = false;
			}
		},
		isSave: function(val, oldVal) {
			if (val != oldVal) {
				this.$store.commit('changeGoto', !val);
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
