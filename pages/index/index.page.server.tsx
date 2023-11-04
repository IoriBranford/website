// import './style.css';
// import '#root/components/Resource.css'
import AllGameProps from '../AllGameProps';

export const documentProps = {
	title: 'Iori Branford',
	description: 'Monstergirl fantasy action games'
}

export function Page() {
	return (
		<div style={{justifyItems: 'center'}}>
			<h1 style={{textAlign: 'center'}}><img class='avatar' src='/avatar.png' alt="Iori Branford's avatar" height="64" width="64" /> Iori Branford</h1>
			<h2 style={{textAlign: 'center'}}>Games</h2>
			<section>
				<div class='grid'>
					{Object.entries(AllGameProps).map(([id, game]) => (
						<Resource href={`/${id}`} {...game}/>
					))}
				</div>
			</section>
			<div class='grid' style={{textAlign: 'center'}}>
				<section><a href="/links"><b>🔗 Links</b></a></section>
				<section><a href="/connect"><b>💬 Connect</b></a></section>
				<section><a href="/donate"><b>💸 Donate</b></a></section>
			</div>
		</div>
	);
}

function Resource(props) {
	const {href, title, description, cardImg} = props
	return (<section>
		<a href={href}>
			<button style={{position: 'relative', padding: 0}} title={title}>
				<img src={cardImg} alt={title} style={{borderRadius: 'var(--border-radius)'}}/>
			</button>
			<b>{title}</b>
		</a>
		<p>{description}</p>
	</section>);
}
