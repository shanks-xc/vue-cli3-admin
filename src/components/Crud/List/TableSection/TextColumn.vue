<template>
  <div>
    <router-link
      v-if="column.isClickToDetailForm"
      class="crud-href"
      :to="{ path: `/${sign}/${scope.row[idName]}` }"
    >
      {{ formatColumn(scope.row[column.property]) }}
    </router-link>
    <div v-else>
      {{ formatColumn(scope.row[column.property]) }}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    scope: {
      // 对应行信息
      type: Object,
      default: () => {}
    },
    column: {
      // 对应列信息
      type: Object,
      default: () => {}
    },
    idName: {
      // 跳转到详情页的ID字段名
      type: String,
      default: ''
    },
    sign: {
      type: String,
      requited: true,
      default: ''
    }
  },
  data() {
    return {}
  },
  computed: {
    pageStates() {
      return this.$store.state.crud.pageStates
    }
  },
  created() {},
  methods: {
    formatColumn(value) {
      switch (this.column.columnType) {
        case 'COMBO':
          var content = ''
          this.column.list.forEach(item => {
            if (item.value === value) {
              content = item.title
            }
          })
          return content
        case 'BOOLEAN':
          return value ? '是' : '否'
        default:
          return value
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.crud-href {
  color: #1890ff;
}
</style>
