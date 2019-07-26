<template>
  <div v-if="showModule" class="crud-add-view">
    <div class="button-group clearfix">
      <el-button-group v-if="pageData.addFormLeftBtn && pageData.addFormLeftBtn.length > 0" class="btn-group-left" size="small">
        <template v-for="(item,index) in pageData.addFormLeftBtn">
          <el-button :key="index" :class="item.defaultClass" :icon="`el-icon-${item.icon}`" :type="formatBtnType(item.defaultClass,item.buttonType)" @click="handleClick(item.buttonType,moduleType)">
            {{ item.title }}
          </el-button>
        </template>
      </el-button-group>
      <el-button-group v-if="pageData.addFormRightBtn && pageData.addFormRightBtn.length > 0" class="btn-group-right" size="small">
        <template v-for="(item,index) in pageData.addFormRightBtn">
          <el-button :key="index" :class="item.defaultClass" :icon="`el-icon-${item.icon}`" :type="formatBtnType(item.defaultClass,item.buttonType)" @click="handleClick(item.buttonType,moduleType)">
            {{ item.title }}
          </el-button>
        </template>
      </el-button-group>
    </div>
    <div class="form-input-group">
      <el-form
        ref="ruleForm"
        :inline="false"
        label-width="170px"
        :model="pageData.addFormField"
        :rules="pageData.formRules"
      >
        <template v-for="(item,index) in pageData.columns">
          <template v-if="isRenderDom(item.columnType)">
            <el-form-item
              v-if="(!item.isHiddenInForm && item.columnType !== 'BUTTON')"
              :key="index"
              :label="`${item.title}：`"
              :prop="item.required && item.columnType !== 'BOOLEAN'? item.property : ''"
            >
              <component
                :is="renderForm(item.columnType)"
                ref="formComponent"
                :type="type"
                :component-data="item"
                :form-field="pageData.addFormField"
              />
            </el-form-item>
          </template>
          <!-- <template v-else>
            <el-form-item
              v-if="(!item.isHiddenInForm && item.columnType !== 'BUTTON')"
              :key="index"
              :label="`${item.title}：`"
              :prop="item.required && item.columnType !== 'BOOLEAN'? item.property : ''"
            >
              <component
                :is="renderForm(item.columnType)"
                ref="formComponent"
                :type="type"
                :component-data="item"
                :form-field="pageData.addFormField"
              />
            </el-form-item>
          </template> -->
          <!-- <el-form-item
            v-if="(!item.isHiddenInForm && item.columnType !== 'BUTTON')"
            :key="index"
            :label="`${item.title}：`"
            :prop="item.required && item.columnType !== 'BOOLEAN'? item.property : ''"
          >
            <component
              :is="renderForm(item.columnType)"
              ref="formComponent"
              :type="type"
              :component-data="item"
              :form-field="pageData.addFormField"
            />
          </el-form-item> -->
        </template>
      </el-form>
    </div>
  </div>
</template>
<script>
import comMixin from '../mixins'
import viewMixin from '@/views/crud/mixins'
export default {
  mixins: [comMixin, viewMixin],
  data() {
    return {
      pageData: {},
      showModule: false,
      leftBtn: [],
      rightBtn: [],
      type: 'form',
      moduleType: 'add'
      // rules: { // 此处为动态生成部分，只有addView和editView才有
      //   userName: [
      //     { required: true, message: '请输入用户名', trigger: 'blur' }
      //   ],
      //   job: [
      //     { required: true, message: '请选择职业', trigger: 'change' }
      //   ]
      // }
    }
  },
  computed: {
    pageStates() {
      return this.$store.state.crud.pageStates
    },
    moduleSign() {
      return this.$store.state.crud.moduleSign
    }
  },
  watch: {
    showModule(val) {
      if (!val) return
      let pageData = this.pageStates[this.moduleSign] || {}
      this.pageData = this.$_.deepClone(pageData)
      // this.handleResetForm()
    }
  },
  created() {
    this.fetchPageStates()
  },
  methods: {
    handleResetForm() {
      this.$nextTick(() => {
        this.$refs['ruleForm'].resetFields()
      })
    }
    // handleReset() {
    //   for (let i in this.$refs['formComponent']) {
    //     this.$refs['formComponent'][i].handleReset()
    //   }
    //   for (let i in this.pageStates[this.moduleSign].formField) { // fieldList重置，通知子组件重置
    //     this.pageStates[this.moduleSign].formField[i] = ''
    //   }
    //   this.$refs['ruleForm'].resetFields()
    // },
    // handleChange(columnName, value) { // 数据变化时赋值
    //   this.pageStates[this.moduleSign].formField[columnName] = value
    // }
  }
}
</script>
<style lang="scss">
.crud-add-view {
  padding: 20px;
  .button-group {
    display: flex;
    .btn-group-left {
      flex: 1
    }
    .btn-group-right {
      flex: 1;
      display: flex;
      justify-content: flex-end;
    }
  }
  .form-input-group {
    width: 1000px;
    margin: 15px auto;
  }
  .add-btn {
    text-align: center;
  }
}

</style>

