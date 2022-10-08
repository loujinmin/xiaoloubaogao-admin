export interface ListInt {
  title: string
  md_text: string
  html_text: string
  orderby: string
  chapter_id: any
}

export class InitData {
  list: ListInt[] = []
  formData: ListInt = {
    title: '',
    orderby: '',
    md_text: '',
    html_text: '',
    chapter_id: ''
  }
  isShow = false
  isEdit = true
  total = 0
  videoIsShow = false
}