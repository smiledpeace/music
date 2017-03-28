/**
 * Created by Administrator on 2017/1/12 0012.
 */
import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);
const utils = {
  /**
   * 对象的深度复制
   * @param obj
   * @returns {{}}
   */
  objectDepthCopy: function (obj) {
    var temp = null;
    if (obj && !(obj instanceof Array)) {
      temp = {};
      for (var item in obj) {
        if (obj[item] && typeof obj[item] == 'object') {
          //if(item == '')
          temp[item] = this.objectDepthCopy(obj[item]);
        } else {
          temp[item] = obj[item];
        }
      }
    } else {
      temp = [];
      if (obj) {
        for (var i = 0, _i = obj.length; i < _i; i++) {
          if (obj[i] && typeof obj[i] == 'object') {
            temp[i] = this.objectDepthCopy(obj[i]);
          } else {
            temp[i] = obj[i];
          }
        }
      }
    }
    return temp;
  },
  queryData: function (params, sucCB, unsucCB, errCB) {
    let url = 'https://api.imjad.cn/cloudmusic/?'
    url = url + params;
    Vue.http.get(url, params).then((res) => {
      let resultJson;
      try {
        resultJson = JSON.parse(res.data);
      }catch(e){
        resultJson = res.data;
      }
      sucCB(resultJson);
    }, (res) => {
      if (errCB && typeof errCB === 'function') {
        errCB();
      }
      utils.unSucess('操作超时，请重试或刷新页面！');
    });
  },
  unSucess (word) {
    alert(word || '操作失败');
  }
};
export default utils;
