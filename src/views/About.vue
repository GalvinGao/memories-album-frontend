<template>
  <div class="about">
    <h1>This is an about page</h1> <code>
      {{ images }}
    </code>
  </div>
</template>

<script>
  import get from "@/utils/get";

  export default {
    name: 'About',

    computed: {
      faces () {
        return get.image.all()
      }
    }
  }
</script>