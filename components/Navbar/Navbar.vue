<template>
  <nav class="navbar shadow-lg bg-black text-white justify-between">
    <div>
      <NuxtLink to='/' title='Dogtra Europe'>
        <img class='logo img-responsive'
             src='https://dogtrapathfinder.com/wp-content/uploads/2018/07/pathfinder-01.png' alt='Dogtra Europe'
             width='228' height='52'>
      </NuxtLink>
    </div>
    <div class="">
      <button class="btn btn-ghost">
        Get Help ?
      </button>
      <button class="btn btn-ghost">
        Shop at Dogtra.com
      </button>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'Navbar'
}
</script>
