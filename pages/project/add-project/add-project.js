const app = getApp();

Page({
  data: {
    objectArray: [],
    arrIndex: null,

    name: '',
    customer: '',
    type: '',
    linkman: '',
    phone: '',
    address: '',
    remark: '',

    btnVisible: true
  },

  // 获取客户类型
  type(){
    const params = {
      type: 4
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
      type: ''
    });
  },

  // 监听项目名称
  setName(e){
    this.setData({
      name: e.detail.value
    })
  },
  // 监听客户名称
  setCustomer(e){
    this.setData({
      customer: e.detail.value
    })
  },
  // 监听客户类型
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
            name: this.data.name,
            customerName: this.data.customer,
            type: this.data.type,
            contacts: this.data.linkman,
            phone: this.data.phone,
            address: this.data.address,
            remarks: this.data.remark
          }
          app.post('/project/add',params)
            .then(res=>{
              if(res.code === 200){
                dd.navigateTo({
                  url: '../project'
                })
              }
            })
        }
      },
    });
  },

  onLoad() {
    dd.setNavigationBar({
      title: '新增项目'
    });

    this.type()
  },
});
