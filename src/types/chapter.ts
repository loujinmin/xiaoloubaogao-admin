export interface ListInt {
  title: string
  orderby: string
  book_id: any
}

export class InitData {
  list: ListInt[] = []
  formData: ListInt = {
    title: '',
    orderby: '',
    book_id: ''
  }
  isShow = false
  isEdit = true
  id = 0
}