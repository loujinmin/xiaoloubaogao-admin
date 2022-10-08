<template>
  <el-button type="primary" @click="addFn">添加博客</el-button>
  <el-table :data="list" stripe style="width: 100%">
    <el-table-column type="index" label="序号" width="100px" />
    <el-table-column prop="img" label="封面" width="200px">
      <template #default="scope">
        <img class="pic" :src="'http://43.138.110.98:7001'+scope.row.img" />
      </template>
    </el-table-column>
    <el-table-column prop="title" label="标题" />
    <el-table-column fixed="right" label="操作" width="200px">
      <template #default="scope">
        <el-button link type="primary" @click="editFn(scope.row)">编辑</el-button>
        <el-button link type="warning" @click="delFn(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination @current-change="nextFn" @prev-click="nextFn" @next-click="nextFn" background layout="prev, pager, next" :total="total">
  </el-pagination>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { InitData } from '@/types/blog'
import { getBlog, delBlog } from '@/http/api'
import { ElMessage, ElMessageBox } from 'element-plus'
import {useRouter} from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter()
    const data = reactive(new InitData())

    const nextFn = (num: number) => {
      data.num = num
      getBlogList(num - 1)
    }

    const getBlogList = async (num = 0) => {
      const res = await getBlog()
      // console.log(res);
      data.list = res.data
      data.total = res.data.length
      data.list = data.list.filter((item, index) => index >= num * 10 && index < num * 10 + 10)
      // console.log(data.list);
    }
    getBlogList()

    const editFn = (row: any) => {
      router.push(`/blog/${row.id}`)
    }

    const addFn = () => {
      router.push('/createBlog')
    }

    const delFn = (id: number) => {
      ElMessageBox.confirm('此操作将永久删除该账户，是否继续？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const res = await delBlog(id)
          if (res.code === 20000) {
            ElMessage({
              type: 'success',
              message: '删除成功！'
            })
            getBlogList(data.num -1)
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

    const getDetail = (video_url: string) => {
      data.videoIsShow = true
      data.video_url = video_url
      console.log(video_url)
    }

    const handleSuccess = (response: any) => {
      console.log(response)
      data.formData.img = response.data.file
    }

    return {
      ...toRefs(data),
      getBlogList,
      editFn,
      addFn,
      delFn,
      nextFn,
      getDetail,
      handleSuccess
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