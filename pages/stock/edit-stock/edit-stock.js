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
    code: '',
    num: '',
    price: '',
    sumPrice: '',
    supplier: '',
    supplierStr: '',
    remark: '',

    btnVisible: true
  },

  // 获取货品名称
  product(){
    app.get('/goods/all')
      .then(res=>{
        if(res.code === 200){
          this.setData({
            objectArray1: res.body
          });
        }
      })
  },
  // 获取入库类型
  type(){
    const params = {
      type: 1
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
  // 获取供应商
  supplier(){
    app.get('/supplier/all')
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
        supplierStr: ''
      });
    }
  },
  // 获取列表
  list(){
    const params = {
      id: this.data.id
    }
    app.get('/input/detail',params)
      .then(res=>{
        if(res.code === 200){
          this.setData({
            name: res.body.goodsId,
            nameStr: res.body.goodsName,
            model: res.body.specificationType,
            type: res.body.inputType,
            typeStr: res.body.inputTypeStr,
            code: res.body.shelfCode,
            num: res.body.number,
            price: res.body.price,
            sumPrice: res.body.sumPrice,
            supplier: res.body.supplierId,
            supplierStr: res.body.supplierName,
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
  },
  // 监听入库类型
  bindObjPickerChange2(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      arrIndex2: e.detail.value,
      type: this.data.objectArray2[e.detail.value].id
    });
  },
  // 监听货架编号
  setCode(e){
    this.setData({
      code: e.detail.value
    })
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
  // 监听单价
  setPrice(e){
    this.setData({
      price: e.detail.value
    })
    if(this.data.num){
      const sumPrice = this.data.price * this.data.num
      this.setData({
        sumPrice: sumPrice
      })
    }
  },
  // 监听供应商
  bindObjPickerChange3(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      arrIndex3: e.detail.value,
      supplier: this.data.objectArray3[e.detail.value].id
    });
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
            inputType: this.data.type,
            shelfCode: this.data.code,
            number: this.data.num,
            price: this.data.price,
            sumPrice: this.data.sumPrice,
            supplierId: this.data.supplier,
            remarks: this.data.remark
          }
          app.post('/input/update',params)
            .then(res=>{
              if(res.code === 200){
                dd.navigateTo({
                  url: '../stock'
                })
              }
            })
        }
      },
    });
  },

  onLoad(query) {
    dd.setNavigationBar({
      title: '编辑入库'
    });

    this.setData({
      id: query.id
    });

    this.product()
    this.type()
    this.supplier()
    this.list()
  },
});
