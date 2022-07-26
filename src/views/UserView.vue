<template>
  <div>
    <div class="select-box">
      <el-form :inline="true" :model="selectData" class="demo-form-inline">
        <el-form-item label="姓名">
          <el-input v-model="selectData.nickName" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="selectData.role" class="m-2" placeholder="请选择">
            <el-option label="全部" :value="0" />
            <el-option v-for="item in roleList" :key="item.roleId" :label="item.roleName" :value="item.roleId" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="list" style="width: 100%">
        <el-table-column prop="id" label="ID" width="180" />
        <el-table-column prop="nikeName" label="姓名" width="180" />
        <el-table-column prop="role" label="角色">
          <template #default="scope">
            <el-button v-for="i in scope.row.role" :key="i.role" link type="primary" size="small">
              {{i.roleName}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="role" label="操作">
          <template #default="scope">
            <el-button type="text" size="small" @click="editFn(scope.row)">
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>

    <el-dialog v-model="isShow" title="Shipping address">
      <el-form :model="active">
        <el-form-item label="姓名" label-width="50px">
          <el-input placeholder="请输入姓名" v-model="active.nickName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="角色" label-width="50px">
          <el-select multiple v-model="active.role" placeholder="请选择角色">
            <el-option v-for="item in roleList" :key="item.roleId" :label="item.roleName" :value="item.roleId" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="isShow = false">取消</el-button>
          <el-button type="primary" @click="userChange">确定</el-button>
        </span>
      </template>
    </el-dialog>

  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { InitData, ListInt, RowInt } from '@/types/user'
import { getRoleList, getUserList } from '@/http/api'

export default defineComponent({
  setup() {
    const data = reactive(new InitData())

    onMounted(async () => {
      const { data: res } = await getUserList()
      data.list = res
      data.listData = res

      const { data: res1 } = await getRoleList()
      data.roleList = res1
    })

    const onSubmit = () => {
      let arr: [ListInt][] = []
      if (data.selectData.nickName || data.selectData.role) {
        if (data.selectData.nickName) {
          // console.log(data.list);
          arr = data.listData.filter((item: any) => {
            return item.nikeName.indexOf(data.selectData.nickName) != -1
          })
          // console.log(arr);
        }
        if (data.selectData.role) {
          arr = (data.selectData.nickName ? arr : data.list).filter((item: any) => item.role.find((i: any) => i.role === data.selectData.role))
        }
      } else {
        arr = data.listData
      }
      data.list = arr
    }

    const editFn = (row: RowInt) => {
      // console.log(row)
      data.active = {
        id: row.id,
        userName: row.userName,
        nickName: row.nikeName,
        role: row.role.map((v: any) => v.role || v.roleId)
      }
      console.log(data.active)
      data.isShow = true
    }

    const userChange = () => {
      const obj: any = data.list.find((v: any) => v.id === data.active.id)
      obj.nikeName = data.active.nickName
      obj.role = data.roleList.filter((v: any) => data.active.role.indexOf(v.roleId) !== -1)
      // console.log(obj);
      
      data.isShow = false
    }

    return {
      ...toRefs(data),
      onSubmit,
      editFn,
      userChange
    }
  }
})
</script>

<style scoped>
</style>