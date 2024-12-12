// app.ts
import { get , createToken} from './api/request'
App<IAppOption>({
  globalData: {},
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: async res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        await createToken(res.code)
        const result = await get({url: '/llm/generate',data:{topic: '我的母亲', length: 50}})
        console.log(result)
      },
    })
  },
})