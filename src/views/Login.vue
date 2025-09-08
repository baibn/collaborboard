<script setup lang="ts">
import { useAuth } from '@/stores/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const { login } = useAuth()
const router = useRouter()
const email = ref(''),
  password = ref('')

const onLogin = async () => {
  const { error } = await login(email.value, password.value)
  if (!error) router.push('/board/room1')
}
</script>

<template>
  <div class="login-container">
    <el-card class="login-card" shadow="hover">
      <template #header>
        <h2 class="title">CollaborBoard 登录</h2>
      </template>

      <el-form @submit.prevent="onLogin" label-width="60px">
        <el-form-item label="邮箱">
          <el-input
            v-model="email"
            type="email"
            placeholder="user@example.com"
          />
        </el-form-item>

        <el-form-item label="密码">
          <el-input
            v-model="password"
            type="password"
            placeholder="≥6 位"
            show-password
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" native-type="submit" class="submit-btn"
            >登录</el-button
          >
        </el-form-item>
      </el-form>

      <div class="tip">无账号？联系管理员创建</div>
    </el-card>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-card {
  width: 400px;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.title {
  text-align: center;
  margin: 0;
  color: #303133;
  font-weight: 500;
}

.submit-btn {
  width: 100%;
}

.tip {
  text-align: center;
  color: #909399;
  font-size: 12px;
  margin-top: 12px;
}
</style>
