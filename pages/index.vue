<template>
  <div>
    <div
      class="d-flex flex-column"
      :style="
        $vuetify.breakpoint.mobile
          ? 'padding-left: 5vw;padding-right: 5vw'
          : 'padding-left: 20vw;padding-right: 20vw'
      "
    >
      <v-card flat>
        <v-row
          :class="
            $vuetify.breakpoint.mobile
              ? 'text-center align-center px-5'
              : 'align-center'
          "
          no-gutters
        >
          <v-col cols="12" xl="4">
            <v-card flat>
              <v-card-title
                class="font-weight-bold display-1"
                style="word-wrap: break-word"
              >
                Scan fast, free and full of amazing features
              </v-card-title>
              <v-card-text>
                Store, share, and collaborate on files and folders from any
                mobile device, tablet, or computer
              </v-card-text>
              <v-card-actions>
                <v-btn class="px-10 scanqr" elevation="15" color="primary"
                  >Scan Qr</v-btn
                >
                <v-btn class="px-10 createqr" text color="primary"
                  >Create Qr</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-col>

          <v-col cols="12" xl="8">
            <v-row justify="center" class="mt-15">
              <v-col
                cols="9"
                :class="
                  $vuetify.breakpoint.mobile ? 'px-5 pt-15' : 'align-center'
                "
              >
                <v-card flat>
                  <v-card
                    style="
                      z-index: 2;
                      width: 100%;
                      border-radius: 12px;
                      overflow: hidden;
                    "
                  >
                    <qrcode-stream @decode="onDecode"></qrcode-stream>
                  </v-card>
                  <v-card
                    style="
                      box-shadow: rgba(0, 0, 0, 0.2) 0px 60px 40px -7px;

                      position: absolute;
                      z-index: 0;
                      top: 0;
                      left: 0;
                      margin-left: -50px;
                      margin-top: -50px;
                      border-radius: 20px;
                    "
                    :height="$vuetify.breakpoint.mobile ? '120' : '300'"
                    :width="$vuetify.breakpoint.mobile ? '120' : '300'"
                    color="primary"
                    class="avatar"
                    elevation="15"
                  >
                  </v-card>

                  <v-card
                    style="
                      box-shadow: rgba(0, 0, 0, 0.2) 0px 60px 40px -7px;
                      border-radius: 20px;
                      position: absolute;
                      z-index: 1;
                      bottom: 0;
                      right: 0;
                      margin-right: -50px;
                      margin-bottom: -50px;
                    "
                    :height="$vuetify.breakpoint.mobile ? '120' : '300'"
                    :width="$vuetify.breakpoint.mobile ? '120' : '300'"
                    color="amber"
                    class="avatar"
                  >
                  </v-card>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>

      <v-card flat>
        <v-row class="text-center" dense>
          <v-col>
            <h1
              class="display-1 text--primary font-weight-medium"
              style="margin-top: 150px"
            >
              Scanned Results
            </h1>
            <p class="text--secondary">
              Drive works on all major platforms, enabling you to work
              seamlessly across your browser, mobile device, tablet, and
              computer.
            </p>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <download-excel
              class="btn btn-default"
              :data="qr_result"
              :fields="json_fields"
              worksheet="My Worksheet"
              name="filename.xls"
            >
              <v-card
                class="grow"
                color="green"
                dark
                :disabled="qr_result.length == 0 ? true : false"
                @click="exportExcel()"
              >
                <v-list-item two-line>
                  <v-list-item-avatar tile>
                    <v-icon large>mdi-microsoft-excel</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>Export to excel</v-list-item-title>
                    <v-list-item-subtitle>Secondary text</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <p></p>
              </v-card>
            </download-excel>
          </v-col>

          <v-col dense>
            <client-only>
              <vue-html2pdf
                :show-layout="false"
                :float-layout="true"
                :enable-download="true"
                :preview-modal="false"
                filename="scanneditems"
                :paginate-elements-by-height="1100"
                :pdf-quality="2"
                pdf-format="a4"
                pdf-orientation="portrait"
                :manual-pagination="false"
                ref="html2Pdf"
              >
                <section slot="pdf-content">
                  <div style="padding: 20px; font-family: arial">
                    <h1 style="font-size: 1.5em; color: black">
                      Scanned items:
                    </h1>
                    <br />
                    <p>
                      <span style="font-weight: 700; color: black">Time: </span>
                      {{ formatTime }}
                    </p>
                    <p>
                      <span style="font-weight: 700; color: black">Date: </span
                      >{{ formatDate }}
                    </p>
                    <br />
                    <hr />
                    <table style="width: 100%; table-layout: fixed">
                      <tr>
                        <td>
                          <h3>Result</h3>
                        </td>
                        <td>
                          <h3>Time Scanned</h3>
                        </td>
                      </tr>
                      <tr v-for="(qr, index) in qr_result" :key="index">
                        <td style="color: black">
                          <span>{{ index + 1 }}. {{ qr.result }}</span>
                        </td>
                        <td style="color: black">
                          <span>{{ qr.time }}</span>
                        </td>
                      </tr>
                    </table>
                  </div>
                </section>
              </vue-html2pdf>
            </client-only>
            <v-card
              class="grow"
              color="amber darken-2"
              dark
              :disabled="qr_result.length == 0 ? true : false"
              @click="exportPdf()"
            >
              <v-list-item two-line>
                <v-list-item-avatar tile>
                  <v-list-item-avatar tile>
                    <v-icon large> mdi-file-pdf-outline </v-icon>
                  </v-list-item-avatar>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>Export to PDF</v-list-item-title>
                  <v-list-item-subtitle>Secondary text</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <p></p>
            </v-card>
          </v-col>

          <v-col>
            <v-card
              class="grow"
              color="primary"
              dark
              :disabled="qr_result.length == 0 ? true : false"
              @click="exportClipboard(qr_result)"
            >
              <v-list-item two-line>
                <v-list-item-avatar tile>
                  <v-icon large> mdi-content-copy </v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>Copy to Clipboard</v-list-item-title>
                  <v-list-item-subtitle>Secondary text</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <p></p>
            </v-card>
          </v-col>
        </v-row>
      </v-card>

      <v-card flat>
        <v-row class="mt-5" v-if="qr_result.length == 0">
          <v-col cols="12" xl="6">
            <v-card
              style="box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px"
              class="py-2"
            >
              <v-row>
                <v-col cols="9">
                  <v-skeleton-loader
                    v-bind="attrs"
                    type="list-item-three-line"
                  ></v-skeleton-loader>
                </v-col>

                <v-col cols="3">
                  <v-skeleton-loader
                    v-bind="attrs"
                    max-height="75"
                    max-width="75"
                    type="image"
                  ></v-skeleton-loader>
                </v-col>
              </v-row>

              <v-skeleton-loader
                v-bind="attrs"
                type="button"
                class="ml-4"
              ></v-skeleton-loader>
            </v-card>
          </v-col>

          <v-col cols="12" xl="6">
            <v-card
              style="box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px"
              class="py-2"
            >
              <v-row>
                <v-col cols="9">
                  <v-skeleton-loader
                    v-bind="attrs"
                    type="list-item-three-line"
                  ></v-skeleton-loader>
                </v-col>

                <v-col cols="3">
                  <v-skeleton-loader
                    v-bind="attrs"
                    max-height="75"
                    max-width="75"
                    type="image"
                  ></v-skeleton-loader>
                </v-col>
              </v-row>

              <v-skeleton-loader
                v-bind="attrs"
                type="button"
                class="ml-4"
              ></v-skeleton-loader>
            </v-card>
          </v-col>
        </v-row>

        <v-row class="mt-5">
          <v-col
            v-for="(qr, index) in qr_result"
            :key="qr"
            cols="12"
            xl="6"
            class="px-2 py-2"
          >
            <v-card
              class="mx-auto"
              style="box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px"
            >
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="text-h5 mb-1 text-wrap">
                    {{ qr.result }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ qr.time }}
                  </v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar tile size="80" color="white">
                  <v-img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png"
                  ></v-img>
                </v-list-item-avatar>
              </v-list-item>

              <v-card-actions>
                <v-btn text color="primary" @click="qr_result.splice(index, 1)">
                  Remove
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import VueClipboard from 'vue-clipboard2'
import JsonExcel from 'vue-json-excel'
import camera from '@/components/camera'
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader'

