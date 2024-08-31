<template>
  <div v-if="model">
    <v-row v-if="!isAddingBullet">
      <v-col cols="10">
        <v-autocomplete
          label="Balle"
          :items="filteredBulletItems"
          v-model="bulletValue"
        ></v-autocomplete>
      </v-col>
      <v-col cols="2">
        <v-btn
          class="create-button"
          icon="mdi-plus"
          @click="addBullet()"
        ></v-btn>
      </v-col>
    </v-row>
    <v-row v-if="isAddingBullet">
      <v-col cols="12" class="section-separator">Balle</v-col>
    </v-row>
    <v-row v-if="isAddingBullet && !isAddingBulletManufacturer">
      <v-col cols="1"></v-col>
      <v-col cols="9">
        <v-autocomplete
          label="Fabriquant de balle"
          :items="bulletManufacturerItems"
          v-model="bulletManufacturerValue"
        ></v-autocomplete>
      </v-col>
      <v-col cols="2">
        <v-btn
          class="create-button"
          icon="mdi-plus"
          @click="addBulletManufacturer()"
        ></v-btn>
      </v-col>
    </v-row>
    <v-row v-if="isAddingBullet && isAddingBulletManufacturer && bulletManufacturerValue">
      <v-col cols="1"></v-col>
      <v-col cols="11">
        <v-text-field
          label="Nom du fabriquant de balles"
          v-model="bulletManufacturerValue.name"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row v-if="isAddingBullet && bulletValue">
      <v-col cols="1"></v-col>
      <v-col cols="11">
        <v-text-field
          label="Nom du modèle de balle"
          v-model="bulletValue.model"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row v-if="isAddingBullet && bulletValue">
      <v-col cols="1"></v-col>
      <v-col cols="11">
        <v-text-field
          label="Poids de la balle"
          suffix="mm"
          v-model="bulletValue.weightInGrains"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row v-if="isAddingBullet && bulletValue">
      <v-col cols="1"></v-col>
      <v-col cols="11">
        <v-text-field
          label="Coefficien ballistique G1"
          v-model="bulletValue.g1BallisticCoefficient"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row v-if="isAddingBullet && bulletValue">
      <v-col cols="1"></v-col>
      <v-col cols="11">
        <v-text-field
          label="Coefficien ballistique G7"
          v-model="bulletValue.g1BallisticCoefficient"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row v-if="isAddingBullet && bulletValue">
      <v-col cols="1"></v-col>
      <v-col cols="11">
        <v-text-field
          label="Densitée de section"
          v-model="bulletValue.sectionalDensity"
        ></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, ref, watch } from 'vue';

import { IAutocompleteItem } from '@/models/IAutocompleteItem';
import { IBullet } from '@/models/IBullet';
import { ICaliber } from '@/models/ICaliber';
import { IManufacturer } from '@/models/IManufacturer';
import { IBulletService } from '@/services/IBulletService';

const bulletService = inject<IBulletService>('bulletService') as IBulletService;

const model = defineModel<IBullet>();

const props = defineProps<{
  caliberValue: ICaliber,
}>();

watch(() => props.caliberValue, updateCaliber);

const bulletValue = ref<IBullet>();
const bulletItems = ref<IAutocompleteItem<IBullet>[]>([]);
const filteredBulletItems = ref<IAutocompleteItem<IBullet>[]>([]);

const bulletManufacturerItems = ref<IAutocompleteItem<IManufacturer>[]>([]);
const bulletManufacturerValue = ref<IManufacturer>();
const isAddingBullet = ref(false);
const isAddingBulletManufacturer = ref(false);

onMounted(() => {
  if (!model.value) {
    model.value = bulletService.getBlankBullet(props.caliberValue)
  }
  setBulletItems(model.value);
});

async function setBulletItems(bullet: IBullet) {
  bulletItems.value = await bulletService.getBullets().then((bullets) => {
      const bulletItems = bullets.map((bullet): IAutocompleteItem<IBullet> => {
        return {
          title: `${bullet.manufacturer.name} ${bullet.caliber.name} ${bullet.weightInGrains}gr`,
          value: bullet,
        }
      });

      if (bullet) {
        bulletValue.value = bulletItems.find(item => {
          return item.value.id === bullet.id;
        })?.value;
      }

      return bulletItems
    });
    filterBullets();
}

function updateCaliber() {
  bulletValue.value = undefined;
  filterBullets();
}

function filterBullets() {
  const chamberingName = props.caliberValue.name;

  if (!chamberingName) {
    filteredBulletItems.value = bulletItems.value;
    return;
  }

  filteredBulletItems.value = bulletItems.value.filter((bulletItem) => {
    return bulletItem.value.caliber.name === chamberingName;
  });
}

function addBullet() {
  isAddingBullet.value = true;
}

function addBulletManufacturer() {
  isAddingBulletManufacturer.value = true;
}

</script>
