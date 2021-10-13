<template>
  <nav class="navbar shadow-lg bg-black text-white justify-between">
    <div>
      <NuxtLink to='/' title='Dogtra Europe'>
        <img class='logo img-responsive'
             src='https://dogtrapathfinder.com/wp-content/uploads/2018/07/pathfinder-01.png' alt='Dogtra Europe'
             width='228' height='52'>
      </NuxtLink>
    </div>
    <div>
      <i class='yi-menu text-white block md:hidden'></i>
      <div class='hidden md:block'>
          <NuxtLink to="/support" class="btn btn-ghost">
            Get Help ?
          </NuxtLink>
          <a href='https://dogtra.com' class="btn btn-ghost">
            Shop at Dogtra.com
          </a>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'Navbar'
}
</script>
