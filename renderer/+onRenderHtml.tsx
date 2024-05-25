export { render as onRenderHtml };

import { renderToString } from 'preact-render-to-string';
import { PageShell } from './PageShell';
import { escapeInject, dangerouslySkipEscape } from 'vike/server';

async function render(pageContext) {
	const { Page, pageProps } = pageContext;
	// This render() hook only supports SSR, see https://vike.dev/render-modes for how to modify render() to support SPA
	if (!Page) throw new Error('My render() hook expects pageContext.Page to be defined');
	const pageHtml = renderToString(
		<PageShell pageContext={pageContext}>
			<Page {...pageProps} />
		</PageShell>,
	);

	// See https://vike.dev/head
	const { documentProps } = pageContext.exports;
	const title = (documentProps && documentProps.title) || 'Iori Branford';
	const desc =
		(documentProps && documentProps.description) || 'Monstergirl fantasy action games';
	const image = (documentProps && documentProps.image &&
		escapeInject`
			<meta name="twitter:card" content="summary_large_image" />
			<meta property="og:image" content="${documentProps.image}" />
			<meta property="og:image:alt" content="${title} card" />
		`) || ''
	const theme = (documentProps && documentProps.theme) || 'dark';

	const documentHtml = escapeInject`<!DOCTYPE html>
		<html lang="en" data-theme="${theme}">
		<head>
			<meta charset="UTF-8" />
			<link rel="icon" type="image/png" href="/avatar.png" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<meta name="color-scheme" content="light dark" />
			<meta name="description" content="${desc}" />
			<meta property="og:title" content="${title}" />
			<meta property="og:description" content="${desc}" />
			<meta property="og:site_name" content="Iori Branford" />
			<meta name="twitter:creator" content="@ioribranford" />
			<meta name="twitter:site" content="@ioribranford" />
			${image}
			<title>${title}</title>
		</head>
		<body id='app' class='container'>
			${dangerouslySkipEscape(pageHtml)}
		</body>
		</html>`;

	return {
		documentHtml,
		pageContext: {
			// We can add some `pageContext` here, which is useful if we want to do page redirection https://vike.dev/page-redirection
		},
	};
}
