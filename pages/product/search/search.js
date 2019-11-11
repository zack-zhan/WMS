const app = getApp();

Page({
  data: {
    search: '',
    list: [],
    select: [],

    btnVisible: true
  },

  // 获取列表
  list(){
    const params = {
      query: this.data.search
    }
    if(this.data.type === '1'){
      app.get('/goods/all',params)
        .then(res=>{
          if(res.code === 200){
            this.setData({
              list: res.body
            });
          }
        })
    }else{
      app.get('/goods/exit',params)
        .then(res=>{
          if(res.code === 200){
            this.setData({
              list: res.body
            });
          }
        })
    }
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

  // 监听键盘弹出
  onKeyboardShow() {
    this.setData({
      btnVisible: false
    })
  },
  // 监听键盘收起
  onKeyboardHide() {
    this.setData({
      btnVisible: true
    })
  },

  // 选择
  select(e){
    const index = e.currentTarget.dataset.index
    const item = this.data.list[index]
    this.setData({
      select: item
    })
  },
  // 确定
  confirm(){
    const data = this.data.select
    if(this.data.type === '1'){
      dd.navigateTo({
        url: `../../stock/add-stock/add-stock?id=${data.id}&name=${data.name}`
      })
    }else{
      dd.navigateTo({
        url: `../../shipment/add-shipment/add-shipment?id=${data.id}&name=${data.name}`
      })
    }
  },

  onLoad(query) {
    dd.setNavigationBar({
      title: '货品搜索'
    });

    this.setData({
      type: query.type
    })
    this.list()
  },
});
