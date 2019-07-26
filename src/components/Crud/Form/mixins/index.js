import TextFormInput from '../FormInputGroup/TextFormInput'
import FormSelect from '../FormInputGroup/FormSelect'
import NumberFormInput from '../FormInputGroup/NumberFormInput'
import BoolFormInput from '../FormInputGroup/BoolFormInput'
import ImageFormInput from '../FormInputGroup/ImageFormInput'
import DateFormInput from '../FormInputGroup/DateFormInput'
import { create, update } from '@/api/crud'
export default {
  data() {
    return {
      btnTypeInstance: null
    }
  },
  components: {
    TextFormInput,
    FormSelect,
    NumberFormInput,
    BoolFormInput,
    ImageFormInput,
    DateFormInput
  },
  methods: {
    renderForm(columnType) {
      switch (columnType) {
        case 'STRING':
          return 'TextFormInput'
        case 'IMAGE':
          return 'ImageFormInput'
        case 'INT':
          return 'NumberFormInput'
        case 'COMBO':
          return 'FormSelect'
        case 'BOOLEAN':
          if (this.type === 'search') {
            return 'FormSelect'
          } else {
            return 'BoolFormInput'
          }
        case 'DATETIME':
          return 'DateFormInput'
        default:
          break
      }
    },
    isRenderDom(columnType) {
      if (columnType === 'IMAGE') {
        let formField =
          this.moduleType === 'add'
            ? this.pageData['addFormField']
            : this.pageData['editFormField']
        return formField['siteId'] !== ''
      }
      return true
    },
    handleClick(buttonType, moduleType, id) {
      switch (buttonType) {
        case 'SAVE': // 创建和更新返回的状态
          this.$refs['ruleForm'].validate(valid => {
            if (valid) {
              if (moduleType === 'add') {
                let listQuery = {}
                let formField = this.pageData.addFormField
                console.log(formField)
                for (let i in formField) {
                  if (formField[i] !== '') {
                    // 有可能是boolean
                    listQuery[i] = formField[i]
                  }
                }
                create(this.moduleSign, listQuery).then(res => {
                  console.log(res.data)
                })
              } else {
                let listQuery = {}
                let formField = this.pageData.editFormField
                console.log(formField)
                for (let i in formField) {
                  if (formField[i] !== '') {
                    // 有可能是boolean
                    listQuery[i] = formField[i]
                  }
                }
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
          this.$router.push({
            path: `/${this.moduleSign}/add`
          })
          break
        case 'EDIT':
          break
        case 'CLOSE':
          this.$router.go(-1)
          break
        default:
          break
      }
    },
    formatBtnType(defaultClass, buttonType) {
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
