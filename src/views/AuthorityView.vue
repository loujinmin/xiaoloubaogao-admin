<template>
  <div>
    <el-button type="primary" @click="onSubmit">确认修改</el-button>
    <el-tree :data="list" show-checkbox node-key="roleId" :default-checked-keys="authorityIds" :check-strictly = "true" :props="{children: 'roleList', label: 'name'}" ref="treeRef" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import {useRoute} from 'vue-router';
import {InitData} from '@/types/authority';
import {getAuthority} from '@/http/api';
import { ElMessage } from 'element-plus'

export default defineComponent({
  setup () {
    
    const route = useRoute()
    const query: any = route.query

    const data = reactive(new InitData(query.id, query.authority))
    
    onMounted(async () => {
      const {data: res} = await getAuthority()
      data.list = res
      
    })

    const onSubmit = () => {
      console.log(data.treeRef.getCheckedKeys());
      ElMessage({
            type: 'info',
            message: 'http发送请求'
          })
    }

    return {
      ...toRefs(data),
      onSubmit
    }
  }
})
</script>

<style scoped>

</style>