
// export const namespaced = true;

export const state = () => ({
  shifts: []
});

export const mutations = {
  ADD_SHIFT(state, shift) {
    shift.id = Date.now().toString();  // Add unique ID
    console.log(shift);
    state.shifts.push(shift);
  },
  UPDATE_SHIFT(state, updatedShift) {
    const index = state.shifts.findIndex(s => s.id === updatedShift.id);
    if (index !== -1) {
      state.shifts.splice(index, 1, updatedShift);
    }
  },
  DELETE_SHIFT(state, shiftId) {
    const index = state.shifts.findIndex(s => s.id === shiftId);
    if (index !== -1) {
      state.shifts.splice(index, 1);
    }
  },
 
};

