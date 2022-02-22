<template>
  <el-row :gutter="20">
    <el-col :span="6">
      <h2 style="margin-bottom: 20px">操作store</h2>
      <div style="margin-bottom: 15px">
        <div>
          <span>现在的名字：{{ store.state.home.name }}</span>
        </div>
        <div>要修改的名字：<el-input type="text" size="mini" style="width: 100px" v-model="newName" /></div>
        <el-button type="primary" size="mini" @click="editHandle">点击修改</el-button>
      </div>
      <div>
        <el-button type="primary" size="mini" @click="addCount">点击增加——{{ count }}</el-button>
      </div>
    </el-col>
    <el-col :span="6">
      <h2 style="margin-bottom: 20px">toDoList的demo</h2>
      <div style="margin-bottom: 15px">
        <el-input type="text" size="mini" style="width: 100px" v-model="stu.id" />
        <el-input type="text" size="mini" style="width: 100px" v-model="stu.name" />
        <el-button type="primary" size="mini" @click="addStu">添加</el-button>
      </div>
      <ul>
        <li v-for="item in state" :key="item.id">
          {{ item.id }}——{{ item.name }}
          <span @click="remStu($index)">X</span>
        </li>
      </ul></el-col
    >
    <el-col :span="6">
      <h2 style="margin-bottom: 20px">请求本地json文件</h2>
      <el-button type="primary" size="mini" @click="queryHero">查询英雄</el-button>
      <ul>
        <li v-for="item in store.state.home.heroList" :key="item.id">
          {{ item.id }}——{{ item.name }}
          <span @click="remStu($index)">X</span>
        </li>
      </ul></el-col
    >
    <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  </el-row>
</template>

<script setup>
import useRem from './remStu'
import useAdd from './addStu'
import { ref } from 'vue'
import { useStore } from 'vuex'

const { state, remStu } = useRem()
const { stu, addStu } = useAdd(state)

// 修改仓库的name
const store = useStore()
const newName = ref('')
const editHandle = () => {
  store.commit('home/SET_NAME', newName.value)
}

// 请求英雄json
const queryHero = () => {
  // 在模块中的store设置了 namespaced: true,要把模块名称挂在前面
  store.dispatch('home/heroListHandle')
}

// 增加数字
const count = ref(0)
const addCount = () => {
  count.value = count.value + 1
}
</script>
