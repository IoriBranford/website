import './style.css';

export function Page() {
	return (
		<div>
			<img src='/avatar.jpg' alt="Iori Branford's avatar" height="160" width="160" />
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
