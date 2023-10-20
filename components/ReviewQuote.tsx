
export default function ReviewQuote({source, href, children}) {
    return <div>
        {children}
        {href ? <a href={href}>{source}</a> : source}
    </div>
}