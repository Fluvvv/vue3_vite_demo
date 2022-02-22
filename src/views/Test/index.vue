<template>
  <el-button @click="add">点击增加{{ count }}</el-button>
  <WangEditor />
</template>

<script setup>
import WangEditor from '@/components/modules/WangEditor'
import { ref } from 'vue'

const count = ref(1)
// ref: count = 0

const add = () => {
  count.value += 1
}
</script>

<style lang="scss" scoped></style>
