<template>
  <el-select
    v-model="formField[componentData.property]"
    :class="{'from-select': type!=='search'}"
    :type="type"
    :placeholder="componentData.inputHint"
    :disabled="componentData.columnType !=='BOOLEAN' && componentData.readonly"
  >
    <el-option
      v-for="item in selectItems"
      :key="item.value"
      :label="item.title"
      :value="item.value"
    />
  </el-select>
</template>
<script>
import { getList } from '@/api/crud'
export default {
  props: {
    type: {
      type: String,
      require: true,
      default: ''
    },
    componentData: {
      type: Object,
      default: () => {},
      require: true
    },
    formField: {
      type: Object,
      default: () => {},
      require: true
    }
  },
  data() {
    return {
      // value: '',
      selectItems: []
    }
  },
  created() {
    // if (this.type === 'search') { // 搜索才赋值
    //   this.value = this.propertyValue
    // } else {
    //   this.value = this.componentData.defaultValue
    // }
  },
  mounted() {
    // 组件内部，如果itemUrl不存在，则options为写死状态
    // if (this.componentData.itemUrl) {
    //   console.log(`调用接口获取数据:${this.componentData.itemUrl}`)
    //   setTimeout(() => {
    //     this.selectItems = [
    //       {
    //         value: '1',
    //         label: '下拉1'
    //       }, {
    //         value: '2',
    //         label: '下拉2'
    //       }, {
    //         value: '3',
    //         label: '测试'
    //       }
    //     ]
    //   }, 1000)
    // } else {
    //   this.selectItems = JSON.parse(JSON.stringify(this.componentData.options))
    // }
    this.setSelectData()
    this.getSelectList()
  },
  methods: {
    /**
     * @Descripttion: 防止页面刷新进来没数据
     */
    async getSelectList() {
      if (this.columnType !== 'COMBO') return
      if (!this.componentData.listUrlTemplate && this.componentData.list.length) return
      // let res = getList
      let res = await getList(this.componentData.listUrlTemplate)
      let data = res.data.recordList ? res.data.recordList : res.data
      this.componentData.list = data.map(elem => {
        return {
          value: elem[this.componentData.valueProperty],
          title: elem[this.componentData.titleProperty]
        }
      })
    },
    setSelectData() {
      switch (this.componentData.columnType) {
        case 'COMBO':
          this.selectItems = this.$_.deepClone(this.componentData.list)
          break
        case 'BOOLEAN':
          this.selectItems = [
            { seq: 0, title: '是', value: true },
            { seq: 0, title: '否', value: false }
          ]
          break
        default:
          break
      }
      if (this.type === 'search') {
        // 因为内容通用，所以先确定该字段是否已经加入过全部选项
        let count = this.selectItems.filter(item => {
          return item.title === '全部'
        })
        if (!count.length) {
          this.selectItems.unshift({ seq: 0, title: '全部', value: '' })
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.from-select{
  width: 100%;
}
</style>

