import $http from './index'

interface loginData {
  username: string
  password: string
}
// 登录
export const login = (data: loginData) => $http({
  url: '/login',
  method: 'post',
  data
})

// 用户管理
export const getUser = () => $http({
  url: '/user',
  method: 'get'
})
export const addUser = (data: loginData) => $http({
  url: '/user',
  method: 'post',
  data
})
export const editUser = (data: loginData, id: number) => $http({
  url: `/user/${id}`,
  method: 'put',
  data
})
export const delUser = ( id: number) => $http({
  url: `/user/${id}`,
  method: 'delete'
})

// 资源管理
interface resourceData {
  title: string
  code: string
  url: string
}

export const getResource = () => $http({
  url: '/resource',
  method: 'get',
  params: {
    page: 1,
    total: 1000
  }
})
export const addResource = (data: resourceData) => $http({
  url: '/resource',
  method: 'post',
  data
})
export const editResource = (data: resourceData, id: number) => $http({
  url: `/resource/${id}`,
  method: 'put',
  data
})
export const delResource = ( id: number) => $http({
  url: `/resource/${id}`,
  method: 'delete'
})

// 视频管理
interface videoData {
  title: string
  iframe_url: string
  img: string
}

export const getVideo = () => $http({
  url: '/video',
  method: 'get',
  params: {
    page: 1,
    total: 1000
  }
})
export const addVideo = (data: videoData) => $http({
  url: '/video',
  method: 'post',
  data
})
export const editVideo = (data: videoData, id: number) => $http({
  url: `/video/${id}`,
  method: 'put',
  data
})
export const delVideo = ( id: number) => $http({
  url: `/video/${id}`,
  method: 'delete'
})

// 博客管理
interface blogData {
  title: string
  md_text: string
  img: string
  html_text: string
}

export const getBlog = () => $http({
  url: '/blog',
  method: 'get',
  params: {
    page: 1,
    total: 1000
  }
})
export const addBlog = (data: blogData) => $http({
  url: '/blog',
  method: 'post',
  data
})
export const editBlog = (data: blogData, id: any) => $http({
  url: `/blog/${id}`,
  method: 'put',
  data
})
export const delBlog = ( id: number) => $http({
  url: `/blog/${id}`,
  method: 'delete'
})
export const getBlogDetail = (id: any) => $http({
  url: `blog/${id}`,
  method: 'get'
})

// 书籍管理
interface bookData {
  title: string
  orderby: string
  img: string
}

export const getBook = () => $http({
  url: '/book',
  method: 'get',
  params: {
    page: 1,
    total: 1000
  }
})
export const addBook = (data: bookData) => $http({
  url: '/book',
  method: 'post',
  data
})
export const editBook = (data: bookData, id: number) => $http({
  url: `/book/${id}`,
  method: 'put',
  data
})
export const delBook = ( id: number) => $http({
  url: `/book/${id}`,
  method: 'delete'
})

// 章管理
interface chapterData {
  title: string
  orderby: string
  book_id: string
}

export const getChapter = (book_id: number) => $http({
  url: '/chapter',
  method: 'get',
  params: {
    book_id,
  }
})
export const addChapter = (data: chapterData) => $http({
  url: '/chapter',
  method: 'post',
  data
})
export const editChapter = (data: chapterData, id: number) => $http({
  url: `/chapter/${id}`,
  method: 'put',
  data
})
export const delChapter = ( id: number) => $http({
  url: `/chapter/${id}`,
  method: 'delete'
})

// 节管理
interface sectionData {
  title: string
  orderby: string
  md_text: string
  html_text: string
  chapter_id: any
}

export const getSection = (chapter_id: any) => $http({
  url: '/section',
  method: 'get',
  params: {
    chapter_id
  }
})
export const addSection = (data: sectionData) => $http({
  url: '/section',
  method: 'post',
  data
})
export const editSection = (data: sectionData, id: any) => $http({
  url: `/section/${id}`,
  method: 'put',
  data
})
export const delSection = (id: number) => $http({
  url: `/section/${id}`,
  method: 'delete'
})
export const getSectionDetail = (id: any) => $http({
  url: `/section/${id}`,
  method: 'get'
})

// 上传图片
export const uploadImg = (formData: any) => $http({
  url: '/upload',
  method: 'post',
  headers: {
    'Content-Type': 'multipart/form-data;'
  },
  data: formData
})