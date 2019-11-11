const app = getApp();

Page({
  data: {
    list: []
  },

  onLoad(query) {
    dd.setNavigationBar({
      title: '盘点单详情'
    });

    const params = {
      id: query.id
    }
    app.get('/storagecheck/detail',params)
      .then(res=>{
        if(res.code === 200){
          this.setData({
            list: res.body
          });
        }
      })
  }
});
