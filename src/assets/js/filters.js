/**
 * Created by Administrator on 2017/4/19 0019.
 */
export const getTime =  (val) => {
  if (!val) return '00:00';
  if (val){
      val = parseInt(val / 1000);
      let seconds = val % 60;
      let min = parseInt(val / 60 % 60) ;
      let hours = parseInt(val / 3600 % 24) ;
      let days = 0;
      if (seconds < 10){
          seconds = '0' + seconds;
      }
      if (min < 10){
          min = '0' + min;
      }
      if (hours < 10){
          hours = '0' + hours;
      }
      if (hours > 1) {

          return  hours + ':' + min + ':' + seconds;
      }else {
          return  min + ':' + seconds;
      }
  }
}
