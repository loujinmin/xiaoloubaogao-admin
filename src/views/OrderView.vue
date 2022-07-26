<template>
  <div>
    <div class="select-box">
      <el-form :inline="true" :model="selectData" class="demo-form-inline">
        <el-form-item label="标题">
          <el-input v-model="selectData.title" placeholder="请输入关键字" />
        </el-form-item>
        <el-form-item label="详情">
          <el-input v-model="selectData.body" placeholder="请输入关键字" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="list[selectData.page]" style="width: 100%">
        <el-table-column prop="id" label="ID" width="180" />
        <el-table-column prop="title" label="标题" width="180" />
        <el-table-column prop="body" label="详情" />
      </el-table>

      <el-pagination @current-change="currentChange" layout="prev, pager, next" :total="selectData.count" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { InitData, ListInt } from '@/types/order'
import { getList } from '@/http/api'
import { slice } from 'lodash'

export default defineComponent({
  setup() {
    const data = reactive(new InitData())

    onMounted(async () => {
      const { data: res } = await getList({
        page: data.selectData.page
      })
      // console.log(res)
      data.selectData.count = res.length
      data.dataList = res
      sliceList(res)
    })

    const sliceList = (arr: ListInt[]) => {
      data.list = []
      for (let i = 0; i < arr.length; i += 10) {
        let newArr: any = arr.slice(i, i + 10)
        data.list.push(newArr)
      }
    }

    const currentChange = (page: number) => {
      data.selectData.page = page - 1
    }

    const onSubmit = () => {
      // console.log(data.selectData)
      let arr: ListInt[] = []
      if(data.selectData.title || data.selectData.body){
        if(data.selectData.title){
        arr = data.dataList.filter(item => item.title.indexOf(data.selectData.title) != -1)

        }
        if(data.selectData.body){
        arr = (data.selectData.title?arr:data.dataList).filter(item => item.body.indexOf(data.selectData.body) != -1)

        }
      }else{
        arr = data.dataList
      }
      sliceList(arr)
    }

    return {
      ...toRefs(data),
      currentChange,
      onSubmit
    }
  }
})
</script>

<style scoped>
</style>