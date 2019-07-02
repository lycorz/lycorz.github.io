<template>
  <div class="content">
    <div class="topTitle">
			<span>个检订单</span>
			<span v-show="submitParams.Order.PackageName" class="subitem" style="margin-left:8px;">已选套餐：{{submitParams.Order.PackageName}}</span>
			<div class="right">
				<el-select v-model="submitParams.Order.OrderType" placeholder="订单类型" :disabled="isEdit" @change="OrderTypeChange">
					<el-option v-for="item in orderType" :key="item.value" :label="item.name" :value="item.value"></el-option>
				</el-select>
				<el-button @click="addPackageModal = true" :disabled="isEdit" icon="el-icon-plus">添加套餐</el-button>
				<el-checkbox v-model="orderVipFlag" :disabled="isEdit">VIP</el-checkbox>
				<el-select v-model="submitParams.Order.ReportTakeWay"  placeholder="报告领取方式" :disabled="isEdit">
					<el-option v-for="item in reportTake" :key="item.value" :label="item.name" :value="item.value"></el-option>
				</el-select>
				<!-- <el-select v-model="submitParams.Order.ReportType" placeholder="报告类型" :disabled="isEdit">
					<el-option v-for="item in reportType" :key="item.value" :label="item.name" :value="item.value"></el-option>
				</el-select> -->
				<el-button type="primary" @click="submitOrder" :disabled="isEdit" :loading="isSubmit">提交</el-button>
			</div>
    </div>
    <el-row>
			<div style="flex: 0 0 368px;border-right: 1px solid #DCDFE5;display: flex;flex-direction: column;" id="resizable">
				<div class="subTitle">
					<span>客户信息</span>
				</div>
				<div class="peopleInfo">
					<el-form :model="submitParams.Order" :rules="rules" ref="submitInfo" label-width="70px" label-position="left">
						<el-row :gutter="16">
							<el-col :span="16">
								<el-form-item label="身份证号" prop="IdcardNum">
									<el-input v-model="submitParams.Order.IdcardNum" maxlength="18" ref="idCardNum"></el-input>
								</el-form-item>
								<el-form-item label="体检账号" prop="CardNum">
									<el-input v-model="submitParams.Order.CardNum" maxlength="20" @keyup.enter.native="cardnumKeyup($event)"></el-input>
								</el-form-item>
								<el-form-item label="姓名" prop="CustomerName">
									<el-input v-model="submitParams.Order.CustomerName" :disabled="isEdit"></el-input>
								</el-form-item>
								<el-form-item label="性别" prop="Sex" class="sexValue">
									<el-select v-model="submitParams.Order.Sex"  :disabled="isEdit">
										<el-option label="男" :value="1"></el-option>
										<el-option label="女" :value="2"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="8" style="text-align: center;">
								<el-button type="primary" plain style="margin-top: 17px;width: 100%;" @click="getIdentity">刷身份证</el-button>
								<img v-if="submitParams.Order.Photo" :src="'data: image/bmp; base64,' + submitParams.Order.Photo" alt="" style="width: 80%;margin: 20px auto;">
								<img v-else src="@/assets/img/default.jpg" alt="" style="width: 80%;margin: 20px auto;">
								<el-button type="text" @click="getShot" :disabled="isEdit">拍照</el-button>
							</el-col>
						</el-row>
						<el-form-item label="民族" prop="Nation">
							<el-input v-model="submitParams.Order.Nation" :disabled="isEdit"></el-input>
						</el-form-item>
						<el-row :gutter="16">
							<el-col :span="16">
								<el-form-item label="出生日期" prop="Birthday">
									<el-date-picker v-model="submitParams.Order.Birthday" class="w100" :disabled="isEdit"></el-date-picker>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-button-group style="margin-top: 17px; width: 100%;">
									<el-button style="padding: 7px 18px;width: 50%;">{{age}}</el-button>
									<el-button style="padding: 7px 18px;width: 50%;">岁</el-button>
								</el-button-group>
							</el-col>
						</el-row>
						<el-form-item label="VIP属性" prop="VipFlag">
							<el-radio-group v-model="submitParams.Order.VipFlag" :disabled="isEdit">
								<el-radio :label="1">是</el-radio>
								<el-radio :label="0">否</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="职业" prop="Occupation">
							<el-input v-model="submitParams.Order.Occupation" :disabled="isEdit"></el-input>
						</el-form-item>
						<el-form-item label="婚姻状况" prop="MaritalStatus">
							<el-select v-model="submitParams.Order.MaritalStatus" :disabled="isEdit">
								<el-option label="未婚" :value="1"></el-option>
								<el-option label="已婚" :value="2"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="手机号" prop="Tele">
							<el-input v-model="submitParams.Order.Tele" :disabled="isEdit" maxlength="11"></el-input>
						</el-form-item>
						<el-form-item label="单位" prop="UnitName">
							<el-input v-model="submitParams.Order.UnitName" :disabled="isEdit"></el-input>
						</el-form-item>
						<el-form-item label="地址" prop="Addr">
							<el-input v-model="submitParams.Order.Addr" :disabled="isEdit"></el-input>
						</el-form-item>
						<el-form-item label="部门" prop="DeptName">
							<el-input v-model="submitParams.Order.DeptName" :disabled="isEdit"></el-input>
						</el-form-item>
						<el-form-item label="班组" prop="TeamName">
							<el-input v-model="submitParams.Order.TeamName" :disabled="isEdit"></el-input>
						</el-form-item>
						<el-form-item label="备注信息" prop="Remark">
							<el-input type="textarea" v-model="submitParams.Order.Remark" :disabled="isEdit"></el-input>
						</el-form-item>
					</el-form>
				</div>
			</div>
			<div style="flex:1;overflow: hidden;display: flex;flex-direction: column;">
				<div class="subTitle">
					<span class="subitem labelColor">订单信息</span>
					<span class="subitem"><span style="font-family: 'Arial'">{{submitParams.Order.CreateOrderTime}}</span>创建</span>
					<div class="right" v-show="submitParams.Order.OrderCode != '00000000-0000-0000-0000-000000000000'">
						<el-popover
							placement="bottom"
							width="160"
							v-model="visible1">
							<p>是否打印导检单？</p>
							<div style="text-align: right; margin: 0">
								<el-button size="mini" type="text" @click="visible1 = false">取消</el-button>
								<el-button type="primary" size="mini" @click="printGuide">确定</el-button>
							</div>
							<el-button slot="reference">打印导检单</el-button>
						</el-popover>
						<el-popover
							placement="bottom"
							width="160"
							style="margin: 0 8px;"
							v-model="visible2">
							<p>是否打印姓名条码？</p>
							<div style="text-align: right; margin: 0">
								<el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
								<el-button type="primary" size="mini" @click="printName">确定</el-button>
							</div>
							<el-button slot="reference">打印姓名条码</el-button>
						</el-popover>
						<el-button @click="printCheckModal">打印检验条码</el-button>
					</div>
				</div>
				<div class="peopleData">
					<div class="propleSearch">
						<el-button @click="addProjectModal = true" :disabled="isEdit" icon="el-icon-plus" v-if="submitParams.Order.OrderType === 0">添加项目</el-button>
						<el-button @click="delModal" :disabled="isEdit" icon="el-icon-delete">删除</el-button>
						<el-button @click="discountBtn" :disabled="isEdit">打折</el-button>
						<div class="right">
							<span class="subitem">单位付费： ￥<span class="labelColor ftArial">{{ submitParams.Order.UnitPayMoney | numFilter}}</span></span>
							<span class="subitem">个人已付： ￥<span class="labelColor ftArial">{{ submitParams.Order.PaidMoney | numFilter}}</span></span>
							<span class="subitem">本次应收： ￥<span class="labelColor ftArial">{{ (exePrice - submitParams.Order.UnitPayMoney - submitParams.Order.PaidMoney) | numFilter}}</span></span>
						</div>
					</div>
				</div>
				<el-table ref="table" :data="tableData" tooltip-effect="dark" style="width: 100%" @row-click="clickRow($event, 'table')" @selection-change="handleSelectionChange" v-if="submitParams.Order.OrderType == 0">
					<el-table-column type="selection" width="55">
					</el-table-column>
					<el-table-column prop="itemName" label="项目名称" :show-overflow-tooltip="true" sortable>
					</el-table-column>
					<el-table-column prop="isUnitItem" label="付费方式" width="150" align="center" sortable>
						<template slot-scope="scope">
							{{scope.row.feeType ? scope.row.feeType :'个人'}}
						</template>
					</el-table-column>
					<el-table-column prop="fullPrice" label="原价" sortable width="150" align="center">
						<template slot-scope="scope">
							￥{{scope.row.fullPrice | numFilter}}
						</template>
					</el-table-column>
					<el-table-column prop="exePrice" label="执行价格" sortable width="150" align="center">
						<template slot-scope="scope">
							￥{{scope.row.exePrice | numFilter}}
						</template>
					</el-table-column>
					<el-table-column prop="checkStatus" label="项目状态" width="150">
						<template slot-scope="scope">
							{{scope.row.checkStatus === 1 ? '已检' : '未检'}}
						</template>
					</el-table-column>
				</el-table>
				<el-table ref="table" :data="tableData" style="width: 100%" @row-click="clickRow2" @selection-change="handleSelectionChange" v-else>
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column label="套餐名称" prop="packageName" sortable></el-table-column>
					<el-table-column label="原价" prop="fullPrice" sortable>
						<template slot-scope="scope">
							￥{{scope.row.fullPrice | numFilter}}
						</template>
					</el-table-column>
					<el-table-column label="执行价格" prop="exePrice" sortable>
						<template slot-scope="scope">
							￥{{scope.row.exePrice | numFilter}}
						</template>
					</el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button type="text" @click="openPackageDetail(scope.row.children)">查看详情</el-button>
						</template>
					</el-table-column>
				</el-table>
				<!-- 底部信息栏 -->
				<div class="fixBottom">
					<el-button type="text" @click="toggleSelection('tableData', 'table')">反选</el-button>
					<span class="subitem">合计： <span class="labelColor ftArial">{{tableData.length}}</span></span>
					<span class="subitem">选中： <span class="labelColor ftArial">{{multipleSelection.length}}</span></span>
					<div class="right">
						<span class="subitem">原价： ￥<span class="labelColor ftArial">{{ totalPrice | numFilter }}</span></span>
						<span class="subitem">折扣金额： ￥<span class="labelColor ftArial">{{ (totalPrice - exePrice) | numFilter }}</span></span>
						<span class="subitem">实收： ￥<span class="labelColor ftArial">{{exePrice | numFilter }}</span></span>
					</div>
				</div>
				<!-- 弹窗块 -->
				<el-dialog title="套餐详情" :visible.sync="packageDetailModal" :close-on-click-modal="false" width="800px" @close="packageDatail = []">
					<el-table :data="packageDatail" style="width: 100%">
						<el-table-column prop="itemName" label="项目名称"></el-table-column>
						<el-table-column prop="fullPrice" label="原价">
							<template slot-scope="scope">
								￥{{scope.row.fullPrice | numFilter}}
							</template>
						</el-table-column>
						<el-table-column prop="exePrice" label="执行价格">
							<template slot-scope="scope">
								￥{{scope.row.exePrice | numFilter}}
							</template>
						</el-table-column>
						<el-table-column prop="checkStatus" label="项目状态">
							<template slot-scope="scope">
								￥{{scope.row.checkStatus === 1 ? '已检' : '未检'}}
							</template>
						</el-table-column>
					</el-table>
					<div slot="footer" class="dialog-footer">
						<el-button type="primary" @click="packageDetailModal = false">关闭</el-button>
					</div>
				</el-dialog>
				<el-dialog title="添加套餐" :visible.sync="addPackageModal" :close-on-click-modal="false" width="800px" @open="getPackageList"  @close="closeModal('packageDiscount')">
					<div class="modal-tree ">
						<div class="modal-top">{{addPackageType}}</div>
						<div class="modal-con addPackage" v-if="submitParams.Order.OrderType === 0">
							<el-tree
								empty-text="正在获取中，请稍后..."
								:data="GetPackageList"
								show-checkbox
								node-key="id"
								ref="tree1"
								@check="treeClick">
							</el-tree>
						</div>
						<div class="modal-con addPackage" v-if="submitParams.Order.OrderType === 1">
							<el-tree
								:data="GetPackageList"
								empty-text="正在获取中，请稍后..."
								show-checkbox
								node-key="id"
								@check-change="treeClick3"
								ref="tree1">
							</el-tree>
						</div>
						<div class="packageDis">
							<span class="item">原价：￥ <span>{{packageDiscount.totalPrice2 | numFilter}}</span></span>
							<div class="right">
								<el-checkbox v-model="isFree">优惠自由</el-checkbox>
								折扣：<div class="item-list iptNum">
												<el-input-number v-model="packageDiscount.discount" @blur="discountHandle('packageDiscount')" @change="discountHandle('packageDiscount')" :min="0" :max="1" :step="0.1"></el-input-number>
											</div>&nbsp;&nbsp;&nbsp;&nbsp;
								实收：<el-input v-model.number="packageDiscount.exePrice2" type="number" style="width: 100px;" @blur="realPriceHandle('packageDiscount')"></el-input>&nbsp;元
							</div>
						</div>
					</div>
					<div slot="footer" class="dialog-footer">
							<el-button @click="cancelPackageBtn" style="margin-right: 8px;">取 消</el-button>
							<el-button 	v-if="submitParams.Order.OrderType === 1" @click="addPackageBtn" style="margin-right: 8px;">确 定</el-button>
							<el-popover
								v-if="submitParams.Order.OrderType === 0"
								placement="top"
								width="160"
								v-model="visible3">
								<p>点击确定将替换原选的项目及套餐！</p>
								<div style="text-align: right; margin: 0">
									<el-button size="mini" type="text" @click="visible3 = false">取消</el-button>
									<el-button type="primary" size="mini" @click="addPackageBtn">确定</el-button>
								</div>
								<el-button slot="reference" type="primary">确 定</el-button>
							</el-popover>
					</div>
				</el-dialog>
				<el-dialog title="添加项目" :visible.sync="addProjectModal" :close-on-click-modal="false" width="800px" @open="getDicItemList" @close="closeModal('projectDiscount')">
					<div class="addProject">
						<div class="project-left">
							<el-tabs v-model="activeTabName" type="card" @tab-click="tabsClick" class="addTabs" style="user-select: none;">
								<!-- <el-tab-pane label="按套餐添加" name="first" style="display: none">
									<div class="modal-tree" style="border-top: none;">
										<div class="modal-top" style="text-indent: 8px;">
											<el-input placeholder="请搜索" v-model="filterPackage" style="width: 150px;"></el-input>
											<div class="right" style="margin-right: 8px">
												<el-button @click="addBtn">添加</el-button>
											</div>
										</div>
										<div class="modal-con">
											<el-tree
												empty-text="正在获取中，请稍后..."
												:data="GetPackageFilter"
												show-checkbox
												node-key="id"
												ref="first"
												@node-click="dbClick"
												:filter-node-method="filtertree"
												>
											</el-tree>
										</div>
										<div class="fixBottom">
											<el-button type="text" @click="allTreeSelection('GetPackageFilter', 'first', GetPackageFilterNum)">全选</el-button>
											<span class="subitem">合计： <span class="labelColor ftArial">{{GetPackageFilter.length}}</span></span>
											<span class="subitem">选中： <span class="labelColor ftArial">{{selectedFirstTotal || 0}}</span></span>
										</div>
									</div>
								</el-tab-pane> -->

								<el-tab-pane label="按项目添加" name="third">
									<div class="modal-tree" style="border-top: none;">
										<div class="modal-top"  style="text-indent: 8px;">
											<el-input placeholder="请搜索" v-model="filterProject" style="width: 150px;" @keyup.enter.native="filterTree"></el-input>
											<div class="right" style="margin-right: 8px">
												<el-button @click="addBtn" v-no-more-click>添加</el-button>
											</div>
										</div>
										<div class="modal-con">
											<el-tree
												:data="GetItemListView"
												empty-text="正在获取中，请稍后..."
												show-checkbox
												node-key="id"
												ref="third"
												@node-click="dbClick"
												:filter-node-method="filtertree">
											</el-tree>
										</div>
										<div class="fixBottom">
											<el-button type="text" @click="allTreeSelection('GetItemListView', 'third', GetItemListNum)">全选</el-button>
											<span class="subitem">合计： <span class="labelColor ftArial">{{GetItemListView.length}}</span></span>
											<span class="subitem">选中： <span class="labelColor ftArial">{{selectedThirdTotal || 0}}</span></span>
										</div>
									</div>
								</el-tab-pane>
								<el-tab-pane label="按科室添加" name="second">
									<div class="modal-tree" style="border-top: none;">
										<div class="modal-top"  style="text-indent: 8px;">
											<!-- <el-input placeholder="请搜索" v-model="filterDept" style="width: 150px;"></el-input> -->
											<div class="right" style="margin-right: 8px">
												<el-button @click="addBtn" v-no-more-click>添加</el-button>
											</div>
										</div>
										<div class="modal-con">
											<el-tree
												:data="GetDeptList"
												empty-text="正在获取中，请稍后..."
												show-checkbox
												ref="second"
												node-key="id"
												@node-click="dbClick"
												:filter-node-method="filtertree"
												>
											</el-tree>
										</div>
										<div class="fixBottom">
											<el-button type="text" @click="allTreeSelection('GetDeptList', 'second', GetDeptListNum)">全选</el-button>
											<span class="subitem">合计： <span class="labelColor ftArial">{{GetDeptList.length}}</span></span>
											<span class="subitem">选中： <span class="labelColor ftArial">{{selectedSecondTotal || 0}}</span></span>
										</div>
									</div>
								</el-tab-pane>
							</el-tabs>
						</div>
						<div class="project-right">
							<div class="modal-tree" style="margin-top: 40px;">
								<div class="modal-top">
									<span>已选项目</span>
								</div>
								<div class="modal-con">
									<el-tree
										:data="selectedListAll"
										node-key="id"
										ref="treeRight"
										:render-content="renderContent"
										>
									</el-tree>
								</div>
								<div class="fixBottom">
									<span class="subitem" style="margin-left: 8px;">合计： <span class="labelColor ftArial">{{selectedListAll.length}}</span></span>
								</div>
							</div>
						</div>
					</div>
					<div slot="footer" class="dialog-footer">
						<div class="packageDis">
							<span class="item">原价：￥ <span>{{projectDiscount.totalPrice | numFilter}}</span></span>
							<div class="right">
								<el-checkbox v-model="isFree">优惠自由</el-checkbox>
								折扣：<div class="item-list iptNum">
												<el-input-number v-model="projectDiscount.discount" @blur="discountHandle('projectDiscount')" @change="discountHandle('projectDiscount')" :min="0" :max="1" :step="0.1"></el-input-number>
											</div>&nbsp;&nbsp;&nbsp;&nbsp;
								实收：<el-input v-model.number="projectDiscount.exePrice2" type="number" style="width: 100px;" @blur="realPriceHandle('projectDiscount')"></el-input>&nbsp;元
							</div>
						</div>
						<el-button @click="cancelBtn">取 消</el-button>
						<el-button type="primary" @click="confirmAddProjectBtn">确 定</el-button>
					</div>
				</el-dialog>
				<el-dialog title="订单信息" :visible.sync="orderInfoModal" :close-on-click-modal="false" width="800px">
					<div class="modal-title">
						<span>订单信息</span>
					</div>
					<div class="modal-con">
						<el-table
								:data="orderList"
								border
								height="250"
								style="width: 100%;margin-top: 20px;">
								<el-table-column
								prop="cardNum"
								label="体检卡号"
								>
								</el-table-column>
								<el-table-column
								prop="idcardNum"
								width="180px"
								label="身份证号"
								>
								</el-table-column>
								<el-table-column
								prop="unitName"
								label="单位名称"
								>
								</el-table-column>
								<el-table-column
								prop="orderMoney"
								label="体检金额"
								>
								</el-table-column>
								<el-table-column
								prop="createOrderTime"
								label="创建时间"
								>
									<template slot-scope="scope">
										{{scope.row.createOrderTime | formatDate('YYYY-MM-DD')}}
									</template>
								</el-table-column>
								<el-table-column
								prop="status"
								label="订单状态"
								>
								</el-table-column>
								<el-table-column
								fixed="right"
								label="操作"
								width="100">
								<template slot-scope="scope">
										<el-button type="text" v-if="scope.row" @click="viewOrder(scope.row)">查看</el-button>
										<el-button type="text">编辑</el-button>
								</template>
								</el-table-column>
						</el-table>
					</div>
					<div slot="footer" class="dialog-footer">
						<el-button @click="orderInfoModal = false">关 闭</el-button>
						<el-button type="primary" >创建新订单</el-button>
					</div>
				</el-dialog>
				<el-dialog title="当前客户订单" :visible.sync="currentOrderModal" width="800px" :close-on-click-modal="false" class="currentOrder">
					<div class="modal-title">客户信息</div>
					<div class="modal-con" style="max-height: 300px;overflow-y： auto;">
						<ul>
							<li>
								姓名： <span>{{viewData.customerName}}</span>
							</li>
							<li>
								性别： <span>{{viewData.sex === 1 ? '男' : '女'}}</span>
							</li>
							<li>
								职业： <span>{{viewData.deptName}}</span>
							</li>
							<li>
								手机号： <span>{{viewData.tele}}</span>
							</li>
							<li>
								出生日期： <span>{{viewData.birthday | formatDate('YYYY-MM-DD')}}</span>
							</li>
							<li>
								婚姻状况： <span>{{viewData.deptName}}</span>
							</li>
							<li>
								民族： <span>{{viewData.nation}}</span>
							</li>
						</ul>
					</div>
					<div class="modal-title">检查项目</div>
					<div class="modal-con" style="max-height: 250px;overflow-y:auto;">
						<el-table
								:data="viewData.items"
								border
								style="width: 100%">
								<el-table-column
								prop="itemName"
								label="检查项目"
								>
								</el-table-column>
								<el-table-column
								prop="name"
								label="项目归属"
								>
								</el-table-column>
								<el-table-column
								prop="fullPrice"
								label="原价"
								>
								</el-table-column>
								<el-table-column
								prop="city"
								label="折扣"
								>
									<template slot-scope="scope">
										{{scope.row.exePrice / scope.row.fullPrice}}
									</template>
								</el-table-column>
								<el-table-column
								prop="exePrice"
								label="执行价格"
								>
								</el-table-column>
								<el-table-column
								prop="checkStatus"
								label="项目状态"
								>
								</el-table-column>
						</el-table>
					</div>
				</el-dialog>
				<el-dialog title="打印检验条码" :visible.sync="printModal" width="800px" :close-on-click-modal="false" class="currentOrder">
					<div class="modal-title">
						<div class="right">
							<el-select v-model="value" placeholder="打印类型" style="margin-right: 8px;">
								<el-option
									v-for="item in options"
									:key="item.value"
									:label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
							<el-button type="primary" @click="printCheck">打印</el-button>
						</div>
					</div>
					<div class="modal-con" style="width: 100%;">
						<el-table
							:data="multipleSelection"
							border
							style="width: 100%">
							<el-table-column
							fixed
							prop="itemName"
							label="项目"
							>
							</el-table-column>
							<el-table-column
							prop="itemCode"
							label="条码号"
							>
							</el-table-column>
							<el-table-column
							prop="itemCode"
							label="打印时间"
							>
							</el-table-column>
							<el-table-column
							prop="checkStatus"
							label="打印状态"
							>
							</el-table-column>
						</el-table>
					</div>
					<div slot="footer" class="dialog-footer">
						<el-button @click="printModal = false">关 闭</el-button>
					</div>
				</el-dialog>
				<el-dialog title="打折" :visible.sync="discountModal" :close-on-click-modal="false" width="800px" class="discount">
					<ul class="modal-con">
						<li class="item">
							<span>合计金额：</span>
							<div class="item-list" ><el-input v-model="discountData.totalPrice2" disabled style="color: #606266;"></el-input>元</div>
						</li>
						<li class="item">
							<span>折扣：</span>
							<div class="item-list iptNum" style="width: 150px">
								<el-input-number v-model="discountData.discount" @blur="discountHandle('discountData')" @change="discountHandle('discountData')" :min="0" :max="1" :step="0.1"></el-input-number>
							</div>
						</li>
						<li class="item">
							<span>折扣金额：</span>
							<div class="item-list" ><el-input type="number" v-model.number="discountData.difPrice2" @blur="difPriceHandle('discountData')"></el-input>元</div>
						</li>
						<li class="item">
							<span>实收：</span>
							<div class="item-list"><el-input type="number" v-model.number="discountData.exePrice2" @blur="realPriceHandle('discountData')"></el-input>元</div>
						</li>
					</ul>
					<div slot="footer" class="dialog-footer">
						<el-checkbox v-model="isFree">优惠自由</el-checkbox>
						<el-button @click="discountModal = false">取 消</el-button>
						<el-button type="primary" @click="confirmDiscount">确 定</el-button>
					</div>
				</el-dialog>
			</div>
    </el-row>
  </div>
