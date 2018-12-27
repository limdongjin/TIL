<template>
    <ParentLayout >
       <TagLinks slot="page-bottom" v-if="this.$frontmatter.tags" class="content"/>
        <Disqus slot="page-bottom" v-if="this.$frontmatter.tags" class="content"/>
    </ParentLayout>
</template>

<script>
    import ParentLayout from '@parent-theme/layouts/Layout.vue'
    import TagLinks from '../components/TagLinks'
    import Disqus from '../components/Disqus'
    export default {
        components: {
            ParentLayout,
            Disqus,
            TagLinks
        }
    }
</script>
