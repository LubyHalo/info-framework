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
          <el-button type="primary" @click="handleBtnClick({}, 'add', dialogParam1)">新增</el-button>
          <el-button type="primary">导入</el-button>
          <el-button type="primary">导出</el-button>
          <el-button type="primary" @click="test()">测试</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格组件初始化 -->
    <table-view :tableData="tableData" :tableOptions="tableOptions" ref="table1">
      <template slot="tableBtnSlot">
        <el-table-column
          fixed="right"
          label="操作"
          min-width="160">
          <template slot-scope="scope">
            <el-button
              circle
              plain
              title="查看"
              type="info"
              @click="handleBtnClick(scope.row, 'detail', dialogParam1)">
              <i class="fa fa-eye"></i>
            </el-button>
            <el-button
              circle
              plain
              title="编辑"
              type="primary"
              @click="handleBtnClick(scope.row, 'edit', dialogParam1)">
              <i class="fa fa-pencil"></i>
            </el-button>
            <el-button
              circle
              plain
              title="删除"
              type="danger"
              @click="handleBtnClick(scope.row, 'delete', dialogParam1)">
              <i class="fa fa-trash"></i>
            </el-button>
          </template>
        </el-table-column>
      </template>
    </table-view>
    <!-- 一级弹框 -->
    <el-dialog
      class="dialog-first-level"
      custom-class="fix-dialog-title"
      :title="dialogParam1.isEdit?'编辑':'查看'"
      :visible.sync="dialogParam1.dialogVisible"
      top="8vh"
      width="70%"
      fullscreen
      :close-on-click-modal='false'
      :modal-append-to-body='false'
      @close="$refs[formOptions.baseOptions.ref].dialogCancel()"
      style="top: 50px;max-height: 600px">
      <!-- 表单组件FormView -->
      <el-col :span="20" :offset="2">
        <form-view :formOptions="formOptions" :formData="dialogParam1.formData" :ref="formOptions.baseOptions.ref" :isEdit="dialogParam1.isEdit">
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
      <!-- 子表格组件TableView -->
      <table-view :tableData="tableData" :tableOptions="subTableOptions" ref="table2">
        <template slot="tableBtnSlot">
          <el-table-column
            fixed="right"
            label="操作"
            min-width="170">
            <template slot-scope="scope">
              <el-button
                circle
                plain
                title="查看"
                type="info"
                @click="handleBtnClick(scope.row, 'detail', dialogParam2)">
                <i class="fa fa-info-circle"></i>
              </el-button>
              <el-button
                circle
                plain
                title="编辑"
                type="primary"
                @click="handleBtnClick(scope.row, 'edit', dialogParam2)"
                v-if="dialogParam1.isEdit">
                <i class="fa fa-pencil"></i>
              </el-button>
              <el-button
                circle
                plain
                title="删除"
                type="danger"
                @click="handleBtnClick(scope.row, 'delete', dialogParam2)"
                v-if="dialogParam1.isEdit">
                <i class="fa fa-trash"></i>
              </el-button>
            </template>
          </el-table-column>
        </template>
      </table-view>
      <div slot="footer" class="dialog-footer" v-if="dialogParam1.isEdit">
        <el-button size="small" @click="$refs[formOptions.baseOptions.ref].dialogCancel()">取 消</el-button>
        <el-button size="small" type="primary" @click="$refs[formOptions.baseOptions.ref].submitForm()">确 定</el-button>
        <el-button size="small" type="danger" @click="$message('审核已拒绝。')">审核不通过</el-button>
      </div>
    </el-dialog>
    <!-- 二级弹框 -->
    <el-dialog
      class="dialog-second-level"
      custom-class="fix-dialog-title"
      :title="dialogParam2.isEdit?'编辑':'查看'"
      :visible.sync="dialogParam2.dialogVisible"
      top="10vh"
      width="60%"
      fullscreen
      :close-on-click-modal='false'
      :modal-append-to-body='false'
      @close="$refs[subFormOptions.baseOptions.ref].dialogCancel()"
      style="top: 50px;max-height: 600px">
      <!-- 表单组件FormView -->
      <el-col :span="20" :offset="2">
        <form-view :formOptions="subFormOptions" :formData="dialogParam2.formData" :ref="subFormOptions.baseOptions.ref" :isEdit="dialogParam2.isEdit">
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
      subFormOptions: options.subFormOptions,
      formDisabled: false,
      popVisible: false,
      tableData: {},
      formInline: {
        region: '',
        user: ''
      },
      gridData: [],
      dialogParam1: {
        dialogVisible: false,
        isEdit: true,
        formData: {}
      },
      dialogParam2: {
        dialogVisible: false,
        isEdit: true,
        formData: {}
      },
      dialogVisible: false,
      formData1: {},
      dialogVisible2: false,
      form2: {
        date: '',
        name: '',
        address: ''
      }
    }
  },
  methods: {
    // 默认新增、查看、编辑、删除事件
    handleBtnClick (rowData, type, dialogParam) {
      if (type === 'delete') {
        this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
        }).catch(() => {})
      } else {
        dialogParam.formData = rowData
        dialogParam.dialogVisible = true
        switch (type) {
          case 'add':
            dialogParam.isEdit = true
            break;
          case 'detail':
            dialogParam.isEdit = false
            break;
          case 'edit':
            dialogParam.isEdit = true
            break;
          default:
            break;
        }
      }
      console.log(type, rowData)
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
