<template>
  <div class="top-nav p-lr-20">
    <el-row class="block-col-2">
      <el-col :span="12">
        LOGO
      </el-col>
      <el-col :span="12" class="text-right">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link pointer">
            Admin
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-plus">修改密码</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.top-nav {
  height: 50px;
  line-height: 50px;
}
</style>
