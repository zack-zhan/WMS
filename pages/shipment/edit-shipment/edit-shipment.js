const app = getApp();

Page({
  data: {
    objectArray1: [],
    arrIndex1: null,
    objectArray2: [],
    arrIndex2: null,
    objectArray3: [],
    arrIndex3: null,

    id: '',

    name: '',
    nameStr: '',
    model: '',
    type: '',
    typeStr: '',
    project: '',
    projectStr: '',
    num: '',
    sumPrice: '',
    code: '',
    remark: '',

    price: '',
    shelfCode: '',

    btnVisible: true
  },

  // 获取货品名称
  product(){
    app.get('/goods/exit')
      .then(res=>{
        if(res.code === 200){
          this.setData({
            objectArray1: res.body
          });
        }
      })
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
            objectArray2: res.body
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
            objectArray3: res.body
          });
        }
      })
  },
  // 清除选择
  clear(e){
    if(e.currentTarget.dataset.id === '1'){
      this.setData({
        arrIndex1: '',
        nameStr: '',
        model: ''
      });
    }else if(e.currentTarget.dataset.id === '2'){
      this.setData({
        arrIndex2: '',
        typeStr: ''
      });
    }else{
      this.setData({
        arrIndex3: '',
        projectStr: ''
      });
    }
  },
  // 获取列表
  list(){
    const params = {
      id: this.data.id
    }
    app.get('/outputRecords/detail',params)
      .then(res=>{
        if(res.code === 200){
          this.setData({
            name: res.body.goodsId,
            nameStr: res.body.goodsName,
            model: res.body.specificationType,
            type: res.body.outputType,
            typeStr: res.body.outputTypeStr,
            project: res.body.projectId,
            projectStr: res.body.projectName,
            price: res.body.price,
            sumPrice: res.body.sumPrice,
            num: res.body.number,
            shelfCode: res.body.shelfCode,
            remark: res.body.remarks
          });
        }
      })
  },

  // 监听货品名称
  bindObjPickerChange1(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      arrIndex1: e.detail.value,
      name: this.data.objectArray1[e.detail.value].id,
      model: this.data.objectArray1[e.detail.value].specificationType
    });
    const params = {
      goodsId: this.data.objectArray1[e.detail.value].id
    }
    app.get('/outputRecords/goodsDetail',params)
      .then(res=>{
        if(res.code === 200){
          this.setData({
            price: res.body.price,
            shelfCode: res.body.shelfCode
          });
        }
      })
  },
  // 监听出库类型
  bindObjPickerChange2(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      arrIndex2: e.detail.value,
      type: this.data.objectArray2[e.detail.value].id
    });
  },
  // 监听项目名称
  bindObjPickerChange3(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      arrIndex3: e.detail.value,
      project: this.data.objectArray3[e.detail.value].id
    });
  },
  // 监听货品数量
  setNum(e){
    this.setData({
      num: e.detail.value
    })
    if(this.data.price && this.data.num){
      const sumPrice = this.data.num * this.data.price
      this.setData({
        sumPrice: sumPrice
      })
    }
  },
  // 监听货架编号
  setCode(e){
    this.setData({
      code: e.detail.value
    })
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
            id: this.data.id,
            goodsId: this.data.name,
            outputType: this.data.type,
            projectId: this.data.project,
            number: this.data.num,
            remarks: this.data.remark
          }
          app.post('/outputRecords/update',params)
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
      title: '编辑出库'
    });

    this.setData({
      id: query.id
    });

    this.product()
    this.type()
    this.project()
    this.list()
  },
});
