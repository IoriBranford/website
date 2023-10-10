import './style.css';

export function Page() {
	return (
		<div>
			<section>
				<Resource
					title="Demonizer"
					description="Succubus shooter"
					href="/demonizer"
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
