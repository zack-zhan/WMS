const app = getApp();

Page({
  data: {
    id:'',

    startDate: '',
    endDate: '',

    data: []
  },

  // 选择开始日期
  slectStartDate(){
    dd.datePicker({
      format: 'yyyy-MM-dd',
      success: (res) => {
        this.setData({
          startDate: res.date
        })
        if(this.data.endDate){
          this.inquire()
        }
      },
    });
  },
  // 选择结束日期
  slectEndDate(){
    dd.datePicker({
      format: 'yyyy-MM-dd',
      success: (res) => {
        this.setData({
          endDate: res.date
        })
        if(this.data.startDate){
          this.inquire()
        }
      },
    });
  },
  // 查询
  inquire(){
    const params = {
      startTime: this.data.startDate,
      endTime: this.data.endDate
    }
    app.get(this.data.url, params)
      .then(res=>{
        if(res.code === 200){
          this.setData({
            data: res.body
          })
        }
      })
  },


  onLoad(query){
    let title = ''
    let url = ''
    if(query.id === '1'){
      title = '货品统计'
      url = '/statistics/goods'
    }else if(query.id === '2'){
      title = '库存统计'
      app.get('/statistics/inventory')
        .then(res=>{
          if(res.code === 200){
            this.setData({
              data: res.body
            })
          }
        })
    }else if(query.id === '3'){
      title = '入库统计'
      url = '/statistics/input'
    }else if(query.id === '4'){
      title = '出库统计'
      url = '/statistics/output'
    }else if(query.id === '5'){
      title = '供应商统计'
      url = '/statistics/supplier'
    }else{
      title = '客户统计'
      url = '/statistics/project'
    }
    dd.setNavigationBar({
      title: title
    });

    this.setData({
      id: query.id,
      url: url
    })
  }
});
