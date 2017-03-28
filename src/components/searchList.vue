<template>
  <div>
    <div class="header">
      <template v-if="getList.songCount">
        搜索 <span>"{{searchResult}}"</span> 找到{{getList.songCount}}首单曲
      </template>
    </div>
    <nav></nav>
    <song-list :song-list="getList.songs" :search-result="searchResult"></song-list>
  </div>
</template>
<style scoped lang="less" rel="stylesheet/less">
  .header {
    height: 73px;
    line-height: 73px;
    padding-left: 30px;
    color: #dcdde4;
    font-size: 13px;
    span {
      color: #2e6b8f;
      margin: 0 3px;
    }
  }
</style>
<script>
  import {mapGetters} from 'vuex'
  import songList from './songList.vue';
    export default{
        mounted () {

        },
        data () {
            return {}
        },
        methods: {

        },
        props: ['searchResult'],
      computed: {
        ...mapGetters({
            getList: 'getList',
        })
      },
        components: {
          songList
        }
    }
</script>
