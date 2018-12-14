module.exports = {
    title: 'limdongjin',
    description: '도큐멘팅!',
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Github', link: 'https://github.com/limdongjin' },
            { text: 'Facebook', link: 'https://www.facebook.com/geniuslim27' },
            { text: 'LinkedIn', link: 'https://www.linkedin.com/in/dongjin-lim-98115a137/' }
        ],
        sidebar: "auto",
        lastUpdated: 'Last Updated'
    },
    plugins: [
        '@vuepress/blog',
        '@vuepress/pwa',
        '@vuepress/google-analytics'
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
