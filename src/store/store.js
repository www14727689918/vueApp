import Vue from 'vue'
import Vuex from  'vuex'
Vue.use(Vuex)


var state = {
  count: 0,
  userMsg:'',
  totalprice:0,
  cartDetail:[],
  isA: false,
  isB: false,
  isC: false,
}
const mutations = {
  set(state, data){
    state.count = data
  },
  steA(state, data){
    state.isA = data
  },
  steB(state, data){
    state.isB = data
  },
  steC(state, data){
    state.isC = data
  },
  userMsgSet(state,data){
    state.userMsg=data
  },
  totalSet(state, data){
    state.totalprice = data
  },
  detailSet(state, data){
    state.cartDetail = data
  },
  add(state){
    state.count++
  },
  sub(state){
    state.count--
  }
}
const getters = {
  count(state){
    return state.count
  },
  isA(state){
    return state.isA
  },
  isB(state){
    return state.isB
  },
  isC(state){
    return state.isC
  },
  userMsg(state){
    return state.userMsg
  },
  totalprice(state){
    return state.totalprice
  },
  cartDetail(state){
    return state.cartDetail
  }
}
const actions = {
  add: ({
    commit
  }) => {
    commit('add')
  },
  sub: ({
          commit
        }) => {
    commit('sub')
  },
  set: ({
          commit
        }) => {
    commit('set')
  },
  steA: ({
          commit
        }) => {
    commit('steA')
  },
  steB: ({
           commit
         }) => {
    commit('steB')
  },
  steC: ({
           commit
         }) => {
    commit('steC')
  },
  totalSet: ({
          commit
        }) => {
    commit('totalSet')
  },
  userMsgSet: ({
               commit
             }) => {
    commit('userMsgSet')
  },
}
export default  new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})
