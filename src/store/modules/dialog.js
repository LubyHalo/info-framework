/**
 * Vuex全局状态管理
 * @param visitedTabs {Array} 用于渲染tabs的数组
 */
const dialog = {
  state: {
    dialogOpened: false,
    isEdit: true,
    formDate: {}
  },

  mutations: {
    // 打开弹框
    OPEN_DIALOG (state) {
      state.dialogOpened = true
    },
    // 关闭弹框
    CLOSE_DIALOG (state) {
      state.dialogOpened = false
    },
    // 条目详情(不可编辑)
    DETAIL_ROW (state) {
      state.isEdit = false
    },
    // 条目编辑(可编辑)
    EDIT_ROW (state) {
      state.isEdit = true
    },
    // 数据填入
    LOAD_DATA (state, rowData) {
      state.formDate = rowData
    },
    // 数据清空
    CLEAR_DATA (state) {
      state.formDate = {}
      // for (const key in state.formDate) {
      //   if (state.formDate.hasOwnProperty(key)) {
      //     state.formDate[key] = '';
      //   }
      // }
    }
  },
  actions: {
    openDialog (context) {
      context.commit('OPEN_DIALOG')
    },
    closeDialog (context) {
      context.commit('CLOSE_DIALOG')
    },
    detailRow (context) {
      context.commit('DETAIL_ROW')
    },
    editRow (context) {
      context.commit('EDIT_ROW')
    },
    loadData (context, rowData) {
      context.commit('LOAD_DATA', rowData)
    },
    clearData (context) {
      context.commit('CLEAR_DATA')
    }
  }
}

export default dialog
