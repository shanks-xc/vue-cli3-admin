import { getModuleDefine, getQuery, getList } from '@/api/crud'
export default {
  methods: {
    async fetchPageStates() {
      // 进入页面判断标识
      let sign = this.$route.path.split('/')[1] // crud模块路由都有3层，eg：/crud/site/index
      if (sign !== this.moduleSign && !this.pageStates[sign]) {
        // 页面标识不相同，重新设置标识获取数据,暂时不加入清空数据，而是直接替换数据
        // 设置页面标识，用于接口调用
        this.$store.commit('crud/SET_MODULE_SIGN', sign)
        // getModuleDefine(sign).then(res => {
        let res = await getModuleDefine(sign)
        let data = res.data
        // 遍历后端返回数据，插入listQuery字段（所有查询字段，提交内容就是listQuery），其他表单提交处理方法类似
        let listQuery = {}
        let addFormField = {} // 新增数据
        let editFormField = {} // 编辑数据
        let formRules = {} // 动态生成规则，此处后期也会加上自定义规则，比如图片是否上传之类的
        data.columns.forEach(async item => {
          if (!item.isHiddenInQuery && item.columnType !== 'BUTTON') {
            // 不隐藏的查询条件且不是按钮
            listQuery[item.property] = ''
            if (item.columnType === 'INT' || item.columnType === 'DATETIME') {
              listQuery[item.property + '_2'] = ''
            }
          }
          if (!item.isHiddenInForm && item.columnType !== 'BUTTON') {
            // 不隐藏的表单数据
            if (item.columnType === 'BOOLEAN' && !item.defaultValue) {
              addFormField[item.property] = false
              editFormField[item.property] = false
            } else {
              addFormField[item.property] = item.defaultValue
              editFormField[item.property] = item.defaultValue
            }

            if (item.required && item.columnType !== 'BOOLEAN') {
              // 必填项,BOOLEAN值不需要校验，肯定有值
              // formRules[item.property] = {}
              formRules[item.property] = [
                this.formatRules(
                  item.columnType,
                  item.title,
                  item.property,
                  item.inputHint
                )
              ]
            }
          }
          if (item.listUrlTemplate) {
            let listRes = await getList(item.listUrlTemplate)
            let listData = listRes.data.recordList
              ? listRes.data.recordList
              : listRes.data
            item.list = listData.map(elem => {
              return {
                value: elem[item.valueProperty],
                title: elem[item.titleProperty]
              }
            })
          }
          if (item.isKey) {
            this.$set(data, 'tableId', item.property) // 插入搜索条件
          }
        })
        this.$set(data, 'fieldList', listQuery) // 插入搜索条件
        this.$set(data, 'addFormField', addFormField) // 插入表单字段信息
        this.$set(data, 'editFormField', editFormField) // 插入表单字段信息
        this.$set(data, 'formRules', formRules) // 插入校验规则
        // 处理按钮左右位置，重组按钮
        // let queryLeftBtn = []
        // let queryRightBtn = []
        let addFormLeftBtn = []
        let addFormRightBtn = []
        let editFormLeftBtn = []
        let editFormRightBtn = []
        // let tableLeftBtn = []
        // let tableRightBtn = []
        // if (data.tableButtons.length > 0) {
        //   data.tableButtons.forEach(item => {
        //     if (item.alignRight) {
        //       tableRightBtn.push(item)
        //     } else {
        //       tableLeftBtn.push(item)
        //     }
        //   })
        //   this.$set(data, 'tableLeftBtn', tableLeftBtn) // 插入左侧按钮
        //   this.$set(data, 'tableRightBtn', tableRightBtn) // 插入右侧按钮
        // }
        // if (data.queryFormButtons.length > 0) {
        //   data.queryFormButtons.forEach(item => {
        //     if (item.alignRight) {
        //       queryRightBtn.push(item)
        //     } else {
        //       queryLeftBtn.push(item)
        //     }
        //   })
        //   this.$set(data, 'queryLeftBtn', queryLeftBtn) // 插入左侧按钮
        //   this.$set(data, 'queryRightBtn', queryRightBtn) // 插入右侧按钮
        // }
        if (data.addFormButtons.length > 0) {
          data.addFormButtons.forEach(item => {
            if (item.alignRight) {
              addFormRightBtn.push(item)
            } else {
              addFormLeftBtn.push(item)
            }
          })
          this.$set(data, 'addFormLeftBtn', addFormLeftBtn) // 插入左侧按钮
          this.$set(data, 'addFormRightBtn', addFormRightBtn) // 插入右侧按钮
        }
        if (data.modFormButtons.length > 0) {
          data.modFormButtons.forEach(item => {
            if (item.alignRight) {
              editFormRightBtn.push(item)
            } else {
              editFormLeftBtn.push(item)
            }
          })
          this.$set(data, 'editFormLeftBtn', editFormLeftBtn) // 插入左侧按钮
          this.$set(data, 'editFormRightBtn', editFormRightBtn) // 插入右侧按钮
        }
        // getQuery(sign, { page: 0, size: 2 }).then(response => {
        let queryRes = await getQuery(sign, {
          page: 0,
          size: 2
        })
        this.$set(
          data,
          'tableList',
          Object.assign({}, queryRes.data, {
            page: 0,
            size: 2
          })
        ) // 插入表格内容
        this.$store.commit('crud/SET_PAGE_DATAS', data)
        if (this.getDetail) {
          // 获取详情
          this.getDetail()
        }
        this.showModule = true
        // })
        // })
      } else {
        // 页面标识仍然存在，直接读取数据
        // 不调用接口也需要切换页面标识
        this.$store.commit('crud/SET_MODULE_SIGN', sign)
        if (this.getDetail) {
          this.getDetail()
        }
        // this.$store.commit('crud/SET_PAGE_DATAS', this.pageStates)
        this.showModule = true
      }
    },
    /**
     *  @param type 表单组件类型（大控件类型）
     *  @param title 字段中文名
     *  @param columnName 字段名
     */
    formatRules(type, title, columnName, inputHint) {
      // 暂时必须使用自定义校验，因为绑定的校验的值在Vuex中，实际v-model的值是页面内的值
      switch (type) {
        case 'STRING': // 输入框(含有子类型)
          return {
            required: true,
            message: inputHint || `${title}格式不正确!!!`,
            trigger: 'blur'
          }
        // return { required: true, validator: (rule, value, callback) => { // 自定义方法
        //   let message = inputHint || `${title}格式不正确!!!`
        //   if (!value) {
        //     callback(new Error(message))
        //   } else {
        //     callback()
        //   }
        // }, trigger: 'blur' }
        case 'COMBO': // 下拉框
          return {
            required: true,
            message: inputHint || `请选择${title}!!!`,
            trigger: 'change'
          }
        // return { required: true, validator: (rule, value, callback) => { // 自定义方法
        //   let message = inputHint || `请选择${title}!!!`
        //   if (!this.pageStates[this.moduleSign].formField[columnName]) {
        //     callback(new Error(message))
        //   } else {
        //     callback()
        //   }
        // }, trigger: 'change' }
        // return { required: true, message: `请选择${title}`, trigger: 'change' }
        case 'IMAGE': // 图片上传（后期优化成校验尺寸）
          return {
            required: true,
            message: inputHint || '请上传图片!',
            trigger: 'change'
          }
        // return { required: true, validator: (rule, value, callback) => { // 自定义方法
        //   let message = inputHint || '请上传图片!'
        //   if (!this.pageStates[this.moduleSign].formField[columnName]) {
        //     callback(new Error(message))
        //   } else {
        //     callback()
        //   }
        // }, trigger: 'change' }
        case 'INT':
          return {
            required: true,
            validator: (rule, value, callback) => {
              // 自定义方法
              let message = inputHint || `${title}必须大于0`
              if (~~value <= 0) {
                callback(new Error(message))
              } else {
                callback()
              }
            },
            trigger: 'change'
          }
        // return { required: true, message: inputHint || `${title}必须大于0`, trigger: 'change' }
        case 'DATETIME': // 时间组件，时间选择器
          // return { required: true, validator: (rule, value, callback) => { // 自定义方法
          //   let message = inputHint || `请选择${title}!!!`
          //   if (!this.pageStates[this.moduleSign].formField[columnName]) {
          //     callback(new Error(message))
          //   } else {
          //     callback()
          //   }
          // }, trigger: 'change' }
          return {
            required: true,
            message: inputHint || `请选择${title}!!!`,
            trigger: 'change'
          }
        case 'checkbox':
          // return { required: true, validator: (rule, value, callback) => { // 自定义方法
          //   let message = inputHint || `请选择${title}!!!`
          //   if (this.pageStates[this.moduleSign].formField[columnName].length === 0) {
          //     callback(new Error(message))
          //   } else {
          //     callback()
          //   }
          // }, trigger: 'change' }
          return {
            type: 'array',
            required: true,
            message: inputHint || `请选择${title}!!!`,
            trigger: 'change'
          }

        default:
          break
      }
    }
  }
}
