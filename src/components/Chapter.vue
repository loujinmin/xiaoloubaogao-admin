<template>
  <el-button type="primary" @click="addFn">添加章</el-button>
  <el-table :data="list" stripe style="width: 100%">
    <el-table-column type="index" label="序号" width="100px" />
    <el-table-column prop="title" label="名称" />
    <el-table-column label="详情" width="200px">
      <template #default="scope">
        <el-button link type="primary" @click="getDetail(scope.row.id)">查看章</el-button>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="200px">
      <template #default="scope">
        <el-button link type="primary" @click="editFn(scope.row)">编辑</el-button>
        <el-button link type="warning" @click="delFn(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog title="添加" v-model="isShow" width="30%" draggable>
    <el-form :model="formData" label-position="top">
      <el-form-item label="章名称">
        <el-input v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="排序权重">
        <el-input v-model="formData.orderby"></el-input>
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
import { InitData } from '@/types/chapter'
import { getChapter, addChapter, editChapter, delChapter } from '@/http/api'
import { ElMessage, ElMessageBox } from 'element-plus'
import {useRouter, useRoute} from 'vue-router'

export default defineComponent({
  setup() {
    const data = reactive(new InitData())

    const router = useRouter()
    const route = useRoute()
    
    const id = route.query.book_id

    const getChapterList = async (id: any) => {
      const res = await getChapter(id)
      // console.log(res);
      data.list = res.data
      // console.log(data.list);
    }
    getChapterList(id)

    const editFn = (row: any) => {
      data.isEdit = true
      data.isShow = true
      // console.log(row)
      data.formData = {
        title: row.title,
        orderby: row.orderby,
        book_id: id
      }
      data.id = row.id
      // console.log(data.fileList);
    }

    const addFn = () => {
      data.formData = {
        title: '',
        orderby: '',
        book_id: id
      }
      data.isShow = true
      data.isEdit = false
    }

    const addOrEditFn = async () => {
      if (data.isEdit) {
        // 修改
        const res1 = await editChapter(data.formData, data.id)
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
        const res2 = await addChapter(data.formData)
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
      getChapterList(id)
    }

    const delFn = (cid: number) => {
      ElMessageBox.confirm('此操作将永久删除该账户，是否继续？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const res = await delChapter(cid)
          if (res.code === 20000) {
            ElMessage({
              type: 'success',
              message: '删除成功！'
            })
            getChapterList(id)
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

    const getDetail = (id: number) => {
      // console.log(id);
      router.push({
        path: '/section',
        query: {
          chapter_id: id
        }
      })
    }

    return {
      ...toRefs(data),
      getChapterList,
      editFn,
      addFn,
      addOrEditFn,
      delFn,
      getDetail
    }
  }
})
</script>

<style>
.pic {
  max-width: 80px;
  max-height: 80px;
}
.el-pagination {
  display: flex;
  justify-content: center;
}
/* .el-dropdown{
  float: right;
} */
iframe {
  width: 100%;
  height: 500px;
}
.i {
  font-size: 50px;
}
</style>