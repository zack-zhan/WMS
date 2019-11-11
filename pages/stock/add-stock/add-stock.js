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
    code: '',
    num: '',
    price: '',
    sumPrice: '',
    supplier: '',
    remark: '',

    btnVisible: true
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
            objectArray1: res.body
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
        model: ''
      });
    }else if(e.currentTarget.dataset.id === '2'){
      this.setData({
        arrIndex1: '',
        type: ''
      });
    }else{
      this.setData({
        arrIndex2: '',
        supplier: ''
      });
    }
  },

  // 监听入库类型
  bindObjPickerChange1(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      arrIndex1: e.detail.value,
      type: this.data.objectArray1[e.detail.value].id
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
  bindObjPickerChange2(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      arrIndex2: e.detail.value,
      supplier: this.data.objectArray2[e.detail.value].id
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
            goodsId: this.data.name,
            inputType: this.data.type,
            shelfCode: this.data.code,
            number: this.data.num,
            price: this.data.price,
            sumPrice: this.data.sumPrice,
            supplierId: this.data.supplier,
            remarks: this.data.remark
          }
          app.post('/input/add',params)
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
    console.log(query,'--')
    dd.setNavigationBar({
      title: '新增入库'
    });
    if(query.name && query.name !== 'undefined'){
      this.setData({
        name: query.id,
        nameStr: query.name
      })
      const params = {
        id:query.id
      }
      app.get('/goods/detail',params)
        .then(res=>{
          if(res.code === 200){
            this.setData({
              model: res.body.specificationType
            })
          }
        })
    }

    this.type()
    this.supplier()
  },
});
