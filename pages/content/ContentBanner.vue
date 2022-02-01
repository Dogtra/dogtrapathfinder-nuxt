<template>
  <div class='text-white' :style='{backgroundColor: backgroundColor}'>
    <div class='mx-auto px-12 py-16 w-fit'>
      <h1 class='text-30 md:text-35 font-bold text-white'>{{ title }}</h1>
      <div class='flex gap-[2.7rem] flex-col md:flex-row pt-12 overflow-x-auto'>
        <template v-for='index in 3'>
          <div :key='index' class='w-full md:max-w-[34rem]'>
            <div class='w-full h-[22rem] bg-white rounded-btn'>

            </div>
            <p class='font-bold text-20'>
              Introducing the DOGTRA PATHFINDER
            </p>
            <p class='font-medium text-14 text-[#808080] line-clamp-3'>
              The dogtra PATHFINDER The first GPS e-collar
              system that works on yout smartphon without using data. Now you have a more intelligent
              The dogtra PATHFINDER The first GPS e-collar
              system that works on yout smartphon without using data. Now you have a more intelligent
            </p>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ContentBanner',
  props: {
    title: {
      type: String,
      required: true
    },
    backgroundColor: {
      type: String,
      required: false,
      default: '#000000'
    }
  },
}
</script>
