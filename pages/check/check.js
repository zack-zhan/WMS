const app = getApp();

Page({
  data: {
    list:[],

    search: '',

    btnVisible: true
  },

  // 获取列表
  list(){
    const params = {
      query: this.data.search
    }
    app.get('/storagecheck/page',params)
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

  // 查看详情
  look(e){
    const id = e.currentTarget.dataset.id
    dd.navigateTo({
      url: `./detail/detail?id=${id}`
    })
  },

  onLoad() {
    dd.setNavigationBar({
      title: '盘点管理'
    });

    this.list()
  },
});
