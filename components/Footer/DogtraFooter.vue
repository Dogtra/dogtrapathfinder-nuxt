<template>
  <footer class='bg-black text-white fixed bottom-0 right-0 left-0 w-full p-4 flex space-x-4 justify-center'>
    <FooterMenu>
      <template #title>
        Menu
      </template>
      <template #body>
        <div class='footer-menu-item'>Manual</div>
        <div class='footer-menu-item'>Updates</div>
        <div class='footer-menu-item'>FAQ</div>
        <div class='footer-menu-item'>Videos</div>
        <div class='footer-menu-item'>Dogtra.com</div>
      </template>
    </FooterMenu>
    <FooterMenu>
      <template #title>
        Footer 2
      </template>
    </FooterMenu>
    <FooterMenu>
      <template #title>
        Footer 2
      </template>
    </FooterMenu>
    <FooterMenu>
      <template #body>
        <i class='bg-white text-black rounded-full p-1 text-lg yi-facebook' />
        <i class='bg-white text-black rounded-full p-1 text-lg yi-instagram' />
        <i class='bg-white text-black rounded-full p-1 text-lg yi-youtube' />
      </template>
    </FooterMenu>
  </footer>
</template>
<script>
import FooterMenu from '~/components/Footer/FooterMenu'

export default {
  name: 'DogtraFooter',
  components: { FooterMenu }
}
</script>
