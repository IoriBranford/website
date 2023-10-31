import { PageContextProvider } from './usePageContext';

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

function PageNav({url, href, children}) {
	return <li><a href={href} class={url==href ? 'primary' : 'secondary'}>{children}</a></li>
}

export function Header({ url }) {
	return (
		<header>
			<nav>
				<ul>
					<li><a href='/'><img width={32} height={32} src='/avatar.png' alt='Iori Branford avatar'/> <b>Iori Branford</b></a></li>
				</ul>
				<ul>
					<PageNav href='/' url={url}>Home</PageNav>
					<PageNav href='/games' url={url}>Games</PageNav>
				</ul>
			</nav>
		</header>
	);
}
