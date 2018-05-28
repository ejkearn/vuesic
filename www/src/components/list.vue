<template>
  <div class="row">
    <div v-for="result in list">
      <div class="col-2">
        <div class="card" style="width: 10rem;">
          <img class="card-img-top" :src="result.artworkUrl100" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">{{result.trackName}}</h5>
            <p class="card-text">{{result.artistName}}</p>
            <p class="card-text">{{result.collectionName}}</p>
            <audio controls>
              <source :src="result.previewUrl">
            </audio>
            <a @click="handleButtonClick(result)" class="btn btn-primary">{{buttonText}}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


  export default {
    name: 'songs',
    props: {
      list: {
        type: Array,
        required: true
      },
      buttonText: {
        type: String,
        required: true
      },
      handleButtonClick: {
        type: Function,
        required: true
      }
    }
  }

</script>