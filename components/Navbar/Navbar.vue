<template>
  <nav class="navbar shadow-lg bg-black text-white md:px-20 lg:px-24">
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
        <NuxtLink to="/products" class="btn btn-ghost">
          {{ $t('main.products') }}
        </NuxtLink>
        <NuxtLink to="/content" class="btn btn-ghost">
          {{ $t('main.content') }}
        </NuxtLink>
        <NuxtLink to="/manuals" class="btn btn-ghost">
          {{ $t('main.manuals') }}
        </NuxtLink>
      </div>
    </div>
    <transition name='slide-fade'>
      <div v-show='showMenu' class="absolute top-0 left-0 right-0 mt-16 bg-black w-full md:hidden">
        <ul class="menu py-3 shadow-lg bg-black rounded-box">
          <li>
          <NuxtLink to="/products" @click.native='showMenu = false'>
            {{ $t('main.products') }}
          </NuxtLink>
          </li>
          <li>
          <NuxtLink to="/content" @click.native='showMenu = false'>
            {{ $t('main.content') }}
          </NuxtLink>
          </li>
          <li>
          <NuxtLink to="/manuals" @click.native='showMenu = false'>
            {{ $t('main.manuals') }}
          </NuxtLink>
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

<style>
.btn {
  height: 3em;
  font-size: .875em;
  line-height: 1.25em;
  padding-left: 1em;
  padding-right: 1em;
  min-height: 3em;
}
</style>
