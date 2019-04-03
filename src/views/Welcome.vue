<template>
  <div>
    <div class="page-header">
      <blockquote class="h4">
        欢迎登录，登录角色名：{{name}}
      </blockquote>
    </div>
    <div class="container">
      <div class="header">Header</div>
      <div class="nav">Nav</div>
      <div class="content">Content</div>
      <div class="footer">Footer</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style scoped>
.page-change-password{
  margin-top: 4em;
}
.container{
  display: grid;
  grid-template-columns: 25% auto 25%;
  grid-template-rows: 60px auto;
}
</style>
