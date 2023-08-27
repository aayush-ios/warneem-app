<template>
    <div v-if="activeShift">
        {{ date }}
        <div class="box">
            <b-input type="text" required v-model="activeShift.title"></b-input>
            <b-modal :active.sync="isModalActive">
                <div class="modal-card">
                    <section class="modal-card-body">
                        The input field cannot be empty. Please enter all the fields before saving.
                    </section>
                    <footer class="modal-card-foot">
                        <b-button @click="isModalActive = false" type="is-primary">Close</b-button>
                    </footer>
                </div>
            </b-modal>
            <div class="field">
                <label class="label">Date</label>
                <div class="control">
                    <b-datepicker v-model="activeShift.date" placeholder="Click to select..." multiple></b-datepicker>
                </div>
                <b-field label="Start Time">
                    <b-timepicker v-model="activeShift.startTime"></b-timepicker>
                </b-field>

                <b-field label="End Time">
                    <b-timepicker v-model="activeShift.endTime"></b-timepicker>
                </b-field>
            </div>
            <div style="width: 200px;">
                <select style="width: 200px; height: 40px; font-size: medium;" v-model="activeShift.dropValue">
                    <option value="Consultation">Consultation</option>
                    <option value="Telephone">Telephone</option>
                    <option value="Ambulance">Ambulance</option>
                </select>
            </div>
        </div>
        <div class="buttons">
            <b-button class="btn" @click="saveShift" type="is-primary" outlined>Save</b-button>
            <b-button class="btn" @click="cancel" type="is-success" outlined>Cancel</b-button>
        </div>
    </div>
</template>
  
  <!-- ... -->
<script>
export default {
    props: ['shift'],
    data() {
        return {
            isModalActive: false,
            id: null,
            title: '',
            date: '',
            activeShift: this.shift || this.defaultShift()
        };
    },
    watch: {
        shift(newShift) {
            this.activeShift = Object.assign({}, newShift);
        }
    },
    methods: {
        defaultShift() {
            return { id: null, title: '', date: [], /* ... other fields ... */ };
        },
        saveShift() {
            if (this.activeShift.title !== '' && this.activeShift.date.length !== 0 && this.activeShift.dropValue !== '') {
                console.log(this.activeShift);
                this.$emit('save', this.activeShift);
                this.activeShift = this.defaultShift();
            } else {
                this.isModalActive = true;
            }
            // Reset after save
        },
        cancel() {
            this.$emit('cancel');
        },

    }
};
</script>

<style>
.modal-class {
    background-color: white;
}
.btn {
    margin: 10px;
}
</style>
  