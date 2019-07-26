<template>
  <div v-if="list.tableList" class="crud-table-list">
    <el-table
      ref="multipleTable"
      :data="list.tableList.recordList"
      border
      style="width: 100%"
      tooltip-effect="dark"
      @selection-change="handleSelectionChange"
    >
      <!-- <el-table-column
        type="selection"
        width="55"
      /> -->
      <!-- <el-table-column type="index" label="行号" align="center" /> -->
      <template v-for="(item, index) in list.columns">
        <el-table-column
          v-if="!item.isKey && !item.isHiddenInTable"
          :key="index"
          :label="item.title"
        >
          <template slot-scope="scope">
            <div v-if="item.columnType === 'BUTTON'">
              <el-button-group v-if="item.buttons.length > 0" size="small">
                <template v-for="(val, key) in item.buttons">
                  <el-button
                    :key="key"
                    size="mini"
                    :class="val.defaultClass"
                    :icon="
                      `el-icon-${
                        val.buttonType === 'TOGGLE' ? 'lock' : val.icon
                      }`
                    "
                    :type="formatBtnType(val.defaultClass)"
                    @click="
                      handleClick(
                        val.buttonType,
                        moduleType,
                        scope.row,
                        list.tableId,
                        list.key
                      )
                    "
                  >
                    {{ val.buttonType === 'DEL' ? '' : val.title }}
                  </el-button>
                </template>
              </el-button-group>
            </div>
            <component
              :is="formatColumnComponent(item.columnType)"
              v-else
              :scope="scope"
              :column="item"
              :id-name="list.tableId"
              :sign="list.key"
            />
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        :total="list.tableList.totalCount"
        :page-size="list.tableList.size"
        :current-page.sync="list.tableList.page + 1"
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
      />
      <!-- </el-pagination> -->
    </div>
  </div>
</template>
<script>
import mixins from './mixins'
import { getQuery } from '@/api/crud'
import { mapGetters } from 'vuex'
export default {
  mixins: [mixins],
  props: {
    list: {
      type: Object,
      require: true,
      default: () => {}
    }
  },
  data() {
    return {
      multipleSelection: [],
      moduleType: 'table'
    }
  },
  computed: {
    ...mapGetters(['moduleSign'])
  },
  created() {},
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleCurrentChange(val) {
      this.list.tableList.page = val - 1
      this.getTableData()
      console.log(this.list.tableList)
    },
    async getTableData() {
      let { page, size } = this.list.tableList
      let listQuery = {}
      for (let i in this.list.fieldList) {
        if (this.list.fieldList[i] || this.list.fieldList[i] === false) {
          // 避免出现true和false
          listQuery[i] = this.list.fieldList[i]
        }
        if (this.list.fieldList[i] === 0 && this.list.fieldList[`${i}_2`] > 0) {
          listQuery[i] = 0
        }
      }
      let res = await getQuery(this.moduleSign, {
        page: page,
        size: size,
        ...listQuery
      })
      this.list.tableList.recordList = res.data.recordList
      this.list.tableList.totalCount = res.data.totalCount
      this.$store.commit('crud/SET_TABLE_DATA', this.list.tableList)
      console.log(this.$store.state.crud.pageStates)
    }
  }
}
</script>
<style lang="scss">
.crud-table-list {
  // .el-button {
  //   i {
  //     width: 100%;
  //   }
  // }
  .crud-href {
    color: #1890ff;
  }
  .pagination {
    text-align: right;
    margin: 20px 0;
  }
}
</style>
