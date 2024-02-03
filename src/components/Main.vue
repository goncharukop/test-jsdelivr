<template>
  <v-app>
    <v-container style="max-width: 500px;">
      <v-text-field v-model="search" label="Search..." />
    </v-container>
    <v-container style="display: flex; justify-content: space-evenly;">
      <table v-if="displayedPackages.length">
        <thead>
          <tr>
            <th v-for="(value, key) in tableTitles" :key="key">
              {{ value.toUpperCase() }}
            </th>
          </tr>
        </thead>
        <tbody>          
          <tr v-for="(item, index) in displayedPackages" :key="index" @click="openModal(item)">
            <td>{{ item.type }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.hits }}</td>
            <td>{{ item.bandwidth }}</td>
          </tr>
        </tbody>
      </table>
      <p v-else>Not found. Change search phrase, please</p>
    </v-container>
    
    <v-pagination 
      v-if="displayedPackages.length" 
      v-model="page" 
      :length="maxPage" 
    />

    <Modal v-if="selectedPackage" :pack="selectedPackage" @close="selectedPackage = null" />
  
    <v-footer color="grey" app>
      <v-row justify="center">
        <v-col >
          <div class="text-center">
            <v-avatar size="100">
              <img src="../assets/photo.jpg" alt="Author's Photo">
            </v-avatar>
            <h4 class="mt-3">Oleksii Honcharuk</h4>
            <a href="https://github.com/goncharukop" target="_blank">GitHub</a>
          </div>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';
import Modal from './Modal.vue';

const store = useStore();
const search = ref('');
const page = ref(1);
const selectedPackage = ref(null);

const tableTitles = ['type', 'name', 'hits', 'bandwidth']

onMounted(async () => {
  const response = await axios.get('https://data.jsdelivr.com/v1/stats/packages');
  store.commit('setPackages', response.data);
});

const filteredPackages = computed(() => {
  page.value = 1;
  return store.state.packages.filter(pack => pack.name.includes(search.value));
});

const maxPage = computed(() => Math.ceil(filteredPackages.value.length / 10));

const displayedPackages = computed(() => {
  const start = (page.value - 1) * 10;
  const end = start + 10;
  
  return filteredPackages.value.slice(start, end);
});

const openModal = (pack) => {
  selectedPackage.value = pack;
};


</script>
<style scoped>
tr {
  cursor: pointer;
} 
tr:nth-child(even) {
  background-color: #ffffff;
}

tr:nth-child(odd) {
  background-color: #cacaca;
}
table {
  border-spacing: 5px;
  font-size: 16px;
}

@media (max-width: 500px) {
  table {
    font-size: 12px;
  }
}
</style>