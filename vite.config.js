import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0', //  모든 네트워크 인터페이스에서 접근 허용
    port: 5173,    //  서버 포트를 5173으로
    strictPort: true, //  포트 충돌이 발생하면 에러 발생
  },
  plugins: [react()],
})
