<template>
  <el-container>
    <el-aside :width="isCollapse ? '200px' : '64px'">
      <Sidebar :isCollapse="isCollapse" />
    </el-aside>
    <el-container>
      <el-header>
        <div class="topLeft">
          <i
            :class="[isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold']"
            @click="isCollapseHandle"
          />
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }"
              >homepage</el-breadcrumb-item
            >
            <el-breadcrumb-item>promotion management</el-breadcrumb-item>
          </el-breadcrumb>
        </div>

        <div class="topRight">
          <el-badge :value="99" type="danger">
            <i class="el-icon-message" />
          </el-badge>
          <el-badge :value="99" type="danger" is-dot>
            <i class="el-icon-bell" />
          </el-badge>
          <div class="infomation">
            <el-avatar
              size="small"
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            >
            </el-avatar>
            <el-dropdown @command="handleCommand" trigger="click">
              <div class="el-dropdown-link">
                扑棱蛾子<i class="el-icon-arrow-down el-icon--right"></i>
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="a">个人信息</el-dropdown-item>
                  <el-dropdown-item command="b">设置密码</el-dropdown-item>
                  <el-dropdown-item command="c">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </el-header>
      <el-main>
        <div class="main_box">
          <router-view :key="$route.fullPath" />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { SwitchButton } from '@element-plus/icons'
import Sidebar from './Sidebar/index.vue'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const isCollapse = ref(true)
const isCollapseHandle = (e) => {
  isCollapse.value = !isCollapse.value
}

onMounted(() => {
  console.log(route.matched)
})
const handleCommand = (command) => {
  switch (command) {
    case 'a':
      break
    case 'b':
      // router.push({ name: 'login' })
      break
    case 'c':
      router.push({ name: 'login' })
      break
  }
}
</script>

<style lang="scss" scoped>
.el-container {
  height: 100vh;

  .el-aside {
    height: 100%;
    background-color: #001529;
    transition: all 0.5s ease-in-out;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .el-header {
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    .topLeft {
      display: flex;
      i {
        margin-right: 25px;
        line-height: 60px;
        font-size: 24px;
      }
    }

    .topRight {
      display: flex;
      line-height: 60px;
      align-items: center;

      .el-badge {
        line-height: 36px;

        i {
          font-size: 22px;
          color: gray;
          margin-left: 20px;
          vertical-align: middle;
        }

        i:hover {
          cursor: pointer;
          color: #31c0fd;
        }
      }

      .infomation {
        display: flex;
        align-items: center;
        width: 125px;
        height: 36px;
        background-color: #fff;
        border-radius: 20px;
        vertical-align: middle;
        margin-left: 20px;
        line-height: 40px;
        box-sizing: border-box;

        .el-avatar {
          vertical-align: middle;
          margin-left: 5px;
          margin-right: 6px;
          width: 26px;
          height: 26px;
        }
      }
    }

    .el-breadcrumb {
      line-height: 60px;
    }
  }

  .el-main {
    // background-color: #f5f7f9;

    .main_box {
      width: 100%;
      height: 100%;
      background-color: #fff;
    }
  }
}
</style>
