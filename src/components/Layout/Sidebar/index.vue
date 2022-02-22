<template>
  <el-menu
    :default-active="$route.path"
    router
    :collapse="!isCollapse"
    unique-opened
    background-color="#001529"
    text-color="#FFF"
  >
    <!-- <div class="logo_box" :style="{ width: isCollapse ? '200px' : '64px', 'border-bottom': isCollapse ? '1px solid #fff' : '1px solid transparent' }"> -->
    <div class="logo_box" :style="{ width: isCollapse ? '200px' : '64px' }">
      <svg-icon icon-class="jingdong" @click="homePageHandle" />
      <span v-show="isCollapse" class="title">仓库管理平台</span>
    </div>
    <SidebarItem
      v-for="route in $store.state.permission.addRoutes"
      :key="route.path"
      :item="route"
    />
  </el-menu>
</template>

<script setup>
import SidebarItem from './SidebarItem.vue'
import { useRouter } from 'vue-router'

// 接受参数
const props = defineProps({
  isCollapse: {
    type: Boolean,
    default: true
  }
})

const router = useRouter()
// 点击跳转首页
const homePageHandle = () => {
  router.push({ name: 'index' })
}
</script>
<style lang="scss" scoped>
@import '@/style/_var.scss';

.is-collapse {
  display: none;
}
.el-menu {
  border-right: 1px solid #001529;

  .logo_box {
    height: 59px;
    display: flex;
    align-items: center;
    padding-left: 14px;

    svg {
      width: 36px;
      height: 36px;
    }
    .title {
      color: $themeColor;
      transition: all 0.5s;
    }
  }
}
</style>
