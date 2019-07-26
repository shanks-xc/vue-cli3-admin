<template>
  <div>
    <el-switch
      v-model="formField[componentData.property]"
      :disabled="componentData.readonly"
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
      value: false
    }
  },
  created() {
    // if (this.type === 'search') { // 搜索才赋值
    //   this.value = this.propertyValue
    // } else {
    //   this.value = !!this.componentData.defaultValue
    // }
    // STRING类型输入框里面含有inputType属性，用于细化不同输入框
    // console.log(this.componentData)
  },
  methods: {
    // handleChange() {
    //   this.$emit('handleChange', this.componentData.property, this.value)
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

