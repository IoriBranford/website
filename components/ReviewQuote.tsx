export default function ReviewQuote({source, href, children}) {
    return <a href={href} class='resource'>
        {children}
        {source}
    </a>
}