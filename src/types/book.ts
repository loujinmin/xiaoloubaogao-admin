export interface ListInt {
  title: string
  orderby: string
  img: string
}

export interface fileInt {
  url: string
}

export class InitData {
  list: ListInt[] = []
  formData = {
    title: '',
    orderby: '',
    img: ''
  }
  isShow = false
  isEdit = true
  id = 0
  total = 0
  videoIsShow = false
  video_url = ''
  num = 1
  fileList: fileInt[] = []
}