export interface ListInt {
  id: number
  nickName: string
  userName: string
  role: RoleInt[]
}

export interface RowInt {
  id: number
  nikeName: string
  userName: string
  role: RoleInt[]
}

export interface ActiveInt {
  id: number
  nickName: string
  userName: string
  role: number[]
}


interface RoleInt {
  role: number
  roleName: string
}

interface SelectDataInt {
  nickName: string
  role: number
}

interface RoleListInt {
  roleName: string,
  roleId: number,
  suthorty: number[]
}

export class InitData {
  selectData: SelectDataInt = {
    nickName: '',
    role: 0
  }
  list: [ListInt][] = []
  listData: [ListInt][] = []
  roleList: RoleListInt[] = []
  active: ActiveInt = {
    id: 0,
    nickName: "",
    userName: "",
    role: []
  }
  isShow = false
}