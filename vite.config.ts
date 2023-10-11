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
	resolve: {
		alias: [
			{ find: 'react', replacement: 'preact/compat' },
			{ find: 'react-dom/test-utils', replacement: 'preact/test-utils' },
			{ find: 'react-dom', replacement: 'preact/compat' },
			{ find: 'react/jsx-runtime', replacement: 'preact/jsx-runtime' }
		],
	},
	plugins: [
		preact(),
		ssr({ prerender: true }),
		mdx({ jsxImportSource: 'preact' }),
		mkcert()
	],
});
