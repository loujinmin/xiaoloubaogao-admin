<template>
  <el-form :model="formData" label-position="top">
    <el-form-item label="小节标题">
      <el-input v-model="formData.title"></el-input>
    </el-form-item>
    <el-form-item label="排序权重">
      <el-input v-model="formData.orderby"></el-input>
    </el-form-item>
    <el-form-item label="小节内容">
      <v-md-editor right-toolbar="emoji tip todo-list| preview toc sync-scroll fullscreen" :disabled-menus="[]" @change="changeData" @upload-image="handleUploadImage" v-model="formData.md_text" height="400px"></v-md-editor>
    </el-form-item>
  </el-form>
  <el-button type="primary" @click="addOrEditFn">确定</el-button>
  <el-button @click="goBack">取消</el-button>

</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { InitData } from '@/types/section'
import { getSectionDetail, addSection, editSection, uploadImg } from '@/http/api'
import { ElMessage } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const router = useRouter()
    const route = useRoute()
    const data = reactive(new InitData())

    // console.log(route.params)
    const {id} = route.params
    const chapter_id = route.query.chapter_id

    const getDetail = async (id: any) => {
      const res = await getSectionDetail(id)
      // console.log(res);
      
      if(res.code === 20000){
        data.formData = {
          title: res.data.title,
          orderby: res.data.orderby,
          md_text: res.data.md_text,
          html_text: res.data.html_text,
          chapter_id: res.data.chapter_id
        }
      }
    }

    if(id){
      getDetail(id)
    }

    const addOrEditFn = async () => {
      if (id) {
        // 修改
        const res1 = await editSection(data.formData, id)
        console.log(res1);
        
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
        data.formData.chapter_id = chapter_id
        const res2 = await addSection(data.formData)
        console.log(data.formData);
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

      router.push({
        path: '/section',
        query: {
          chapter_id,
        }
      })
    }

    const goBack = () => {
      router.push({
        path: '/section',
        query: {
          chapter_id,
        }
      })
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