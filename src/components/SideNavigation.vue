<template>
  <el-container class="nav-area">
    <EasyScrollbar style="width: 100%;" :barOption="navScrollOption">
      <div id="wrapper">
        <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        background-color="#f0f5f6"
        text-color="#666"
        active-text-color="#333"
        unique-opened
        router>
          <el-submenu
            v-for="parentBtn in parentBtns"
            :key="parentBtn.link"
            :index="parentBtn.link">
            <template slot="title">
                <i class="fa" :class="parentBtn.icon"></i>
                <span>{{parentBtn.title}}</span>
            </template>
            <!-- <router-link v-for="(childrenBtn,childrenBtnIndex) in parentBtn.childrenBtns" :key="childrenBtn.title" :to="parentBtn.link+childrenBtn.link">
                <el-menu-item
                  :index="parentBtnIndex+'-'+childrenBtnIndex">
                  <i class="fa" :class="childrenBtn.icon"></i>{{childrenBtn.title}}
                </el-menu-item>
            </router-link> -->
            <el-menu-item
              v-for="childrenBtn in parentBtn.childrenBtns"
              :index="parentBtn.link+childrenBtn.link"
              :key="parentBtn.link+childrenBtn.link">
              <i class="fa" :class="childrenBtn.icon"></i>{{childrenBtn.title}}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </EasyScrollbar>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      // 左侧导航栏滚动条参数设定
      navScrollOption: {
        barOpacityMin: 0.2,
        autohidemode: true,
        horizrailenabled: false
        // barColor:"#959595",   //滚动条颜色
        // barWidth:6,           //滚动条宽度
        // railColor:"#eee",     //导轨颜色
        // barMarginRight:0,     //垂直滚动条距离整个容器右侧距离单位（px）
        // barMaginBottom:0,     //水平滚动条距离底部距离单位（px）
        // barOpacityMin:0.3,      //滚动条非激活状态下的透明度
        // zIndex:"auto",        //滚动条z-Index
        // autohidemode:true,     //自动隐藏模式
        // horizrailenabled:true,//是否显示水平滚动条
      },
      parentBtns: [{
        icon: 'fa-compass',
        title: '我的面板',
        link: '/panel',
        childrenBtns: [
          {icon: 'fa-bar-chart', title: '订单信息', link: '/information'},
          {icon: 'fa-podcast', title: '未开票查询', link: '1-1'},
          {icon: 'fa-university', title: '应付款查询', link: '1-2'},
          {icon: 'fa-file-archive-o', title: '送货反馈', link: '1-3'},
          {icon: 'fa-unlock', title: '密码修改', link: '/setting-password'}
        ]
      }, {
        icon: 'fa-google-wallet',
        title: '我的资产',
        link: '/panel1',
        childrenBtns: [
          {icon: 'fa-life-ring', title: '信息系统', link: '2-1'},
          {icon: 'fa-database', title: '数据库', link: '2-2'},
          {icon: 'fa-table', title: '数据表', link: '2-3'},
          {icon: 'fa-th-list', title: '数据字段', link: '2-4'},
          {icon: 'fa-vimeo', title: '资产关系', link: '2-5'}
        ]
      }, {
        icon: 'fa-paypal',
        title: '我的目录',
        link: '/panel2',
        childrenBtns: [
          {icon: 'fa-bar-chart', title: '信息资源', link: '3-1'},
          {icon: 'fa-database', title: '信息项', link: '3-2'},
          {icon: 'fa-search', title: '目录检索', link: '3-3'}
        ]
      }, {
        icon: 'fa-paragraph',
        title: '我的标准',
        link: '/panel3',
        childrenBtns: [
          {icon: 'fa-retweet', title: '频率分析', link: '4-1'},
          {icon: 'fa-cog', title: '数据元池管理', link: '4-2'},
          {icon: 'fa-building', title: '数据元重复清洗', link: '4-3'},
          {icon: 'fa-table', title: '数据元同义清洗', link: '4-4'},
          {icon: 'fa-rss-square', title: '公共数据元池', link: '4-5'}
        ]
      }, {
        icon: 'fa-list-alt',
        title: '目录体系',
        link: '/panel4',
        childrenBtns: [
          {icon: 'fa-file-image-o', title: '资源目录', link: '5-1'},
          {icon: 'fa-rss-square', title: '共享开放目录', link: '5-2'},
          {icon: 'fa-bar-chart', title: '需求目录', link: '5-3'}
        ]
      }, {
        icon: 'fa-connectdevelop',
        title: '系统配置',
        link: '/panel5',
        childrenBtns: [
          {icon: 'fa-tumblr', title: '表单配置', link: '6-1'},
          {icon: 'fa-table', title: '字典配置', link: '6-2'},
          {icon: 'fa-bars', title: '菜单管理', link: '6-3'},
          {icon: 'fa-paypal', title: '权限管理', link: '6-4'},
          {icon: 'fa-bookmark', title: '权限规则', link: '6-5'},
          {icon: 'fa-address-card-o', title: '角色管理', link: '6-6'},
          {icon: 'fa-building-o', title: '机构设置', link: '6-7'},
          {icon: 'fa-user-circle', title: '用户管理', link: '6-8'}
        ]
      }, {
        icon: 'fa-slideshare',
        title: '系统监控',
        link: '/panel6',
        childrenBtns: [
          {icon: 'fa-hand-spock-o', title: '操作日志', link: '7-1'},
          {icon: 'fa-clock-o', title: '连接池监控', link: '7-2'}
        ]
      }]
    }
  },
  mounted () {
    // 刷新时以当前路由做为tab加入tabs
    if (this.$route.path !== '/welcome') {
      this.$store.dispatch('addTabs', { path: '/welcome', name: '欢迎页' })
      this.$store.dispatch('addTabs', { path: this.$route.path, name: this.$route.name })
      this.$store.dispatch('currentTabs', this.$route.path)
    } else {
      this.$store.dispatch('addTabs', { path: '/welcome', name: '欢迎页' })
      this.$store.dispatch('currentTabs', '/welcome')
      this.$router.push('/welcome')
    }
  },
  computed: {
    visitedTabs () {
      return this.$store.state.tabs.visitedTabs
    }
  }
}
</script>

<style>
.el-aside .fa {
  padding-right: 10px;
  font-size: 16px;
  width: 25px;
}
.nav-area,.easy-scrollbar__wrap,#wrapper{
  height: 100%;
}
.el-submenu__title{
  height: 40px;
  line-height: 40px;
}
/* .el-submenu__title:hover,.el-menu-item:focus, .el-menu-item:hover{
    background-color: #d1dbe5;
} */
.el-submenu .el-menu-item{
  height: 34px;
  line-height: 34px;
}
.el-menu-item.is-active,.el-submenu.is-active>.el-submenu__title{
  background-color: #d1dbe5!important;
}
</style>
