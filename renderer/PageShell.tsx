import { PageContextProvider } from './usePageContext';
import './PageShell.css';

export { PageShell };

function PageShell({ pageContext, children }) {
	return (
		<PageContextProvider pageContext={pageContext}>
			<Header url={pageContext.urlPathname} />
			<main>{children}</main>
			<footer>© 2023 Iori Branford</footer>
		</PageContextProvider>
	);
}

export function Header({ url }) {
	return (
		<header>
			<nav>
				<a href="/" class={url == '/' && 'active'}>
					<div class='brand'>
						<img width={32} height={32} src='/avatar.png' alt='Iori Branford avatar'/>
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
