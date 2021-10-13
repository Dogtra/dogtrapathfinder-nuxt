<template>
  <nav class="navbar shadow-lg bg-black text-white">
    <div class='navbar-start'>
      <NuxtLink to='/' title='Dogtra Europe'>
        <img class='logo img-responsive'
             :src='require("~/static/images/pathfinder-logo.png")' alt='Dogtra Europe'
             width='228' height='52'>
      </NuxtLink>
    </div>
    <div class='navbar-end relative'>
      <i class='yi-menu text-white block md:hidden' @click='showMenu = !showMenu'></i>
      <div class='hidden md:block'>
          <NuxtLink to="/support" class="btn btn-ghost">
            {{ $t('main.get-help') }}
          </NuxtLink>
          <a href='https://dogtra.com' class="btn btn-ghost">
            {{ $t('main.shop-dogtra-com') }}
          </a>
      </div>
    </div>
    <transition name='slide-fade'>
      <div v-show='showMenu' class="absolute top-0 left-0 right-0 mt-16 bg-black w-full md:hidden">
        <ul class="menu py-3 shadow-lg bg-black rounded-box">
          <li>

            <NuxtLink to="/support" @click.native='showMenu = false'>
              {{ $t('main.get-help') }}
            </NuxtLink>
          </li>
          <li>
            <a href='https://dogtra.com'>
              {{ $t('main.shop-dogtra-com') }}
            </a>
          </li>
        </ul>
      </div>
    </transition>
  </nav>
</template>
<script>
export default {
  name: 'Navbar',
  data() {
    return {
      showMenu: false
    }
  }
}
</script>
