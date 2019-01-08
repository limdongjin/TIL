<template>
    <div class="sidebar-open-close" v-on:click="open_or_close">
        <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 448 512" class="icon"><path fill="currentColor" d="M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z"></path></svg>
    </div>
</template>

<script>
    export default {
        name: "Sidebaropenclose",
        methods: {
            open_or_close: function(){
                let theme_container = document.getElementsByClassName('theme-container')[0];
                if (theme_container.classList.contains('no-sidebar')) {
                    theme_container.classList.remove('no-sidebar');
                } else {
                    theme_container.classList.add('no-sidebar');
                }
            }
        }
    }
</script>

<style>
      .sidebar-open-close{
          display: none;
      }

    @media screen and (min-width: 768px) {
        .sidebar-open-close {
            /*background-color: wheat;*/
            /*background-image: url("/images/switch.png");*/
            position: fixed;
            z-index: 10;
            top: 4rem;
            display: inline-block;
            left: 0.1rem;
            width: 1.5rem;
            color: $accentColor;
            cursor: pointer;
        }
    }
</style>