import { methods } from 'qrcode.vue'

export default {
  components: {
    camera,
    QrcodeStream,
    QrcodeDropZone,
    QrcodeCapture,
    downloadExcel: JsonExcel,
    VueClipboard
  },
  data() {
    return {
      message: 'asdsa',
      json_fields: {
        Result: 'result',
        Time: 'time'
      },
      json_meta: [
        [
          {
            key: 'charset',
            value: 'utf-8'
          }
        ]
      ],
      qr_result: []
    }
  },
  computed: {
    formatDate() {
      return moment().format('MMMM D YYYY')
    },
    formatTime() {
      return moment().format('h:mm:ss a')
    }
  },
  methods: {
    onCopy(e) {
      alert('You just copied: ' + e.text)
    },
    onError(e) {
      alert('Failed to copy texts')
    },
    async exportClipboard() {
      var parsecopy = ''
      this.qr_result.forEach((element, index) => {
        parsecopy += `${index + 1}. ${element.result} - ${element.time} `
      })
      console.log(parsecopy)
      try {
        await this.$copyText(parsecopy)
      } catch (e) {
        console.error(e)
      }
      alert('Copied to clipboard!')
    },
    exportPdf() {
      this.$refs.html2Pdf.generatePdf()
    },
    downloadPdf() {
      this.$refs.html2Pdf.generatePdf()
    },
    exportExcel() {
      console.log('Exported excel')
    },
    onDecode(decoded) {
      this.qr_result.unshift({
        time: moment().format('h:mm:ss a'),
        result: decoded
      })
      alert(decoded)
    }
  },
  mounted() {}
}
</script>
<style>
.avatar {
  animation: float 6s ease-in-out infinite;
}
@keyframes float {
  0% {
    box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
    transform: translatey(0px);
  }
  50% {
    box-shadow: 0 25px 15px 0px rgba(0, 0, 0, 0.2);
    transform: translatey(-20px);
  }
  100% {
    box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
    transform: translatey(0px);
  }
}
.grow {
  transition: all 0.2s ease-in-out;
}
.grow:hover {
  transform: scale(1.1);
}
</style>