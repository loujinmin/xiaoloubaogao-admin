<template>
  <el-button type="primary" @click="addFn">添加资源</el-button>
  <el-table :data="list" stripe style="width: 100%" >
    <el-table-column type="index" label="序号" width="100px" />
    <el-table-column prop="title" label="名称" width="200px" />
    <el-table-column prop="code" label="提取码" width="200px" />
    <el-table-column prop="url" label="下载地址"/>
    <el-table-column fixed="right" label="操作" width="200px">
      <template #default="scope">
        <el-button link type="primary" @click="editFn(scope.row)">编辑</el-button>
        <el-button link type="warning" @click="delFn(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog title="添加" v-model="isShow" width="30%" draggable>
    <el-form :model="formData" label-position="top">
      <el-form-item label="名称">
        <el-input v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="提取码">
        <el-input v-model="formData.code"></el-input>
      </el-form-item>
      <el-form-item label="下载地址">
        <el-input v-model="formData.url"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="addOrEditFn">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { InitData } from '@/types/resource'
import { getResource, addResource, editResource, delResource } from '@/http/api'
import { ElMessage, ElMessageBox } from 'element-plus'

export default defineComponent({
  setup() {
    const data = reactive(new InitData())

    const getResourceList = async () => {
      const res = await getResource()
      // console.log(res);
      data.list = res.data
      // console.log(data.list);
    }
    getResourceList()

    const editFn = (row: any) => {
      data.isEdit = true
      data.isShow = true
      // console.log(row)
      data.formData = {
        title: row.title,
        code: row.code,
        url: row.url
      }
      data.id = row.id
    }

    const addFn = () => {
      data.formData = {
        title: '',
        code: '',
        url: ''
      }
      data.isShow = true
      data.isEdit = false
    }

    const addOrEditFn = async () => {
      if (data.isEdit) {
        // 修改
        const res1 = await editResource(data.formData, data.id)
        if (res1.code === 20000) {
          ElMessage({
            type: 'success',
            message: '修改成功！'
          })
        } else {
          ElMessage({
            type: 'warning',
            message: '修改失败！'
          })
        }
      } else {
        // 添加
        const res2 = await addResource(data.formData)
        if (res2.code === 20000) {
          ElMessage({
            type: 'success',
            message: '添加成功！'
          })
        } else {
          ElMessage({
            type: 'warning',
            message: '添加失败！'
          })
        }
      }
      data.isShow = false
      getResourceList()
    }

    const delFn = (id: number) => {
      ElMessageBox.confirm('此操作将永久删除该账户，是否继续？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const res = await delResource(id)
          if (res.code === 20000) {
            ElMessage({
              type: 'success',
              message: '删除成功！'
            })
            getResourceList()
          } else {
            ElMessage({
              type: 'warning',
              message: '删除失败！'
            })
          }
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '已取消删除操作！'
          })
        })
    }

    return {
      ...toRefs(data),
      getResourceList,
      editFn,
      addFn,
      addOrEditFn,
      delFn
    }
  }
})
</script>

<style scoped>
</style>