<template>
	<div class="content">
		<div class="topTitle">
      <span>医生资质审核</span>
    </div>
		<div class="peopleData">
      <div class="propleSearch">
        <el-input
          placeholder="请输入关键字"
          v-model="params.SearchValue"
          class="arcRadius"
					@keyup.enter.native="getData(true)"
          style="width: 150px;">
          
        </el-input>
				<el-select v-model="params.DeptCode" placeholder="科室类型" clearable>
          <el-option
            v-for="item in doctorEnum"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
				<el-select v-model="params.CertType" placeholder="证书类型" clearable>
          <el-option
            v-for="item in doctorEnum"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button @click="getData(true)" style="margin-left: 16px;">查询</el-button>
				<div class="right">
					<el-button type="primary">导出报表</el-button>
				</div>
      </div>
    </div>
		<el-table :data="tableData" style="width: 100%;" v-loading="loading">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="userName" label="客户姓名"></el-table-column>
      <el-table-column prop="deptNames" label="科室类型"></el-table-column>
      <el-table-column prop="certTypeName" label="证书类型"></el-table-column>
      <el-table-column prop="certCount" label="证书数量"></el-table-column>
      <el-table-column label="操作" width="80">
				<template slot-scope="scope">
					<el-button type="text" @click="openDetail(scope.row.certificates)">查看详情</el-button>
				</template>
			</el-table-column>
    </el-table>
		<div class="fixBottom">
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
		<el-dialog title="医生资质详情" :visible.sync="detailModal" :close-on-click-modal="false" width="800px" @close="detail = []">
			<el-table :data="detail" style="width: 100%" height="300">
				<el-table-column prop="certTypeName" label="证书名称"></el-table-column>
				<el-table-column prop="operatorCode" label="证书编号"></el-table-column>
				<el-table-column prop="certName" label="颁发机构"></el-table-column>
				<el-table-column prop="getTime" label="颁发证书时间">
					<template slot-scope="scope">
						{{scope.row.getTime | formatDate('YYYY-MM-DD')}}
					</template>
				</el-table-column>
				<el-table-column prop="expireTime" label="证书有效截止时间">
					<template slot-scope="scope">
						{{scope.row.expireTime | formatDate('YYYY-MM-DD')}}
					</template>
				</el-table-column>
				<el-table-column prop="RejectContext" label="证书照片">
					<template slot-scope="scope">
						<el-button type="text" @click="openImg(scope.row.certPhoto)">预览</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div slot="footer" class="dialog-footer">
				<el-button @click="detailModal = false">关闭</el-button>
			</div>
		</el-dialog>
		<el-dialog title="预览" :visible.sync="imgModal" :close-on-click-modal="false" width="800px" @close="imgPath = ''">
			<img :src="imgPath">
			<div slot="footer" class="dialog-footer">
				<el-button @click="imgModal = false">关闭</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
import consts from "../../../utils/const"
export default {
	name: 'ZKDoctorQualification',
	data() {
		return {
			detailModal: false,
			imgModal: false,
			detail: [],
			total: 0,
			imgPath: '',
			loading: false,
			tableData: [],
			doctorEnum: [],//医生类型
			params: {
				SearchValue: '',
				CertType: '',
				DeptCode: '',
			},
			searchParams: {
				SearchValue: '',
				CertType: '',
				DeptCode: '',
				PageIndex: 1,
				PageSize: 10
			}
		}
	},
	created() {
		this.getDoctorEnum();
		this.getData(true);
	},
	methods: {
		getData(key) {
			this.loading = true;
			if(key) {
				this.searchParams.SearchValue = this.params.SearchValue;
				this.searchParams.CertType = this.params.CertType;
				this.searchParams.DeptCode = this.params.DeptCode;
				this.searchParams.PageIndex = 1;
			} else {
				this.params.SearchValue = this.searchParams.SearchValue;
				this.params.CertType = this.searchParams.CertType;
				this.params.DeptCode = this.searchParams.DeptCode;
			}
			this.$axios.get(this.$api.GetDocetrQuaList, {params: this.searchParams}).then(res => {
				if (res.data.status === 1) {
					this.tableData = res.data.entity.resDocetrQuas;
					this.total = res.data.entity.recordNum;
				} else {
					this.$message.error(res.data.message);
				}
				this.loading = false;
			}).catch(err => {
				this.$message.error(err.data.message);
				this.loading = false;
			})
		},
		getDoctorEnum() {
			this.$getType('RejectDoctorEnum').then(res => {
				this.doctorEnum = res.data.entity;
			})
		},
		openDetail(data) {
			this.detail = data;
			this.detailModal = true;
		},
		openImg(data) {
			console.log(data)
			this.imgPath = consts.IMG_BASE_PATH + data;
			if(data) {
				this.imgModal = true;
			}
		},
		// 处理分页fn
    handleCurrentChange(val) {
			this.searchParams.PageIndex = val;
			this.getData();
    },
    handleSizeChange(val) {
			this.searchParams.PageSize = val;
			this.searchParams.PageIndex = 1;
      this.getData();
		}
	}
}
</script>
<style scoped>
.propleSearch .el-select {
  display: inline-block;
  width: 120px;
  margin-left: 16px;
}
.importAge {
	display: inline-block;
	margin: 0 8px;
}
.importAge .el-input {
	width: 56px;
}
.importAge >>> .el-input__inner {
	padding: 0 5px;
}
.el-date-editor{
	width: 230px;
}
</style>
