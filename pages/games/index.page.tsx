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
				<Resource
					title="Honey Soldier"
					description="Shoot hive invaders in 2 minutes"
					href="/honey-soldier"
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
