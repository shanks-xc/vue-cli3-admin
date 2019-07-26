import TextColumn from '../TableSection/TextColumn.vue'
import ImageColumn from '../TableSection/ImageColumn.vue'
import { create, update } from '@/api/crud'
export default {
  data() {
    return {
      componentInstance: null,
      btnTypeInstance: null
    }
  },
  components: {
    TextColumn,
    ImageColumn
  },
  methods: {
    formatColumnComponent(type) {
      if (!this.componentInstance) {
        this.componentInstance = new this.$_.MultiCondResult({
          'STRING | COMBO | BOOLEAN | INT | DATETIME': 'TextColumn',
          IMAGE: 'ImageColumn'
        })
      }
      return this.componentInstance.getValue(type)
    },
    /**
     * @param buttonType 按钮状态
     * @param moduleType 调用方法的模块
     * @param row 列表行信息
     * @param idName 列表行ID字段名
     * @param sign 页面唯一标识
     */
    handleClick(buttonType, moduleType, row, idName, sign) {
      switch (buttonType) {
        case 'SAVE': // 创建和更新返回的状态
          this.$refs['ruleForm'].validate(valid => {
            if (valid) {
              let listQuery = {}
              let formField = this.pageStates[this.moduleSign].formField
              for (let i in formField) {
                if (formField[i] !== '') {
                  // 有可能是boolean
                  listQuery[i] = formField[i]
                }
              }
              if (moduleType === 'create') {
                create(this.moduleSign, listQuery).then(res => {
                  console.log(res.data)
                })
              } else {
                update(this.moduleSign, listQuery).then(res => {
                  console.log(res.data)
                })
              }
            } else {
              console.log('error submit!!')
              return false
            }
          })
          break
        case 'ADD':
          // 点击添加，先清数据
          for (let i in this.searchList.formField) {
            this.searchList.formField[i] = '' || false // 防止出现boolean值报错
          }
          this.$router.push({
            path: `/crud/${this.moduleSign}/add`
          })
          break
        case 'EDIT':
          this.$router.push({
            path: `/crud/${sign}/${row[idName]}`
          })
          break
        case 'CLOSE':
          this.$router.go(-1)
          break
        default:
          break
      }
    },
    formatBtnType(defaultClass) {
      if (!this.btnTypeInstance) {
        this.btnTypeInstance = new this.$_.MultiCondResult({
          'btn-success': 'success',
          'ant-btn-primary': 'primary',
          'ant-btn-default | btn-warning': 'default',
          'btn-danger': 'danger'
        })
      }
      return this.btnTypeInstance.getValue(defaultClass)
    }
  }
}
