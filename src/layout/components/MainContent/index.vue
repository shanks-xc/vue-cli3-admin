<template>
  <div>
    <transition name="fade-transform" mode="out-in">
      <keep-alive>
        <router-view />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
    }
  },
  computed: {},
  watch: {},
  mounted () { },
  methods: {}
}
</script>

<style lang="scss" scoped></style>
