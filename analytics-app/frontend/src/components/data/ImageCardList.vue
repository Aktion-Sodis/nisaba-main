<template>
  <v-card class="component-wrapper">
    <div v-if="loading" class="loading-container">
      <v-progress-circular indeterminate color="primary" class="loading-spinner"></v-progress-circular>
    </div>
    <div v-else>
      <v-list-item v-for="(imageUrl, i) in imageUrls" :key="i" class="list-item mb-2 ml-2 mr-2">
        <v-list-item-subtitle class="list-item-subtitle">
          <!-- Row Layout: Image and Download Button -->
          <div class="image-row">
            <!-- Image Display with Click Event -->
            <img :src="imageUrl" :alt="'Image ' + i" class="image-display" @click="openImage(imageUrl)" />
            <!-- Download Button -->
            <a :href="imageUrl" :download="'image_' + i" target="_blank" class="download-button">
              <v-btn icon color="primary">
                <v-icon>mdi-download</v-icon>
              </v-btn>
            </a>
          </div>
        </v-list-item-subtitle>
      </v-list-item>
    </div>

    <!-- Full-Screen Image Modal -->
    <v-dialog v-model="dialog" max-width="90%">
      <v-card>
        <v-card-title>
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="d-flex justify-center">
          <img :src="selectedImage" alt="Expanded Image" class="full-screen-image" />
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { Storage } from 'aws-amplify';

export default {
  name: "ImageCardList",

  props: {
    questionProperties: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      imageUrls: [],
      loading: true, // Set initial loading state to true
      dialog: false, // Controls the visibility of the full-screen dialog
      selectedImage: null, // Stores the currently selected image for full-screen view
    };
  },

  async created() {
    try {
      const urls = await Promise.all(
        this.questionProperties.answers.map(async (answer) => {
          try {
            const path = answer.answer_value;
            var url = await Storage.get(path, { expires: 60 * 60 * 3 });
            return url ? url : null;
          } catch (error) {
            console.error("Error fetching image URL:", error);
            return null;
          }
        })
      );
      this.imageUrls = urls.filter(url => url !== null); // Filter out nulls
    } catch (error) {
      console.error("Error during fetching:", error);
    } finally {
      this.loading = false; // Set loading state to false after fetching
    }
  },

  methods: {
    openImage(imageUrl) {
      this.selectedImage = imageUrl;
      this.dialog = true;
    }
  }
};
</script>

<style scoped>
.component-wrapper {
  height: 100%;
  width: 100%;
  overflow: auto;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.list-item {
  padding-top: 10px;
  padding-bottom: 10px;
  min-height: 100px;
  /* Adjust minimum height for image cards */
  border-radius: 5px;
  border: black 1px solid;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.list-item-subtitle {
  color: black;
  text-align: left;
  width: 100%;
}

.image-row {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 100%;
}

.image-display {
  opacity: 1;
  z-index: 10000;
  flex-grow: 1;
  max-width: calc(100% - 50px);
  max-height: 300px;
  object-fit: contain;
  cursor: pointer;
  /* Indicates that the image is clickable */
}

.download-button {
  margin-left: 20px;
  flex-shrink: 0;
}

.full-screen-image {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
}
</style>
