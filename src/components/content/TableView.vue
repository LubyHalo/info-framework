<template>
  <div>
    <el-table
      class="table-view"
      v-loading="isLoading"
      element-loading-text="数据加载中，请稍后。。。"
      :data="tableData.rows"
      border
      stripe
      fit
      style="width: 100%">
      <!-- 设置多选框 -->
      <el-table-column
        type="selection"
        v-if="tableOptions.baseOptions.hasSelection">
      </el-table-column>
      <!-- 设置行号 -->
      <el-table-column
        type="index"
        :index="indexMethod"
        v-if="tableOptions.baseOptions.hasIndex">
      </el-table-column>
      <!-- 设置数据列 -->
      <el-table-column
        v-for="(colOption, index) in tableOptions.colList"
        :key="index"
        :prop="colOption.prop"
        :label="colOption.label"
        :sortable="colOption.isSort ? colOption.isSort : false"
        width="170"
        show-overflow-tooltip>
      </el-table-column>
      <slot name="tableBtnSlot"></slot>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10, 20, 30, 40]"
      :current-page="currentPage"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.total"
      class="text-right table-pagination">
    </el-pagination>
  </div>
</template>

<script>
import { getList } from '@/api/order'
import { bus } from '@/utils/bus'
import { detailDialog, editDialog, addDialog } from '@/utils/tableBtnEvent'

export default {
  data () {
    return {
      tableData: {},
      isLoading: false,
      currentPage: 1,
      currentPageChange: '1',
      pageSize: 10,
      pageSizeChange: '10',
      apiParams: { pageSize: '10', currentPage: '1' },
      tableBaseOptions: this.tableOptions.baseOptions,
      btnClicked: false
    }
  },
  props: {
    tableOptions: {
      type: Object,
      default: function () {
        return {
          baseOptions: {
            dataSource: getList,
            pageSize: 10,
            currentPage: 1,
            hasSelection: true,
            hasIndex: true
          }
        }
      }
    }
  },
  methods: {
    getTableData (url) {
      this.isLoading = true
      this.tableBaseOptions.dataSource(url).then(res => {
        this.isLoading = false
        this.tableData = res.gridData
      }).catch(error => {
        this.isLoading = false
        reject(error)
      })
    },
    handleBtnClick (rowDate, type) {
      switch (type) {
        case 'detail':
          console.log('detail', rowDate)
          this.btnClicked = true
          detailDialog (rowDate)
          break;
        case 'edit':
          console.log('edit', rowDate)
          this.btnClicked = true
          editDialog (rowDate)
          break;
        case 'delete':
          console.log('delete', rowDate)
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
          break;
      
        default:
          bus.$emit(type, rowDate)
          break;
      }
    },
    // viewRow (index, row) {
    //   this.form.date = row.date
    //   this.form.name = row.name
    //   this.form.address = row.address
    //   console.log(row.date + ',' + row.name + ',' + row.address)
    //   api.infoRow('/test/table2', 'type=top&key=123456').then(res => {
    //     console.log(res)
    //     this.gridData = res.gridData
    //   })
    // },
    // editRow (index, row) {
    //   this.formDisabled = false
    //   this.dialogVisible = true
    //   this.form.date = row.date
    //   this.form.name = row.name
    //   this.form.address = row.address
    //   console.log(row.date + ',' + row.name + ',' + row.address)
    //   api.infoRow('/test/table2', 'type=top&key=123456').then(res => {
    //     console.log(res)
    //     this.gridData = res.gridData
    //   })
    // },
    // deleteRow (index, rows) {
    //   this.$confirm('确认删除?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     rows.splice(index, 1)
    //   }).catch(() => {})
    // },
    handleSizeChange (val) {
      this.pageSizeChange = `${val}`
      this.apiParams = {
        pageSize: this.pageSizeChange,
        currentPage: this.currentPageChange
      }
      this.isLoading = true
      this.tableBaseOptions.dataSource(this.apiParams).then(res => {
        this.isLoading = false
        this.tableData = res.gridData
      }).catch(error => {
        reject(error)
      })
    },
    handleCurrentChange (val) {
      this.currentPageChange = `${val}`
      this.apiParams = {
        pageSize: this.pageSizeChange,
        currentPage: this.currentPageChange
      }
      this.isLoading = true
      this.tableBaseOptions.dataSource(this.apiParams).then(res => {
        this.isLoading = false
        this.tableData = res.gridData
      }).catch(error => {
        reject(error)
      })
    },
    indexMethod: function (index) {
      return ( this.currentPageChange - 1 ) * this.pageSizeChange + index
    }
  },
  mounted () {
    this.getTableData(this.tableBaseOptions.requestParams)
  }
}
</script>
