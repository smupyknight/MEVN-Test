<template>
<v-subheader> 
    <h1>{{ title }}</h1>
</v-subheader>

</template>

<script>
export default {
  name: 'Header',
  props: {
    title: String
  }
  
}
</script>
