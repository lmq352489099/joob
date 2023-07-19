import { callWithNuxt } from "#app";

interface myFetchOptions {
  header?: Record<string, string>
  [key: string]: any

}



export const useHttpFetch = (url: string, opt: myFetchOptions) => {
  //token
  const token = useCookie('token')
  //添加请求头和token

  const headers = {
    ...opt.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {})

  }
  opt.headers = headers
  const nuxtApp = useNuxtApp()
  return useFetch(url, {
    ...opt,
    baseURL: "",//基本url
    onRequest({ request, options }) {
      console.log('request', request,options)
    },
    onRequestError({ request, options, error }) {
      // Handle the request errors
      console.log('request', request)
    },
    async onResponse({ request, response, options }) {

      console.log('onResponse', response)

      // Process the response data
      //自定义处理数据
      // if (response._data.code === 0){
      //    //处理
      //     response._data = response._data.data
      // }else{
      //
      // }

    },
    async onResponseError({ request, response, options }) {
      // Handle the response errors
      console.log('error', response.status)
      //https://github.com/nuxt/nuxt/issues/14771
      //未登录401状态
      // if (response.status === 401) {
      //   await callWithNuxt(nuxtApp, navigateTo, [
      //     "/sign_in",
      //     { replace: true, redirectCode: 401 }
      //   ])
      // } else if (response.status === 500) {
      //   console.log('服务器报错！！')
      // }
    }

  })


}


// 定义接口

export const userInfoFetch = (opt: myFetchOptions) => {

  return useHttpFetch('/user/info', opt)
}

