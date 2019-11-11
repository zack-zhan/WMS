const app = getApp();

Page({
  data: {
    objectArray1: [],
    arrIndex1: null,
    objectArray2: [],
    arrIndex2: null,

    name: '',
    nameStr: '',
    model: '',
    type: '',
    project: '',
    num: '',
    sumPrice: '',
    remark: '',

    price: '',
    shelfCode: '',

    btnVisible: true
  },

  // 获取出库类型
  type(){
    const params = {
      type: 2
    }
    app.get('/dictionary/list',params)
      .then(res=>{
        if(res.code === 200){
          this.setData({
            objectArray1: res.body
          });
        }
      })
  },
  // 获取项目名称
  project(){
    app.get('/project/all')
      .then(res=>{
        if(res.code === 200){
          this.setData({
            objectArray2: res.body
          });
        }
      })
  },
  // 清除选择
  clear(e){
    if(e.currentTarget.dataset.id === '1'){
      this.setData({
        name: '',
        nameStr: '',
        model: '',
        price: '',
        sumPrice: ''
      });
    }else if(e.currentTarget.dataset.id === '2'){
      this.setData({
        arrIndex1: '',
        type: ''
      });
    }else{
      this.setData({
        arrIndex2: '',
        project: ''
      });
    }
  },

  // 监听出库类型
  bindObjPickerChange1(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      arrIndex1: e.detail.value,
      type: this.data.objectArray1[e.detail.value].id
    });
  },
  // 监听项目名称
  bindObjPickerChange2(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      arrIndex2: e.detail.value,
      project: this.data.objectArray2[e.detail.value].id
    });
  },
  // 监听货品数量
  setNum(e){
    this.setData({
      num: e.detail.value
    })
    if(this.data.price){
      const sumPrice = this.data.num * this.data.price
      this.setData({
        sumPrice: sumPrice
      })
    }
  },
  // 监听备注
  setRemark(e){
    this.setData({
      remark: e.detail.value
    })
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
      content: '保存后仍可从明细进入编辑修改',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      success: (result) => {
        if(result.confirm){
          const params = {
            goodsId: this.data.name,
            outputType: this.data.type,
            projectId: this.data.project,
            number: this.data.num,
            remarks: this.data.remark
          }
          app.post('/outputRecords/add',params)
            .then(res=>{
              if(res.code === 200){
                dd.navigateTo({
                  url: '../shipment'
                })
              }
            })
        }
      },
    });
  },

  onLoad(query) {
    dd.setNavigationBar({
      title: '新增出库'
    });

    console.log(query,'--')
    if(query.name && query.name !== 'undefined'){
      this.setData({
        name: query.id,
        nameStr: query.name,
        model: query.model
      })
      const params = {
        goodsId: query.id
      }
      app.get('/outputRecords/goodsDetail',params)
        .then(res=>{
          if(res.code === 200){
            const sumPrice = this.data.num * res.body.price
            this.setData({
              price: res.body.price,
              shelfCode: res.body.shelfCode,
              model: res.body.specificationType,
              sumPrice: sumPrice
            });
          }
        })
    }

    this.type()
    this.project()
  },
});
