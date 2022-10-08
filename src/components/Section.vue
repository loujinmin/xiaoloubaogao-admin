<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <el-button type="primary" @click="addFn">添加节</el-button>
  <el-table :data="list" stripe style="width: 100%">
    <el-table-column type="index" label="序号" width="100px" />
    <el-table-column prop="title" label="名称" />
    <el-table-column fixed="right" label="操作" width="200px">
      <template #default="scope">
        <el-button link type="primary" @click="editFn(scope.row)">编辑</el-button>
        <el-button link type="warning" @click="delFn(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { InitData } from '@/types/section'
import { getSection, delSection } from '@/http/api'
import { ElMessage, ElMessageBox } from 'element-plus'
import {useRoute, useRouter} from 'vue-router';

export default defineComponent({
  setup() {
    const route = useRoute()
    const router = useRouter()
    const data = reactive(new InitData())

    const id = route.query.chapter_id

    const getSectionList = async () => {
      const res = await getSection(id)
      // console.log(res);
      data.list = res.data
    }
    getSectionList()

    const editFn = (row: any) => {
      router.push({
        path: `/section/${row.id}`,
        query: {
          chapter_id: id
        }
      })
    }

    const addFn = () => {
      router.push({
        path: '/createSection',
        query: {
          chapter_id: id
        }
      })
    }

    const delFn = (id: number) => {
      ElMessageBox.confirm('此操作将永久删除该账户，是否继续？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const res = await delSection(id)
          if (res.code === 20000) {
            ElMessage({
              type: 'success',
              message: '删除成功！'
            })
            getSectionList()
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
      editFn,
      addFn,
      delFn,
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
.i {
  font-size: 50px;
}
</style>