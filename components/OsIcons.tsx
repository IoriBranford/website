// import './OsIcons.css'

export default function OsIcons({oses}: {oses: string[]}) {
    return <>
        {oses.map(icon => <i class={`fa-brands fa-${icon}`}/>)}
    </>
}