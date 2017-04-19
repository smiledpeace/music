<template>
  <ul class="list">
    <li>
      <template v-for="tab in tabs">
        <span>{{tab}}</span>
      </template>

    </li>
    <li v-for="(song,index) in songList" @dblclick="getSong(song,index)">
      <span>{{index + 1 | add-zero}}</span>
      <span> </span>
      <span class="name">{{song.name}}</span>
      <span class="ar">{{song.ar[0].name}}</span>
      <span class="al">{{song.al.name}}</span>
      <span>{{song.dt | get-time}}</span>
      <span> </span>
    </li>
  </ul>
</template>
<style scoped lang="less" rel="stylesheet/less">
  .ellipsis(@w: auto) {
    text-overflow: ellipsis;
    overflow: hidden;
    width: @w;
    white-space: nowrap;
  }
  ul {
    user-select: none;
    cursor: default;
    li{
      display: flex;
      box-sizing: border-box;
      font-size: 12px;
      color: #828385;
      span {
        display: block;
        border-right: 1px solid #23262c;
        box-sizing: border-box;
        padding: 5px 10px;
        &:first-child {
          width: 50px;
          text-align: right;
        }
        &:nth-child(2) {
          width: 55px;
        }
        &:nth-child(3) {
          width: 220px;
          .ellipsis(@w:220px);
          color: #dcdde4;
        }
        &:nth-child(4) {
          width: 120px;
        }
        &:nth-child(5) {
          width: 155px;
          .ellipsis(@w:155px)
        }
        &:nth-child(6) {
          width: 70px;
        }
        &:last-child{
          flex: 1;
          border-right: none;
        }
      }
      line-height: 24px;
      height: 35px;
      &:nth-child(odd) {
        background: #1a1c20;
      }
      &:hover {
        background: #232529;
      }
    }
    li:first-child {
      background: #16181c;
      border-bottom: 1px solid #23262c;
      border-top: 1px solid #b82525;
    }

  }
</style>
<script>
    import {mapGetters} from 'vuex';
    export default {
        updated () {

        },
        data () {
            return {
              tabs: ['','操作','音乐标题','歌手','专辑','时长','热度']
            }
        },
        methods: {
            getSong (item,index) {
                let params = {
                  id: item.id
                };
                this.$store.dispatch('getSong',params).then(() => {
                    this.audio.play();
                    this.$store.dispatch('setIndex',index);
                    document.querySelector('.play').className = 'play playPic';
                    this.$store.dispatch('getSongDetail',this.songList[index]);
                    this.$store.dispatch('setCurrentTime');
                });
            },
            addClass() {

            },
            addColor (name) {
                let check = this.searchResult;
                let $name = document.querySelectorAll(`.${name}`);
                $name = Array.prototype.slice.call($name);
                $name.forEach(content => {
                    if(~content.innerHTML.indexOf(check)) {
                        content.innerHTML = content.innerHTML.replace(check,`<span style="color: #2e6b8f;">${check}</span>`)
                    }
                })
            }
        },
        props: ['songList','searchResult'],
        components: {},
      computed: {
        ...mapGetters({
            audio: 'getAudio',
        })
      },
      watch: {
        songList () {
          this.$nextTick(() => {
            this.addColor('name');
            this.addColor('ar');
            this.addColor('al');
          })
        }
      },
      filters: {
        addZero (val) {
            if (val < 10) {
                return `0${val}`;
            }else {
                return val;
            }
        },
        getTime (val) {
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
      },
    }
</script>
