<template>
  <el-button type="primary" @click="addFn">添加书籍</el-button>
  <el-table :data="list" stripe style="width: 100%">
    <el-table-column type="index" label="序号" width="100px" />
    <el-table-column prop="img" label="封面" width="200px">
      <template #default="scope">
        <img class="pic" :src="'http://43.138.110.98:7001'+scope.row.img" />
      </template>
    </el-table-column>
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
  <el-dialog title="浏览视频" v-model="videoIsShow" width="800px">
    <div v-html="video_url"></div>
  </el-dialog>
  <el-dialog title="添加" v-model="isShow" width="30%" draggable>
    <div id="cover">
      <span class="cover_cover">上传封面:</span>
      <el-upload action="http://43.138.110.98:7001/api/upload" list-type="picture-card" :on-success="handleSuccess" v-model:file-list="fileList">
        <span class="i">+</span>
      </el-upload>
    </div>
    <el-form :model="formData" label-position="top">
      <el-form-item label="书籍名称">
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
  <el-pagination @current-change="nextFn" @prev-click="nextFn" @next-click="nextFn" background layout="prev, pager, next" :total="total">
  </el-pagination>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { InitData } from '@/types/book'
import { getBook, addBook, editBook, delBook } from '@/http/api'
import { ElMessage, ElMessageBox } from 'element-plus'
import {useRouter} from 'vue-router'

export default defineComponent({
  setup() {
    const data = reactive(new InitData())

    const router = useRouter()

    const nextFn = (num: number) => {
      data.num = num
      getBookList(num - 1)
    }

    const getBookList = async (num = 0) => {
      const res = await getBook()
      // console.log(res);
      data.list = res.data
      data.total = res.data.length
      data.list = data.list.filter((item, index) => index >= num * 10 && index < num * 10 + 10)
      // console.log(data.list);
    }
    getBookList()

    const editFn = (row: any) => {
      data.isEdit = true
      data.isShow = true
      // console.log(row)
      data.formData = {
        title: row.title,
        orderby: row.orderby,
        img: row.img
      }
      data.id = row.id
      data.fileList = [{url: 'http://43.138.110.98:7001' + row.img}]
      // console.log(data.fileList);
    }

    const addFn = () => {
      data.fileList = []
      data.formData = {
        title: '',
        orderby: '',
        img: ''
      }
      data.isShow = true
      data.isEdit = false
    }

    const addOrEditFn = async () => {
      if (data.isEdit) {
        // 修改
        const res1 = await editBook(data.formData, data.id)
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
        const res2 = await addBook(data.formData)
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
      getBookList()
    }

    const delFn = (id: number) => {
      ElMessageBox.confirm('此操作将永久删除该账户，是否继续？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const res = await delBook(id)
          if (res.code === 20000) {
            ElMessage({
              type: 'success',
              message: '删除成功！'
            })
            getBookList(data.num -1)
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
        path: '/chapter',
        query: {
          book_id: id
        }
      })
    }

    const handleSuccess = (response: any) => {
      console.log(response)
      data.formData.img = response.data.file
    }

    return {
      ...toRefs(data),
      getBookList,
      editFn,
      addFn,
      addOrEditFn,
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