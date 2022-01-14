<template>
  <ais-instant-search-ssr>
  <div class='text-black flex'>
    <div class="w-[35rem] mt-24 ml-16">
      <div>
        <ais-search-box />
        <SearchBar></SearchBar>
      </div>
      <div class="mt-12 leading-[3.5rem]">
        <div>
          <p class="h-18 flex items-center text-center font-bold text-18 border-b-1 border-[#E6E6E6] pl-8">Filter Search by Product</p>
          <ul>
            <li v-for="index in 4" :key="index">
              <input type="checkbox" :id="index" :value="index" v-model="checkedProductsFilter">
              <label>Pathfinder</label>
            </li>
          </ul>
        </div>
        <div class="pt-12">
          <p class="h-18 flex items-center text-center font-bold text-18 border-b-1 border-[#E6E6E6] pl-8">Filter Search by Format</p>
          <ul>
            <li v-for="index in 4" :key="index">
              <input type="checkbox" :id="index" :value="index" v-model="checkedProductsFilter">
              <label>Format</label>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class='p-12'>
      <p>Search result for "{{ searchText }}" - {{ nbResults }} results</p>
      <div>
        <p>Filter search by Product</p>
        <div class='flex justify-around flex-wrap mt-4'>
          <div class="bg-yellow rounded-full p-1 px-4">Pathfinder</div>
          <div class="bg-yellow rounded-full p-1 px-4">Pathfinder mini</div>
        </div>
      </div>
      <div>
        <p>Filter search by Format</p>
        <div class='flex justify-around flex-wrap mt-4'>
          <div class="bg-yellow rounded-full p-1 px-4">Pathfinder</div>
          <div class="bg-yellow rounded-full p-1 px-4">Pathfinder mini</div>
        </div>

        <div>
        <template v-for="item in hits">
          <div :key="item.id">
            <p>{{ item.chapter.manual}}</p>
            <p>{{ item.title }}</p>
          </div>
        </template>
        </div>
      <ais-hits>
          <div slot="item" slot-scope="{ item }">
            <h2>{{ item.title }}</h2>
          </div>
      </ais-hits>
    </div>
  </div>
  </ais-instant-search-ssr>
</template>

<script>
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';

import {
  AisInstantSearchSsr,
  AisHits,
  AisSearchBox,
  createServerRootMixin
} from 'vue-instantsearch';

import mainBannerQuery from '~/apollo/queries/main-banner/main-banner'
import SearchBar from "~/components/SearchBar/SearchBar";

const searchClient = instantMeiliSearch(
  process.env.meiliUrl,
  process.env.meiliMasterKey
);

