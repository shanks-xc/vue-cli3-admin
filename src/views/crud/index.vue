<template>
  <div class="page-content">
    <div class="page-title mb-15">
      {{ $route.meta.title }}
    </div>
    <div class="search mb-15">
      <search-view v-if="showModule && searchList" :search-list="searchList" />
    </div>
    <div class="table-list mb-15">
      <table-list v-if="showModule && searchList" :list="searchList" />
    </div>
  </div>
</template>
<script>
import SearchView from '@/components/Crud/Form/SearchView'
import TableList from '@/components/Crud/List'
import mixins from './mixins'
import { mapGetters } from 'vuex'
export default {
  components: {
    SearchView,
    TableList
  },
  mixins: [mixins],
  data() {
    return {
      showModule: false,
      searchList: {}
    }
  },
  computed: {
    ...mapGetters(['moduleSign', 'pageStates'])
    // pageStates() {
    //   return this.$store.state.crud.pageStates || {}
    // },
    // moduleSign() {
    //   return this.$store.state.crud.moduleSign
    // }
  },
  watch: {
    showModule(val) {
      if (!val) return
      let searchList = this.pageStates[this.moduleSign] || {}
      this.searchList = this.$_.deepClone(searchList)
    }
  },
  created() {
    this.fetchPageStates()
  },
  beforeRouteLeave(to, from, next) {
    const fieldList = this.searchList.fieldList
    this.$store.commit('crud/COPY_QUERY_DATA', fieldList)
    next()
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.page-content {
  padding: 20px;
  .page-title {
    line-height: 32px;
    font-size: 16px;
    color: #000;
    font-weight: bold;
    padding-left: 10px;
    margin-bottom: 15px;
    border-bottom: 2px solid #000;
  }
}
</style>
