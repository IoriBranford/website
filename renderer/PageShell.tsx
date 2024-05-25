import './PageShell.css'
import { PageContextProvider } from './usePageContext';

export { PageShell };

function PageShell({ pageContext, children }) {
	return (
		<PageContextProvider pageContext={pageContext}>
			<Header url={pageContext.urlPathname} />
			<main>{children}</main>
			<section>© 2024 Iori Branford</section>
		</PageContextProvider>
	);
}

function PageNav({url, href, children}) {
	return <li><a href={href} class={url==href ? 'primary' : 'contrast'}>
		{url==href ? <b>{children}</b> : children}
	</a></li>
}

export function Header({ url }) {
	return (
			<nav>
				<ul>
					<li><a href='/'><img width={32} height={32} src='/avatar.png' alt='Iori Branford avatar'/> <b class='headername'>Iori Branford</b></a></li>
				</ul>
				<ul>
					<li><details role='list'>
						<summary aria-haspopup="listbox" role="link">Games</summary>
						<ul role="listbox">
							<PageNav href='/demonizer' url={url}>Demonizer</PageNav>
							<PageNav href='/honeysoldier' url={url}>Honey Soldier</PageNav>
						</ul>
					</details></li>
					<PageNav href='/links' url={url}>Links</PageNav>
					<PageNav href='/connect' url={url}>Connect</PageNav>
					<PageNav href='/donate' url={url}>Donate</PageNav>
					<li><details role='list'>
						<summary aria-haspopup="listbox" role="link">Info</summary>
						<ul role="listbox">
							<PageNav href='/privacy' url={url}>Privacy Policy</PageNav>
						</ul>
					</details></li>
				</ul>
			</nav>
	);
}
