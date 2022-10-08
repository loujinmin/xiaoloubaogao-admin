export interface ListInt {
  title: string
  code: string
  url: string
}

export class InitData {
  list: ListInt[] = []
  formData = {
    title: '',
    code: '',
    url: ''
  }
  isShow = false
  isEdit = true
  id = 0
}