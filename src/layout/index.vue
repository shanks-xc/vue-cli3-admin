<template>
  <div class="app-layout">
    <TopNav />
    <el-container style="height:calc(100vh - 50px);">
      <Sidebar />
      <el-container>
        <!-- <TagsView/> -->
        <el-main>
          <!--刷新，返回操作-->
          <div class="com-handle-btn text-right p-lr-20">
            <el-button size="small">刷新</el-button>
            <el-button size="small">返回</el-button>
          </div>
          <div style="padding:20px;">
            <!--内容-->
            <transition name="fade-transform" mode="out-in">
              <keep-alive :include="cachedViews">
                <router-view :key="key" />
              </keep-alive>
            </transition>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts">
import Sidebar from './components/Sidebar/index.vue'
// import MainContent from './components/MainContent/index.vue'
import TopNav from './components/TopNav/index.vue'
// import TagsView from './components/TagsView/index.vue'
export default {
  components: { Sidebar, TopNav },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    getData() {}
  }
}
</script>

<style lang="scss" scoped>
.app-layout /deep/ {
  .el-menu {
    background: none;
    .el-submenu__title,
    .el-menu-item,
    .el-submenu__title i {
      color: white;
    }
    .el-menu-item:hover,
    .el-menu-item:focus {
      background: rgba(0, 121, 254, 1);
    }
    .el-submenu__title:hover {
      background: rgba(0, 121, 254, 1);
    }
  }
  .el-main {
    padding: 0px;
    background: rgba(240, 242, 245, 1);
  }
  .el-scrollbar__wrap {
    overflow-x: hidden;
    overflow: auto;
  }
  .com-handle-btn {
    height: 50px;
    line-height: 50px;
    background: #0079fe;
  }
}
</style>
