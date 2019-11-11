// const baseURL = 'http://192.168.0.119:8080'
const baseURL = 'http://ding.zhiytech.work:8080'

let headers = {
  'content-type': 'application/json',
  'Authorization': ''
}

App({
  get(url, params) {
    return new Promise((resolve, reject) => {
      dd.showLoading({
        content: '加载中'
      });
      dd.httpRequest({
        headers: headers,
        url: baseURL + url,
        method: 'get',
        data: params,
        success: (res) => {
          if(res.data.code === 200){
            dd.hideLoading();
            resolve(res.data);
          }else{
            dd.showToast({
              type: 'fail',
              content: res.data.message,
              duration: 1000
            });
          }
        },
        fail: (err) => {
          reject(err);
        }
      });
    });
  },
  post(url, params) {
    return new Promise((resolve, reject) => {
      dd.showLoading({
        content: '加载中'
      });
      dd.httpRequest({
        headers: headers,
        url: baseURL + url,
        method: 'post',
        data: JSON.stringify(params),
        success: (res) => {
          if(res.data.code === 200){
            dd.hideLoading();
            resolve(res.data);
          }else{
            dd.showToast({
              type: 'fail',
              content: res.data.message,
              duration: 1000
            });
          }
        },
        fail: (err) => {
          reject(err);
        }
      });
    });
  },

  onLaunch(options) {
    // 获取用户信息
    const that = this
    dd.getAuthCode({
      success:function(res){
        console.log(res)
        const params = {
          authCode: res.authCode
        }
        that.get('/getUserId',params).then(res1 => {
          if(res1.code === 200){
            const params = {
              userId: res1.body
            }
            that.get('/login',params).then(res2 => {
              if(res2.code === 200){
                headers.Authorization = res2.body
              }
            });
          }
        });
      }
    })
  }
});
