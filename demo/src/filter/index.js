import moment from 'moment';

export default {
	// 格式化时间
	formatDate: (val, pattern='YYYY-MM-DD HH:mm:ss') => {
		if (!val) {
			return '';
		}
		return moment(val).format(pattern);
	},
	// 交易类型
	tradetype: val => {
		switch (val) {
			case 1:
				return '现金';
			case 2:
				return 'POS';
			case 3:
				return '支票';
			case 4:
				return '汇票';
			case 5:
				return '转账';
			case 6:
				return '支付宝';
			case 7:
				return '微信';
			default:
				return '其他'
		}
	},
	// 发票状态
	invoiceState: val => {
		switch (val) {
			case 1:
				return '初始化';
			case 2:
				return '已使用';
			case 3:
				return '退费回收';
			case 4:
				return '废弃回收'
			default:
				return '其他'
		}
	}
}
