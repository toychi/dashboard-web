<template>
  <card>
    <highcharts class="chart" :options="chartOptions"></highcharts>
  </card>
</template>

<script>
import Card from "./Card.vue";
export default {
  props: {
    chartOptions: {
      type: Object,
      default: () => {
        return {};
      }
    }
  }
};
</script>

<style scoped>
input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
}
#colorPicker {
  border: 0;
  padding: 0;
  margin: 0;
  width: 30px;
  height: 30px;
}
.numberInput {
  width: 30px;
}
</style>