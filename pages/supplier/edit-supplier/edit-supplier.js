const app = getApp();

Page({
  data: {
    objectArray: [],
    arrIndex: null,

    details: {},

    id: '',
    name: '',
    type: '',
    typeStr: '',
    linkman: '',
    phone: '',
    address: '',
    remark: '',

    btnVisible: true
  },

  // 获取供应商类型
  type(){
    const params = {
      type: 3
    }
    app.get('/dictionary/list',params)
      .then(res=>{
        if(res.code === 200){
          this.setData({
            objectArray: res.body
          });
        }
      })
  },
  // 清除选择
  clear(){
    this.setData({
      arrIndex: '',
      type: '',
      typeStr: ''
    });
  },
  // 获取列表
  list(){
    const params = {
      id: this.data.id
    }
    app.get('/supplier/detail',params)
      .then(res=>{
        if(res.code === 200){
          this.setData({
            name: res.body.name,
            type: res.body.type,
            typeStr: res.body.typeStr,
            linkman: res.body.contacts,
            phone: res.body.phone,
            address: res.body.address,
            remark: res.body.remarks
          });
        }
      })
  },

  // 监听供应商名称
  setName(e){
    this.setData({
      name: e.detail.value
    })
  },
  // 监听供应商类型
  bindObjPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    console.log(this.data.objectArray[e.detail.value],'00')
    this.setData({
      arrIndex: e.detail.value,
      type: this.data.objectArray[e.detail.value].id
    });
  },
  // 监听联系人
  setLinkman(e){
    this.setData({
      linkman: e.detail.value
    })
  },
  // 监听电话
  setPhone(e){
    this.setData({
      phone: e.detail.value
    })
  },
  // 监听地址
  setAddress(e){
    this.setData({
      address: e.detail.value
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
            name: this.data.name,
            type: this.data.type,
            contacts: this.data.linkman,
            phone: this.data.phone,
            address: this.data.address,
            remarks: this.data.remark
          }
          app.post('/supplier/update',params)
            .then(res=>{
              if(res.code === 200){
                dd.navigateTo({
                  url: '../supplier'
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
      title: '编辑供应商'
    });

    this.setData({
      id: query.id
    });

    this.type()
    this.list()
  },
});
