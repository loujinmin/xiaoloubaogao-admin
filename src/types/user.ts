export interface ListInt {
  id: number
  username: string
}

export interface FromInt {
  username: string
  password: string
}

export class InitData {
  list: ListInt[] = []
  formData = {
    username: '',
    password: ''
  }
  isShow = false
  isEdit = true
  id = 0
}