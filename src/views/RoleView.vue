<template>
  <div>
    <div class="select-box">
      <!-- <el-form :inline="true" :model="selectData" class="demo-form-inline">
        <el-form-item label="角色">
          <el-select v-model="selectData.role" class="m-2" placeholder="请选择">
            <el-option label="全部" :value="0" />
            <el-option v-for="item in listData" :key="item." :label="item.roleName" :value="item.roleId" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form> -->

      <el-button type="primary" @click="addRole">添加角色</el-button>

    </div>

    <el-table :data="list" style="width: 100%">
      <el-table-column prop="roleId" label="ID" width="180" />
      <el-table-column prop="roleName" label="角色名" width="180" />
      <el-table-column prop="role" label="操作">
        <template #default="scope">
          <el-button @click="authorityChange(scope.row)" link type="primary" size="small">
            修改权限
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { getRoleList } from '@/http/api'
import { InitData, ListInt } from '@/types/role'
import { ElMessage, ElMessageBox } from 'element-plus'
import {useRouter} from 'vue-router';

export default defineComponent({
  setup() {

    const router = useRouter()

    const data = reactive(new InitData())

    onMounted(async () => {
      const { data: res } = await getRoleList()
      data.list = res
      // data.listData = res
    })

    const authorityChange = (row: ListInt) => {
      // console.log(row)
      router.push({
        path: 'authority',
        query: {
          id: row.roleId,
          authority: row.authority.join(',')
        }
      })
    }

    const addRole = () => {
      ElMessageBox.prompt('请输入角色名', '添加', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
      })
        .then(({ value }) => {
          if(value){
            data.list.unshift({
              roleName: value,
              roleId: data.list.length + 1,
              authority: []
            })
          }

          ElMessage({
            type: 'success',
            message: '新增成功'
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '取消操作'
          })
        })
    }

    return {
      ...toRefs(data),
      authorityChange,
      addRole
    }
  }
})
</script>

<style lang="scss" scoped>
.select-box {
  margin-bottom: 20px;
}
</style>