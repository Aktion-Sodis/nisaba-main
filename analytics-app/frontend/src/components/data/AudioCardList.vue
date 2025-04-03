<template>
  <v-card class="component-wrapper">
    <div v-if="loading" class="loading-container">
      <v-progress-circular indeterminate color="primary" class="loading-spinner"></v-progress-circular>
    </div>
    <div v-else>
      <v-list-item v-for="(audioUrl, i) in audioUrls" :key="i" class="list-item mb-2 ml-2 mr-2">
        <!-- Insert a message to see whether item is built at all -->

        <v-list-item-subtitle class="list-item-subtitle">
          <!-- Row Layout: Audio Player and Download Button -->
          <div class="audio-row">
            <!-- HTML5 Audio Player -->
            <audio :src="audioUrl" controls class="audio-player"></audio>
            <!-- Download Button -->
            <a :href="audioUrl" :download="'audio_' + i" target="_blank" class="download-button">
              <v-btn icon color="primary">
                <v-icon>mdi-download</v-icon>
              </v-btn>
            </a>
          </div>
        </v-list-item-subtitle>
      </v-list-item>
    </div>
  </v-card>
</template>

<script>
import { Storage } from 'aws-amplify';
import VueSound from 'vue-sound';

export default {
  name: "AudioCardList",

  components: {
    VueSound,
  },

  props: {
    questionProperties: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      audioUrls: [],
      loading: true, // Set initial loading state to true
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
            console.error("Error fetching audio URL:", error);
            return null;
          }
        })
      );
      this.audioUrls = urls.filter(url => url !== null); // Filter out nulls
    } catch (error) {
      console.error("Error during fetching:", error);
    } finally {
      this.loading = false; // Set loading state to false after fetching
      console.log('Audio URLs after filter (set):', this.audioUrls.length);
      //test whether data is correct now
      console.log('data: ', this.data)
    }
  },
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
  /* Adjust minimum height for audio cards */
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

.audio-row {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 100%;
}

.audio-player {
  flex-grow: 1;
  max-width: calc(100% - 50px);
  /* Ensure the player doesn't overlap the button */
}

.download-button {
  margin-left: 10px;
  flex-shrink: 0;
}
</style>
