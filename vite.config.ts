import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import ssr from 'vike/plugin';
import mdx from '@mdx-js/rollup';
import mkcert from 'vite-plugin-mkcert'
import remarkGfm from 'remark-gfm'
import {imagetools} from 'vite-imagetools'
import vercelConfig from './vercel.json'

const __dirname = "" // to be replaced by vite

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		headers: {
			"Cross-Origin-Opener-Policy": "same-origin",
			"Cross-Origin-Embedder-Policy": "require-corp",
		}
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
			redirects: vercelConfig.redirects && vercelConfig.redirects.reduce(
				(redirects, {source, destination}) => {
					redirects[source] = destination;
					return redirects
				}
			, {})
		}),
		mdx({
			jsxImportSource: 'preact',
			remarkPlugins: [remarkGfm]
		}),
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
