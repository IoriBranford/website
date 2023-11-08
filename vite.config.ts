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
		ssr({
			prerender: true,
			redirects: {
				'/honey-soldier': '/honeysoldier'
			}
		}),
		mdx({ jsxImportSource: 'preact' }),
		mkcert(),
		imagetools({
			defaultDirectives: (url) => {
				const params0 = url.searchParams
				let params = "?format=webp"
				if (params0.has("responsive")) {
					params = "?as=srcset&format=webp&w=320;640;1280"
				}
				return new URLSearchParams(params)
			}
		})
	],
});
