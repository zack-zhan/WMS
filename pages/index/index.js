const app = getApp(); //页面js的 Page方法外定义

Page({
  data: {
    arr: [],
    list: []
  },

  // 获取列表
  list(){
    app.get('/statistics/index')
      .then(res=>{
        if(res.code === 200){
          this.setData({
            arr: res.body
          });
        }
      })
    app.get('/inventory/statistics')
      .then(res=>{
        if(res.code === 200){
          this.setData({
            list: res.body
          });
        }
      })
  },

  // 库存不足
  warn(){
    dd.navigateTo({
      url: '../inventory/understock/understock'
    })
  },

  onLoad(query) {
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
  },
  onReady() {
    // 页面加载完成
  },
  onShow() {
    // 页面显示
    
    this.list()
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },
});
