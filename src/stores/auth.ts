import type { User } from '@supabase/supabase-js'
import { createClient } from '@supabase/supabase-js'
import { ref } from 'vue'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
)
const user = ref<User | null>(null)

export const useAuth = () => {
  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (!error && data.user) {
      user.value = data.user // ← 立即赋值
    }
    console.log('login user', user)
    return { error, data }
  }
  const logout = () => supabase.auth.signOut()

  return { user, login, logout }
}
