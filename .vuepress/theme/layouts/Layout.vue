<template>
    <ParentLayout >
        <TagLinks slot="page-bottom" v-if="this.$frontmatter.tags" class="content padding_bottom_zero"/>
        <Disqus slot="page-bottom" v-if="this.$frontmatter.tags" class="content padding_top_zero"/>
    </ParentLayout>
</template>

<script>
    import ParentLayout from '@parent-theme/layouts/Layout.vue'
    import TagLinks from '../../components/TagLinks'
    import Disqus from '../../components/Disqus'
    export default {
        components: {
            ParentLayout,
            Disqus,
            TagLinks
        }
    }
</script>

<style>
    .padding_top_zero {
        padding-top: 0 !important;
    }
    .padding_bottom_zero {
        padding-bottom: 0 !important;
    }
</style>
