export interface ListInt {
  title: string
  iframe_url: string
  img: string
}

export interface fileInt {
  url: string
}

export class InitData {
  list: ListInt[] = []
  allList: ListInt[] = []
  formData = {
    title: '',
    iframe_url: '',
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
  starList: string[] = []
}