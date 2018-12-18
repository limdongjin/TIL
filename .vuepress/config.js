module.exports = {
    title: 'limdongjin',
    description: '도큐멘팅!',
    head: [
        ['link', { rel: 'icon', href: `/images/logo-144.png` }],
        ['link', { rel: 'manifest', href: '/manifest.json' }],
        ['meta', { name: 'theme-color', content: '#3eaf7c' }],
        ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
        ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
        ['link', { rel: 'apple-touch-icon', href: `/images/logo-144.png` }],
        ['link', { rel: 'mask-icon', href: '/images/logo-144.png', color: '#3eaf7c' }],
        ['meta', { name: 'msapplication-TileImage', content: '/images/logo-144.png' }],
        ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
    ],
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Github', link: 'https://github.com/limdongjin' },
            { text: 'Facebook', link: 'https://www.facebook.com/geniuslim27' },
            { text: 'LinkedIn', link: 'https://www.linkedin.com/in/dongjin-lim-98115a137/' }
        ],
        sidebar: "auto",
        displayAllHeaders: true,
        lastUpdated: 'Last Updated'
    },
    plugins: [
        '@vuepress/blog',
        '@vuepress/pwa',
        '@vuepress/back-to-top',
        '@vuepress/google-analytics'
    ],
    configureWebpack: {
        resolve: {
            alias: {
                '@alias': 'images'
            }
        }
    },
    ga: 'UA-131016591-1',
    markdown: {
        lineNumbers: true
    }
}
