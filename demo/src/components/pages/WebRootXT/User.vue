<template>
    <div id="User">
    <el-container>
        <el-header style="height:48px;background:rgba(229,230,232,1);opacity:1;line-height:48px;font-size:14px;font-family:Microsoft YaHe;">员工管理</el-header>
        <el-main>
            <!-- 搜索条件 -->
            <el-row :gutter="10" class="formContainer">
                <el-col :span="7">
                    <el-input placeholder="请输入姓名/工号"
                              prefix-icon="el-icon-search"
                              v-model="QueryItems">
                    </el-input>
                </el-col>
                <el-col :span="3">
                    <template>
                        <el-select v-model="OrderType" filterable placeholder="角色类型">
                            <el-option v-for="item in options"
                                       :key="item.value"
                                       :label="item.label"
                                       :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                </el-col>
                <el-col :span="1">
                    <el-button type="primary" v-model="search" @click.enter="search">查询</el-button>
                </el-col>
                <el-col :span="1" :offset="11">
                    <el-button type="primary" @click="add">新增</el-button>
                </el-col>
                <el-col :span="1">
                    <el-button type="primary" @click="deleteItem">删除</el-button>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <!-- 表格 -->
                <template>
                    <el-table max-height="5000" :data="UserList"
                              border
                              v-loading="loading">
                        <el-table-column type="selection"
                                         width="36">
                        </el-table-column>
                        <el-table-column label="日期">
                            <template slot-scope="scope">
                                <i class="el-icon-time"></i>
                                <span style="margin-left: 10px">{{ scope.row.date }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="name"
                                         label="姓名">
                            <template slot-scope="scope">
                                <i class="el-icon-time"></i>
                                <span style="margin-left: 10px">{{ scope.row.name }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="province"
                                         label="省份">
                            <template slot-scope="scope">
                                <i class="el-icon-time"></i>
                                <span style="margin-left: 10px">{{ scope.row.province }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="city"
                                         label="市区">
                            <template slot-scope="scope">
                                <i class="el-icon-time"></i>
                                <span style="margin-left: 10px">{{ scope.row.city }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="address"
                                         label="地址">
                            <template slot-scope="scope">
                                <i class="el-icon-time"></i>
                                <span style="margin-left: 10px">{{ scope.row.address }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="zip"
                                         label="邮编">
                            <template slot-scope="scope">
                                <i class="el-icon-time"></i>
                                <span style="margin-left: 10px">{{ scope.row.zip }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="150">
                            <template slot-scope="scope">
                                <el-button @click="watch(scope.row,scope.$index)" type="text" size="small">查看</el-button>
                                <el-button type="text" size="small">编辑</el-button>
                            </template>
                        </el-table-column>

                    </el-table>
                </template>
            </el-row>
        </el-main>
        <el-footer style="z-index:100;bottom:0px;padding-top:10px;">
            <div class="fixBottom">
                <el-button type="text" @click="toggleSelection()">反选</el-button>
                <span class="subitem">合计： <span class="labelColor ftArial">22</span></span>
                <span class="subitem">选中： <span class="labelColor ftArial">22</span></span>
                <div class="right">
                    <el-pagination style="display:inline-block;text-align:right;" @next-click="next"
                                   @current-change="handleCurrentChange"
                                   :page-sizes="[100, 200, 300, 400]"
                                   layout="total, sizes, prev, pager, next, jumper"
                                   :total="total"
                                   :page-size="pagesize">
                    </el-pagination>
                </div>
            </div>

        </el-footer>
    </el-container>
    <!-- 弹窗 -->
    <!-- Form -->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible" v-dialogdrag :close-on-click-modal="false">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="活动名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="活动区域" prop="region">
                <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="活动时间" required prop="date1">
                <el-col :span="11">
                    <el-form-item prop="date1">
                        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-form-item prop="date2">
                        <el-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="即时配送" prop="delivery">
                <el-switch v-model="ruleForm.delivery"></el-switch>
            </el-form-item>
            <el-form-item label="活动性质" prop="type">
                <el-checkbox-group v-model="ruleForm.type">
                    <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                    <el-checkbox label="地推活动" name="type"></el-checkbox>
                    <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                    <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="特殊资源" prop="resource">
                <el-radio-group v-model="ruleForm.resource">
                    <el-radio label="线上品牌商赞助"></el-radio>
                    <el-radio label="线下场地免费"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="活动形式" prop="desc">
                <el-input type="textarea" v-model="ruleForm.desc"></el-input>
            </el-form-item>
        </el-form>


        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
        </div>
    </el-dialog>
</div>
</template>
<script>
export default {
    name: "User",
    data(){
        return {
        UserList: [],
        total: 10,
        pagesize: 10,
        loading: true,
        search: "",
        dialogFormVisible: false,
        ruleForm: {
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
        },
        QueryItems: "",
        OrderType: "",
        options: [],
        rules: {
            name: [
                { required: true, message: '请输入活动名称', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            region: [
                { required: true, message: '请选择活动区域', trigger: 'change' }
            ],
            date1: [
                { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
            ],
            date2: [
                { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
            ],
            type: [
                { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
            ],
            resource: [
                { required: true, message: '请选择活动资源', trigger: 'change' }
            ],
            desc: [
                { required: true, message: '请填写活动形式', trigger: 'blur' }
            ]
                },
            }
        },
            created: function () {
        //初始化列表
        this.getUser(1, 10,"");

    },
    methods: {
        getUser: function (page, pageSize, filter) {
            let that = this;
            axios.post('/Authority/GetUserList',{
                page,
                pageSize,
                filter:"123123"

            })
            .then(function (response) {
                    console.log(response.data)
                that.UserList = response.data;
                //取消加载遮罩
                that.loading = false;

            })
            .catch(function (error) {
                alert(error)
            console.log(error);
            })
        },
        watch: function (row, index) {
            this.dialogFormVisible = true;
            console.log(row, index)
        },
        next: function () { },
        handleCurrentChange: function () { },
        submitForm: function (formName) {
            console.log(this.ruleForm)
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log(this.ruleForm)
                    //post请求
                    axios({
                        method: 'get',
                        url: 'json1.json',
                        params: this.ruleForm
                    }).then(result => {
                        //console.log(result)
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm: function (formName) {
            this.ruleForm = {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            }
            console.log(formName);
            console.log(this.$refs[formName])
            this.$refs[formName].resetFields();
        }
    }
}
</script>

<style scoped>

</style>

