<template>
  <div>
    权限管理页面
  </div>
</template>
<script>
import req from '@/api/common'
export default {
  components: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {
    req('getLoginInfo')
  },
  methods: {}
}
</script>

<style lang="scss" scoped></style>
