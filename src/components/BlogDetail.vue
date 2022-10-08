<template>
  <div id="cover">
    <span class="cover_cover">上传封面:</span>
    <el-upload action="http://43.138.110.98:7001/api/upload" list-type="picture-card" :on-success="handleSuccess" v-model:file-list="fileList">
      <span class="i">+</span>
    </el-upload>
  </div>

  <el-form :model="formData" label-position="top">
    <el-form-item label="博客标题">
      <el-input v-model="formData.title"></el-input>
    </el-form-item>
    <el-form-item label="博客内容">
      <v-md-editor right-toolbar="emoji tip todo-list| preview toc sync-scroll fullscreen" :disabled-menus="[]" @change="changeData" @upload-image="handleUploadImage" v-model="formData.md_text" height="400px"></v-md-editor>
    </el-form-item>
  </el-form>
  <el-button type="primary" @click="addOrEditFn">确定</el-button>
  <el-button @click="goBack">取消</el-button>

</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { InitData } from '@/types/blog'
import { getBlogDetail, addBlog, editBlog, uploadImg } from '@/http/api'
import { ElMessage } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const router = useRouter()
    const route = useRoute()
    const data = reactive(new InitData())

    // console.log(route.params)
    const {id} = route.params

    const getDetail = async (id: any) => {
      const res = await getBlogDetail(id)
      if(res.code === 20000){
        data.formData = {
          title: res.data.title,
          img: res.data.img,
          md_text: res.data.md_text,
          html_text: res.data.html_text
        }
        data.fileList = [
          {url: 'http://43.138.110.98:7001' + res.data.img}
        ]
      }
    }

    if(id){
      getDetail(id)
    }

    const addOrEditFn = async () => {
      if (id) {
        // 修改
        const res1 = await editBlog(data.formData, id)
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
        const res2 = await addBlog(data.formData)
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

      router.push('/blog')
    }

    const handleSuccess = (response: any) => {
      console.log(response)
      // console.log(file)
      data.formData.img = response.data.file
    }

    const goBack = () => {
      router.push('/blog')
    }

    const changeData = (text: any, html: any) => {
      data.formData.html_text = html
    }

    const handleUploadImage = async (event: any, insertImage: any, files: any) => {
      // console.log(event.target.files.FileList);
      // console.log(insertImage);
      // console.log(files[0]);
      
      var formData = new FormData()
      formData.append('file', files[0])
      console.log(formData.get('file'));
      
      const res = await uploadImg(formData)
      console.log(res);
      const url = 'http://43.138.110.98:7001' + res.data.file
      const desc = res.data.name

      insertImage({
        url,
        desc
        // width: 'auto',
        // height: 'auto',
      });
    }

    return {
      ...toRefs(data),
      addOrEditFn,
      getDetail,
      handleSuccess,
      goBack,
      changeData,
      handleUploadImage
    }
  }
})
</script>

<style scoped>
.i {
  font-size: 50px;
}
</style>