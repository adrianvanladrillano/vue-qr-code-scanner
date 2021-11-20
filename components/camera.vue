<template>
  <div>


    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="text-h5"> Result </v-card-title>
        <v-card-text>Scanned item: {{ result }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="green darken-1" text @click="dialog = false">
            Send Log
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader'

export default {
  components: {
    QrcodeStream,
    QrcodeDropZone,
    QrcodeCapture
  },
  data() {
    return {
      result: null
    }
  },
  methods: {
    onDecode(decodedString) {
      alert(decodedString)
      if (decodedString == '4b8518b1-9091-4e6d-8491-ac57d13cbf58') {
        this.dialog = true
        this.result = 'Anjela Panget'
      }
      if (decodedString == '0c10d1e5-61ee-40e8-b6cf-ecc36843d9c1') {
        this.dialog = true
        this.result = 'Adrian Van Ladrillano'
      }
    }
  }
}
</script>