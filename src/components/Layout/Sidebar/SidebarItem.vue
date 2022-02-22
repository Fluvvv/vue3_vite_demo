<template>
  <template v-if="!item.hidden && hasOneShowingChild(item.children, item)">
    <el-menu-item
      v-if="item.children.length === 1"
      :index="item.children[0].path"
    >
      <template #title>{{ item.children[0].meta.label }}</template>
    </el-menu-item>
    <el-menu-item v-else :index="item.path">
      <template #title>{{ item.meta.label }}</template>
    </el-menu-item>
  </template>
  <el-sub-menu v-else-if="!item.hidden" :index="item.path">
    <template #title>
      <span>{{ item.meta.label }}</span>
    </template>
    <sidebar-item
      v-for="child in item.children"
      :key="child.path"
      :item="child"
      class="nest-menu"
    />
  </el-sub-menu>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SidebarItem'
})
</script>
<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const hasOneShowingChild = (children = [], parent) => {
  const showingChildren = children.filter((item) => !item.hidden)

  if (showingChildren.length === 1) {
    return true
  }
  if (showingChildren.length === 0) {
    return true
  }
  return false
}
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
