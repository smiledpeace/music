/**
 * Created by Administrator on 2017/3/9 0009.
 */
import api from '../assets/js/apis';
export const search = ({commit},param) => {
  api.search(param,res => {
    commit('SEARCH',res.result);
  });
};

export const getSong = (store,param,) => {
  return new Promise(function (resolve,reject) {
    api.getSong(param, res => {
      store.commit('GETSONG',res.data[0]);
      resolve();
    })
  })

};
export const setIndex = ({commit},index) => {
  commit('SETINDEX',index)
};

export const setNextIndex = ({commit}) => {
  commit('SETNEXTINDEX')
};

export const setPrevIndex = ({commit}) => {
  commit('SETPREVINDEX')
};

export const setAudio = ({commit},audio) => {
  commit('SETAUDIO',audio)
};

export const setStatus = ({commit}) => {
  commit('SETSTATUS')
};

export const getSongDetail = ({commit},imgUrl) => {
  commit('GETSONGDETAIL',imgUrl)
}
