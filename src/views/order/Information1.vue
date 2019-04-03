<template>
  <div class="page-main">
    <!-- <div class="page-header">
      <blockquote class="h4">
        信息资源测试
      </blockquote>
    </div> -->
    <div>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-col :span="3">
          <el-form-item size="small" label="">
            <el-select v-model="formInline.region" placeholder="搜索项">
              <el-option label="全部" value="all"></el-option>
              <el-option label="日期" value="date"></el-option>
              <el-option label="姓名" value="name"></el-option>
              <el-option label="地址" value="address"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-form-item size="small" label="">
          <el-input v-model="formInline.user" placeholder="搜索字段"></el-input>
        </el-form-item>
        <el-form-item size="small">
          <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
        </el-form-item>
        <el-form-item size="small">
          <el-button type="primary" @click="addRow()">新增</el-button>
          <el-button type="primary">导入</el-button>
          <el-button type="primary">导出</el-button>
          <el-button type="primary" @click="test()">测试</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格组件初始化 -->
    <table-view :tableData="tableData" :tableOptions="tableOptions" ref="table1"></table-view>
    <!-- 一级弹框 -->
    <el-dialog
      class="dialog-first-level"
      custom-class="fix-dialog-title"
      title="详情弹窗"
      :visible.sync="$store.state.dialog.dialogOpened"
      top="8vh"
      width="70%"
      fullscreen
      :close-on-click-modal='false'
      :modal-append-to-body='false'
      @close="$refs[formOptions.baseOptions.ref].dialogCancel()"
      style="top: 50px;max-height: 600px">
      <!-- 表单组件FormView -->
      <el-col :span="20" :offset="2">
        <form-view :formOptions="formOptions" :ref="formOptions.baseOptions.ref" :isEdit="$store.state.dialog.isEdit">
          <template slot="formSlot">
            <el-form-item label="自定义条目" prop="title1" label-width="150px">
              <el-input
                value="test"
                auto-complete="off"
                placeholder="placeholder"
                clearable>
              </el-input>
            </el-form-item>
          </template>
        </form-view>
      </el-col>
      <!-- 表格组件TableView -->
      <!-- <table-view :tableData="tableData" :tableOptions="subTableOptions"></table-view> -->
      <div slot="footer" class="dialog-footer" v-if="$store.state.dialog.isEdit">
        <el-button size="small" @click="$refs[formOptions.baseOptions.ref].dialogCancel()">取 消</el-button>
        <el-button size="small" type="primary" @click="$refs[formOptions.baseOptions.ref].submitForm()">确 定</el-button>
        <el-button size="small" type="danger" @click="$message('审核已拒绝。')">审核不通过</el-button>
      </div>
    </el-dialog>
    <!-- 二级弹框 -->
    <el-dialog
      class="dialog-second-level"
      title="二级详情弹窗"
      :visible.sync="dialogVisible2"
      top="10vh"
      width="50%"
      :close-on-click-modal='false'
      append-to-body
      :modal-append-to-body='false'>
      <el-col :span="20" :offset="2">
        <el-form :model="form2">
          <el-form-item label="活动名称：" label-width="150px">
            <el-input v-model="form2.name" auto-complete="off" :disabled='formDisabled'></el-input>
          </el-form-item>
          <el-form-item label="活动区域：" label-width="150px">
            <el-select class="full-width" v-model="form2.region" placeholder="请选择活动区域" :disabled='formDisabled'>
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>
      <div slot="footer" class="dialog-footer" v-if="formDisabled">
        <el-button size="small" @click="dialogVisible2 = false">取 消</el-button>
        <el-button size="small" type="primary" @click="dialogVisible2 = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import options from './options'
import { bus } from '@/utils/bus'
import TableView from '@/components/content/TableView'
import FormView from '@/components/content/FormView'
import form from './form'
import { detailDialog, editDialog, addDialog } from '@/utils/tableBtnEvent'

export default {
  components: {
    'table-view': TableView,
    'form-view': FormView,
    'form1': form
  },
  data () {
    return {
      isEdit: true,
      tableOptions: options.tableOptions,
      subTableOptions: options.subTableOptions,
      formOptions: options.formOptions,
      formDisabled: false,
      popVisible: false,
      tableData: {},
      formInline: {
        region: '',
        user: ''
      },
      gridData: [],
      dialogVisible: false,
      form: {},
      cascaderOptions: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }, {
        value: 'zujian',
        label: '组件',
        children: [{
          value: 'basic',
          label: 'Basic',
          children: [{
            value: 'layout',
            label: 'Layout 布局'
          }, {
            value: 'color',
            label: 'Color 色彩'
          }, {
            value: 'typography',
            label: 'Typography 字体'
          }, {
            value: 'icon',
            label: 'Icon 图标'
          }, {
            value: 'button',
            label: 'Button 按钮'
          }]
        }, {
          value: 'form',
          label: 'Form',
          children: [{
            value: 'radio',
            label: 'Radio 单选框'
          }, {
            value: 'checkbox',
            label: 'Checkbox 多选框'
          }, {
            value: 'input',
            label: 'Input 输入框'
          }, {
            value: 'input-number',
            label: 'InputNumber 计数器'
          }, {
            value: 'select',
            label: 'Select 选择器'
          }, {
            value: 'cascader',
            label: 'Cascader 级联选择器'
          }, {
            value: 'switch',
            label: 'Switch 开关'
          }, {
            value: 'slider',
            label: 'Slider 滑块'
          }, {
            value: 'time-picker',
            label: 'TimePicker 时间选择器'
          }, {
            value: 'date-picker',
            label: 'DatePicker 日期选择器'
          }, {
            value: 'datetime-picker',
            label: 'DateTimePicker 日期时间选择器'
          }, {
            value: 'upload',
            label: 'Upload 上传'
          }, {
            value: 'rate',
            label: 'Rate 评分'
          }, {
            value: 'form',
            label: 'Form 表单'
          }]
        }]
      }],
      dialogVisible2: false,
      form2: {
        date: '',
        name: '',
        address: ''
      }
    }
  },
  computed: {
    dialogShow1 () {
      // return this.$refs.table1.btnClicked
      return false
    }
  },
  created () {
    // 表格按钮点击事件绑定
    // bus.$on('detail', (rowDate) => {
    //   console.log('detail', rowDate)
    //   detailDialog (rowDate)
    //   // this.isEdit = false
    //   // this.dialogVisible = true
    //   // this.formOptions.dataStructure = rowDate
    // })
    // bus.$on('edit', (rowDate) => {
    //   console.log('edit', rowDate)
    //   editDialog (rowDate)
    //   // this.isEdit = true
    //   // this.dialogVisible = true
    //   // this.formOptions.dataStructure = rowDate
    // })
    // bus.$on('delete', (rowDate) => {
    //   console.log('delete', rowDate)
    //   this.$confirm('确认删除?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     this.$message({
    //       message: '操作成功',
    //       type: 'success'
    //     })
    //   }).catch(() => {})
    // })
    bus.$on('test', (rowDate) => {
      this.$message('test!')
    })
  },
  methods: {
    test () {
      console.log(this.$refs.table1.btnClicked)
    },
    onSubmit () {
      this.$message({
        type: 'success',
        message: 'submit!!!',
        onClose: () => {
          this.dialogVisible = false
        }
      })
    },
    addRow () {
      addDialog()
    },
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    paginationChange: function (val) {
      console.log(`${val}`)
    }
  }
}
</script>

<style>
.page-main {
  padding: 20px;
}
</style>
