<template>
  <div>
    <el-input-number
      v-model="formField[componentData.property]"
      controls-position="right"
      :min="0"
    />
    <el-input-number
      v-if="type === 'search'"
      v-model="formField[componentData.property+'_2']"
      controls-position="right"
      :min="0"
    />
  </div>
</template>
<script>
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
      // value: 0,
      // value2: 0
    }
  },
  created() {
    // if (this.type === 'search') { // 搜索才赋值
    //   this.value = this.propertyValue
    // } else { // 赋值数字
    //   this.value = ~~this.componentData.defaultValue
    // }
  },
  methods: {
    // handleChange() {
    //   this.$emit('handleChange', this.componentData.property, this.value)
    // },
    // handleChange2() {
    //   this.$emit('handleChange', `${this.componentData.property}_2`, this.value2)
    // },
    // handleReset() {
    //   this.value = ''
    // },
    // handleSet(formField) {
    //   this.value = formField[this.componentData.property]
    // }
  }
}
</script>

