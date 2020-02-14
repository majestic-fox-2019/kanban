<template>
    <b-modal 
        id="modal" 
        title="Task"
        @hidden="$emit('resetModal')"
        @ok="onSubmit"
    >
        <input type="hidden">
        <div class="form-group">
        <label>Title</label>
        <input v-model="dataModal.title" type="text" class="form-control" placeholder="Input Task's Title">
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea v-model="dataModal.description" class="form-control" placeholder="Input Task's Description"></textarea>
        </div>  
    </b-modal>
</template>
<script>
    export default {
        props: ["handleOk", "dataModal"],
        data: function() {
            return {
                modalDataState: this.dataModal
            }
        },
        watch: {
            dataModal: {
                handler (obj) {
                    this.modalDataState = {...obj}
                },
                deep: true
            }
        },
        methods: {
            onSubmit: function() {
                this.handleOk(this.modalDataState);
            }
        }
    }
</script>
<style>

</style>