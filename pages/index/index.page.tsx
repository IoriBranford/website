// import './style.css';
// import '#root/components/Resource.css'
import AllGameProps from '../AllGameProps';

export const documentProps = {
	title: 'Iori Branford',
	description: 'Monstergirl fantasy action games'
}

export function Page() {
	return (
		<div class='grid' style={{placeItems: 'center'}}>
			<div>
				<img class='avatar' src='/avatar.png' alt="Iori Branford's avatar" height="256" width="256" />
				<h1>Iori Branford</h1>
			</div>
			<div>
				<section>
					{Object.entries(AllGameProps).map(([id, game]) => (
						<Resource href={`/${id}`} {...game}/>
					))}
				</section>
				<a href="/links"><h4>Links</h4></a>
				<a href="/contact"><h4>Contact</h4></a>
			</div>
		</div>
	);
}

function Resource(props) {
	const {href, title, description} = props
	return (
		<a href={href}>
			<hgroup>
				<h3>{title}</h3>
				<h4>{description}</h4>
			</hgroup>
		</a>
	);
}
