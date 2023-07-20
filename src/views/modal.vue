<script setup lang="ts">
import { transitions } from '@/appConfig'
import { reactive , ref} from 'vue'
import { randomPick } from '@/utils'
import { userStore } from '@/stores/user';

const dialogs = reactive({
  dialog1: {
    show: false,
    loading: false,
    timeout: <NodeJS.Timeout | null>null,
    transition: <transitions>transitions.fade
  }
})

function showDialog(transition: transitions) {
  dialogs.dialog1.timeout && clearTimeout(dialogs.dialog1.timeout)
  dialogs.dialog1.loading = true
  dialogs.dialog1.transition = transition
  dialogs.dialog1.show = true
  dialogs.dialog1.timeout = setTimeout(() => {
    dialogs.dialog1.loading = false
  }, 2000)
}
const cols = [
  {title: '样例序号', dataIndex: 'id', key: 'id', width: 50 },
{ title: '评测结果', dataIndex: 'result', key: 'result', width: 100 },
{ title: '执行用时(ms)', dataIndex: 'time', key: 'time', width: 100 },
{ title: '内存用量(MB)', dataIndex: 'memory', key: 'memory', width: 100 },
{ title: '评测信息', dataIndex: 'info', key: 'info', width: 200 },
]
const patientDt = ref<any[]>([])
const user = userStore()
user.getScores(0).then((result)=>{
  console.log(result)
  patientDt.value = result
})

</script>

<template>
  <div>
    <Dialog v-model:show="dialogs.dialog1.show" :loading="dialogs.dialog1.loading"
      :transition="dialogs.dialog1.transition" height="63vh">
      <template #modalHeader>
        <span>Hello :)</span>
      </template>
      <div>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis laborum aut deleniti in distinctio
          accusamus, qui at labore, enim iure officia quis nobis odio aliquam perspiciatis fugit ratione. Voluptatibus,
          repudiandae.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, ut necessitatibus? Autem deserunt eos
          dolorum quaerat atque, magnam accusantium, vitae inventore repellat doloremque officiis numquam voluptates in,
          unde ad minus.</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quam, sunt similique quasi delectus culpa, ex quo
          eveniet libero quibusdam animi rerum, repellat veritatis nemo? Deleniti possimus incidunt iusto placeat
          consequatur.</p>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut accusamus possimus, incidunt, nostrum est ipsum
          fugit eveniet voluptatum facere porro facilis id perferendis a dicta voluptates soluta doloribus voluptas
          consectetur!</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis quam quisquam nisi nihil autem
          reprehenderit nesciunt natus molestias ipsum perferendis iste cupiditate atque veritatis quidem beatae
          adipisci, maxime inventore quia.</p>
      </div>
      <template #modalFooter>
        <ElButton @click="dialogs.dialog1.show = false">取消</ElButton>
        <ElButton type="primary" @click="dialogs.dialog1.show = false">确定</ElButton>
      </template>
    </Dialog>
    <!--ElButton @click="showDialog(randomPick(Object.values(transitions)))">随机模态框</ElButton>
    <ElButton @click="showDialog(transitions.fade)">fade模态框</ElButton>
    <ElButton @click="showDialog(transitions.fadeScale)">fade-scale模态框</ElButton>
    <ElButton @click="showDialog(transitions.slideUp)">slide-up模态框</ElButton>
    <ElButton @click="showDialog(transitions.slideDown)">slide-down模态框</ElButton>
    <ElButton @click="showDialog(transitions.slideLeft)">slide-left模态框</ElButton>
    <ElButton @click="showDialog(transitions.slideRight)">slide-right模态框</ElButton-->
      <span>
        评测结果
      </span>
      <ElTable
      :data="patientDt"
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
      <span>

      </span>
  </div>
</template>

<style>
</style>