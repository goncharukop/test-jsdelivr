<template>
    <v-dialog v-model="show" width="400px">
        <v-card>
            <v-card-title class="headline">Package details</v-card-title>
            <v-card-text>
                <p><b>Name:</b> {{ pack.name }}</p>
                <p><b>Type:</b> {{ pack.type }}</p>                
                <p><b>Hits:</b> {{ pack.hits }}</p>
                <p><b>Bandwidth:</b> {{ pack.bandwidth }}</p>
                <p><b>Hits:</b> {{ pack.hits }}</p>
                <p><b>Previous hits:</b> {{ pack.prev.hits }}</p>
                <p><b>Previous bandwidth:</b> {{ pack.prev.bandwidth }}</p>
                <p><a :href="pack.links.self">Self link</a></p>
                <p><a :href="pack.links.versions">Versions link</a></p>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" text @click="close">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref, watchEffect, defineProps, defineEmits } from 'vue';

const props = defineProps({
    pack: Object,
});

const emit = defineEmits(['close']);

const show = ref(true);

watchEffect(() => {
    if (props.pack) {
        show.value = true;
    }
});

const close = () => {
    show.value = false;
    emit('close');
};
</script>

<style scopped>

</style>