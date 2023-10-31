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
	return <li><a href={href} class={url==href ? 'primary' : 'secondary'}>
		{url==href ? <b>{children}</b> : children}
	</a></li>
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
					<PageNav href='/demonizer' url={url}>Demonizer</PageNav>
					<PageNav href='/honey-soldier' url={url}>Honey Soldier</PageNav>
					<PageNav href='/links' url={url}>Links</PageNav>
					<PageNav href='/contact' url={url}>Contact</PageNav>
					<PageNav href='/donate' url={url}>Donate</PageNav>
				</ul>
			</nav>
		</header>
	);
}
