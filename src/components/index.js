import FormGroupInput from "./Inputs/formGroupInput.vue";

import DropDown from "./Dropdown.vue";
import PaperTable from "./PaperTable.vue";
import Button from "./Button";

import Card from "./Cards/Card.vue";
import ChartCard from "./Cards/ChartCard.vue";
import StatsCard from "./Cards/StatsCard.vue";
import HighChartCard from "./Cards/HighChartCard.vue";


import SidebarPlugin from "./SidebarPlugin/index";

let components = {
  FormGroupInput,
  Card,
  ChartCard,
  StatsCard,
  PaperTable,
  DropDown,
  SidebarPlugin,
  HighChartCard
};

export default components;

export {
  FormGroupInput,
  Card,
  ChartCard,
  StatsCard,
  PaperTable,
  DropDown,
  Button,
  SidebarPlugin,
  HighChartCard
};
