const app = getApp();

Page({
  data: {
    list:[],
    num: null,
    visible: false,
    details: [],

    btnWidth: 104,
    startX:0,

    operation: null,

    search: '',
    btnVisible: true
  },

  // 获取列表
  list(){
    const params = {
      query: this.data.search
    }
    app.get('/supplier/page',params)
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

  // 展开
  unfold(e){
    const index = e.currentTarget.dataset.index
    const list = this.data.list
    list.map((item,itemIndex)=>{
      if(index === itemIndex){
        item.visible = !item.visible
      }else{
        item.visible = false
      }
    })
    this.setData({
      list: list
    })
    if(list[index].visible){
      const params = {
        id: this.data.list[e.currentTarget.dataset.index].id
      }
      app.get('/supplier/detail',params)
        .then(res=>{
          if(res.code === 200){
            this.setData({
              details: res.body
            });
          }
      })
    }
  },
  // 复制
  copy(){
    if(this.data.details.remarks){
      dd.setClipboard({
        text: this.data.details.remarks
      });
      dd.showToast({
        type: 'success',
        content: '复制成功',
        duration: 1000,
      });
    }
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

  // 触摸开始
  start(e){
    this.setData({
      startX: e.changedTouches[0].clientX
    })
  },
  // 触摸移动
  move(e){
    if((this.data.startX - e.changedTouches[0].clientX) > this.data.btnWidth){
      this.setData({
        operation: e.currentTarget.dataset.index
      })
    }
    if((e.changedTouches[0].clientX - this.data.startX) > this.data.btnWidth){
      this.setData({
        operation: null
      })
    }
  },

  // 编辑
  edit(e){
    const id = e.currentTarget.dataset.id
    dd.navigateTo({
      url: `./edit-supplier/edit-supplier?id=${id}`
    })
  },
  // 删除
  del(e){
    const params = {
      id: e.currentTarget.dataset.id
    }
    app.get('/supplier/delete',params)
      .then(res=>{
        if(res.code === 200){
          dd.alert({
            title: '删除成功',
            buttonText: '我知道了',
            success: () => {
              this.setData({
                operation: null
              })
              this.list()
            },
          });
        }
      })
  },

  onLoad() {
    dd.setNavigationBar({
      title: '供应商管理'
    });
    this.list()
  },
  onShow() {
    // 页面显示
    this.setData({
      operation: null
    })
  },
});
