import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import ssr from 'vike/plugin';
import mdx from '@mdx-js/rollup';
import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		https: true
	},
	plugins: [
		preact(),
		ssr({ prerender: true }),
		mdx({ jsxImportSource: 'preact' }),
		mkcert()
	],
});
