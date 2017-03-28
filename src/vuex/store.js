/**
 * Created by Administrator on 2017/1/13 0013.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as mutations from './mutations';
import * as getters from './getters';
Vue.use(Vuex);

const state = {
  isSearch: false,
  searchList: [],
  songInfo: '',
  songIndex: 0,
  audio: '',
  is_play: false
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
