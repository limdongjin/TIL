<template lang="html">
  <div>
    Tags:
    <router-link
      v-for="tag in $page.frontmatter.tags"
      :key="tag"
      :to="{ path: `/_tags/tag.html#${tag}`}">
      {{tag}}
    </router-link>
  </div>
</template>
