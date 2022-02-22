<template>
  <div class="wangeditor">
    <div ref="editor"></div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, reactive, ref } from 'vue'
import WangEditor from 'wangeditor'

const editor = ref()
const state = reactive({
  html: '',
  text: ''
})

let instance
onMounted(() => {
  instance = new WangEditor(editor.value)
  Object.assign(instance.config, {
    onchange() {
      console.log('change')
    }
  })
  instance.create()
})

onBeforeUnmount(() => {
  instance.destroy()
  instance = null
})
</script>

<style lang="scss" scoped></style>
