const hashRedirects: Record<string, string> = {
    '#demonizer': '/demonizer',
    '#demonizer-bonus': '/demonizer/bonus',
    '#demonizer-bonus-art': '/demonizer/bonus',
    '#honey-soldier': '/honeysoldier',
    '#links': '/links',
    '#contact': '/connect',
    '#donate': '/donate',
}

const redirect = hashRedirects[location.hash]
if (redirect)
    window.location.replace(redirect)