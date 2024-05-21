import type { Config } from 'vike/types'

export default {
    passToClient: ['pageProps', 'urlPathname'],

    // To enable Client-side Routing:
    // clientRouting: true,
    // !! WARNING !! Before doing so, read https://vike.dev/clientRouting
} satisfies Config