import { Database } from '@/types'
import {supabase } from '@/db/supabase'


const api = {
  exercises: {
    list: async () => {
        const { data, error } = await supabase
        .from('exercises')
        .select(`*`)
        return JSON.stringify(data)
    }
  }
}

export default api