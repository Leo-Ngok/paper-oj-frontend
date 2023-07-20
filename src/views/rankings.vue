<script setup lang="ts">
import { userStore } from '@/stores/user';
import { ref } from 'vue'
const cols = ref<any[]>([
  {title: '排名', dataIndex: 'rank', key: 'rank', width: 50 },
{ title: '用户名', dataIndex: 'name_', key: 'name_', width: 100 },
])
const user = userStore()
const rklist = ref<any[]>([])
user.getRankings().then((result)=>{
    console.log(result)
    while(cols.value.length > 2) {
        cols.value.pop()
    }
    for(let i = 0; i < result[0].scores.length; ++i) {
        cols.value.push({
            title: '题目' + (i+1),
            dataIndex: 'problem_' + (i+1),
            key: 'problem_' + (i+1),
            width: 50
        })
    }
    result.forEach(element => {
        element.name_ = element.user.name
        for(let i = 0; i < element.scores.length; ++i) {
            element['problem_' + (i + 1)] = element.scores[i]
        }
    });
    console.log(result)
    rklist.value = result
})
</script>

<template>
  <div>
    <ElTable
    :data="rklist"
      style="width: 100%"
    >
      <ElTableColumn :type="'selection'" :minWidth="55" />
      <ElTableColumn
        v-for="column in cols"
        :key="column.dataIndex"
        :label="column.title"
        :minWidth="column.width"
        :prop="column.key"
        :sortable="true"
      />
    </ElTable>
  </div>
</template>