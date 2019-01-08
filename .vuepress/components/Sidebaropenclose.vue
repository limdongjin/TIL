<template>
    <div class="sidebar-open-close" v-on:click="open_or_close">
        on/off
    </div>
</template>

<script>
    export default {
        name: "Sidebaropenclose",
        methods: {
            open_or_close: function(){
                let theme_container = document.getElementsByClassName('theme-container')[0]
                if (theme_container.classList.contains('no-sidebar')) {
                    theme_container.classList.remove('no-sidebar')
                } else {
                    theme_container.classList.add('no-sidebar')
                }
            }
        }
    }
</script>

<style>
    /*.sidebar-open-close{*/

    /*}*/
@media screen and (min-width: 768px) {
    .sidebar-open-close {
        background-color: wheat;
        /*background-image: url("/images/switch.png");*/
        position: fixed;
        z-index: 10;
        top: 5rem;
        display: inline-block;
        left: 0.1rem;
        width: 2rem;
        color: $ accentColor;
        cursor: pointer;
    }
}
</style>
