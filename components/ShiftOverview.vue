<template>
    <section>
        <div v-for="shift in shifts" :key="shift.id">
      <div class="box">
            <div style="font-weight: bold;margin-top: 10px;margin-bottom: 10px;">Title</div>
            {{ shift.title }}
            <div style="font-weight: bold;margin-top: 10px;margin-bottom: 10px;">Dates</div>
            <div v-for="shiftDate in shift.date" :key="shiftDate.date" style="background-color: lightgray;display: flex;
    justify-content: space-between; padding: 10px; margin-bottom: 10px">
            <div>{{ shiftDate  | currentDate}}</div>
            <div>{{ shift.startTime  | currentDateTime}}</div>
            <div>{{ shift.endTime | currentDateTime}}</div>
            <div>{{ shift.dropValue }}</div>
            </div>
            <div style="text-align: right;">
            <button @click="deleteShift(shift.id)">Delete</button>
            <button @click="editShift(shift)">Edit</button>
            </div>
        </div>
      </div>
      <div v-if="showDrawer" class="drawer">
          <ShiftFormDrawer 
      :shift="activeShift1" 
      @save="saveShift" 
      @cancel="clearActiveShift" 
    /> </div>
    </section>
</template>
  
<script>
import moment from 'moment';
import ShiftFormDrawer from '~/components/ShiftFormDrawer.vue';

export default {
    props: ['shifts'],
    components: {
    ShiftFormDrawer
  },
  data() {
    return {
        showDrawer : false,
        activeShift1: null,

    };
  },
    filters: {
        currentDateTime(val) {
            return moment(val).format('hh: mm')
        },
        currentDate(val) {
            return moment(val).format('yyyy-MM-DD')
        }
    },
    methods: {
        editShift(shift) {
            const editShiftData = {...shift};
            this.activeShift1 = editShiftData;
            this.showDrawer = !this.showDrawer;
            this.$emit('edit', shift);
        },

        deleteShift(shiftId) {
            this.$emit('delete', shiftId);
        },
        clearActiveShift() {
            console.log("this.activeShift1",this.activeShift1)

            this.activeShift1 = {};
            console.log("this.activeShift1-------------",this.activeShift1)

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
    }
};
</script>
  

<style>
.box {
  background-color: white;
  border-radius: 6px;
  -webkit-box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02);
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02);
  color: #4a4a4a;
  display: block;
  padding: 1.25rem;
  margin: 3px;
}
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