export default {
  components: {
    SearchBar,
    AisInstantSearchSsr,
    AisSearchBox,
    AisHits
  },
  mixins: [
    createServerRootMixin({
      searchClient,
      indexName: 'article',
    }),
  ],
  async asyncData({ app, route }) {
    const { data } = await app.apolloProvider.defaultClient.query({
      query: mainBannerQuery,
    })

    return {
      mainBanner: data.mainBanner
    }
  },
  data () {
    return {
      error: null,
      checkedProductsFilter: [],
      searchText: '',
      nbResults: 0,
      hits: [
      {
        "id": 1,
        "chapter": {
          "id": 1,
          "manual": 1,
          "title": "Getting Started",
          "published_at": "2022-01-11T09:13:18.404Z",
          "created_by": 1,
          "updated_by": 1,
          "created_at": "2021-11-23T00:15:21.965Z",
          "updated_at": "2022-01-11T10:47:48.271Z",
          "slug": "getting-started"
        },
        "title": " Important Safety and Product Information",
        "content": "### WARNING\nPlease read all safety and product information below before using your Dogtra product. Failure to follow these safety instructions could result in injury to you, your dog and others, or it could result in damage to your Dogtra product or other property.\n\n### DOG SAFETY\n\n### Proper Use\nDogtra products should be used to train, educate, monitor, or track dogs. Each dog may have a different tolerance for and reaction to Dogtra products. Closely observe your dog when determining the right level of stimulation, collar fit, and other settings of your Dogtra product.\n\n\n### Training Methods\nDogtra products may be used with a variety of training methods that provide clear and consistent messages to your dog.\n\n### Fit and Wear\nProper fit and wear of your Dogtra product is important for the comfort of your dog as well as the functioning of your product. Dogtra collars should fit comfortably and not too tightly, so that the collar stays in place and does not move around your dog’s neck. Do not leave a collar on your dog for an extended time. Although each dog is different, Dogtra recommends that its collars be used a maximum of 4 to 6 hours at any one time on your dog. A collar that is used for overly long periods or that fits improperly may cause skin irritation or sores on your dog’s neck. Regularly check the collar’s contact area on your dog’s skin. If your dog exhibits skin irritation or sores, stop using the Dogtra product and consult with a veterinarian.\n\n### UNAUTHORIZED USE\n\nDogtra products should be used only in a safe and responsible manner to train, educate, monitor, or track dogs. Dogtra products are not intended for use in any other manner; they are not intended for use with other animals or with humans; and they are not intended for use in unsafe situations or environments that could lead to death, injury, loss or damage.\n\n### BATTERY\nYour Dogtra product contains batteries. Do not attempt to replace the battery yourself. Contact Dogtra or your Dogtra retailer to replace your battery. Dispose of batteries as provided by your local regulations. Do not disassemble, crush, heat, or otherwise alter the battery as it may cause fire, explosion, injury and/or property damage.\n\n### OWNER SAFETY\n\n### Handling and Repair\nDogtra products can be damaged or malfunction if dropped, especially on hard surfaces, or otherwise improperly handled. Do not use a damaged or malfunctioning product as it may cause injury or property damage. If your product is damaged or malfunctions, contact Dogtra to obtain service before using the product.\n\n### Electrical Product\nYour Dogtra product contains electrical components and batteries. Do not use or keep your product near heat or flammable sources. Such use or storage may damage your product and/or cause fire, explosion, injury, or property damage.\n\n### Charging\nOnly charge your Dogtra product with its accompanying Dogtra charger. Do not attempt to charge your product in any other manner or in temperatures less than 32°F (0°C) or over 113°F (45°C) as it may cause fire, explosion, injury, and/or property damage. If you notice damage to your product, its charger, or battery, obtain service from Dogtra before charging the product. Do not use more than one splitter cable with a single battery charger.\n\n### Medical Device Interference\nDogtra products contain electrical and magnetic components that emit low level electromagnetic waves and radio frequencies. These electromagnetic waves or radio frequencies may interfere with pacemakers, defibrillators, or other medical devices. Consult your physician or medical device maker before using your medical device with a Dogtra product. If you think that your Dogtra product is interfering with your pacemaker, defibrillator, or other medical device, stop using the Dogtra product.\n\n### Aggressive Dogs\nDo not use Dogtra products with aggressive dogs as such dogs may react adversely and cause injury to people or other dogs. Seek the assistance of a dog-training specialist or veterinarian when dealing with aggressive dogs.\n\n### Children\nDogtra products are not toys. Adult supervision and close attention are necessary when Dogtra products are used by or near children.\n\n",
        "slug": "important-safety-and-product-information",
        "related_articles": [],
        "uuid": "e3cf2fa6-fb5c-4fa3-8801-b1080a8bb500",
        "_formatted": {
          "id": 1,
          "chapter": {
            "id": 1,
            "manual": 1,
            "title": "Getting Started",
            "published_at": "2022-01-11T09:13:18.404Z",
            "created_by": 1,
            "updated_by": 1,
            "created_at": "2021-11-23T00:15:21.965Z",
            "updated_at": "2022-01-11T10:47:48.271Z",
            "slug": "getting-started"
          },
          "title": " Important Safety <em>a</em>nd Product Information",
          "content": "### WARNING\nPlease read <em>a</em>ll safety <em>a</em>nd product information below before using your Dogtra product. Failure to follow these safety instructions could result in injury to you, your dog <em>a</em>nd others, or it could result in damage to your Dogtra product or other property.\n\n### DOG SAFETY\n\n### Proper Use\nDogtra products should be used to train, educate, monitor, or track dogs. Each dog may have <em>a</em> different tolerance for <em>a</em>nd reaction to Dogtra products. Closely observe your dog when determining the right level of stimulation, collar fit, <em>a</em>nd other settings of your Dogtra product.\n\n\n### Training Methods\nDogtra products may be used with <em>a</em> variety of training methods that provide clear <em>a</em>nd consistent messages to your dog.\n\n### Fit <em>a</em>nd Wear\nProper fit <em>a</em>nd wear of your Dogtra product is important for the comfort of your dog <em>a</em>s well <em>a</em>s the functioning of your product. Dogtra collars should fit comfortably <em>a</em>nd not too tightly, so that the collar stays in place <em>a</em>nd does not move <em>a</em>round your dog’s neck. Do not leave <em>a</em> collar on your dog for <em>a</em>n extended time. <em>A</em>lthough each dog is different, Dogtra recommends that its collars be used <em>a</em> maximum of 4 to 6 hours <em>a</em>t <em>a</em>ny one time on your dog. <em>A</em> collar that is used for overly long periods or that fits improperly may cause skin irritation or sores on your dog’s neck. Regularly check the collar’s contact <em>a</em>rea on your dog’s skin. If your dog exhibits skin irritation or sores, stop using the Dogtra product <em>a</em>nd consult with <em>a</em> veterinarian.\n\n### UNAUTHORIZED USE\n\nDogtra products should be used only in <em>a</em> safe <em>a</em>nd responsible manner to train, educate, monitor, or track dogs. Dogtra products <em>a</em>re not intended for use in <em>a</em>ny other manner; they <em>a</em>re not intended for use with other <em>a</em>nimals or with humans; <em>a</em>nd they <em>a</em>re not intended for use in unsafe situations or environments that could lead to death, injury, loss or damage.\n\n### BATTERY\nYour Dogtra product contains batteries. Do not <em>a</em>ttempt to replace the battery yourself. Contact Dogtra or your Dogtra retailer to replace your battery. Dispose of batteries <em>a</em>s provided by your local regulations. Do not disassemble, crush, heat, or otherwise <em>a</em>lter the battery <em>a</em>s it may cause fire, explosion, injury <em>a</em>nd/or property damage.\n\n### OWNER SAFETY\n\n### Handling <em>a</em>nd Repair\nDogtra products can be damaged or malfunction if dropped, especially on hard surfaces, or otherwise improperly handled. Do not use <em>a</em> damaged or malfunctioning product <em>a</em>s it may cause injury or property damage. If your product is damaged or malfunctions, contact Dogtra to obtain service before using the product.\n\n### Electrical Product\nYour Dogtra product contains electrical components <em>a</em>nd batteries. Do not use or keep your product near heat or flammable sources. Such use or storage may damage your product <em>a</em>nd/or cause fire, explosion, injury, or property damage.\n\n### Charging\nOnly charge your Dogtra product with its <em>a</em>ccompanying Dogtra charger. Do not <em>a</em>ttempt to charge your product in <em>a</em>ny other manner or in temperatures less than 32°F (0°C) or over 113°F (45°C) <em>a</em>s it may cause fire, explosion, injury, <em>a</em>nd/or property damage. If you notice damage to your product, its charger, or battery, obtain service from Dogtra before charging the product. Do not use more than one splitter cable with <em>a</em> single battery charger.\n\n### Medical Device Interference\nDogtra products contain electrical <em>a</em>nd magnetic components that emit low level electromagnetic waves <em>a</em>nd radio frequencies. These electromagnetic waves or radio frequencies may interfere with pacemakers, defibrillators, or other medical devices. Consult your physician or medical device maker before using your medical device with <em>a</em> Dogtra product. If you think that your Dogtra product is interfering with your pacemaker, defibrillator, or other medical device, stop using the Dogtra product.\n\n### <em>A</em>ggressive Dogs\nDo not use Dogtra products with <em>a</em>ggressive dogs <em>a</em>s such dogs may react <em>a</em>dversely <em>a</em>nd cause injury to people or other dogs. Seek the <em>a</em>ssistance of <em>a</em> dog-training specialist or veterinarian when dealing with <em>a</em>ggressive dogs.\n\n### Children\nDogtra products <em>a</em>re not toys. <em>A</em>dult supervision <em>a</em>nd close <em>a</em>ttention <em>a</em>re necessary when Dogtra products <em>a</em>re used by or near children.\n\n",
          "slug": "important-safety-<em>a</em>nd-product-information",
          "related_articles": [],
          "uuid": "e3cf2fa6-fb5c-4fa3-8801-b1080a8bb500"
        }
      },
      {
        "id": 3,
        "chapter": {
          "id": 1,
          "manual": 1,
          "title": "Getting Started",
          "published_at": "2022-01-11T09:13:18.404Z",
          "created_by": 1,
          "updated_by": 1,
          "created_at": "2021-11-23T00:15:21.965Z",
          "updated_at": "2022-01-11T09:16:46.262Z",
          "slug": "getting-started"
        },
        "title": "Main Features of the PATHFINDER",
        "content": "\n![7p_main-features-pictogram.jpg](https://dogtrapathfinder-uploads.s3.us-west-1.amazonaws.com/7p_main_features_pictogram_bc4d46285a.jpg)\n",
        "slug": "main-features-of-the-pathfinder",
        "related_articles": [],
        "uuid": "5532a9e4-c33d-4a63-8cd5-000491f6db3a",
        "_formatted": {
          "id": 3,
          "chapter": {
            "id": 1,
            "manual": 1,
            "title": "Getting Started",
            "published_at": "2022-01-11T09:13:18.404Z",
            "created_by": 1,
            "updated_by": 1,
            "created_at": "2021-11-23T00:15:21.965Z",
            "updated_at": "2022-01-11T09:16:46.262Z",
            "slug": "getting-started"
          },
          "title": "Main Features of the PATHFINDER",
          "content": "\n![7p_main-features-pictogram.jpg](https://dogtrapathfinder-uploads.s3.us-west-1.<em>a</em>mazonaws.com/7p_main_features_pictogram_bc4d46285a.jpg)\n",
          "slug": "main-features-of-the-pathfinder",
          "related_articles": [],
          "uuid": "5532a9e4-c33d-4a63-8cd5-000491f6db3a"
        }
      },
      {
        "id": 4,
        "chapter": {
          "id": 1,
          "manual": 1,
          "title": "Getting Started",
          "published_at": "2022-01-11T09:13:18.404Z",
          "created_by": 1,
          "updated_by": 1,
          "created_at": "2021-11-23T00:15:21.965Z",
          "updated_at": "2022-01-11T09:16:46.262Z",
          "slug": "getting-started"
        },
        "title": "Overview",
        "content": "![index.jpg](https://dogtrapathfinder-uploads.s3.us-west-1.amazonaws.com/index_af6f795e4f.jpg)\n",
        "slug": "overview",
        "related_articles": [],
        "uuid": "5f69f415-0739-4c9a-803d-3daacd7b6159",
        "_formatted": {
          "id": 4,
          "chapter": {
            "id": 1,
            "manual": 1,
            "title": "Getting Started",
            "published_at": "2022-01-11T09:13:18.404Z",
            "created_by": 1,
            "updated_by": 1,
            "created_at": "2021-11-23T00:15:21.965Z",
            "updated_at": "2022-01-11T09:16:46.262Z",
            "slug": "getting-started"
          },
          "title": "Overview",
          "content": "![index.jpg](https://dogtrapathfinder-uploads.s3.us-west-1.<em>a</em>mazonaws.com/index_<em>a</em>f6f795e4f.jpg)\n",
          "slug": "overview",
          "related_articles": [],
          "uuid": "5f69f415-0739-4c9a-803d-3daacd7b6159"
        }
      },
      {
        "id": 2,
        "chapter": {
          "id": 1,
          "manual": 1,
          "title": "Getting Started",
          "published_at": "2022-01-11T09:13:18.404Z",
          "created_by": 1,
          "updated_by": 1,
          "created_at": "2021-11-23T00:15:21.965Z",
          "updated_at": "2022-01-11T09:16:46.262Z",
          "slug": "getting-started"
        },
        "title": "Package Contents",
        "content": "![6_package-contents.jpg](https://dogtrapathfinder-uploads.s3.us-west-1.amazonaws.com/6_package_contents_9ddba95e96.jpg)\n",
        "slug": "package-contents",
        "related_articles": [],
        "uuid": "423df4ea-dc79-4df5-9d49-8c43de6bd51a",
        "_formatted": {
          "id": 2,
          "chapter": {
            "id": 1,
            "manual": 1,
            "title": "Getting Started",
            "published_at": "2022-01-11T09:13:18.404Z",
            "created_by": 1,
            "updated_by": 1,
            "created_at": "2021-11-23T00:15:21.965Z",
            "updated_at": "2022-01-11T09:16:46.262Z",
            "slug": "getting-started"
          },
          "title": "Package Contents",
          "content": "![6_package-contents.jpg](https://dogtrapathfinder-uploads.s3.us-west-1.<em>a</em>mazonaws.com/6_package_contents_9ddba95e96.jpg)\n",
          "slug": "package-contents",
          "related_articles": [],
          "uuid": "423df4ea-dc79-4df5-9d49-8c43de6bd51a"
        }
      },
      {
        "id": 5,
        "chapter": {
          "id": 3,
          "manual": 1,
          "title": "Understand training system",
          "published_at": "2022-01-11T17:15:07.819Z",
          "created_by": 1,
          "updated_by": 1,
          "created_at": "2022-01-11T17:15:00.810Z",
          "updated_at": "2022-01-11T17:15:07.851Z",
          "slug": "understand-training-system"
        },
        "title": "Turning the PATHFINDER ON/OFF",
        "content": "![11_turning-the-pathfinder-on-off.jpg](https://dogtrapathfinder-uploads.s3.us-west-1.amazonaws.com/11_turning_the_pathfinder_on_off_cba34ee157.jpg)\n\n\n1. Turning the PATHFINDER ON/OFF\n\nGPS Connector\n• To turn on the GPS Connector, press the blue Select button until the LED turns on.\n• To turn off the GPS Connector, press the blue Select button until the red LED shows.\nGPS Collar\n• To turn on the GPS Collar, press the Power button until the LED turns on.\n• To turn off the GPS Collar, press the Power button until the LED turns red.\n• A tone will be played to indicate that the GPS Collar is turning on or shutting down.",
        "slug": "turning-the-pathfinder-onoff",
        "related_articles": [],
        "uuid": "760ee45e-3b55-4ce1-bfd0-216278355d75",
        "_formatted": {
          "id": 5,
          "chapter": {
            "id": 3,
            "manual": 1,
            "title": "Understand training system",
            "published_at": "2022-01-11T17:15:07.819Z",
            "created_by": 1,
            "updated_by": 1,
            "created_at": "2022-01-11T17:15:00.810Z",
            "updated_at": "2022-01-11T17:15:07.851Z",
            "slug": "understand-training-system"
          },
          "title": "Turning the PATHFINDER ON/OFF",
          "content": "![11_turning-the-pathfinder-on-off.jpg](https://dogtrapathfinder-uploads.s3.us-west-1.<em>a</em>mazonaws.com/11_turning_the_pathfinder_on_off_cba34ee157.jpg)\n\n\n1. Turning the PATHFINDER ON/OFF\n\nGPS Connector\n• To turn on the GPS Connector, press the blue Select button until the LED turns on.\n• To turn off the GPS Connector, press the blue Select button until the red LED shows.\nGPS Collar\n• To turn on the GPS Collar, press the Power button until the LED turns on.\n• To turn off the GPS Collar, press the Power button until the LED turns red.\n• <em>A</em> tone will be played to indicate that the GPS Collar is turning on or shutting down.",
          "slug": "turning-the-pathfinder-onoff",
          "related_articles": [],
          "uuid": "760ee45e-3b55-4ce1-bfd0-216278355d75"
        }
      },
      {
        "id": 6,
        "chapter": {
          "id": 3,
          "manual": 1,
          "title": "Understand training system",
          "published_at": "2022-01-11T17:15:07.819Z",
          "created_by": 1,
          "updated_by": 1,
          "created_at": "2022-01-11T17:15:00.810Z",
          "updated_at": "2022-01-11T17:15:07.851Z",
          "slug": "understand-training-system"
        },
        "title": "Button Function",
        "content": "![12_button-function1.jpg](https://dogtrapathfinder-uploads.s3.us-west-1.amazonaws.com/12_button_function1_0d3f7af4bb.jpg)\n**GPS Connector**\n\nThe SELECT button is used to turn the Connector on/off and select a device to pair. While turned on, press the Select button once to set pairing to the GPS Collar, press the Select button a second time to set pairing to the smartphone app.\n\nThe CONNECT button is used to connect the GPS Connector to a smartphone and GPS Collar.\nPairing: Use the Select button to set the GPS Connector to Collar to pair the Connector with the Collar. Set the GPS Connector to Phone to pair the Connector to a smartphone.\nPress and hold down the Connect button until the LED blinks rapidly. The GPS Connector will now be ready for pairing.\n\n**GPS Collar**\n\nPower On: To turn the GPS Collar on, press the Power button until the green LED turns on.\nPower Off: To turn the GPS Collar off, press the Power button until the LED turns off.\nPairing: To place the GPS Collar into pairing mode, begin with the device turned off and hold down the Power button until the LED blinks rapidly.\nA melody will be played when the GPS Collar is in pairing mode.\n\n**The GPS Collar pairing mode is used to pair the GPS Collar and the GPS Connector. The PATHFINDER set comes with both parts paired to each other.**",
        "slug": "button-function",
        "related_articles": [],
        "uuid": "a242cdf4-0b69-46fe-be14-abda6a22bcb4",
        "_formatted": {
          "id": 6,
          "chapter": {
            "id": 3,
            "manual": 1,
            "title": "Understand training system",
            "published_at": "2022-01-11T17:15:07.819Z",
            "created_by": 1,
            "updated_by": 1,
            "created_at": "2022-01-11T17:15:00.810Z",
            "updated_at": "2022-01-11T17:15:07.851Z",
            "slug": "understand-training-system"
          },
          "title": "Button Function",
          "content": "![12_button-function1.jpg](https://dogtrapathfinder-uploads.s3.us-west-1.<em>a</em>mazonaws.com/12_button_function1_0d3f7af4bb.jpg)\n**GPS Connector**\n\nThe SELECT button is used to turn the Connector on/off <em>a</em>nd select <em>a</em> device to pair. While turned on, press the Select button once to set pairing to the GPS Collar, press the Select button <em>a</em> second time to set pairing to the smartphone <em>a</em>pp.\n\nThe CONNECT button is used to connect the GPS Connector to <em>a</em> smartphone <em>a</em>nd GPS Collar.\nPairing: Use the Select button to set the GPS Connector to Collar to pair the Connector with the Collar. Set the GPS Connector to Phone to pair the Connector to <em>a</em> smartphone.\nPress <em>a</em>nd hold down the Connect button until the LED blinks rapidly. The GPS Connector will now be ready for pairing.\n\n**GPS Collar**\n\nPower On: To turn the GPS Collar on, press the Power button until the green LED turns on.\nPower Off: To turn the GPS Collar off, press the Power button until the LED turns off.\nPairing: To place the GPS Collar into pairing mode, begin with the device turned off <em>a</em>nd hold down the Power button until the LED blinks rapidly.\n<em>A</em> melody will be played when the GPS Collar is in pairing mode.\n\n**The GPS Collar pairing mode is used to pair the GPS Collar <em>a</em>nd the GPS Connector. The PATHFINDER set comes with both parts paired to each other.**",
          "slug": "button-function",
          "related_articles": [],
          "uuid": "<em>a</em>242cdf4-0b69-46fe-be14-<em>a</em>bda6a22bcb4"
        }
      },
      {
        "id": 7,
        "chapter": {
          "id": 3,
          "manual": 1,
          "title": "Understand training system",
          "published_at": "2022-01-11T17:15:07.819Z",
          "created_by": 1,
          "updated_by": 1,
          "created_at": "2022-01-11T17:15:00.810Z",
          "updated_at": "2022-01-11T17:15:07.851Z",
          "slug": "understand-training-system"
        },
        "title": "Charging the Pathfinder",
        "content": "![Capture.PNG](https://dogtrapathfinder-uploads.s3.us-west-1.amazonaws.com/Capture_bcf172ffb7.PNG)\n\nFully charge the PATHFINDER GPS Connector and GPS Collar before the first use. The PATHFINDER uses lithium polymer batteries.\n• Only use official Dogtra chargers with the PATHFINDER.\n• Do not charge the PATHFINDER near flammable substances.\n• Fully charge the PATHFINDER if storing for 1 month or longer.\n\n**When to Charge**\n• When the LED is red on the GPS Connector or GPS Collar.\n• When the PATHFINDER app displays a low battery percentage for the GPS Connector or GPS Collar.\n• When the LED on the transmitter or receiver will not come on.\n• When the indicator light turns on momentarily, but will not stay on when the Constant button is pushed.\n\n**How to Charge**\n1. Connect the charger to the GPS Connector and GPS Collar using the splitter cable.\n2. Plug the charger into a 120-volt outlet.\n3. When fully charged, detach the cables and plug the rubber caps over the charging ports on the GPS Connector and GPS Collar.\n4. The GPS Collar turns off and cannot be used while charging. The GPS Connector functions while being charged. The LED will display red while charging and green when the unit is fully charged. The GPS Connector LED will be green when turned on while charging. A depleted battery requires 3.5 hours to fully charge.",
        "slug": "charging-the-pathfinder",
        "related_articles": [],
        "uuid": "9679b278-9fa7-438d-9bea-caa02dd9b055",
        "_formatted": {
          "id": 7,
          "chapter": {
            "id": 3,
            "manual": 1,
            "title": "Understand training system",
            "published_at": "2022-01-11T17:15:07.819Z",
            "created_by": 1,
            "updated_by": 1,
            "created_at": "2022-01-11T17:15:00.810Z",
            "updated_at": "2022-01-11T17:15:07.851Z",
            "slug": "understand-training-system"
          },
          "title": "Charging the Pathfinder",
          "content": "![Capture.PNG](https://dogtrapathfinder-uploads.s3.us-west-1.<em>a</em>mazonaws.com/Capture_bcf172ffb7.PNG)\n\nFully charge the PATHFINDER GPS Connector <em>a</em>nd GPS Collar before the first use. The PATHFINDER uses lithium polymer batteries.\n• Only use official Dogtra chargers with the PATHFINDER.\n• Do not charge the PATHFINDER near flammable substances.\n• Fully charge the PATHFINDER if storing for 1 month or longer.\n\n**When to Charge**\n• When the LED is red on the GPS Connector or GPS Collar.\n• When the PATHFINDER <em>a</em>pp displays <em>a</em> low battery percentage for the GPS Connector or GPS Collar.\n• When the LED on the transmitter or receiver will not come on.\n• When the indicator light turns on momentarily, but will not stay on when the Constant button is pushed.\n\n**How to Charge**\n1. Connect the charger to the GPS Connector <em>a</em>nd GPS Collar using the splitter cable.\n2. Plug the charger into <em>a</em> 120-volt outlet.\n3. When fully charged, detach the cables <em>a</em>nd plug the rubber caps over the charging ports on the GPS Connector <em>a</em>nd GPS Collar.\n4. The GPS Collar turns off <em>a</em>nd cannot be used while charging. The GPS Connector functions while being charged. The LED will display red while charging <em>a</em>nd green when the unit is fully charged. The GPS Connector LED will be green when turned on while charging. <em>A</em> depleted battery requires 3.5 hours to fully charge.",
          "slug": "charging-the-pathfinder",
          "related_articles": [],
          "uuid": "9679b278-9fa7-438d-9bea-caa02dd9b055"
        }
      }
    ]
    }
  },
  computed: {
    mainBannerStyle() {
      if (this.mainBanner) {
        return {
          backgroundImage: 'url("' + this.mainBanner.image.url + '")'
        }
      }
      return {}
    }
  },
}
</script>

<style>
.product-badge {
  background-color: #C4C4C4;
}
</style>
