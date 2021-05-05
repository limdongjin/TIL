<template>
  <div id="comments"></div>
</template>
<script>
export default {
  mounted() {
    console.log("comment mounted")
    this.initUtter()
  },
  methods: {
    initUtter(){
        console.log("init utterance comments")
        let dom = window.document.getElementById('comments')
        let utterances = document.createElement("script")
        utterances.type = "text/javascript"
        utterances.async = true
        utterances.crossorigin = "anonymous"
        utterances.src = "https://utteranc.es/client.js"

        utterances.setAttribute("issue-term", "title")
        utterances.setAttribute("theme", "github-light")
        utterances.setAttribute("repo", `limdongjin/TIL`) 
        if (dom.hasChildNodes()) {
            dom.innerHTML = ''
        }
         dom.appendChild(utterances) 
    }
  },
  watch: {
    $route(to, from) {
        console.log("route changed." + from.path + ' -> ' + to.path)
        if(to.path != from.path) {
            setTimeout(() => { this.initUtter() }, 300)
        }
    }
  }
};
</script>
