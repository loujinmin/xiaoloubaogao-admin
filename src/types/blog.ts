export interface ListInt {
  title: string
  img: string
  md_text: string
  html_text: string
}

export interface fileInt {
  url: string
}

export class InitData {
  list: ListInt[] = []
  formData = {
    title: '',
    img: '',
    md_text: '',
    html_text: ''
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