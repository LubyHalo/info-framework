/*
 * @Author: Luby 
 * @Date: 2018-07-10 09:27:36 
 * @Last Modified by: Luby
 * @Last Modified time: 2018-07-30 17:22:38
 */
import { getList, getList1 } from '@/api/order'

/** 页面表格配置 **/
// 主表格初始化配置
let tableOptions = {
  baseOptions: {
    dataSource: getList,
    requestParams: { pageSize: 10, currentPage: 1 },
    hasSelection: true,
    hasIndex: true
  },
  hasSelection: true,
  hasIndex: true,
  colList: [{
    label: '时间',
    prop: 'date',
    isSort: true
  }, {
    label: '采购员',
    prop: 'name'
  }, {
    label: '采购合同号',
    prop: 'purchaseContractNum'
  }, {
    label: '书面合同号',
    prop: 'writtenContractNum'
  }, {
    label: '要求到货日期',
    prop: 'arriveDate',
    isSort: true
  }, {
    label: '合计数量',
    prop: 'totalQuantity',
    isSort: true
  }, {
    label: '合计金额',
    prop: 'totalMoney',
    isSort: true
  }],
  buttonList: [{
    icon: 'fa-info-circle',
    title: '查看',
    type: 'detail',
    style: 'normal'
  }, {
    icon: 'fa-pencil',
    title: '编辑',
    type: 'edit',
    style: 'normal'
  }, {
    icon: 'fa-trash',
    title: '删除',
    type: 'delete',
    style: 'danger'
  }, {
    icon: 'fa-trash',
    title: '测试',
    type: 'test'
  }]
}
// 页面表单配置
// 表单初始化配置
// let formOptions = {
//   dataStructure: {
//     input: '',
//     select: '',
//     radio: '',
//     textarea: '',
//     date: '',
//     checkbox: [],
//     checkList: []
//   },
//   baseOptions: {
//     ref: 'form1',
//     validateRules: {
//       checkbox: { type: 'array', required: true, message: '请至少选择一项', trigger: 'change' },
//       input: { required: true, message: '输入内容不能为空', trigger: 'blur' },
//       select: { required: true, message: '下拉选择不能为空', trigger: 'blur' }
//     }
//   },
//   itemOptions: [{
//     label: '输入框1',
//     type: 'input',
//     prop: 'input',
//     placeholder: '请输入内容',
//     value: ''
//   }, {
//     label: '下拉框',
//     type: 'select',
//     prop: 'select',
//     placeholder: '',
//     list: [{
//       label: '下拉选择1',
//       value: 1
//     }, {
//       label: '下拉选择2',
//       value: 2
//     }, {
//       label: '下拉选择3',
//       value: 3
//     }],
//     value: ''
//   }, {
//     label: '单选',
//     type: 'radio',
//     prop: 'radio',
//     border: true,
//     placeholder: 2,
//     list: [{
//       label: '单选1',
//       value: 1
//     }, {
//       label: '单选2',
//       value: 2
//     }, {
//       label: '单选3',
//       value: 3
//     }],
//     value: ''
//   }, {
//     label: '多选',
//     type: 'checkbox',
//     prop: 'checkbox',
//     border: true,
//     placeholder: 3,
//     list: [{
//       label: '多选1',
//       value: 1
//     }, {
//       label: '多选2',
//       value: 2
//     }, {
//       label: '多选3',
//       value: 3
//     }],
//     value: []
//   }, {
//     label: '多行输入框1',
//     type: 'textarea',
//     prop: 'textarea',
//     placeholder: '请输入内容',
//     value: ''
//   }, {
//     label: '时间选择框1',
//     type: 'date',
//     prop: 'date',
//     placeholder: '请选择时间',
//     value: ''
//   }]
// }
// 示例表单初始化配置
let formOptions = {
  dataStructure: {
    djlsh: '',
    date: '',
    name: '',
    purchaseContractNum: '',
    writtenContractNum: '',
    arriveDate: '',
    totalQuantity: '',
    totalMoney: '',
    title1:''
  },
  baseOptions: {
    ref: 'form1',
    validateRules: {
      djlsh: { required: true, message: '此项内容不能为空', trigger: 'blur' },
      date: { required: true, message: '此项内容不能为空', trigger: 'blur' },
      name: { required: true, message: '此项内容不能为空', trigger: 'blur' },
      purchaseContractNum: { required: true, message: '此项内容不能为空', trigger: 'blur' },
      writtenContractNum: { required: true, message: '此项内容不能为空', trigger: 'blur' },
      arriveDate: { required: true, message: '此项内容不能为空', trigger: 'blur' },
      title1: { required: true, message: '此项内容不能为空', trigger: 'blur' }
    }
  },
  itemOptions: [{
    label: '单据流水号',
    type: 'input',
    prop: 'djlsh',
    placeholder: '请输入单据流水号',
    value: ''
  }, {
    label: '时间',
    type: 'date',
    prop: 'date',
    placeholder: '请选择时间',
    value: ''
  }, {
    label: '采购员',
    type: 'input',
    prop: 'name',
    placeholder: '请输入采购员',
    value: ''
  }, {
    label: '采购合同号',
    type: 'input',
    prop: 'purchaseContractNum',
    placeholder: '请输入采购合同号',
    value: ''
  }, {
    label: '书面合同号',
    type: 'input',
    prop: 'writtenContractNum',
    placeholder: '请输入书面合同号',
    value: ''
  }, {
    label: '要求到货时间',
    type: 'date',
    prop: 'arriveDate',
    placeholder: '请选择要求到货时间',
    value: ''
  }, {
    label: '合计数量',
    type: 'input',
    prop: 'totalQuantity',
    placeholder: '请输入合计数量',
    value: ''
  }, {
    label: '合计金额',
    type: 'input',
    prop: 'totalMoney',
    placeholder: '请输入合计金额',
    value: ''
  }]
}

