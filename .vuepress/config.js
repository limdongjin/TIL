var path = require('path')
let {getArticles} = require(path.resolve('.vuepress/dong_util'))

module.exports = {
    title: 'limdongjin',
    description: '도큐멘팅!',
    email: 'geniuslim27@gmail.com',
    url: 'https://limdongjin.github.io',
    head: [
        ['link', {rel: 'icon', href: `/images/logo-144.png`}],
        ['link', {rel: 'manifest', href: '/manifest.json'}],
        ['meta', {name: 'theme-color', content: '#3eaf7c'}],
        ['meta', {name: 'apple-mobile-web-app-capable', content: 'yes'}],
        ['meta', {name: 'apple-mobile-web-app-status-bar-style', content: 'black'}],
        ['link', {rel: 'apple-touch-icon', href: `/images/logo-144.png`}],
        ['link', {rel: 'mask-icon', href: '/images/logo-144.png', color: '#3eaf7c'}],
        ['meta', {name: 'msapplication-TileImage', content: '/images/logo-144.png'}],
        ['meta', {name: 'msapplication-TileColor', content: '#000000'}]
    ],
    themeConfig: {
        repo: 'limdongjin/TIL',
        repoLabel: 'Contribute!',
        // Optional options for generating "Edit this page" link
        // if your docs are in a different repo from your main project:
        docsRepo: 'limdongjin/TIL',
        // if your docs are not at the root of the repo:
        // if your docs are in a specific branch (defaults to 'master'):
        // defaults to false, set to true to enable
        editLinks: true,
        // custom text for edit link. Defaults to "Edit this page"
        editLinkText: 'Help us improve this page!',

        nav: [
            {text: 'Home', link: '/'},
            {text: 'About', link: '/about/'},
            {text: 'Blog', link: '/blog/'},
            {text: 'Tags', link: '/_tags/'}
        ],
        sidebar: [
            {
                title: 'Vuepress',
                collapsable: true,
                children: getArticles('vuejs/vuepress')
            },
            {
                title: 'System Programming',
                collapsable: true,
                children: getArticles('system-programming')
            },
            {
                title: 'Java',
                collapsable: true,
                children: getArticles('java')
            },
            {
                title: 'ProblemSolving',
                collapsable: true,
                children: getArticles('problemsolving')
            },
            {
                title: 'Algorithms',
                collapsable: true,
                children: getArticles('algorithms')
            },
            {
                title: 'Vue.js',
                collapsable: true,
                children: getArticles('vuejs', 'vuepress') // except vuepress
            },
            {
                title: 'AWS',
                collapsable: true,
                children: getArticles('aws', 'elasticbeanstalk') // except elasticbeanstalk
            },
            {
                title: 'AWS Elastic Beanstalk',
                collapsable: true,
                children: getArticles('aws/elasticbeanstalk')
            },
            {
                title: 'Blockchain',
                collapsable: true,
                children: getArticles('blockchain')
            },
            {
                title: 'Database',
                collapsable: true,
                children: getArticles('database')
            },
            // {
            //     title: 'DataStructure',
            //     collapsable: true,
            //     children: getArticles('datastructure')
            // },
            {
                title: 'Elastic Search',
                collapsable: true,
                children: getArticles('elasticsearch')
            },
            {
                title: 'GIT',
                collapsable: true,
                children: getArticles('git')
            },
            {
                title: 'Javascript',
                collapsable: true,
                children: getArticles('js')
            },
            {
                title: 'nodejs',
                collapsable: true,
                children: getArticles('nodejs-serverside')
            },
            {
                title: 'OOP',
                collapsable: true,
                children: getArticles('oop')
            },
            {
                title: 'Python',
                collapsable: true,
                children: getArticles('python')
            },
            {
                title: 'Useful',
                collapsable: true,
                children: getArticles('useful')
            },
            {
                title: 'Rails',
                collapsable: true,
                children: getArticles('rails')
            },
            {
                title: 'NLP',
                collapsable: true,
                children: getArticles('nlp')
            },
            {
                title: 'C/C++',
                collapsable: true,
                children: getArticles('c_cpp')
            },
            {
                title: 'ETC',
                collapsable: true,
                children: [
                    '/etc/',
                    '/nodejs_serverless/useful-reference-serverless',
                    '/tools/'
                ]
            }
        ],
        displayAllHeaders: false,
        lastUpdated: 'Last Updated'
    },
    plugins: [
        '@vuepress/blog',
        '@vuepress/back-to-top',
        '@vuepress/google-analytics',
        '@vuepress/active-header-links',
        '@vuepress/medium-zoom',
        ['@vuepress/pwa', {
            serviceWorker: true,
            updatePopup: true
        }],
        '@vuepress/pagination',
        '@limdongjin/vuepress-plugin-sidebar-on-off',
        [ '@limdongjin/vuepress-plugin-simple-seo', {
            default_image: '/images/main-image-min.jpg',
            root_url: 'https://limdongjin.github.io',
            default_site_name: 'limdongjin TIL'
        }]
    ],
    ga: 'UA-131016591-1',
    markdown: {
        lineNumbers: true
    }
}
