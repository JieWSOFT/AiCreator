const API_PREFIX = "http://127.0.0.1:3332/api/v1"

export const request = async (options: RequestOptions) => {
  if (options.loading) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${API_PREFIX}${options.url}`,
      data: options.data,
      method: options.methods,
      header: {
        "Authorization": `Bearer ${wx.getStorageSync('token').data}`,
      },
      success(res) {
        switch ((res.data as any).code) {
          case 200:
            resolve(res.data)
            break;
          case 401:
            // 登录过期或者未登录
          default:
            wx.showToast({ title: (res.data as any).message, icon: 'error' });
            reject();
        }
      },
      fail(err) {
        console.log(err)
        reject(err)
      },
      complete() {
        if (options.loading) {
          wx.hideLoading()
        }
      }
    })
  })
}
export const post = (options: CreateDocumentOptions<RequestOptions, 'methods'>) => {
  return request({ ...options, methods: "POST" })
}
export const get = (options: CreateDocumentOptions<RequestOptions, 'methods'>) => {
  return request({ ...options, methods: "GET" })
}
/**
 * 获取Token
 * @param code 
 */
export const createToken = async (code: string) => {
  try{
    const token = await post({ url: '/wx/login', data: { code } })
    wx.setStorageSync('token', token);
  }catch{
    wx.showToast({ title: "未登录，登录失败", icon: 'error' });
  }
}