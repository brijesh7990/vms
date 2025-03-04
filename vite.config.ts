import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import fs from 'fs';
import path from 'path';


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
	port: 5173,
        https:{
		key: fs.readFileSync(path.resolve(__dirname, '/etc/ssl/private/ssl.key')),
	        cert: fs.readFileSync(path.resolve(__dirname, '/etc/ssl/private/ssl.crt')),
	}
  }
})
