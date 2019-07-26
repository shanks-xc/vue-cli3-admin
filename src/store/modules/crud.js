
const state = {
  moduleSign: '', // 模块标识，用于记录当前访问模块的信息（关联路由信息）
  pageStates: { // 每次列表切换，重置内容

  }
}

const mutations = {
  SET_PAGE_DATAS: (state, data) => { // 页面配置元素,以页面标识为key
    state.pageStates[state.moduleSign] = data
  },
  SET_MODULE_SIGN: (state, data) => { // 页面唯一标识
    state.moduleSign = data
  },
  COPY_QUERY_DATA: (state, fieldList) => { // 搜索条件复制
    const pageState = state.pageStates[state.moduleSign]
    pageState.fieldList = fieldList
  },
  SET_TABLE_DATA(state, tableList) { // 设置页面列表数据信息
    const pageState = state.pageStates[state.moduleSign]
    pageState.tableList = tableList
  }
}

const actions = {
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
