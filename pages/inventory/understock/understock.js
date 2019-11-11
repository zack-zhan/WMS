const app = getApp();

Page({
  data: {
    list:[],

    search: ''
  },

  // 获取列表
  list(){
    const params = {
      query: this.data.search
    }
    app.get('/inventory/warningPagr',params)
      .then(res=>{
        if(res.code === 200){
          this.setData({
            list: res.body.list
          });
        }
      })
  },
  // 监听搜索框
  setSearch(e){
    this.setData({
      search: e.detail.value
    })
    this.list()
  },
  // 清空搜索框
  clear(){
    this.setData({
      search: ''
    })
    this.list()
  },

  onLoad() {
    dd.setNavigationBar({
      title: '库存不足'
    });

    this.list()
  }
});
