const app = getApp();

Page({
  data: {
    objectArray1: [],
    arrIndex1: null,
    objectArray2: [],
    arrIndex2: null,

    details: {},

    id:'',
    code: '',
    name: '',
    model: '',
    type: '',
    typeStr: '',
    producer: '',
    producerStr: '',
    warning: '',
    remark: '',

    btnVisible: true
  },

  // 获取供应商类型
  type(){
    const params = {
      type: 0
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
  // 获取生产商
  producer(){
    const params = {
      type: 5
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
  // 清除选择
  clear(e){
    if(e.currentTarget.dataset.id === '1'){
      this.setData({
        arrIndex1: '',
        type: '',
        typeStr: ''
      });
    }else{
      this.setData({
        arrIndex2: '',
        producer: '',
        producerStr: ''
      });
    }
  },
  // 获取列表
  list(){
    const params = {
      id: this.data.id
    }
    app.get('/goods/detail',params)
      .then(res=>{
        if(res.code === 200){
          this.setData({
            code: res.body.goodsCode,
            name: res.body.name,
            model: res.body.specificationType,
            type: res.body.type,
            typeStr: res.body.typeStr,
            producer: res.body.manufacturer,
            producerStr: res.body.manufacturerStr,
            warning: res.body.waringStock,
            remark: res.body.remarks
          });
        }
      })
  },

  // 监听货品编号
  setCode(e){
    this.setData({
      code: e.detail.value
    })
  },
  // 监听货品名称
  setName(e){
    this.setData({
      name: e.detail.value
    })
  },
  // 监听规格型号
  setModel(e){
    this.setData({
      model: e.detail.value
    })
  },
  // 监听货品类型
  bindObjPickerChange1(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      arrIndex1: e.detail.value,
      type: this.data.objectArray1[e.detail.value].id
    });
  },
  // 生产商
  bindObjPickerChange2(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      arrIndex2: e.detail.value,
      producer: this.data.objectArray2[e.detail.value].id
    });
  },
  // 监听库存预警数
  setWarning(e){
    this.setData({
      warning: e.detail.value
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
            goodsCode: this.data.code,
            name: this.data.name,
            specificationType: this.data.model,
            type: this.data.type,
            manufacturer: this.data.producer,
            waringStock: this.data.warning,
            remarks: this.data.remark
          }
          app.post('/goods/update',params)
            .then(res=>{
              if(res.code === 200){
                dd.navigateTo({
                  url: '../product'
                })
              }
            })
        }
      },
    });
  },

  onLoad(query) {
    dd.setNavigationBar({
      title: '编辑货品'
    });

    this.setData({
      id: query.id
    });

    this.type()
    this.producer()
    this.list()
  },
});
