const app = getApp();

Page({
  data: {
    type:'',

    list:[],

    addArr:[{}],

    btnVisible: true
  },

  // 获取列表
  list(){
    const params = {
      type: this.data.type
    }
    app.get('/dictionary/list',params)
      .then(res=>{
        if(res.code === 200){
          this.setData({
            list: res.body
          });
        }
      })
  },
  // 删除
  del(e){
    dd.confirm({
      title: '确定是否删除',
      content: '删除后不可恢复',
      confirmButtonText: '删除',
      cancelButtonText: '取消',
      success: (result) => {
        if(result.confirm){
          const params = {
            id: e.currentTarget.dataset.id
          }
          app.get('/dictionary/delete',params)
            .then(res=>{
              if(res.code === 200){
                this.list()
              }
            })
        }
      },
    });
  },

  // 新增
  add(){
    const addArr = this.data.addArr
    addArr.push({})
    this.setData({
      addArr: addArr
    });
  },
  // 删除新增
  delAdd(e){
    dd.confirm({
      title: '确定是否删除',
      content: '删除后不可恢复',
      confirmButtonText: '删除',
      cancelButtonText: '取消',
      success: () => {
        const index = e.currentTarget.dataset.index
        const addArr = this.data.addArr

        addArr.splice(index, 1)
        this.setData({
          addArr: addArr
        });
      },
    });
  },

  //监听类型名称
  setTypeName(e){
    const index = e.currentTarget.dataset.index
    const value = e.detail.value
    const addArr = this.data.addArr
    addArr[index].value = value
    this.setData({
      addArr: addArr
    });
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

  // 保存
  save(){
    dd.confirm({
      title: '确定是否保存',
      content: '',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      success: (result) => {
        if(result.confirm){
          let values = []
          this.data.addArr.map(item=>{
            values.push(item.value)
          })
          let params = {
            type:this.data.type,
            values:values
          }
          app.post('/dictionary/add',params)
            .then(res=>{
              if(res.code === 200){
                this.list()
                this.setData({
                  addArr: []
                });
              }
            })
        }
      },
    });
  },

  onLoad(query) {
    let title = ''
    if(query.type === '1'){
      title = '入库类型'
    }else if(query.type === '2'){
      title = '出库类型'
    }else if(query.type === '3'){
      title = '供应商类型'
    }else if(query.type === '4'){
      title = '客户类型'
    }else if(query.type === '0'){
      title = '货品类型'
    }else{
      title = '生产商名称'
    }
    dd.setNavigationBar({
      title: title
    });
    this.setData({
      type: query.type,
      addArr: [{}]
    });
    this.list()
  },
});
