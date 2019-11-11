const app = getApp();

Page({
  data: {
    search: '',
    btnVisible: true,

    objectArray: [
      {value:'全部类型'}
    ],
    arrIndex: null,
    show: true,
    type: '',
    typeStr: '',

    list: [],
    selectArr: [],
    more: 0,
    few: 0,
    visible: false,
  },

  // 获取客户类型
  type(){
    const params = {
      type: 0
    }
    app.get('/dictionary/list',params)
      .then(res=>{
        if(res.code === 200){
          const arr = [
            {value:'全部类型'}
          ]
          res.body.map(item=>{
            arr.push(item)
          })
          this.setData({
            objectArray: arr
          });
        }
      })
  },
  // 监听客户类型
  bindObjPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      arrIndex: e.detail.value,
      show: false,
      type: this.data.objectArray[e.detail.value].id,
      typeStr: this.data.objectArray[e.detail.value].value
    });
    this.list()
  },
  // 获取列表
  list(){
    const params = {
      type: this.data.type,
      query: this.data.search
    }
    app.get('/storagecheck/goodslist',params)
      .then(res=>{
        if(res.code === 200){
          const list = []
          res.body.list.map(item=>{
            item.offset = 0
            item.num = 0
            list.push(item)
          })
          this.setData({
            list: list
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

  // 监听数量
  setNum(e){
    const index = e.currentTarget.dataset.index
    const list = this.data.list
    const dataIndex = this.data.list[index]

    const value = e.detail.value.replace(/[^\d]/g, "")
    dataIndex.num = value
    console.log(dataIndex.num)

    let offset = null
    if(!dataIndex.num || dataIndex.num === '0'){
      offset = 0
    }else{
      offset = dataIndex.num - dataIndex.inventory
    }
    dataIndex.offset = offset
    list[index] = dataIndex

    this.setData({
      list:list
    });
    this.check()
  },
  // 减
  subtract(e){
    const index = e.currentTarget.dataset.index
    const list = this.data.list
    
    const dataIndex = this.data.list[index]
    if(dataIndex.num > 0){
      dataIndex.num = dataIndex.num - 1

      let offset = null
      if(dataIndex.num === 0){
        offset = 0
      }else{
        offset = dataIndex.num - dataIndex.inventory
      }
      dataIndex.offset = offset

      list[index] = dataIndex
      this.setData({
        list:list
      });
      this.check()
    }
  },
  // 加
  add(e){
    const index = e.currentTarget.dataset.index
    const list = this.data.list

    const dataIndex = this.data.list[index]
    dataIndex.num = dataIndex.num + 1
    dataIndex.offset = dataIndex.num - dataIndex.inventory

    list[index] = dataIndex
    this.setData({
      list: list
    });
    this.check()
  },
  // 选择的盘点
  check(){
    const arr = []
    let more = 0
    let few = 0
    this.data.list.map(item=>{
      if(item.num > 0){
        const obj = {
          goodsId: item.goodsId,
          actualInventory: item.num
        }
        arr.push(obj)
      }
      if(item.offset > 0){
        more = more + 1
      }
      if(item.offset < 0){
        few = few + 1
      }
    })
    this.setData({
      selectArr: arr,
      more: more,
      few: few
    });
  },

  // 添加完成
  accomplish(){
    dd.showLoading({
      content: '加载中...'
    });
    setTimeout (() =>{
      dd.hideLoading();
      this.setData({
        visible: true
      });
    },1000)
  },
  // 继续添加
  cancel(){
    this.setData({
      visible: false
    });
  },
  // 提交
  submit(){
    this.setData({
      visible: false
    });
    const params = {
      list: this.data.selectArr
    }
    app.post('/storagecheck/commit',params)
      .then(res=>{
        if(res.code === 200){
          dd.alert({
            title: '提交成功',
            buttonText: '我知道了',
            success: () => {
              dd.navigateTo({
                url: '../check'
              })
            },
          });
        }
      })
  },

  onLoad() {
    dd.setNavigationBar({
      title: '新增盘点'
    });

    this.type()
  },
});
