<template>
	<div class="content">
		<div class="topTitle">
      <span>成本及利润统计</span>
    </div>
		<div style="overflow-y: auto;">
			<div class="peopleData">
				<div class="propleSearch">
					<el-date-picker
						v-model="year"
						type="year"
						value-format="yyyy"
						style="width: 100px;margin-right: 16px;"
						placeholder="选择年">
					</el-date-picker>
					<el-button @click="getData">查询</el-button>
				</div>
			</div>
			<el-table :data="tableData" style="width: 100%;" v-loading="loading">
				<el-table-column prop="month" label="统计月份">
					<template slot-scope="scope">
						{{Number(scope.row.month)}}月份
					</template>
				</el-table-column>
				<el-table-column prop="ysr" label="当月应收">
					<template slot-scope="scope">
						￥{{scope.row.ysr | numFilter}}
					</template>
				</el-table-column>
				<el-table-column prop="ssr" label="当月体检实收">
					<template slot-scope="scope">
						￥{{scope.row.ssr | numFilter}}
					</template>
				</el-table-column>
				<el-table-column prop="zsr" label="当月总收入">
					<template slot-scope="scope">
						￥{{scope.row.zsr | numFilter}}
					</template>
				</el-table-column>
				<el-table-column prop="cost" label="当月成本">
					<template slot-scope="scope">
						￥{{scope.row.cost | numFilter}}
					</template>
				</el-table-column>
				<el-table-column prop="profit" label="当月利润">
					<template slot-scope="scope">
						￥{{scope.row.profit | numFilter}}
					</template>
				</el-table-column>
				<el-table-column label="操作" width="180">
					<template slot-scope="scope">
						<el-button type="text" size="small" @click="openDetail(scope.row.month)">成本编辑</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<el-dialog :title="title" :visible.sync="incomeDetailModal" :close-on-click-modal="false" width="500px" @close="incomeDetail = []">
			<p style="font-size: 12px">
				<span>成本类型选择</span>
				<span style="margin-left: 140px;">成本金额输入（元）</span>
			</p>
			<ul class="items">
				<li class="item" v-for="(item, index) in costs" :key="index">
					<el-select v-model="item.costCode" placeholder="统计类型" @change="changeCostEnum($event, index)">
						<el-option v-for="list in costEnum" :key="list.costCode" :value="list.costCode" :label="list.costName"></el-option>
					</el-select>
					<el-input v-model.number="item.costMoney" type="number" placeholder="请输入内容" :disabled="!item.costCode"></el-input>
					<el-button type="text" @click="delCost(index)">删除</el-button>
				</li>
			</ul>
			<el-button icon="el-icon-plus" style="width: 380px" @click="costs.push({costCode: '',costName: ''})" :disabled="costEnum.length===0"></el-button>
			<div slot="footer" class="dialog-footer">
				<el-button @click="incomeDetailModal = false">取消</el-button>
				<el-button @click="costSubmit" type="primary">确定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
import moment from 'moment';
export default {
	name: 'TJConstProfit',
	data() {
		return {
			year: moment().format('YYYY'),
			tableData: [],
			incomeDetailModal: false,
			incomeDetail: [],
			loading: false,
			title: '成本编辑',
			costEnum: [],//成本编辑字段
			costs: []
		}
	},
	created(){
		this.getData();
		this.getCostEnum();
	},
	methods: {
		//获取数据
		getData() {
			if(!this.year) {
				this.$message.error('请先选择需要查询的年份');
				return;
			}
			this.loading = true;
			this.$axios.get(this.$api.TjCostQuery,{params: {Year: this.year}}).then(res => {
				if(res.data.status === 1) {
					this.tableData = res.data.entity;
				} else {
					this.$message.error(res.data.message);
				}
				this.loading = false;
			}).catch(err => {
				this.$message.error(err.data.message);
				this.loading = false;
			})
		},
		getCostEnum(){
			this.$axios.post(this.$api.ReturnDICCost).then (res => {
				if (res.data.status === 1) {
					this.costEnum = res.data.entity;
				} else {
					this.$message.error(res.data.message);
				}
			}).catch(err => {
				this.$message.error(err.data.message);
			})
		},
		changeCostEnum(val,index) {
			let flag = this.costs.some((x, i) => {
				if(index != i) {
					return x.costCode == val;
				} else {
					return false;
				}
			})
			if(flag) {
				this.$message.error(`该类型已被选`);
				this.costs[index].costCode = '';
			}
		},
		//获取详情
		openDetail(Month){
			this.$axios.get(this.$api.TjCostDetailQuery,{params: {
				Year: this.year,
				Month
			}}).then(res => {
				if(res.data.status === 1) {
					this.costs = res.data.entity;
					if(this.costs.length ===0) this.costs = [{costCode: '',costName: ''}];
					this.title = `成本编辑  ${Number(Month)}月`;
					//this.changeCostEnum();
					this.incomeDetailModal = true;
				} else {
					this.$message.error(res.data.message);
				}
			}).catch(err => {
					this.$message.error(err.data.message);
			})
		},
		delCost(index) {
			this.costs.splice(index, 1);
			//this.changeCostEnum();
		},
		//提交成本详情
		costSubmit(){
			let Month = this.title.substr(-3,2).trim();
			Month = Month < 10 ? `0${Month}` : Month;
			let subParams = {
				Year: this.year,
				Month,
				Operator: '001',
				Costs: this.costs
			}
			this.$axios.post(this.$api.InsertOrUpdateCost, subParams).then(res => {
				if (res.data.status === 1) {
					this.$message.success('保存成功');
					this.incomeDetailModal = false;
					this.getData();
				} else {
					this.$message.error(res.data.message);
				}
			}).catch(err => {
				this.$message.error(res.data.message);
			});
		}
	},
	watch: {
		year: function(val, oldVal){
			if (val !== oldVal) {
				this.getData();
			}
		}
	}
}
</script>
<style scoped>
.items {
	margin:20px 0;
}
.items .item {
	margin-bottom: 10px;
}
.items .item .el-select, .items .item .el-input {
	width: 180px;
	display: inline-block;
}
.items .item .el-input {
	margin-left: 20px;
}
</style>
