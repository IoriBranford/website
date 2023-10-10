import { PageContextProvider } from './usePageContext';
import './PageShell.css';

export { PageShell };

function PageShell({ pageContext, children }) {
	return (
		<PageContextProvider pageContext={pageContext}>
			<Header url={pageContext.urlPathname} />
			<main>{children}</main>
		</PageContextProvider>
	);
}

export function Header({ url }) {
	return (
		<header>
			<nav>
				<a href="/" class={url == '/' && 'active'}>
					<div class='brand'>
						<img class='avatar' src='/avatar.jpg'/>
						Iori Branford
					</div>
				</a>
				<a href="/games" class={url == '/games' && 'active'}>
					Games
				</a>
			</nav>
		</header>
	);
}
