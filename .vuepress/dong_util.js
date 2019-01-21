var dirTree = require('directory-tree')
var path = require('path')

let util = module.exports = {
    getFiles: (name)=>{
        var files = []
        dirTree(path.join(__dirname, '../'+name), {extensions:/\.md/}, (item, PATH) => files.push(item));
        return files
    },
    getArticles: (name, except)=>{
        let articles = []
        var root_dirname = path.join(__dirname, '../')
        var files = util.getFiles(name)
        files.forEach((item)=>{
            if(except !== undefined && item.path.includes(except)) return
            articles.push(item.path.replace(root_dirname, '/').replace('.md', '').replace('README', ''));
        })
        return articles
    }
}
