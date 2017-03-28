/**
 * Created by Administrator on 2017/3/9 0009.
 */

export const SEARCH = (state,val) => {
  state.isSearch = true;
  state.searchList = val;
};

export const GETSONG = (state,val) => {
  state.songInfo = val;
};

export const SETINDEX = (state,index) => {
  state.songIndex = index;
};

export const SETNEXTINDEX = (state) => {
  state.songIndex = ++state.songIndex;
};

export const SETPREVINDEX = (state) => {
  state.songIndex = state.songIndex ? --state.songIndex : 0;
};

export const SETAUDIO = (state,audio) => {
  state.audio = audio
};

export const SETSTATUS = (state) => {
  state.is_play = !state.is_play
};


