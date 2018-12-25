<template>
    <div>
     {{ posts }}
        <div v-for="tag in tags" class="tag_link">
            <transition name="fade">
            <router-link :to="{path: '/_tag/' + tag + '.html' }" > {{ tag }} </router-link>
            </transition>
        </div>
    </div>
</template>

<script>
    import Tag from "./Tag";
    export default {
        components: {Tag},
        computed: {
            tags(){
                return Object.keys(this.$tags._metaMap)
            }
        }
    };
</script>

<style>
    .tag_link {
        font-size: 35px;
    }
</style>
