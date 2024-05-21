export { render as onRenderClient };

import { hydrate } from 'preact';
import { PageShell } from './PageShell';

// This render() hook only supports SSR, see https://vike.dev/render-modes for how to modify render() to support SPA
async function render(pageContext) {
	const { Page, pageProps } = pageContext;
	if (!Page) throw new Error('Client-side render() hook expects pageContext.Page to be defined');
	const root = document.getElementById('app');
	if (!root) throw new Error('DOM element #app not found');

	hydrate(
		<PageShell pageContext={pageContext}>
			<Page {...pageProps} />
		</PageShell>,
		root,
	);
}
