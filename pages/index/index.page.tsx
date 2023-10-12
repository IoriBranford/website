import './style.css';

export const documentProps = {
	title: 'Iori Branford',
	description: 'Maker of monstergirl fantasy action games'
}

export function Page() {
	return (
		<div>
			<img class='avatar' src='/avatar.png' alt="Iori Branford's avatar" height="256" width="256" />
			<h1>Iori Branford</h1>
			<section>
				<Resource
					title="Games"
					description="Games I've made"
					href="/games"
				/>
			</section>
		</div>
	);
}

function Resource(props) {
	return (
		<a href={props.href} class="resource">
			<h2>{props.title}</h2>
			<p>{props.description}</p>
		</a>
	);
}
