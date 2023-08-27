
<template>
  <div>
    <b-field label="Filter">
      <b-slider :min="0" :max="2" aria-label="Filter" :tooltip="false">
        <b-slider-tick :value="0">0</b-slider-tick>
        <b-slider-tick :value="1">70</b-slider-tick>
        <b-slider-tick :value="2">500</b-slider-tick>
      </b-slider>
    </b-field>
    <b-button @click="toggleDrawer" type="is-primary" outlined>Add New Shift</b-button>
    <div v-if="showDrawer" class="drawer">
      <ShiftFormDrawer :shift="activeShift" @save="saveShift" @cancel="clearActiveShift" />
    </div>
    <ShiftOverview :shifts="shifts" @edit="setActiveShift" @delete="deleteShift" />
  </div>
</template>

<script>
import ShiftOverview from '~/components/ShiftOverview.vue';
import ShiftFormDrawer from '~/components/ShiftFormDrawer.vue';

export default {
  components: {
    ShiftOverview,
    ShiftFormDrawer
  },
  data() {
    return {
      activeShift: null,
      isDrawerActive: false,
      showDrawer: false,
    };
  },
  computed: {
    shifts() {
      return this.$store.state.shifts.shifts;
    }
  },
  methods: {
    toggleDrawer() {
      this.showDrawer = !this.showDrawer;
    },
    setActiveShift(shift) {
      // this.activeShift = Object.assign({}, shift);
    },
    clearActiveShift() {
      this.activeShift = null;
      this.showDrawer = false; // Reset to null
    },
    saveShift(shift) {
      if (shift.id) {
        this.$store.commit('shifts/UPDATE_SHIFT', shift);
        this.showDrawer = false;
      } else {
        this.$store.commit('shifts/ADD_SHIFT', shift);
        this.showDrawer = false;
      }
      this.clearActiveShift();
    },
    deleteShift(shiftId) {
      this.$store.commit('shifts/DELETE_SHIFT', shiftId);
    }
  }
};
</script>

<style scoped>
.drawer {
  z-index: 2;
  position: fixed;
  top: 53px;
  right: 0;
  width: 600px;
  height: 100vh;
  background-color: white;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.3);
  overflow-y: auto;
  transition: transform 0.3s ease;
  transform: translateX(0%);
}
</style>
