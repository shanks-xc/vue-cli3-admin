<template>
  <div class="date-form-input" :class="{'from-date-picker': type!=='search'}">
    <el-date-picker
      :value="value"
      :disabled="type==='search'? false : componentData.readonly"
      :type="dateType"
      range-separator="至"
      :clearable="false"
      value-format="yyyy-MM-dd HH:mm:ss"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      @input="handleChage"
    />
  </div>
</template>
<script>
export default {
  name: 'DateFormInput',
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
      // value: ''
    }
  },
  computed: {
    /**
     * @Descripttion: 开始时间
     */
    beginTime() {
      return this.formField[this.componentData.property]
    },
    /**
     * @Descripttion: 结束时间
     */
    endTime() {
      return this.formField[this.componentData.property + '_2']
    },
    /**
     * @Descripttion: 时间value值
     */
    value() {
      if (this.endTime === null || this.endTime === undefined) {
        return this.beginTime
      } else {
        return [this.beginTime, this.endTime]
      }
    },
    /**
     * @Descripttion: 时间格式类型
     */
    dateType() {
      // let endTime = this.formField[this.componentData.property + '_2']
      if (this.endTime === null || this.endTime === undefined) {
        return 'datetime'
      } else {
        return 'datetimerange'
      }
    }
  },
  created() {
    // this.value = [this.componentData.property, this.componentData.property + '_2']
  },
  methods: {
    handleChage(val) {
      // let beginTime = this.formField[this.componentData.property]
      // let endTime = this.formField[this.componentData.property + '_2']
      if (val) {
        if (this.endTime === null || this.endTime === undefined) {
          this.formField[this.componentData.property] = val
        } else {
          this.formField[this.componentData.property] = val[0]
          this.formField[this.componentData.property + '_2'] = val[1]
        }
      } else {
        if (this.endTime === null || this.endTime === undefined) {
          this.formField[this.componentData.property] = ''
        } else {
          this.formField[this.componentData.property] = ''
          this.formField[this.componentData.property + '_2'] = ''
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.from-date-picker{
  width: 100%;
  .el-date-editor{
    width: 100%;
  }
}
</style>

