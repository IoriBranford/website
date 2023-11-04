// import './style.css';
// import '#root/components/Resource.css'
import AllGameProps from '../AllGameProps';

export const documentProps = {
	title: 'Iori Branford',
	description: 'Monstergirl fantasy action games'
}

export function Page() {
	return (<>
		<div class='grid' style={{placeItems: 'center'}}>
			<div>
				<img class='avatar' src='/avatar.png' alt="Iori Branford's avatar" height="256" width="256" />
				<h1 style={{textAlign: 'center'}}>Iori Branford</h1>
			</div>
			<section>
				<div class='grid'>
					{Object.entries(AllGameProps).map(([id, game]) => (
						<Resource href={`/${id}`} {...game}/>
					))}
				</div>
				<div class='grid' style={{textAlign: 'center'}}>
					<a href="/links"><b>🔗 Links</b></a>
					<a href="/connect"><b>💬 Connect</b></a>
					<a href="/donate"><b>💸 Donate</b></a>
				</div>
			</section>
		</div>
	</>);
}

function Resource(props) {
	const {href, title, description} = props
	return (
		<a href={href}>
			<b>{title}</b>
			<p>{description}</p>
		</a>
	);
}