</template>

<script>
import moment from 'moment'
import PinyinMatch from 'pinyin-match'
import _ from 'lodash'
import {mapState} from 'vuex'
export default {
  name: 'DDOrder',
	data() {
		var validateId = (rule, value, callback) => {
			if(value.length === 18) {
				callback();
				return;
			}
			if (this.isEdit) {
				this.$confirm('身份证位数不合法，是否继续操作？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
					this.clearCustomer();
					this.isEdit = false;
					this.getOrderList();
					callback();
        })
			} else {
				callback();
			}
		};
		return {
			isFree: false,//优惠自由权限
			dbClickFlag: 0,
			load: '',//获取时的加载中
			isPrint: true,
			isSubmit: false,//是否正在提交
			isEdit: true,// 是否允许编辑
			isDisCount: false, // 是否允许打折窗口点击确定
			isDisCount2: false, // 是否允许打折窗口点击确定-选择套餐
			isMoreOrder: false, // 是否允许多条订单
			//打印按钮弹出框flag
			visible1: false,
			visible2: false,
			visible3: false,
			// 弹窗控制变量
			packageDetailModal: false,
			addPackageModal: false,
			addProjectModal: false,
			printModal: false,
			orderInfoModal: false,
			currentOrderModal: false,
			discountModal: false,
			packageDatail: [],//查看套餐详情数据列表
			// tree - 筛选字段
			// filterPackage: '',
			// filterDept: '',
			filterProject: '',//添加项目-按项目添加搜索字段

			orderList: [], // 订单信息的返回list
			formLabelWidth: '70px',
			orderVipFlag: false,
			submitParams: {
				Operator: '001',//window.USERINFO.operatorCode
				Order: {
					OrderCode: '00000000-0000-0000-0000-000000000000',
					CustomerCode: '00000000-0000-0000-0000-000000000000',
					CustomerName: '',
					Sex: '',//1 男 2 女
					MaritalStatus: 1,//1 未婚  =2 已婚
					Nation: '',
					Birthday: '',
					IdcardNum: '',
					Photo: '',
					VipFlag: 0,//0非 1 是
					CardNum: '',
					Tele: '',
					Addr: '',
					Occupation: '',
					UnitName: '',
					DeptName: '',
					TeamName: '',
					PackageCode: '00000000-0000-0000-0000-000000000000',
					OrderVipFlag: 0,//0非 1 是
					OrderType: '',
					ReportType: '',
					CreateOrderTime: moment().format('YYYY-MM-DD'),
					Status: '',
					IsLock: false,
					Remark: '',
					OrderMoney: 0,
					PaidStatus: 0,
					PaidMoney: 0,//已支付金额，查询的
					UnitPayMoney: 0,//单位付费金额。查询的
					Items: [],
					ReportTakeWay: 0//报告领取方式
				}
			},
			age: '0', // 年龄
			rules: {
					CardNum: [
							{ required: true, message: '请输入正确位数的体检卡号', trigger: 'blur' }
					],
					CustomerName: [
							{ required: true, message: '请输入姓名', trigger: 'blur' }
					],
					Sex: [
							{  required: true, message: '请输入性别', trigger: 'blur' }
					],
					IdcardNum: [
							{ required: true, message: '与身份证号码位数不符', trigger: 'blur' },
							{ mmin: 1, max: 18, validator: validateId, trigger: 'blur' }
					],
					Birthday: [
							{ type: 'date', required: true, message: '请选择时间', trigger: 'change' }
					],
					VipFlag: [
							{  required: true, message: '请选择Vip属性', trigger: 'blur' }
					],
					Tele: [
							{ required: true, message: '请输入联系电话', trigger: 'blur' },
							{ pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur'  }
					]
			},
			options: [],//  打印类型
			orderType: [], //订单类型
			// reportType: [], // 报告类型
			reportTake: [ // 报告领取方式
					{
							value: 0,
							name: '个人领取'
					},
					{
							value: 1,
							name: '快递领取'
					},
					{
							value: 2,
							name: '线上领取'
					}
			],
			GetItemList: [], // 检查项目字典源-添加项目
			GetItemListView: [], // 检查项目字典源-添加项目-弹窗中显示的数据
			GetItemListNum: 0, // 检查项目字典项目数-添加项目
			GetDeptList: [], // 检查科室字典源-添加项目
			GetDeptListNum: 0, // 检查科室字典项目数-添加项目
			//GetPackageFilter: [], // 检查套餐字典源-添加项目
			//GetPackageFilterNum: 0, // 检查套餐字典项目数-添加项目
			GetPackageList: [], // 检查套餐字典源
			addPackageType: '',//添加套餐类型名称

			//添加项目框
			selectedLeft: [],// 左侧所选择的-添加套餐专用
			selectedRight: [],// 右侧所选择的
			selectedListAll: [],// 右侧展示的树

			viewData: {}, // 查看当前订单data
			discountData: { //打折弹窗数据
				totalPrice: 0,
				totalPrice2: 0,
				exePrice: 0,
				exePrice2: 0,
				discount: 0,
				discount2: 0,
				difPrice: 0,
				difPrice2: 0,
			},
			packageDiscount: {//选择套餐打折数据
				totalPrice: 0,
				totalPrice2: 0,
				discount: 0,
				discount2: 0,
				exePrice: 0,
				exePrice2: 0,
			},
			projectDiscount: {//添加项目打折数据
				totalPrice: 0,
				totalPrice2: 0,
				discount: 0,
				discount2: 0,
				exePrice: 0,
				exePrice2: 0,
			},
			tableData: [],
			tableData2: [],//筛查套餐选择后的数据集合
			multipleSelection: [],
			value: '',
			selectedTotal: 0, // 选中条数
			activeTabName: 'third',//添加项目tabs默认
			packageConfig: {}
		}
	},
	created: function () {
		this.GetOrderType();
		this.submitParams.Order.IdcardNum = '111111111111111111'
	},
	methods: {
		//添加项目-按项目添加-搜索fn
		// 【暂时已改为watch】
		filterTree(){
			if(this.filterProject) {
				this.GetItemListView = this.GetItemList.filter(x => {
					return PinyinMatch.match(x.itemName, this.filterProject);
				})
			} else {
				this.GetItemListView = this.GetItemList;
			}
		},
		//查看套餐详情
		openPackageDetail(data) {
			this.packageDatail = data;
			this.packageDetailModal = true;
		},
		//点击当前行选中
		clickRow2(row, event){
			if(event.label === '操作') {
				return;
			}
			this.$refs.table.toggleRowSelection(row);
		},
		//打印导检单
		printGuide(){
			this.visible1 = false
			alert('打印导检单')
		},
		//打印姓名条码
		printName(){
			this.visible2 = false
			alert('打印姓名条码')
		},
		//打印检验条码
		printCheckModal(){
			this.printModal = true;
		},
		printCheck(){
			alert('打印检验条码')
		},
		//切换订单类型时出发
		OrderTypeChange(val) {
			if (this.tableData.length === 0) return;
			this.$confirm('<span>您确定要放弃当前编辑的订单进行订单类型切换吗？</span><br /><i style="color:#8F9399;">订单类型切换会清空未提交的数据</i>', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				dangerouslyUseHTMLString: true,
				type: 'warning'
			}).then(() => {
				// this.submitParams.Order.ReportTakeWay = '';
				// this.submitParams.Order.ReportType = '';
				this.tableData = [];
			}).catch(() => {
				if (val) {
					this.submitParams.Order.OrderType = 0;
				} else {
					this.submitParams.Order.OrderType = 1;
				}
			})
		},
		submitOrder() {//提交订单
		 this.$refs.submitInfo.validate((valid) => {
			 if(valid) {
				if (this.tableData.length === 0 && (this.submitParams.Order.UnitPayMoney + this.submitParams.Order.PaidMoney) == 0) {
					this.$message.error('请添加项目后提交');
					return;
				}
				this.isSubmit = true;
				let loading = this.$loading({
					lock: true,
					text: '提交订单中，请稍后...',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				});
				this.tableData = this.tableData.map(x => {
					x.fullPrice = Number(x.fullPrice);
					x.exePrice = Number(x.exePrice);
					if (!x.IsUnitItem) x.IsUnitItem = false;
					if (!x.IsGiveUp) x.IsGiveUp = false;
					if (!x.FeeType) x.FeeType = '';
					if (!x.CheckStatus) x.CheckStatus = 0;
					return x;
				})
				this.submitParams.Order.Items = [];
				this.submitParams.Order.Packages = [];
				if(this.submitParams.Order.OrderType === 0) {
					this.tableData.forEach(x => {
						this.submitParams.Order.Items.push(this.$handleUpperCase(x));
					});
				} else {
					this.tableData.forEach( (x, index) => {
						this.submitParams.Order.Packages.push({
							PackageCode: x.packageCode,
							PackageName: x.packageName,
							ExePrice: x.exePrice,
							PackageType: x.packageType,
							SexType: x.sexType,
							FilterType: x.filterType,
							InspectPurpose: x.inspectPurpose,
							Items: []
						})
						x.children.forEach(y => {
							this.submitParams.Order.Packages[index].Items.push(this.$handleUpperCase(y))
						})
					})
				}
				this.submitParams.Order.OrderMoney = this.exePrice || 0;
				this.submitParams.Order.Birthday = moment(this.submitParams.Order.Birthday).format('YYYY-MM-DD');
				this.$axios.post(this.$api.SubmitOrder, this.submitParams).then(res => {
					if (res.data.status === 1 && res.data.entity) {
						this.$message.success('订单创建成功');
						this.clearCustomer();
						this.submitParams.Order.IdcardNum = '';
					} else {
							this.$message.error(res.data.message);
					}
					this.isSubmit = false;
					loading.close();
				}).catch(err => {
					this.submitParams.Order.Birthday = new Date(this.submitParams.Order.Birthday);
					this.$message.error(err.data.message);
					loading.close();
					this.isSubmit = false;
				})
			 } else {
				 return;
			 }
		 })
		},
		//打折按钮
		discountBtn(){
			if (this.multipleSelection.length === 0 ) {
				this.$message({
					type: 'error',
					message: '请至少选择一项进行打折'
				});
				return;
			}
			this.discountData.totalPrice = 0;
			this.discountData.exePrice = 0;
			this.discountData.lowestPriceAll = 0;
			this.multipleSelection.forEach(x => {
				this.discountData.totalPrice += x.fullPrice;
				this.discountData.lowestPriceAll += x.lowestPrice;
				this.discountData.exePrice += Number(x.exePrice);
			})
			this.discountData.exePriceAll = this.discountData.exePrice;
			this.discountData.discount = parseInt(this.discountData.exePrice / this.discountData.totalPrice * 100) / 100;
			this.discountData.discount2 = this.discountData.exePrice / this.discountData.totalPrice;
			this.discountData.difPrice = this.discountData.totalPrice - this.discountData.exePrice;
			this.handleTwo('discountData');
			this.discountModal = true;
		},
		// 打折框-确定
		confirmDiscount(){
			let lowestDiscount = this.discountData.exePriceAll / this.discountData.totalPrice;
			if(this.USERINFO.discount > lowestDiscount) {
				this.$message.error(`您最低的折扣为${this.USERINFO.discount.toFixed(2)}`);
				return;
			}
			if(this.isFree) {
				if (lowestPriceAll > this.discountData.exePrice) {
					this.$message.error(`您最低的折扣金额为${lowestPriceAll | numFilter}元`);
					return;
				}
			}
			//未考虑添加筛查套餐的情况
			this.multipleSelection = this.multipleSelection.map(x => {
					x.exePrice = this.discountData.exePrice / this.discountData.lowestPriceAll * x.lowestPrice;
					return x;
				})
			// this.multipleSelection.forEach(x => {
			// 	x.exePrice = x.fullPrice * this.discountData.discount2;
			// 	if(this.submitParams.Order.OrderType === 1) {
			// 		x.children.forEach(y => {
			// 			y.exePrice = y.fullPrice * this.discountData.discount2;
			// 		})
			// 	}
			// })

			this.isFree = false;
			this.discountModal = false;
		},
		//树的筛选
		filtertree(value, data) {
			if (!value) return true;
			return data.label.indexOf(value) !== -1;
		},
		// tree单选的实现 + 实时更新选中项目
		treeClick(a,b){
			if (b.checkedKeys.length > 0) {
				this.$refs.tree1.setCheckedKeys([a.id]);
			} else {
				this.$refs.tree1.setCheckedKeys([]);
			}
			if(b.checkedNodes.length === 0) {
				this.selectedLeft = [];
				this.packageConfig.PackageCode = '00000000-0000-0000-0000-000000000000';
				this.packageConfig.PackageName = '';
			} else {
				this.selectedLeft = a.children;
				this.packageConfig.PackageCode = a.packageCode;
				this.packageConfig.PackageName = a.packageName;
			}
			this.getDiscount('packageDiscount', this.selectedLeft);
		},
		// 对项目执行价的处理
		distributePrice(data, exePriceAll, discount){//要处理的一维数组，执行价之和，折扣率
			let difPrice = exePriceAll;
			data = data.map((x, index) => {
				x.exePrice = x.fullPrice * discount;
				if(x.exePrice <= x.lowestPrice) {
					difPrice = difPrice - x.lowestPrice;
					x.exePrice = x.lowestPrice;
				}
				return x;
			})
			if (difPrice !== exePriceAll ) {
				data = data.filter(x => {
					return x.exePrice > x.lowestPrice;
				})
				let lastFullPrice = 0;
				data.forEach(x => {
					lastFullPrice += x.fullPrice;
				})
				this.distributePrice(data, difPrice, difPrice / lastFullPrice);
			}
		},
		treeClick3(a,b){
			let arr = [];
			this.tableData2.forEach(x => {
				arr.push(x.id);
			})
			// 未做重复项目价格处理
			if(a.children) {
				let index = arr.indexOf(a.id);
				if(b && index===-1) {
					this.tableData2.push(_.cloneDeep(a));
				} else {
					this.tableData2 = this.tableData2.filter(x => {
						return x.id !== a.id;
					})
				}
				this.packageDiscount.totalPrice = 0;
				this.packageDiscount.exePrice = 0;
				this.packageDiscount.discount = 0;
				this.packageDiscount.totalPrice2 = 0;
				this.packageDiscount.exePrice2 = 0;
				this.packageDiscount.discount2 = 0;
				let items= [];
				this.tableData2.forEach(x => {
					x.children.forEach(y => {
						items.push(y.itemCode);
					})
				})
				let items2 = _.uniq(items);
				this.tableData2.forEach((x, index) => {
					let fullPrice = 0,exePrice = 0;
					x.children.forEach((y, ind) => {
						let i = items2.indexOf(y.itemCode);
						if(i > -1) {
							if(!y.fullPrice) {
								y.fullPrice = y.fullPrice2;
							}
							if(!y.exePrice) {
								y.exePrice = y.exePrice2;
							}
							fullPrice += y.fullPrice || y.fullPrice2;
							exePrice += y.exePrice || y.exePrice2;
							items2.splice(i, 1);
						} else {
							y.fullPrice2 = y.fullPrice;
							y.exePrice2 = y.exePrice;
							y.fullPrice = 0;
							y.exePrice = 0;
						}
					})
					x.fullPrice = fullPrice;
					x.exePrice = exePrice;
				})
				this.tableData2.forEach(x => {
					this.packageDiscount.totalPrice += x.fullPrice;
					this.packageDiscount.exePrice += x.exePrice;
				})
 				if (this.packageDiscount.totalPrice) {
					this.packageDiscount.discount = parseInt(this.packageDiscount.exePrice / this.packageDiscount.totalPrice * 100) / 100;
					this.packageDiscount.discount2 = this.packageDiscount.exePrice / this.packageDiscount.totalPrice;
					this.handleTwo('packageDiscount');
				} else {
					this.packageDiscount.discount = this.packageDiscount.discount2 = 0;
				}
			}
		},
		// 添加套餐取消按钮
		cancelPackageBtn() {
			this.selectedLeft = [];
			this.packageConfig.PackageName = '';
			this.packageConfig.PackageCode = '00000000-0000-0000-0000-000000000000';
			this.addPackageModal = false;
			this.packageDiscount.totalPrice = 0;
			this.packageDiscount.totalPrice2 = 0;
			this.packageDiscount.discount = 0;
			this.packageDiscount.discount2 = 0;
			this.packageDiscount.exePrice = 0;
			this.packageDiscount.exePrice2 = 0;
			this.$refs.tree1.setCheckedKeys([]);
		},
		//添加项目右侧删除按钮
		remove(node, data) {
			const parent = node.parent;
			const children = parent.data.children || parent.data;
			const index = children.findIndex(d => d.id === data.id);
			children.splice(index, 1);
			this.getDiscount('projectDiscount', children);
		},
		renderContent(h, { node, data, store }) {
			return (
				<span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
					<span>
						<span>{node.label}</span>
					</span>
					<span>
						<el-button style="font-size: 12px;" type="text" on-click={ () => this.remove(node, data) }>移除项目</el-button>
					</span>
				</span>);
		},
		//修改项目执行价
		handleExePrice(data, exePrice, fullPrice){
			if(data && data.length > 0 && fullPrice > 0) {
				data = data.map(x =>{
					x.exePrice = exePrice / fullPrice * x.lowestPrice;
					return x;
				})
			}
		},
		// 添加套餐确定按钮
		addPackageBtn() {
			this.USERINFO.discount = 0.2;//预设系统最低折扣
			this.visible3 = false;
			let lowestPriceAll = 0;//项目最低价之和
			let exePriceAll = 0;//项目原执行价之和
			let fullPriceAll = 0;//项目原价之和
			if(this.submitParams.Order.OrderType === 0) {
				let treeSelection = [];
				treeSelection = this.$refs.tree1.getCheckedNodes();
				exePriceAll = treeSelection[0].exePrice;
				if (treeSelection.length === 0) {
					this.$message.error('请先选择套餐后点击确定！');
					return;
				}
				this.selectedLeft = this.selectedLeft.filter(x => x.itemCode);
				this.selectedLeft.forEach(x => {
					lowestPriceAll += x.lowestPrice;
					fullPriceAll += x.fullPrice;
				});
				if(this.isFree) {
					let lowestDiscount = exePriceAll/fullPriceAll;
					if(this.USERINFO.discount > this.packageDiscount.discount2) {
						this.$message.error(`您最低的折扣为${this.USERINFO.discount.toFixed(2)}`);
						return;
					}
				} else {
					let lowestDiscount = exePriceAll/fullPriceAll;
					console.log(lowestDiscount)
					lowestDiscount = this.USERINFO.discount < lowestDiscount ? this.USERINFO.discount : lowestDiscount;
					if(lowestDiscount > this.packageDiscount.discount2) {
						this.$message.error(`您最低的折扣为${lowestDiscount.toFixed(2)}`);
						return;
					}
					if (lowestPriceAll > this.packageDiscount.exePrice) {
						this.$message.error(`您最低的折扣金额为${lowestPriceAll.toFixed(2)}元`);
						return;
					}
				}
				let discount = this.packageDiscount.exePrice / fullPriceAll;
				this.distributePrice(this.selectedLeft, this.packageDiscount.exePrice,discount);
				this.submitParams.Order.PackageCode = this.packageConfig.PackageCode;
				this.submitParams.Order.PackageName = this.packageConfig.PackageName;
				this.packageConfig.PackageCode = '00000000-0000-0000-0000-000000000000';
				this.packageConfig.PackageName = '';
				this.tableData = this.selectedLeft;
				this.selectedLeft = [];
			} else {
				this.tableData2.forEach(x => {
					exePriceAll += x.exePrice;
					fullPriceAll += x.fullPrice;
					x.children.forEach(y => {
						if(y.exePrice) {
							lowestPriceAll += y.lowestPrice;
						}
					})
				})

				//对价格权限的控制（未校验）
				if(this.isFree) {
					let lowestDiscount = exePriceAll/fullPriceAll;
					if(this.USERINFO.discount > this.packageDiscount.discount2) {
						this.$message.error(`您最低的折扣为${this.USERINFO.discount.toFixed(2)}`);
						return;
					}
				} else {
					let lowestDiscount = exePriceAll/fullPriceAll;
					lowestDiscount = this.USERINFO.discount < lowestDiscount ? this.USERINFO.discount : lowestDiscount;
					if(lowestDiscount > this.packageDiscount.discount2) {
						this.$message.error(`您最低的折扣为${lowestDiscount.toFixed(2)}`);
						return;
					}
					if (lowestPriceAll > this.packageDiscount.exePrice) {
						this.$message.error(`您最低的折扣金额为${lowestPriceAll.toFixed(2)}元`);
						return;
					}
				}

				// 对于选择重复套餐的去重
				let packageId = [];
				this.tableData.forEach(x => {
					packageId.push(x.id);
				})
				this.tableData2 = this.tableData2.filter(x => {
					return packageId.indexOf(x.id) === -1;
				})

				this.tableData = this.tableData.concat(this.tableData2);
				this.tableData2 = [];
				let items= [];
				this.tableData.forEach(x => {
					x.children.forEach(y => {
						items.push(y);
					})
				})

				let items2 = _.uniqBy(items, 'itemCode');
				this.tableData.forEach(x => {
					x.children.forEach(y => {
						let flag = items2.findIndex(z => z.itemCode === y.itemCode);
						if(flag > -1) {
							y.fullPrice = y.fullPrice || y.fullPrice2;
							y.exePrice = y.exePrice || y.exePrice2;
							items2 = items2.filter(z => {
								return z.itemCode != y.itemCode;
							});
						} else {
							if(y.fullPrice) {
								y.fullPrice2 = y.fullPrice;
								y.exePrice2 = y.exePrice;
								y.fullPrice = 0;
								y.exePrice = 0;
							}
						}
					})
				})
				items = items.filter(x => {
					return x.fullPrice;
				})
				this.distributePrice(items, this.packageDiscount.exePrice, this.packageDiscount.discount2);
				this.tableData.forEach(x => {
					let fullPrice = 0,exePrice = 0;
					x.children.forEach((y, ind) => {
						fullPrice += y.fullPrice;
						exePrice += y.exePrice;
					})
					x.fullPrice = fullPrice;
					x.exePrice = exePrice;
				})

				this.tableData.forEach(x => {
					fullPriceAll += x.fullPrice;
					exePriceAll += x.exePrice;
					x.children.forEach(y => {
						if(!x.exePrice) {
							lowestPriceAll += x.lowestPrice;
						}
					})
				})

				this.submitParams.Order.PackageCode ='00000000-0000-0000-0000-000000000000';
				this.submitParams.Order.PackageName = '';
			}
			this.$refs.tree1.setCheckedKeys([]);
			this.addPackageModal = false;
			this.isFree = false;
		},
		// 添加项目-取消
		cancelBtn(){
			this.addProjectModal = false;
			this.selectedRight = [];
			this.selectedListAll = [];
			// this.$refs.first.setCheckedKeys([]);
			this.$refs.second.setCheckedKeys([]);
			this.$refs.third.setCheckedKeys([]);
		},
		//添加项目添加按钮
		addBtn() {
			if (this.$refs[this.activeTabName].getCheckedNodes().length === 0) {
				this.$message.error('请先选择后点击添加！');
				return;
			}
			let arr = this.$refs[this.activeTabName].getCheckedNodes().filter(x => {
				return !(x.children);
			})
			arr = this.selectedListAll.concat(arr);
			this.selectedListAll = _.uniqBy(arr, 'id');
			this.getDiscount('projectDiscount', this.selectedListAll);
			this.$refs[this.activeTabName].setCheckedKeys([]);
		},
		// 计算添加项目中打折折扣
		getDiscount(key, data){//key - 修改字符   data - 数据源
			this[key].totalPrice = 0;
			this[key].exePrice = 0;
			if(data.length === 0) {
				this[key].exePrice2 = 0;
				this[key].totalPrice2 = 0;
				this[key].discount2 = 0;
				this[key].discount = 0;
				return;
			}
			data = data.filter(x => {
				return x.itemCode;
			});
			data.forEach(x => {
				this[key].exePrice += x.exePrice || 0;
				this[key].totalPrice += x.fullPrice || 0;
			})
			this[key].discount = (parseInt(this[key].exePrice / this[key].totalPrice *100) / 100) || 0;
			this[key].discount2 = (this[key].exePrice / this[key].totalPrice) || 0;
			this.handleTwo(key);
		},
		// 添加项目切换tab时fn
		tabsClick(tab){
			this.selectedLeft = [];
			// this.$refs.first.setCheckedKeys([]);
			this.$refs.second.setCheckedKeys([]);
			this.$refs.third.setCheckedKeys([]);
			if (tab.name === 'second' && this.GetDeptList.length === 0) {
				this.getDeptList();
			}
			if (tab.name === 'third' && this.GetItemList.length === 0) {
				this.getDicItemList();
			}
		},
		//获取订单类型
		GetOrderType() {
			this.$getType('OrderType').then(res => {
				if (res.status === 200 && res.data.status === 1) {
					this.orderType = res.data.entity;
				}
			})
			// this.$getType('ReportType').then(res => {
			// 	if (res.status === 200 && res.data.status === 1) {
			// 		this.reportType = res.data.entity;
			// 	}
			// })
		},
		//获取订单列表
		getOrderList(){
			this.load= this.$loading({
				lock: true,
				text: '获取订单中，请稍后...',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.7)'
			});
			this.$axios.get(this.$api.GetOrderList, {
				params: {IdCardNum: this.submitParams.Order.IdcardNum}
			}).then(res => {
				if (res.status === 200 && res.data.status === 1) {
					if (res.data.entity.resultData.length === 0) {
						this.getCustomer();
					} else {
						if (this.isMoreOrder) {
							this.orderInfoModal = true;
							this.orderList = res.data.entity.resultData;
						} else {
							if (res.data.entity.resultData[0].orderType == 1) {
								this.tableData = res.data.entity.resultData[0].packages;
							} else {
								this.tableData = res.data.entity.resultData[0].items.map(x => {
									x.id = x.itemCode;
									x.babel = x.itemName;
									return x;
								});
							}

							this.setCustomer(res.data.entity.resultData[0]);
						}
					}
				} else {
					this.$message.error(res.data.message);
					this.load.close();
				}
			}).catch(err => {
				this.$message.error(err.data.message);
				this.load.close();
			})
		},
		//查询客户信息
		getCustomer(){
			this.$axios.get(this.$api.GetCustomer, {
				params: {
					IdcardNum: this.submitParams.Order.IdcardNum
				}
			}).then(res => {
				if (res.data.entity && res.data.status === 1) {
					let obj = res.data.entity;
					this.setCustomer(obj);
				} else {
					this.$message.error(res.data.message);
					this.load.close();
				}
			}).catch(err => {
				this.$message.error(err.data.message);
				this.load.close();
			})
		},
		//获取套餐列表-选择套餐
		getPackageList(){
			this.$axios.get(this.$api.GetPackageListDD, {params: {PackageType: this.submitParams.Order.OrderType}}).then(res => {
				if (res.status === 200 && res.data.status === 1) {
					this.GetPackageList =  res.data.entity[0].items;
					this.addPackageType = res.data.entity[0].name;
					this.handleTreeChildren(this.GetPackageList, 0);
				} else {
					this.$message.error(res.data.message);
				}
			}).catch(err => {
				this.$message.error(err.data.message);
			})
		},
		//获取检查项目字典
		getDicItemList(){
			this.$axios.get(this.$api.GetItemList).then(res => {
				if (res.status === 200 && res.data.status === 1) {
					this.GetItemList = this.GetItemListView =  res.data.entity;
					this.handleTreeChildren(this.GetItemListView, 3);
				} else {
					this.$message({
						type: 'error',
						message: err.data.message
					});
				}
			}).catch(err => {
				this.$message({
					type: 'error',
					message: err.data.message
				});
			})
		},
		//获取科室字典
		getDeptList(){
			this.$axios.get(this.$api.GetDeptListDD).then(res => {
				if (res.status === 200 && res.data.status === 1) {
					this.GetDeptList =  res.data.entity;
					this.handleTreeChildren(this.GetDeptList, 2);
				} else {
					this.$message.error(res.data.message);
				}
			}).catch(err => {
				this.$message.error(err.data.message);
			})
		},
		// 添加项目-确定
		confirmAddProjectBtn(){
			this.USERINFO.discount = 0.2;
			let lowestPriceAll = 0;//项目最低价之和
			let exePriceAll = 0;//项目原执行价之和
			let fullPriceAll = 0;//项目原价之和
			this.selectedListAll.forEach(x => {
				lowestPriceAll += x.lowestPrice || 0;
				exePriceAll += x.exePrice || 0;
				fullPriceAll += x.fullPrice || 0;
			})
			if(this.isFree) {
				let lowestDiscount = exePriceAll/fullPriceAll;
				if(this.USERINFO.discount > this.projectDiscount.discount2) {
					this.$message.error(`您最低的折扣为${this.USERINFO.discount.toFixed(2)}`);
					return;
				}
			} else {
				let lowestDiscount = exePriceAll/fullPriceAll;
				lowestDiscount = this.USERINFO.discount < lowestDiscount ? this.USERINFO.discount : lowestDiscount;
				if(lowestDiscount > this.projectDiscount.discount2) {
					this.$message.error(`您最低的折扣为${lowestDiscount.toFixed(2)}`);
					return;
				}
				if (lowestPriceAll > exePriceAll) {
					this.$message.error(`您最低的折扣金额为${lowestPriceAll.toFixed(2)}元`);
					return;
				}
			}
			this.addProjectModal = false;
			this.distributePrice(this.selectedListAll, this.projectDiscount.exePrice, this.projectDiscount.discount2);

			let arr = this.tableData.concat(this.selectedListAll);
			this.tableData = _.uniqBy(arr, 'id');
			this.cancelBtn();
		},
		//关闭添加项目框后操作
		closeModal(key){
			this[key].totalPrice = 0;
			this[key].totalPrice2 = 0;
			this[key].discount = 0;
			this[key].discount2 = 0;
			this[key].exePrice = 0;
			this[key].exePrice2 = 0;
		},
		// 处理字典tree结构
		handleTreeChildren(data, type){
			if (!data ) return;
			data.map((i,index) => {
				i.id = (i.packageCode || i.itemCode || i.deptCode || ('#' + index))
				i.label = (i.packageName || i.itemName || i.deptName || i.name)
				i.type = type;//1- 套餐（已删除） 2- 科室  3-项目
				if (type === 1) {
					// this.GetPackageFilterNum++;
				} else if(type === 2) {
					this.GetDeptListNum++;
				} else if(type === 3) {
					this.GetItemListNum++;
				}
				if (i.items && i.items.length > 0) {
					i.children = i.items;
					this.handleTreeChildren(i.children, type);
				}
			})
		},
		// tree - 全选
		allTreeSelection(source, target, num){
			let selectedNum = this.$refs[target].getCheckedNodes().length;
			if (selectedNum === num) {
				this.$refs[target].setCheckedKeys([]);
			} else {
				this.$refs[target].setCheckedNodes(this[source]);
			}
		},
		// tree - 反选
		toogleTreeSelection(source, target){
			let toogle = this[source].filter(x => {
				return this.$refs[target].getCheckedNodes().every(y => y.id != x.id);
			})
			this.$refs[target].setCheckedKeys([]);
			this.$refs[target].setCheckedNodes(toogle);
		},
		viewOrder(data){
			this.viewData = data;
			this.currentOrderModal = true;
		},
		// 体检账号回车操作
		cardnumKeyup(ev){
			if(ev.keyCode == 13){
				let that = this;
				this.$axios
					.get(this.$api.GetCustomerURL, {
						params: {
							CardNum: this.submitParams.Order.CardNum,
						}
					})
					.then(function(response) {
						if (response.data.status === 1) {
							that.setCustomer(response.data.entity);
						} else {
							that.$message.error(response.data.message);
							that.submitParams.Order.CardNum ="";
						}
					})
					.catch(function(error) {
						console.log(error);
					});
			}
		},
		clearCustomer(){
			this.tableData = [];
			this.isEdit = true;
			this.submitParams.Order.OrderCode = '00000000-0000-0000-0000-000000000000';
			this.submitParams.Order.CustomerCode = '00000000-0000-0000-0000-000000000000';
			this.submitParams.Order.PackageCode = '00000000-0000-0000-0000-000000000000';
			this.submitParams.Order.CustomerName = '';
			this.submitParams.Order.Sex = '';
			this.submitParams.Order.MaritalStatus = 1;
			this.submitParams.Order.Nation = '';
			this.submitParams.Order.Birthday = '';
			this.submitParams.Order.Photo = '';
			this.submitParams.Order.VipFlag = 0;
			this.submitParams.Order.CardNum = '';
			this.submitParams.Order.Tele = '';
			this.submitParams.Order.Addr = '';
			this.submitParams.Order.Occupation = '';
			this.submitParams.Order.UnitName = '';
			this.submitParams.Order.DeptName = '';
			this.submitParams.Order.TeamName = '';
			this.submitParams.Order.OrderVipFlag = 0;
			this.submitParams.Order.OrderType = 0;
			this.submitParams.Order.ReportType = '';
			this.submitParams.Order.CreateOrderTime = moment().format('YYYY-MM-DD');
			this.submitParams.Order.Status = '';
			this.submitParams.Order.IsLock = false;
			this.submitParams.Order.IsReped = false;
			this.submitParams.Order.IsUnitOrder = false;
			this.submitParams.Order.Remark = '';
			this.submitParams.Order.OrderMoney = 0;
			this.submitParams.Order.PaidMoney = 0;
			this.submitParams.Order.UnitPayMoney = 0;
			this.submitParams.Order.Items = [];
			this.submitParams.Order.ReportTakeWay = 0;
		},
		setCustomer(obj){ // obj 客户信息
			if (obj.customerName) this.submitParams.Order.CustomerName = obj.customerName;
			if (obj.customerCode) this.submitParams.Order.CustomerCode = obj.customerCode;
			if (obj.idcardNum) this.submitParams.Order.IdcardNum = obj.idcardNum;
			if (obj.cardNum) this.submitParams.Order.CardNum = obj.cardNum;
			if (obj.sex) this.submitParams.Order.Sex = obj.sex;
			if (obj.photo) this.submitParams.Order.Photo = obj.photo;
			if (obj.createOrderTime) this.submitParams.Order.CreateOrderTime = moment(obj.createOrderTime).format('YYYY-MM-DD');
			if (obj.nation) this.submitParams.Order.Nation = obj.nation;
			if (obj.birthday) this.submitParams.Order.Birthday = new Date(obj.birthday);
			if (obj.maritalStatus) this.submitParams.Order.MaritalStatus = obj.maritalStatus;
			if (obj.orderType && obj.orderType  != 0) this.submitParams.Order.OrderType = obj.orderType;
			if (obj.packageCode && obj.packageCode !== '00000000-0000-0000-0000-000000000000')  this.submitParams.Order.PackageCode = obj.packageCode;
			if (obj.vipFlag) this.submitParams.Order.VipFlag = obj.vipFlag;
			if (obj.occupation) this.submitParams.Order.Occupation = obj.occupation;
			if (obj.unitName) this.submitParams.Order.UnitName = obj.unitName;
			if (obj.deptName) this.submitParams.Order.DeptName = obj.deptName;
			if (obj.teamName) this.submitParams.Order.TeamName = obj.teamName;
			if (obj.tele) this.submitParams.Order.Tele = obj.tele;
			if (obj.addr) this.submitParams.Order.Addr = obj.addr;
			if (obj.remark) this.submitParams.Order.Remark = obj.remark;
			if (obj.reportTakeWay) this.submitParams.Order.ReportTakeWay = obj.reportTakeWay;
			if (obj.isLock) this.submitParams.Order.IsLock = obj.isLock;//锁定状态
			if (obj.orderMoney) this.submitParams.Order.OrderMoney = obj.orderMoney || 0;//订单金额
			if (obj.paidMoney) this.submitParams.Order.PaidMoney = obj.paidMoney || 0;//已支付金额
			if (obj.unitPayMoney) this.submitParams.Order.UnitPayMoney = obj.unitPayMoney || 0;//单位付费进
			if(obj.orderCode && obj.orderCode !=='00000000-0000-0000-0000-000000000000') this.submitParams.Order.OrderCode = obj.orderCode;// //订单号
			if (obj.isLock) {
				this.$alert('该订单已经提交，可能会出现修改失败', '提醒：', {
					confirmButtonText: '关闭',
					type: 'warning'
				})
			}
			this.load.close();

		},
		setIdentity(result) {
			let id = JSON.parse(result);
			this.submitParams.Order.CustomerName = id.Name;
			this.submitParams.Order.Sex = id.Sex;
			this.submitParams.Order.Birthday = new Date(id.birthday);
			this.submitParams.Order.Nation = id.Nation;
			this.submitParams.Order.IdcardNum = id.IdcardNumNum;
			this.submitParams.Order.Photo = id.PicBase64Code;
		},
		getIdentity () {
			api.getIdcard(this.setIdentity);
		},
		setPhoto(picBase64Code) {
			this.submitParams.Order.Photo = picBase64Code;
		},
		getShot () {
			api.shot(this.setPhoto);
		},
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},
		// 删除按钮
		delModal() {
			if(this.multipleSelection.length === 0) {
				this.$message({
					type: 'error',
					message: '请至少选择一项进行删除'
				});
				return;
			}
			if (this.submitParams.Order.OrderType === 0) {
				let num = 0;
				this.multipleSelection.forEach(x => {
					if(x.checkStatus && x.checkStatus === 1) {
						num++;
					}
				})
				if(num) {
					this.$message.error(`已选项目中包含${num}个已检项目，不可删除`);
					return;
				}
				this.$confirm('<span>确定对当前所选项目进行删除操作吗？</span><br /><i style="color:#8F9399;">删除后不可恢复，请谨慎操作</i>', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					dangerouslyUseHTMLString: true,
					type: 'warning'
				}).then(() => {
					this.tableData = this.tableData.filter(x => {
						return this.multipleSelection.every(y => y.itemCode !== x.itemCode)
					})
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
				}).catch(() => {});
			} else {
				// 对筛查订单的删除操作
				let num = 0;
				this.multipleSelection.forEach(x => {
					if (x.children.some(y => x.checkStatus && x.checkStatus === 1)) {
						num++;
					}
				})
				if(num) {
					this.$message.error(`已选套餐中包含已检项目，不可删除`);
					return;
				}
				this.$confirm('<span>确定对当前所选套餐进行删除操作吗？</span><br /><i style="color:#8F9399;">删除后不可恢复，请谨慎操作</i>', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					dangerouslyUseHTMLString: true,
					type: 'warning'
				}).then(() => {

					let items= [];
					this.tableData.forEach(x => {
						x.children.forEach(y => {
							items.push(y);
						})
					})
					let items2 = _.uniqBy(items, 'itemCode');
					items.forEach(x => {
						items2.forEach(y => {
							if(x.itemCode == y.itemCode) {
								x.exePrice2 = y.exePrice;
							}
						})
					})
					this.tableData = this.tableData.filter(x => {
						return this.multipleSelection.every(y => y.id !== x.id)
					})
					this.tableData.forEach((x, index) => {
						let fullPrice = 0,exePrice = 0;
						x.children.forEach((y, ind) => {
							let i = items2.findIndex(z => z.itemCode == y.itemCode);
							if(i > -1) {
								if(!y.fullPrice) {
									y.fullPrice = y.fullPrice2;
								}
								if(!y.exePrice) {
									y.exePrice = y.exePrice2;
								}
								fullPrice += y.fullPrice;
								exePrice += y.exePrice;
								items2.splice(i, 1);
							} else {
								y.fullPrice2 = y.fullPrice || y.fullPrice2;
								y.exePrice2 = y.exePrice || y.exePrice2;
								y.fullPrice = 0;
								y.exePrice = 0;
							}
						})
						x.fullPrice = fullPrice;
						x.exePrice = exePrice;
					})
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
				}).catch(() => {});
			}
		},
		// 点击tree节点计算选中数
		getSelectedRightTotal(data, checked, indeterminate){
			let num = 0;
			if (checked) ++num;
			this.selectedRightTotal = num;
		},
		//按回车后对折扣的进行处理
		discountHandle(key) {
			if (this[key].discount >= 0 || this[key].discount <= 1) {
				this.isDisCount = true;
			} else {
				this.$message.error('请输入正确的折扣');
				return;
			}
			this[key].exePrice = (this[key].totalPrice * this[key].discount).toFixed(4);
			this[key].exePrice = Number(this[key].exePrice.substring(0, this[key].exePrice.length - 1));
			this[key].difPrice = this[key].totalPrice - this[key].exePrice;
			this[key].discount2 = this[key].discount;
			this.handleTwo(key);
		},
		//按回车后对折扣金额的进行处理
		difPriceHandle(key) {
			if(this[key].difPrice2 < 0 || this[key].difPrice2 > this[key].totalPrice) {
				this.$message.error('请输入正确的折扣金额');
				return;
			}
			this[key].difPrice = this[key].difPrice2;
			this[key].exePrice = this[key].totalPrice - this[key].difPrice;
			this[key].discount = parseInt(this[key].exePrice / this[key].totalPrice * 100) / 100;
			this[key].discount2 = this[key].exePrice / this[key].totalPrice;
			let num = this[key].exePrice.toFixed(3);
			this[key].exePrice2 = Number(num.substring(0, (num + '').length - 1));
		},
		//按回车后对实收金额的进行处理
		realPriceHandle(key) {
			if(this[key].exePrice2 > this[key].totalPrice || this[key].exePrice2 < 0) {
				this.$message.error('请输入正确的折扣金额');
				return;
			}
			this[key].exePrice = this[key].exePrice2;
			this[key].discount = parseInt(this[key].exePrice / this[key].totalPrice * 100) / 100;
			this[key].discount2 =this[key].exePrice / this[key].totalPrice;
			this[key].difPrice = this[key].totalPrice - this[key].exePrice;
			let num = this[key].difPrice.toFixed(3);
			this[key].difPrice2 = Number(num.substring(0, (num + '').length - 1));
		},
		//关于打折保留2位小数的处理
		handleTwo(key) {
			let num1 = this[key].totalPrice.toFixed(3);
			let num2 = this[key].exePrice.toFixed(3);
			this[key].totalPrice2 = Number(num1.substring(0, (num1 + '').length - 1));
			this[key].exePrice2 = Number(num2.substring(0, (num2 + '').length - 1));
			if(this[key].difPrice || this[key].difPrice == 0) {
				let num3 = this[key].difPrice.toFixed(3);
				this[key].difPrice2 = Number(num3.substring(0, (num3 + '').length - 1));
			}
		},
		// 根据身份证号自动填写年龄和性别
		getAgeBrith(id){
			if (!id) return;
			this.submitParams.Order.Sex = id.substr(16, 1) % 2 ? 1: 2;
		},
		//判断是否为项目
		arrPush(data){
			if (data.items && data.items.length > 0) {
				data.children.forEach(x => {
					this.arrPush(x);
				})
			} else if (!data.items) {
				this.selectedListAll.push(data);
			}
		},
		//双击事件
		dbClick(data){
			this.dbClickFlag++;
			if (this.dbClickFlag >= 2) {
				this.arrPush(data);
				this.selectedListAll = _.uniqBy(this.selectedListAll, 'id');
				this.getDiscount('projectDiscount', this.selectedListAll);
			}
			setTimeout(() =>{
				this.dbClickFlag = 0
			}, 500)
		}
	},
	computed: {
		...mapState([
			'USERINFO'
		]),
		//项目列表变化时总价 数量 实收世事变化
		totalPrice: function (){
			let price = 0;
			this.tableData.forEach(x => {
				price += x.fullPrice || 0;
			})
			return price;
		},
		exePrice:  function(){
			let price = 0;
			this.tableData.forEach(x => {
				price += Number(x.exePrice) || 0;
			})
			return price;
		},
		selectedThirdTotal: function() {
			if (this.$refs.third) {
				return this.$refs.third.getCheckedNodes().length;
			} else {
				return 0;
			}
		},
		selectedSecondTotal: function() {
			if (this.$refs.second) {
				return this.$refs.second.getCheckedNodes().length;
			} else {
				return 0;
			}
		}
	},
	watch: {
		'submitParams.Order.IdcardNum': function(val, oldVal) {
			if (val !== oldVal && val.length === 18) {
				this.clearCustomer();
				this.getAgeBrith(val);
				this.isEdit = false;
				this.getOrderList();
			} else {
				this.clearCustomer();
			}
		},
		'submitParams.Order.VipFlag': function(val, oldVal) {
			if (val !== oldVal) {
				this.orderVipFlag = val === 1 ? true : false;
			}
		},
		orderVipFlag: function(val, oldVal) {
			if (val !== oldVal) {
				this.submitParams.Order.OrderVipFlag = val ? 1 : 0;
			}
		},
		'submitParams.Order.Birthday': function(val, oldVal) {
			if (val !== oldVal) {
				if (val) {
					this.age = moment().year() - moment(val).year();
				} else {
					this.age = 0;
				}
			}
		},
		filterProject: function(val, oldVal) {
			if(val != oldVal) {
				if(val) {
					this.GetItemListView = this.GetItemList.filter(x => {
						return PinyinMatch.match(x.itemName, val);
					})
				} else {
					this.GetItemListView = this.GetItemList;
				}
			}
		}
	}
}
</script>
<style scoped>
.el-tabs--card>.el-tabs__header {
	top: -1px;
}
.content .right > * {
    display: inline-block;
}
.content .right .el-select {
    width: 120px;
}
.content .right .el-checkbox {
    margin: 0 16px;
}
.content .right .el-select {
    margin-right: 16px;
}
.content .peopleInfo .el-select{
    width: 100%;
}
.content .el-select{
    width: 178px;
}
.content .sexValue .el-select {
	width: 100%;
}
.content .peopleInfoForm .w100 .el-form-item__content{
    width: 90%;
}
.content  .peopleInfoForm .el-form-item__content , .content  .peopleInfoForm .el-form-item__content .el-select{
    width: 220px;
}
.content .el-form--inline .el-form-item {
    margin-right: 20px;
    margin-top: 24px;
}
.content .currentOrder ul {
    overflow: hidden;
}
.content .currentOrder li {
    width: 25%;
    float: left;
    line-height: 32px;
}
.content .discount .el-input {
    width: 150px;
    padding-right: 8px;
}
.content .el-input--prefix .el-input__inner {
	    padding-left: 25px;
}

.addProject{
	overflow: hidden;
}
.addProject .project-left{
	width: 49%;
	float: left;
}
.addProject .project-right {
	width: 49%;
	float: right;
}
.addTabs >>> .el-input__inner {
	border-radius: 20px;
}
.addTabs >>> .el-tabs__nav-scroll {
	padding-left: 0;
}
.numberTol {
	border: 1px solid #DCDFE5;
	border-radius: 5px;
	margin-right: 16px;
}
.numberTol span{
	line-height: 26px;
	padding: 0 15px;
	vertical-align: bottom;
	cursor: pointer;
}
.numberTol .el-input {
	display: inline-block;
	width: 50px;
}
.numberTol .el-input .el-input__inner {
	padding: 0 8px;
	border-radius: 0;
	border: none;
	border-right: 1px solid #DCDFE5;
	border-left: 1px solid #DCDFE5;
	vertical-align: baseline;
	text-align: center;
}
.packagesTabs.el-tabs--card>.el-tabs__header{
	border-bottom: none;
}
</style>
