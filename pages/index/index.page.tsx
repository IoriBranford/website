// import './style.css';
// import '#root/components/Resource.css'

export const documentProps = {
	title: 'Iori Branford',
	description: 'Maker of monstergirl fantasy action games'
}

export function Page() {
	return (
		<div class='grid' style={{placeItems: 'center'}}>
			<div>
				<img class='avatar' src='/avatar.png' alt="Iori Branford's avatar" height="256" width="256" />
				<h1>Iori Branford</h1>
			</div>
			<div>
				<Resource
					title="Games"
					description="My monstergirl fantasy games"
					href="/games"
				/>
				<Resource
					title="Links"
					description="Sites I use"
					href="/links"
				/>
				<Resource
					title="Contact"
					description="Get in touch"
					href="/contact"
				/>
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
