/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo,
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}
type CreateDocumentOptions<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
interface RequestOptions {
  url: string,
  data?: any,
  loading?: boolean,
  methods: | 'OPTIONS'
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'TRACE'
  | 'CONNECT'
}