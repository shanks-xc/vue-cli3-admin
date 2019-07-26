<template>
  <div>
    <el-input
      v-model="formField[componentData.property]"
      class="input"
      :type="formatInputType(componentData.inputType)"
      :placeholder="componentData.inputHint"
      :disabled="type==='search'? false : componentData.readonly"
      :maxlength="componentData.maxLength"
      :minlength="componentData.minLength"
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
      value: ''
    }
  },
  created() {
    // if (this.type === 'search') { // 搜索才赋值
    //   this.value = this.propertyValue
    // } else {
    //   this.value = this.componentData.defaultValue
    // }

    // STRING类型输入框里面含有inputType属性，用于细化不同输入框
    // console.log(this.componentData)
  },
  methods: {
    // handleChange(val) {
    //   if (this.type === 'search') {
    //     this.$store.state.crud.pageStates[this.$store.state.crud.moduleSign].fieldList[this.componentData.property] = val
    //   }
    // },
    formatInputType(type) {
      switch (type) {
        case 'STRING':
          return 'text'
        case 'MEMO':
          // 搜索只需要输入框
          return this.type === 'search' ? 'text' : 'textarea'
        case 'INT':
          return 'number'
        case 'PASSWORD':
          return 'password'
        default:
          break
      }
    }
  }
}
</script>

