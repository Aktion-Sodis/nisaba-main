<template>
  <div class="images" @click="getImageList(images)">
    <ImageCard
      v-for="(image, index) in images"
      :key="image.id"
      :image="image"
      :index="index"
      :preview="getImageList(images)"
    />
  </div>
</template>

<script>
import axios from "axios";

import ImageCard from "../image/ImageCard.vue";

const backendURL = import.meta.env.VITE_APP_BACKEND_URL;

export default {
  components: { ImageCard },
  created() {
    this.getImages();
  },
  methods: {
    getImageList(images) {
      var imageArray = [];
      for (var i = 0, l = images.length; i < l; i++) {
        var src = images[i].img_src;
        imageArray.push(src);
      }
      return imageArray;
    },
    getImages() {
      // const path = "http://127.0.0.1:5000/images";
      const path = this.backendURL + "/images";
      axios
        .get(path)
        .then((res) => {
          this.images = res.data.data;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
  },
  data() {
    return {
      backendUrl,
      images: [],
    };
  },
};
</script>

<style scoped>
.images {
  display: flex;
  flex-wrap: wrap;
  width: calc(100vw - var(--sidebar-width) - 60px - 50px);
  height: calc(
    100vh - var(--navbar-height) - var(--container-margin) - 60px - 50px
  );
}
</style>