// 表单内表格配置
let subTableOptions = {
  baseOptions: {
    dataSource: getList1,
    requestParams: { pageSize: 10, currentPage: 1 },
    hasSelection: true,
    hasIndex: false
  },
  colList: [{
    label: '物品编号',
    prop: 'itemNum',
    isSort: true
  }, {
    label: '物品名称',
    prop: 'itemName'
  }, {
    label: '到货时间',
    prop: 'arriveDate',
    isSort: true
  }, {
    label: '到货数量',
    prop: 'quantity',
    isSort: true
  }],
  buttonList: [{
    icon: 'fa-info-circle',
    title: '查看',
    type: 'detail',
    style: 'normal'
  }]
}
// 二级表单
let subFormOptions = {
  dataStructure: {
    djlsh: '',
    date: '',
    name: '',
    purchaseContractNum: '',
    writtenContractNum: '',
    arriveDate: '',
    totalQuantity: '',
    totalMoney: '',
    title1:''
  },
  baseOptions: {
    ref: 'form2',
    validateRules: {
      itemNum: { required: true, message: '此项内容不能为空', trigger: 'blur' },
      itemName: { required: true, message: '此项内容不能为空', trigger: 'blur' },
      quantity: { required: true, message: '此项内容不能为空', trigger: 'blur' },
      arriveDate: { required: true, message: '此项内容不能为空', trigger: 'blur' }
    }
  },
  itemOptions: [{
    label: '物品编号',
    type: 'input',
    prop: 'itemNum',
    placeholder: '请输入物品编号',
    value: ''
  }, {
    label: '物品名称',
    type: 'input',
    prop: 'itemName',
    placeholder: '请输入物品名称',
    value: ''
  }, {
    label: '到货时间',
    type: 'date',
    prop: 'arriveDate',
    placeholder: '请选择到货时间',
    value: ''
  }, {
    label: '到货数量',
    type: 'input',
    prop: 'quantity',
    placeholder: '请输入到货数量',
    value: ''
  }, {
    label: '备注',
    type: 'textarea',
    prop: 'remarks',
    placeholder: '请输入备注',
    value: ''
  }]
}

export default { tableOptions, subTableOptions, formOptions, subFormOptions }
