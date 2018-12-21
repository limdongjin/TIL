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
        ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
        ['meta', { property: 'og:type', content: 'website' }],
        ['meta', { property: 'og:title', content: 'limdongjin.github.io' }],
        ['meta', { property: 'og:description', content: '공부하면서 정리하는 블로그' }],
        ['meta', { property: 'og:image', content: 'https://limdongjin.github.io/images/logo-144.png'}],
        ['meta', { property: 'og:url', content: 'https://limdongjin.github.io'}]
    ],
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'About', link: '/about/'},
            { text: 'Github', link: 'https://github.com/limdongjin' },
            { text: 'Facebook', link: 'https://www.facebook.com/geniuslim27' },
            { text: 'LinkedIn', link: 'https://www.linkedin.com/in/dongjin-lim-98115a137/' }
        ],
        sidebar: {
            '/algorithms/': [
                '',
                'analysis/'
            ],
            '/algorithms/analysis/': [
                '',
                '/algorithms/',
                '/algorithms/analysis/'
            ],
            '/aws/': [
                '',
                'elasticbeanstalk/',
                'elasticbeanstalk/ebextensions/',
                'redirection_a_to_b'
            ],
            '/blockchain/': [
                '',
                'bitcoin/',
                'bitcoin/whitepaper/',
                'ethereum/',
                'ethereum/whitepaper/',
                'blockchain-tip'
            ],
            '/database/': [
                '',
                'dynamodb/'
            ],
            '/datastructure/': [
                '',
                '/java/ds/'
            ],
            '/elasticsearch/': [
                '',
                'general/',
                'python/',
                'querydsl/'
            ],
            '/etc/': [
                ''
            ],
            '/git/': [
                ''
            ],
            '/java/': [
                '',
                'introduction/',
                'ds/',
                'ds/array/',
                'design-pattern/',
                'design-pattern/template-pattern/',
                'class/',
                'helloworld10/',
                'tomcat/',
                'servlet/',
                'spring/',
                'spring/start/',
                'spring/start/start-with-gradle',
                'spring/start/start-with-gradle-xml'
            ],
            '/js/': [
                ''
            ],
            '/nlp/': [
                ''
            ],
            '/nodejs_serverless/': [
                ''
            ],
            '/nodejs-serverside/': [
                '',
                'sequelize/',
                'sequelize/migration/',
                'sequelize/crud/c/',
                'sequelize/crud/r/'
            ],
            '/oop/': [
                ''
            ],
            '/rails/': [
                '',
                'actionpack/',
                'deploy/',
                'deploy/using_elasticbeanstalk.md',
                'install/',
                'mailer/',
                'tip/'
            ],
            '/tools/': [
                '',
                'rubymine/'
            ],
            '/vuejs/': [
                '',
                'general/',
                'general/axios/',
                'general/editor/',
                'general/imagerender/',
                'general/spinner/',
                'initialization/',
                'references/',
                'tutorials/',
                'vuepress/'
            ],
            '/': [
                ''
            ]
        },
        // displayAllHeaders: true,
        lastUpdated: 'Last Updated'
    },
    plugins: [
        '@vuepress/blog',
        '@vuepress/back-to-top',
        '@vuepress/google-analytics', // 1.0.0.alpha.0 버전에서는 에러가 발생했지만 1.0.0.alpha.29로 높여서 해결하였음.
        ['@vuepress/active-header-links', {
            sidebarLinkSelector: '.sidebar-link',
            headerAnchorSelector: '.header-anchor',
            headerTopOffset: 120
        }],
        '@vuepress/medium-zoom',
        ['@vuepress/pwa', {
            serviceWorker: true,
            updatePopup: true
        }],
        '@vuepress/pagination'
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
