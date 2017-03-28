<template>
  <div id="wrapper">
    <header>
      <h1></h1>
      <h2>
        <span>＜</span>
        <span>＞</span>
      </h2>
      <div class="search">
        <input type="text" v-model="value" @keyup.enter="search">
        <i @click="search"></i>
      </div>
      <div></div>
    </header>
    <aside></aside>
    <article>

      <search-list :search-result="value" ></search-list>
    </article>
    <footer>
      <div>
        <span class="prev" @click="prevSong"></span>
        <span class="play" @click="play"></span>
        <span class="next" @click="nextSong"></span>
      </div>
      <div class="progress"></div>
      <div class="voice"></div>
      <div></div>
    </footer>
    <audio id="audio" :src="url" controls="controls"></audio>
  </div>
</template>
<style scoped lang="less" rel="stylesheet/less">
  #wrapper {
    width: 1022px;
    height: 670px;
    background: #16181c;
    position: relative;
    top: 50%;
    left: 50%;
    margin-left: -511px;
    margin-top: -335px;
    header {
      position: absolute;
      height: 47px;
      width: 100%;
      border-bottom: 2px solid #730909;
      background-color: #222225;
      display: flex;
      z-index: 2;
      h1 {
        width: 147px;
        height: 47px;
        background: url("../static/images/logo.png");
        background-size: cover;
      }
      h2 {
        width: 53px;
        height: 22px;
        margin: 12px 10px 0 50px;
        border: 1px solid #18181a;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        line-height: 22px;
        span {
          display: inline-block;
          box-sizing: border-box;
          height: 100%;
          color: #cfd0d1;
          font-size: 12px;
          text-align: center;
          width: 50%;
          &:first-child {
            border-right: 1px solid #18181a;
          }
        }
      }
      .search {
        height: 22px;
        position: relative;
        margin-top: 12px;
        input {
          background: #161618;
          width: 220px;
          height: 22px;
          border-radius: 22px;
          color: #cfd0d1;
          font-size: 12px;
          padding: 0 10px;
          box-sizing: border-box;
        }
        i {
          display: inline-block;
          width: 12px;
          height: 13px;
          background: url("../static/images/search.png");
          position: absolute;
          right: 10px;
          top: 4px;
          cursor: pointer;
        }
      }
    }
    aside {
      position: absolute;
      top: 49px;
      bottom: 48px;
      width: 200px;
      border-right: 1px solid #23262c;
      background-color: #191b1f;
    }
    footer {
      position: absolute;
      height: 49px;
      border-top: 1px solid #23262c;
      width: 100%;
      bottom: 0;
      background-color: #222225;
      display: flex;
      align-items: center;
      #audio {
        display: none;
      }
      div {
        height: 100%;
      }
      div:first-child {
        width: 200px;
        display: flex;
        padding: 0 20px;
        box-sizing: border-box;
        justify-content: space-around;
        align-items: center;
        span {
          display: inline-block;
          cursor: pointer;
        }
        span.prev, span.next {
          width: 30px;
          height: 30px;
          border-radius: 100%;
          border:  1px solid #636366;
        }
        span.prev {
          background: url("../static/images/prev.png") center center no-repeat;
        }
        span.next {
          background: url("../static/images/next.png") center center no-repeat;
        }
        span.play , span.pause{
          width: 34px;
          height: 34px;
          border-radius: 100%;
          border:  1px solid #636366;

        }
        span.play {
          background: url("../static/images/play.png") center center no-repeat;
        }
        span.pause {
          background: url("../static/images/play.png") center center no-repeat;
        }
        span:hover {
          border-color: #cfd0d1;
        }
      }
      div.progress {
        width: 530px;
      }
      div.voice {
        width: 140px;
      }
      div:last-child {
        flex:1;
      }
    }
    article {
      position: absolute;
      top: 47px;
      left: 200px;
      bottom: 48px;
      right: 0;
      overflow: auto;
      z-index: 1;
    }
  }

</style>
<script>
  import {mapGetters} from 'vuex'
  import searchList from './components/searchList.vue';
  export default {
    name: 'app',
    mounted () {
        this.$store.dispatch('setAudio',document.querySelector('#audio'));

    },
    data() {
        return {
          value: ''
        }
    },
    methods: {
      search () {
          let params =  {
            search_type: '',
            search_key: this.value,
            offset: 0,
          };
        this.$store.dispatch('search',params);
      },
      play() {
          if(this.is_play ) {
            this.audio.pause();
            this.$store.dispatch('setStatus');
            document.querySelector('.play').classname = 'play';

          }
      },
      nextSong () {
        this.$store.dispatch('setNextIndex');
        let item = this.getList.songs[this.getIndex];
        let params = {
          id: item.id
        };
        this.$store.dispatch('getSong',params);
        setTimeout(() => {
            this.audio.play();
            this.$store.dispatch('setStatus');
          document.querySelector('.play').classname = 'pause';

        },500)

      },
      prevSong() {
        this.$store.dispatch('setPrevIndex');
        let item = this.getList.songs[this.getIndex];
        let params = {
          id: item.id
        };
        this.$store.dispatch('getSong',params);
        setTimeout(() => {
            this.audio.play();
            this.$store.dispatch('setStatus');
          document.querySelector('.play').classname = 'pause';
        },500)
      }
    },
    components: {
      searchList
    },
    computed: {
      ...mapGetters ({
        url: 'getSongUrl',
        getList: 'getList',
        getIndex: 'getIndex',
        audio: 'getAudio',
        is_play: 'getStatus'
      })
    }

  }
</script>
