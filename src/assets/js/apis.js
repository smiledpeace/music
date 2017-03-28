/**
 * Created by Administrator on 2017/1/12 0012.
 */
import util from './utils';
const musicApi = {
  search (param,cb) {
    let params = `type=search${param.search_type ? `&${param.search_type}` : '&'}s=${param.search_key}${param.offset ? `&offset=${param.offset}` : ''}`;
    util.queryData(params,res => {
      if (cb && typeof cb === 'function') {
        cb(res);
      }
    })
  },
  getSong (param,cb) {
    let params = `type=song&id=${param.id}${param.br ? `&br=${param.br}` : ''}`;
    util.queryData(params,res => {
      if (cb && typeof cb === 'function') {
        cb(res);
      }
    })
  }
};

export default musicApi;
