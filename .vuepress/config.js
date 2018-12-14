module.exports = {
    title: 'limdongjin',
    description: '도큐멘팅!',
    head: [
        ['link', {rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.1/css/bulma.min.css'}]
    ],
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Contact',
                items: [
                    { text: 'Github', link: 'https://github.com/limdongjin' },
                    { text: 'Facebook', link: 'https://www.facebook.com/geniuslim27' },
                    { text: 'LinkedIn', link: 'https://www.linkedin.com/in/dongjin-lim-98115a137/' }
                ]
            }
        ],
        sidebar: "auto",
        lastUpdated: 'Last Updated',
        serviceWorker: {
            updatePopup: true // Boolean | Object, default to undefined.
        }
    },
    plugins: [
        '@vuepress/blog',
        'tag'
    ],
    configureWebpack: {
        resolve: {
            alias: {
                '@alias': 'images'
            }
        }
    },
    ga: 'UA-131016591-1'
}
