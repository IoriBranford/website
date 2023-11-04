// import './style.css';
// import '#root/components/Resource.css'
import AllGameProps from '../AllGameProps';
export const documentProps = {
	title: 'Games by Iori Branford',
	description: "Monstergirl fantasy action games"
}

export function Page() {
	return (
		<div>
			<section>
				{Object.entries(AllGameProps).map(([id, game]) => (
					<Resource href={`/${id}`} {...game}/>
				))}
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
