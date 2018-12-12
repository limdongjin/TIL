module.exports = {
    plugins: ['@vuepress/back-to-top'],
    title: 'limdongjin',
      description: '도큐멘팅!',
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' }
        ],
        sidebar: "auto",
        lastUpdated: 'Last Updated',
        serviceWorker: {
            updatePopup: true // Boolean | Object, default to undefined.
            // If set to true, the default text config will be:
            // updatePopup: {
            //    message: "New content is available.",
            //    buttonText: "Refresh"
            // }
        }
    },
    plugins: [
        'tag',
        'category',
        '@vuepress/blog'
    ]
}
