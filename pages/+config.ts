import { Config } from 'vike/types';
import vercelConfig from '../vercel.json'

const config: Config = {
    prerender: true,
    redirects: vercelConfig.redirects && vercelConfig.redirects.reduce(
        (redirects, {source, destination}) => {
            redirects[source] = destination;
            return redirects
        }
    , {})
}

export default config