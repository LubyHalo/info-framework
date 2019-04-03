/**
 * Vuex全局状态管理
 * @param visitedTabs {Array} 用于渲染tabs的数组
 */
const tabs = {
  state: {
    visitedTabs: [],
    activeIndexPath: '/welcome'
  },

  mutations: {
    // 添加tabs
    ADD_TABS (state, route) {
      state.visitedTabs.push(route)
    },
    // 删除tabs
    DELETE_TABS (state, route) {
      let index = 0
      for (let visitedTab of state.visitedTabs) {
        if (visitedTab.path === route) {
          break
        }
        index++
      }
      state.visitedTabs.splice(index, 1)
    },
    // 设置当前激活的tab
    SET_ACTIVE_INDEX (state, index) {
      state.activeIndexPath = index
    }
  },
  actions: {
    addTabs (context, route) {
      context.commit('ADD_TABS', route)
    },
    removeTabs (context, route) {
      return new Promise((resolve) => {
        context.commit('DELETE_TABS', route)
        resolve([...context.state.visitedTabs])
      })
    },
    currentTabs (context, route) {
      context.commit('SET_ACTIVE_INDEX', route)
    }
  }
}

export default tabs
