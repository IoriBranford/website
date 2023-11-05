import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import ssr from 'vike/plugin';
import mdx from '@mdx-js/rollup';
import mkcert from 'vite-plugin-mkcert'
import {imagetools} from 'vite-imagetools'

const __dirname = "" // to be replaced by vite

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		https: true
	},
	resolve: {
		alias: [
			{ find: '#root', replacement: __dirname }
		],
	},
	plugins: [
		preact(),
		ssr({ prerender: true }),
		mdx({ jsxImportSource: 'preact' }),
		mkcert(),
		imagetools({
			defaultDirectives: (url) => {
				const params0 = url.searchParams
				let params = "?format=webp&lossless"
				if (params0.has("galleryimg")) {
					params = "?as=srcset&format=webp&lossless&w=1280;640;320"
				} else if (params0.has("logo")) {
					params = "?as=srcset&format=webp&lossless&w=640;320"
				}
				return new URLSearchParams(params)
			}
		})
	],
});
