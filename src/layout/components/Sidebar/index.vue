<template>
  <el-aside width="200px" style="background-color: #383839;">
    <el-scrollbar style="height:100%">
      <el-menu @select="handleSelect">
        <template v-for="(item, index) in routerOption">
          <el-submenu
            :key="index"
            :index="index.toString()"
            v-if="item.children && item.children.length > 0"
          >
            <template slot="title">
              <i :class="item.icon"></i>{{ item.name }}</template
            >
            <el-menu-item-group>
              <el-menu-item
                :index="`${item.path}/${itemSub.path}`"
                v-for="(itemSub, indexSub) in item.children"
                :key="indexSub"
                >{{ itemSub.name }}</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
        </template>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      routerOption: this.$router.options.routes
    }
  },
  computed: {},
  watch: {},
  mounted() {
    console.log(this.$router.options.routes)
  },
  methods: {
    handleSelect(routerPath) {
      console.log(routerPath)
      this.$router.push(routerPath)
    }
  }
}
</script>

<style lang="scss" scoped></style>
