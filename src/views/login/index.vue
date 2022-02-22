<template>
  <div class="login">
    <div class="login-container">
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="validateRef"
        class="login-body"
        v-loading="loading"
      >
        <el-image class="login-logo" :src="imgUrl"></el-image>
        <el-form-item prop="username" label=" ">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user"
            placeholder="请输入用户名称"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" label=" ">
          <el-input
            type="password"
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
            show-password
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="imgCode" label=" ">
          <el-row>
            <el-col :span="13">
              <el-input
                v-model="loginForm.imgCode"
                maxlength="4"
                prefix-icon="el-icon-message"
                placeholder="请输入验证码"
              ></el-input>
            </el-col>
            <el-col :span="9" :offset="1">
              <VueImgVerify ref="verifyRef"></VueImgVerify>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="text" @click="editPwd"> 忘记密码？ </el-button>
        </el-form-item>
        <el-form-item class="login-body-button">
          <el-button class="login-submit" type="danger" round @click="submit">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, unref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import VueImgVerify from '@/components/modules/VueImageVerify.vue'
import { ElMessage } from 'element-plus'
import imgUrl from '@/assets/images/logo.png'

const router = useRouter()
const store = useStore()
const validateRef = ref(null) // 表单ref
const verifyRef = ref(null) // 验证码ref
const loading = ref(false) // 登录loading开关

onMounted(() => {
  store.dispatch('user/resetToken')
})

// 账号校验规则
const validatePassAcc = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入用户名或手机号'))
  } else if (
    value.replace(/[\u0391-\uFFE5]/g, 'aa').length > 18 ||
    value.replace(/[\u0391-\uFFE5]/g, 'aa').length < 4
  ) {
    callback(new Error('请输入4-18位字符'))
  } else {
    callback()
  }
}
// 密码校验规则
const validatePassPwd = (rule, value, callback) => {
  let regs1 = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![_~@#$^]+$)[a-zA-Z\d_~@#$^]+$/
  if (value === '') {
    callback(new Error('请输入密码'))
  } else if (value.length > 18 || value.length < 6) {
    callback(new Error('请输入6-18位密码'))
  } else if (!regs1.test(value)) {
    callback(new Error('请输入大小写字母、数字、符号至少含有2种或以上'))
  } else {
    callback()
  }
}
// 验证码校验规则
const validatePassVer = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入验证码'))
  } else if (value.toLowerCase() !== verifyRef.value.imgCode.toLowerCase()) {
    callback(new Error('验证码错误，请重新输入'))
  } else {
    callback()
  }
}
const rules = {
  //   username: [{ required: true, validator: validatePassAcc, trigger: 'blur' }],
  //   password: [{ required: true, validator: validatePassPwd, trigger: 'blur' }],
  //   imgCode: [{ required: true, validator: validatePassVer, trigger: 'blur' }]
}

// 账号、密码、验证码变量及方法
const loginForm = reactive({
  username: '',
  password: '',
  imgCode: ''
})
const submit = () => {
  const form = unref(validateRef) // 校验是不是ref对象
  if (!form) {
    return
  }
  form.validate(async (valid) => {
    if (valid) {
      loading.value = true
      // login(state.loginForm).then((res) => {
      //   if (res.code === 200) {
      //     // 登录成功后设置token到vuex中
      //     localStorage.username = res.data.username
      //     store.commit('setToken', res.data.token)
      //     router.push({ path: 'home' })
      await store.dispatch('user/login', loginForm)
      router.push({ path: '/analyse' })
      //   } else {
      //     ElMessage({ showClose: true, message: res.data, type: 'error' })
      //   }
      // })
    }
  })
}

// 忘记密码跳转
const editPwd = () => {
  router.push({ path: '/forgetPassword' })
}
</script>

<style scoped lang="scss">
.login {
  width: 100vw;
  height: 100vh;
  background: url('@/assets/images/login_bj.png') no-repeat;
  background-size: cover;

  .login-container {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: rgba(233, 233, 233, 0.3);
    border-radius: 0.4rem;
    border: 1px white solid;
    padding: 0.8rem;

    .login-logo {
      width: 120px;
      height: 120px;
      display: block;
      margin: 2rem auto;
    }

    .login-body {
      padding: 1rem 2rem;
      background: rgba(233, 233, 233, 0.6);
      width: 25rem;
      border-radius: 0.2rem;
    }
  }

  .el-input__inner {
    border-radius: 20px;
  }

  .codeImg {
    height: 40px;
  }

  .login-submit {
    width: 100%;
  }
}
</style>
