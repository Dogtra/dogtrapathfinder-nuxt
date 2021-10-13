<template>
  <nav class='bg-black text-white w-full flex justify-between items-center'>
    <div id='header_logo' class='bg-gray-800'>
      <a href='https://www.dogtra-europe.com/' title='Dogtra Europe'>
        <img class='logo img-responsive'
             src='https://dogtrapathfinder.com/wp-content/uploads/2018/07/pathfinder-01.png' alt='Dogtra Europe'
             width='228' height='52'>
      </a>
    </div>
    <div>
      <i class='yi-menu text-white block md:hidden'></i>
      <div class='hidden md:block'>
        <a class='border-transparent rounded-sm hover:border-yellow-300 border-2'>
          Get Help ?
        </a>
        <a class='border-transparent rounded-sm  hover:border-yellow-300 border-2'>
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