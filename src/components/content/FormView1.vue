<template>
  <el-form :model="$store.state.dialog.formDate" :ref="formOptions.baseOptions.ref" status-icon :rules="formOptions.baseOptions.validateRules" :disabled='formDisabled'>
    <!-- 输入框组件 -->
    <el-form-item
      v-for="(formOption, index) in formOptions.itemOptions"
      :key="index"
      :label="formOption.label"
      :label-width="formLabelWidth"
      :prop="formOption.prop">
      <span class="detail-span" v-if="!isEdit">{{$store.state.dialog.formDate[formOption.prop]}}</span>
      <!-- input -->
      <el-input
        v-if="formOption.type === 'input' && isEdit"
        :value="$store.state.dialog.formDate[formOption.prop]"
        auto-complete="off"
        :placeholder="formOption.placeholder"
        clearable>
      </el-input>
      <!-- select -->
      <el-select
        v-if="formOption.type === 'select' && isEdit"
        class="full-width"
        :value="$store.state.dialog.formDate[formOption.prop]"
        placeholder="请选择内容"
        clearable>
        <el-option
          v-for="(item, index) in formOption.list"
          :key="index"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <!-- radio -->
      <el-radio-group
        v-if="formOption.type === 'radio' && isEdit"
        :value="$store.state.dialog.formDate[formOption.prop]">
        <el-radio
          v-for="(item, index) in formOption.list"
          :key="index"
          :label="item.value"
          :border="formOption.border">{{item.label}}
        </el-radio>
      </el-radio-group>
      <!-- checkbox -->
      <el-checkbox-group
        v-if="formOption.type === 'checkbox' && isEdit"
        :value="$store.state.dialog.formDate[formOption.prop]">
        <el-checkbox
          v-for="(item, index) in formOption.list"
          :key="index"
          :label="item.value"
          :border="formOption.border">{{item.label}}
        </el-checkbox>
      </el-checkbox-group>
      <!-- textarea -->
      <el-input
        v-if="formOption.type === 'textarea' && isEdit"
        type="textarea"
        :value="$store.state.dialog.formDate[formOption.prop]"
        :autosize="{ minRows: 4, maxRows: 6}"
        clearable
        :placeholder="formOption.placeholder">
      </el-input>
      <!-- date-picker -->
      <el-date-picker
        v-if="formOption.type === 'date' && isEdit"
        :value="$store.state.dialog.formDate[formOption.prop]"
        :type="formOption.type"
        :placeholder="formOption.placeholder"
        :editable="false"
        style="width: 100%;">
      </el-date-picker>
    </el-form-item>
    <slot name="formSlot">4567890</slot>
  </el-form>
</template>

<script>
import { closeDialog } from '@/utils/tableBtnEvent'
import { bus } from '@/utils/bus'

export default {
  data () {
    return {
      // form: {
      //   input: '',
      //   select: '',
      //   radio: '',
      //   textarea: '',
      //   date: '',
      //   checkbox: [],
      //   checkList: []
      // },
      formDateCache: {},
      formLabelWidth: '150px'
    }
  },
  props: {
    isEdit: Boolean,
    formDisabled: Boolean,
    // formLabelWidth: String,
    rules1: Object,
    formOptions: {
      type: Object,
      default: {}
    }
  },
  mounted() {
    this.formDateCache = this.$store.state.dialog.formDate
  },
  methods: {
    dialogCancel () {
      closeDialog()
      console.log(this.$store.state.dialog.formDate)
      // this.dialogVisible = false
      // this.$store.state.dialog.formDate = this.formDateCache
      this.$refs[this.formOptions.baseOptions.ref].clearValidate()
    },
    submitForm () {
      this.$refs[this.formOptions.baseOptions.ref].validate(valid => {
        if (valid) {
          this.$message({
            message: '提交成功!',
            type: 'success'
          })
          this.dialogVisible = false
        } else {
          this.$message({
            message: '请正确填写表单！',
            type: 'error'
          })
          return false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
