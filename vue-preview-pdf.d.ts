import Vue from 'vue'

declare class VuePreviewPDF extends Vue {
  static install (vue: typeof Vue): void;
  url: string;
  width: string;
  height: string;
  background: string;
  customLoading: boolean;
  customPager: boolean;
  disabledDownload: boolean;
}
