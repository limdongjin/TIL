<template>
    <ParentLayout >
        <TagLinks slot="page-bottom" v-if="this.$frontmatter.tags" class="content padding_bottom_zero"/>
        <Comment slot="page-bottom" class="content padding_top_zero"/>
    </ParentLayout>
</template>

<script>
    import ParentLayout from '@parent-theme/layouts/Layout.vue'
    import TagLinks from '../../components/TagLinks'
    import Comment from '../../components/Comment'
    export default {
        components: {
            ParentLayout,
            Comment,
            TagLinks
        }
    }
</script>

<style>
    @import "https://fonts.googleapis.com/css?family=Gugi";
    .padding_top_zero {
        padding-top: 0 !important;
    }
    .padding_bottom_zero {
        padding-bottom: 0 !important;
    }
</style>
