<template>
    <div class="posts" v-if="posts.length">
        <div class="post" v-for="post in posts">
            <router-link :to="post.path">
                <div>
                    <img v-if="post.frontmatter.image" :src="$withBase(post.frontmatter.image)" alt="">
                </div>
                <h2>{{post.frontmatter.title}}</h2>
                <p>{{post.frontmatter.description}}</p>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        props: ["page"],
        computed: {
            posts(){
                let tag_name = this.$props.page
                console.log(this.$tags._metaMap[tag_name].posts)
                return this.$tags._metaMap[tag_name].posts
            }
        }
    };
</script>
