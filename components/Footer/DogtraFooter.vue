<template>
  <footer class="p-10 footer bg-black text-white">
    <div>
      <span class="footer-title">Services</span>
      <a class="link link-hover">Branding</a>
      <a class="link link-hover">Design</a>
      <a class="link link-hover">Marketing</a>
      <a class="link link-hover">Advertisement</a>
    </div>
    <div>
      <span class="footer-title">Company</span>
      <a class="link link-hover">About us</a>
      <a class="link link-hover">Contact</a>
      <a class="link link-hover">Jobs</a>
      <a class="link link-hover">Press kit</a>
    </div>
    <div class='inline-block'>
      <i class='bg-white text-black rounded-full p-1 text-lg yi-facebook' />
      <i class='bg-white text-black rounded-full p-1 text-lg yi-instagram' />
      <i class='bg-white text-black rounded-full p-1 text-lg yi-youtube' />
    </div>
  </footer>
</template>
<script>

export default {
  name: 'DogtraFooter',
}
</script>

<style>
.footer {
  font-size: .875em;
  line-height: 1.25em;
}
</style>
