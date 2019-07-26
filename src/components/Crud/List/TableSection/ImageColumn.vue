<template>
  <router-link v-if="column.isClickToDetailForm" class="crud-href" :to="{path:`/crud/${sign}/${scope.row[idName]}`}">
    <img :src="scope.row[column.property]" alt="" style="max-height: 3em">
  </router-link>
  <div v-else>
    <img :src="scope.row[column.property]" alt="" style="max-height: 3em">
  </div>
</template>
<script>
export default {
  props: {
    scope: { // 对应行信息
      type: Object,
      default: () => {}
    },
    column: { // 对应列信息
      type: Object,
      default: () => {}
    },
    idName: { // 跳转到详情页的ID字段名
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
    return {

    }
  }
}
</script>
