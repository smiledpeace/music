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

export const setGress = ({commit},gress) => {
  commit('SETGRESS',gress)
};

export const setVolume = ({commit},Volume) => {
  commit('SETVOLUME',Volume)
};

export const setStatus = ({commit}) => {
  commit('SETSTATUS')
};

export const getSongDetail = ({commit},imgUrl) => {
  commit('GETSONGDETAIL',imgUrl)
};

export const setCurrentTime = (store) => {
  store.state.audio.ontimeupdate  = function () {
    store.commit('SETCURRENTTIME',store.state.audio.currentTime * 1000);
    store.dispatch('setProgress');
  };
};
export const setProgress = (store) => {
  let detail = store.state.detail;
  store.state.gress.setAttribute('max',detail.dt);
  store.state.gress.oninput = function () {
    store.state.currentTime = +this.value;
    store.state.audio.currentTime = +this.value / 1000;
    store.state.gress.style.backgroundSize = `${(this.value / detail.dt) * 100}% 100%`;
  };
  store.state.gress.value = store.state.currentTime;
  store.state.gress.style.backgroundSize = `${(store.state.gress.value / detail.dt) * 100}% 100%`;
};
