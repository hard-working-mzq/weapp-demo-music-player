//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
   item:0,
   tab:0,

   playlist:[{
    id: 1, title: '情人',singer: '蔡徐坤',
    src:'https://s320.xiami.net/751/73751/5020692612/2100660633_1590315436298_1349.mp3?ccode=xiami_web_web&expire=86400&duration=195&psid=2daeb8e2d3485b7e2c7df36785eed8b2&ups_client_netip=210.21.79.253&ups_ts=1595562327&ups_userid=0&utid=qTY0FakE31wCAdIVT/7o/LbQ&vid=2100660633&fn=2100660633_1590315436298_1349.mp3&vkey=B2ae840646dfbd097464d8515d393269c',coverImgUrl: '/images/cover.jpg'
  },{
    id: 2, title: '侧脸',singer: '于果',
    src:'https://s128.xiami.net/38/2110193038/2103511942/1801671893_1517465142541.mp3?ccode=xiami_web_web&expire=86400&duration=217&psid=69d44987287065e217001ed8e9a83046&ups_client_netip=210.21.79.253&ups_ts=1595562103&ups_userid=0&utid=qTY0FakE31wCAdIVT/7o/LbQ&vid=1801671893&fn=1801671893_1517465142541.mp3&vkey=Bd3b345e27166470b0b77e63fb84ff85f',coverImgUrl: '/images/cover2.jpg'
  },{
    id: 3, title: 'DDU-DU DDU-DU',singer: 'blackpink',
    src:'https://s128.xiami.net/3/2103332003/2103896258/1804484282_1537160719149.mp3?ccode=xiami_web_web&expire=86400&duration=209&psid=9efa996723681c71dc4c55cc0cef39da&ups_client_netip=210.21.79.253&ups_ts=1595562160&ups_userid=0&utid=qTY0FakE31wCAdIVT/7o/LbQ&vid=1804484282&fn=1804484282_1537160719149.mp3&vkey=B5ce11093495c2a0bcdd4bcd63f8ee76f',coverImgUrl: '/images/cover3.jpg'
  }],

   state: 'paused',
   playIndex: 0,
   play: {
     currentTime: '00:00',
     duration: '00:00',
     percent: 0,
     title: '',
     singer: '',
     coverImgUrl: '/images/cover.jpg',
   },
  },

  changeItem: function(e) {
    this.setData({
      item:e.target.dataset.item
    })
  },

  changeTab: function(e){
    this.setData({
      tab: e.detail.current
    })
  },

  audioCtx: null,

  onReady: function() {
    this.audioCtx = wx.createInnerAudioContext()
    this.setMusic(0)

    this.audioCtx = wx.createInnerAudioContext()
    var that = this
    this.audioCtx.onError(function() {
      console.log('播放失败：' + that.audioCtx.src)
    })
    this.audioCtx.onEnded(function() {
      that.next()
    })
    this.audioCtx.onPlay(function() {})
    this.audioCtx.onTimeUpdate(function() {
      that.setData ({
        'play.duration': formatTime(that.audioCtx.duration),
        'play.currentTime': formatTime(that.audioCtx.currentTime),
        'play.percent': that.audioCtx.currentTime / that.audioCtx.duration * 100
      })
    })
    this.setMusic(0)
    function formatTime(time) {
      var minute = Math.floor(time / 60) % 60;
      var second = Math.floor(time) % 60
      return (minute < 10 ? '0' + minute : minute) + ':' + (second < 10 ? '0' + second : second)
    }
  },

  setMusic: function(index) {
    var music = this.data.playlist[index]
    this.audioCtx.src = music.src
    this.setData({
      playIndex: index,
      'play.title': music.title,
      'play.singer': music.singer,
      'play.coverImgUrl': music.coverImgUrl,
      'play.currentTime': '00:00',
      'play.duration': '00:00',
      'play.percnet':0
    })
  },

  play: function(){
    this.audioCtx.play()
    this.setData({state: 'running'})
  },

  pause: function(){
    this.audioCtx.pause()
    this.setData({state: 'paused'})
  },

  next: function(){
    var index = this.data.playIndex >= this.data.playlist.length - 1 ?
                0 : this.data.playIndex + 1
    this.setMusic(index)
    if (this.data.state === 'running') {
      this.play()
    }
  },

  sliderChange: function(e){
    var second = e.detail.value * this.audioCtx.duration / 100
    this.audioCtx.seek(second)
  },

  change: function(e) {
    this.setMusic(e.currentTarget.dataset.index)
    this.play()
  },
  
})


