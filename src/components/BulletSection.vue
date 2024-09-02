<template>
  <v-row v-if="!isAddingBullet">
    <v-col cols="10">
      <v-autocomplete
        label="Balle"
        :items="filteredBulletItems"
        v-model="model"
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
        @update:model-value="updateBulletManufacturer"
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
        @update:model-value="updateBulletManufacturer"
      ></v-text-field>
    </v-col>
  </v-row>
  <v-row v-if="isAddingBullet && model">
    <v-col cols="1"></v-col>
    <v-col cols="11">
      <v-text-field
        label="Nom du modèle de balle"
        v-model="model.model"
      ></v-text-field>
    </v-col>
  </v-row>
  <v-row v-if="isAddingBullet && model">
    <v-col cols="1"></v-col>
    <v-col cols="11">
      <v-number-input
        label="Poids de la balle"
        suffix="mm"
        v-model="model.weightInGrains"
      ></v-number-input>
    </v-col>
  </v-row>
  <v-row v-if="isAddingBullet && model">
    <v-col cols="1"></v-col>
    <v-col cols="11">
      <v-number-input
        label="Coefficien ballistique G1"
        v-model="model.g1BallisticCoefficient"
      ></v-number-input>
    </v-col>
  </v-row>
  <v-row v-if="isAddingBullet && model">
    <v-col cols="1"></v-col>
    <v-col cols="11">
      <v-number-input
        label="Coefficien ballistique G7"
        v-model="model.g7BallisticCoefficient"
      ></v-number-input>
    </v-col>
  </v-row>
  <v-row v-if="isAddingBullet && model">
    <v-col cols="1"></v-col>
    <v-col cols="11">
      <v-number-input
        label="Densitée de section"
        v-model="model.sectionalDensity"
      ></v-number-input>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
  import { inject, onMounted, ref, watch } from 'vue';
  import { VNumberInput } from 'vuetify/labs/VNumberInput'

  import { IAutocompleteItem } from '@/models/IAutocompleteItem';
  import { IBullet } from '@/models/IBullet';
  import { ICaliber } from '@/models/ICaliber';
  import { IManufacturer } from '@/models/IManufacturer';
  import { IBulletRepository } from '@/repositories/BulletRepository/IBulletRepository';
  import { IBulletAutocompleteMapper } from '@/mappers/IBulletAutocompleteMapper';
  import { IManufacturerRepository } from '@/repositories/ManufacturerRepository/IManufacturerRepository';
  import { IManufacturerAutocompleteMapper } from '@/mappers/IManufacturerAutocompleteMapper';

  const bulletRepository = inject<IBulletRepository>('bulletRepository') as IBulletRepository;
  const bulletAutocompleteMapper = inject<IBulletAutocompleteMapper>('bulletAutocompleteMapper') as IBulletAutocompleteMapper;
  const manufacturerRepository = inject<IManufacturerRepository>('manufacturerRepository') as IManufacturerRepository;
  const manufacturerAutocompleteMapper = inject<IManufacturerAutocompleteMapper>('manufacturerAutocompleteMapper') as IManufacturerAutocompleteMapper;

  const model = defineModel<IBullet>();

  const props = defineProps<{
    caliberValue: ICaliber,
  }>();

  watch(() => props.caliberValue, updateCaliber);

  const bulletItems = ref<IAutocompleteItem<IBullet>[]>([]);
  const filteredBulletItems = ref<IAutocompleteItem<IBullet>[]>([]);

  const bulletManufacturerItems = ref<IAutocompleteItem<IManufacturer>[]>([]);
  const bulletManufacturerValue = ref<IManufacturer>();
  const isAddingBullet = ref(false);
  const isAddingBulletManufacturer = ref(false);

  onMounted(() => {
    setBulletItems(model.value);
  });

  async function setBulletItems(bullet?: IBullet) {
    const bullets = await bulletRepository.getBullets()
    bulletItems.value = bullets.map((bullet) => bulletAutocompleteMapper.map(bullet));

    if (bullet) {
      model.value = bulletItems.value.find(item => {
        return item.value.id === bullet.id;
      })?.value;
    }

    filterBullets();
  }

  function updateCaliber() {
    model.value = undefined;
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
    if (!model.value) {
      model.value = bulletRepository.getBlankBullet(props.caliberValue)
    }

    setManufacturer();
    isAddingBullet.value = true;
  }

  function addBulletManufacturer() {
    if (!bulletManufacturerValue.value) {
      bulletManufacturerValue.value = manufacturerRepository.getBlankManufacturer();
    }

    isAddingBulletManufacturer.value = true;
  }

  async function setManufacturer(): Promise<void> {
    const manufacturers = await manufacturerRepository.getManufacturers();
    bulletManufacturerItems.value = manufacturers.map(manufacturer => manufacturerAutocompleteMapper.map(manufacturer))
  }

  function updateBulletManufacturer(): void {
    if (!model.value || !bulletManufacturerValue.value) return;
    model.value.manufacturer = bulletManufacturerValue.value;
  }
</script>
