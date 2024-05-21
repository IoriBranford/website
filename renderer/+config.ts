import type { Config, ConfigEnv } from 'vike/types'

export default {
    passToClient: ['pageProps', 'urlPathname'],
    
    // To enable Client-side Routing:
    // clientRouting: true,
    // !! WARNING !! Before doing so, read https://vike.dev/clientRouting
    
    meta: {
        documentProps: {
            env: {
                server: true
            }
        },
        renderMode: {
            env: { config: true },
            effect({ configDefinedAt, configValue }) {
                let env: ConfigEnv = {
                    server: true,
                    client: configValue != 'HTML',
                }
                return {
                    meta: {
                        Page: { env }
                    }
                }
            }
        }
    },
} satisfies Config