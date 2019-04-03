<template>
  <el-tabs
    class="main-tabs"
    v-model="activeIndexPath"
    type="card"
    closable
    @tab-click="tabClick"
    @tab-remove="tabRemove">
    <el-tab-pane
      :key="item.name"
      v-for="item in visitedTabs"
      :label="item.name"
      :name="item.path"
    ></el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  computed: {
    // tab页
    visitedTabs () {
      return this.$store.state.tabs.visitedTabs
    },
    activeIndexPath: {
      get () {
        return this.$store.state.tabs.activeIndexPath
      },
      set (val) {
        this.tabToCurrent(val)
      }
    }
  },
  methods: {
    // 获取route
    generateRoute () {
      if (this.$route.name) {
        return this.$route
      }
      return false
    },
    tabAdd () {
      let route = this.generateRoute()
      if (!route) {
        return false
      }
      this.$store.dispatch('addTabs', route)
    },
    tabToCurrent (route) {
      this.$store.dispatch('currentTabs', route)
    },
    // tab切换时，动态的切换路由
    tabClick (tab) {
      let path = this.activeIndexPath
      // 用户详情页的时候，对应了二级路由，需要拼接添加第二级路由
      if (this.activeIndexPath === '/userInfo') {
        path = this.activeIndexPath + '/' + this.$store.state.userInfo.name
      }
      this.$router.push({path: path})
    },
    tabRemove (targetName) {
      // 首页不可删除
      if (targetName === '/welcome') {
        return
      }
      this.$store.dispatch('removeTabs', targetName).then((views) => {
        if (this.activeIndexPath === targetName) {
          let latestView = views.slice(-1)[0]
          // 设置当前激活的路由
          if (this.visitedTabs && this.visitedTabs.length >= 1) {
            this.$store.dispatch('currentTabs', latestView.path)
            this.$router.push({path: latestView.path})
          } else {
            this.$router.push({path: '/'})
          }
        }
      })
    }
  },
  watch: {
    '$route' (to, from) {
      // beforeRouteUpdate (to, from, next) {
      let flag = false
      for (let visitedTab of this.visitedTabs) {
        if (visitedTab.name === to.name) {
          flag = true
          this.tabToCurrent(to.path)
          break
        }
      }
      if (!flag) {
        this.tabAdd()
        this.tabToCurrent(to.path)
      }
    }
  }
}
</script>

<style>
.main-tabs {
  position: absolute;
  width: 85%;
  left: 15%;
  z-index: 2000;
}
.el-tabs__header {
  background-color: white;
}
</style>
