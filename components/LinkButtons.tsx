import { JSX } from 'preact/jsx-runtime'
import './LinkButtons.css'

export interface LinkButtonProps {
    link: string;
    element: JSX.Element;
    backgroundColor: string;
}

export function LinkButton({link, element, backgroundColor}: LinkButtonProps) {
    return <a class='button' style={{backgroundColor}}target='__blank' href={link}>{element}</a>
}

export default function LinkButtons({buttonsProps}: {buttonsProps: LinkButtonProps[]}) {
    return <div class='linkbuttons'>{buttonsProps.map(props => (
        <LinkButton {...props}/>
    ))}</div>
}