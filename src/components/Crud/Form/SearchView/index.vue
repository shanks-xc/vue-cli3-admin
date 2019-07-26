<template>
  <div class="search-input-group">
    <el-form :inline="true" :model="searchList.fieldList">
      <template v-for="(item,index) in searchList.columns">
        <el-form-item
          v-if="!item.isHiddenInQuery && item.columnType !== 'BUTTON'"
          :key="index"
          :label="`${item.title}：`"
          style="margin-right: 20px;"
        >
          <component
            :is="renderForm(item.columnType)"
            ref="searchComponent"
            :type="type"
            :component-data="item"
            :form-field="searchList.fieldList"
          />
        </el-form-item>
      </template>
    </el-form>
    <div class="button-group mb-15">
      <div class="btn-group-left">
        <el-button-group v-if="searchList.tableButtons && searchList.tableButtons.length > 0" size="small">
          <template v-for="(item,index) in searchList.tableButtons">
            <el-button
              :key="index"
              :class="item.defaultClass"
              :icon="`el-icon-${item.icon}`"
              :type="formatBtnType(item.defaultClass,item.buttonType)"
              @click="handleClick(item.buttonType,moduleType)"
            >
              {{ item.title }}
            </el-button>
          </template>
        </el-button-group>
      </div>
      <div class="btn-group-right">
        <el-button-group class="search-btn">
          <el-button type="primary" @click="handleSearch">
            查询
          </el-button>
          <el-button @click="handleReset">
            重置
          </el-button>
        </el-button-group>
        <el-button-group v-if="searchList.queryFormButtons && searchList.queryFormButtons.length > 0" size="small">
          <template v-for="(item,index) in searchList.queryFormButtons">
            <el-button
              :key="index"
              :class="item.defaultClass"
              :icon="`el-icon-${item.icon}`"
              :type="formatBtnType(item.defaultClass,item.buttonType)"
              @click="handleClick(item.buttonType,moduleType)"
            >
              {{ item.title }}
            </el-button>
          </template>
        </el-button-group>
      </div>
    </div>
  </div>
</template>
<script>
import mixins from '../mixins'
import { getQuery } from '@/api/crud'
export default {
  mixins: [mixins],
  props: {
    searchList: {
      type: Object,
      require: true,
      default: () => {}
    }
  },
  data() {
    return {
      type: 'search',
      moduleType: 'search'
      // page: 0,
      // size: 10
    }
  },
  computed: {
    // pageStates() {
    //   return this.$store.state.crud.pageStates
    // },
    moduleSign() {
      return this.$store.state.crud.moduleSign
    }
  },
  mounted() {
  },
  methods: {
    // handleChange(columnName, value) { // 数据变化时赋值
    //   this.searchList.fieldList[columnName] = value
    //   // console.log(this.searchList.fieldList)
    // },
    handleSearch() {
      let listQuery = {}
      for (let i in this.searchList.fieldList) {
        if (this.searchList.fieldList[i] || this.searchList.fieldList[i] === false) { // 避免出现true和false
          listQuery[i] = this.searchList.fieldList[i]
        }
        if (this.searchList.fieldList[i] === 0 && this.searchList.fieldList[`${i}_2`] > 0) {
          listQuery[i] = 0
        }
      }
      this.searchList.tableList.page = 0
      let { page, size } = this.searchList.tableList
      getQuery(this.moduleSign, { page: page, size: size, ...listQuery }).then(res => {
        let recordList = res.data.recordList
        this.searchList.tableList.recordList = recordList
        this.searchList.tableList.totalCount = res.data.totalCount
        this.$store.commit('crud/SET_TABLE_DATA', this.searchList.tableList)
      })
    },
    handleReset() {
      // console.log(this.$refs)
      // for (let i in this.$refs['searchComponent']) {
      //   this.$refs['searchComponent'][i].handleReset()
      // }
      for (let i in this.searchList.fieldList) { // fieldList重置，通知子组件重置
        this.searchList.fieldList[i] = ''
      }
      this.handleSearch()
    }
  }
}
</script>
<style lang="scss">
.search-input-group {
  .button-group {
    display: flex;
    .btn-group-left {
      flex: 1
    }
    .btn-group-right {
      .search-btn {
        margin-right: 15px;
      }
      flex: 1;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>

