<template>
  <footer class="bg-black text-white text-16 h-[40rem] md:h-80 absolute bottom-0 flex items-center px-10 w-full">
    <div class='footer'>
      <div>
        <span class="footer-title">Contact us</span>
        <div>
          <a href="https://www.dogtra.com/careers" class='underline'>Careers</a> | <a href="mailto:info@dogtra.com" class='underline'>Email</a>
        </div>
        <span>
      12322 Monarch Street
      </span>
        <span>
      Garden Grove, CA 92841
      </span>
        <span>
      TF) 1.888.811.9111
      </span>
        <span>
      P) 310.534.0101
      </span>
        <span>
      F) 310.534.9111
      </span>
      </div>
      <div>
        <span class="footer-title">Company</span>
        <a href='https://www.dogtra.com/the-dogtra-difference' class="link link-hover">About us</a>
        <a href='https://www.dogtra.com/warranty' class="link link-hover">Warranty</a>
        <a href='https://www.dogtra.com/product-registration' class="link link-hover">Product Registration</a>
        <NuxtLink :to='localePath("/faq")'>FAQ</NuxtLink>
      </div>
      <div>
        <div class='inline-block text-32'>
          <a href='https://www.facebook.com/DogtraHuntingOps'>
            <i class='bg-black text-white text-lg mdi mdi-facebook' />
          </a>
          <a href='https://www.instagram.com/dogtrahuntingops/'>
            <i class='bg-black text-white p-1 text-lg mdi mdi-instagram' />
          </a>
          <a href='https://www.youtube.com/channel/UCrGGvbXnB8vSQTID3cSSsUg'>
            <i class='bg-black text-white text-lg mdi mdi-youtube' />
          </a>
        </div>
      </div>
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
