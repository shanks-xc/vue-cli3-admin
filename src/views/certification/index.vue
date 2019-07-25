<template>
  <div>
    个人认证
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
    console.log(this.$router.options.routes)
    req('getLoginInfo')
  },
  methods: {}
}
</script>

<style lang="scss" scoped></style>
