const app = getApp();

Page({
  data: {
    arr: [],
    list: [],

    search: ''
  },

  // 获取列表
  list(){
    const params = {
      query: this.data.search
    }
    app.get('/inventory/statistics')
      .then(res=>{
        if(res.code === 200){
          this.setData({
            arr: res.body
          });
        }
      })
    app.get('/inventory/inventoryPage',params)
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

  // 库存预警
  warn(){
    dd.navigateTo({
      url: './understock/understock'
    })
  },

  onLoad() {
    dd.setNavigationBar({
      title: '库存管理'
    });

    this.list()
  }
});
