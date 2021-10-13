<template>
  <div class='footer-menu w-48'>
    <div class='footer-menu-title'>
      <slot name="title"></slot>
    </div>
    <div class='footer-menu-body'>
      <slot name="body"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FooterMenu'
}
</script>
