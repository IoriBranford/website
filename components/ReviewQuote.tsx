export default function ReviewQuote({source, href, children}) {
    return <a href={href} class='resource'>
        <blockquote>
            {children}
            <footer>
                <cite>{source}</cite>
            </footer>
        </blockquote>
    </a>
}