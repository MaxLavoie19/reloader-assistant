<template>
  <div>
    <v-row  v-if="!isAddingChamber">
      <v-col cols="10">
        <v-autocomplete
          label="Chambre"
          :items="chamberingItems"
          v-model="model"
        ></v-autocomplete>
      </v-col>
      <v-col cols="2">
        <v-btn
          class="create-button"
          icon="mdi-plus"
          @click="addChamber()"
        ></v-btn>
      </v-col>
    </v-row>
    <v-row  v-if="isAddingChamber">
      <v-col cols="12" class="section-separator">Chambre</v-col>
    </v-row>
    <v-row  v-if="isAddingChamber && !isAddingCaliber">
      <v-col cols="1"></v-col>
      <v-col cols="9">
        <v-autocomplete
          label="Calibre"
          :items="caliberItems"
          v-model="caliberValue"
          @update:model-value="updateCaliber"
        ></v-autocomplete>
      </v-col>
      <v-col cols="2">
        <v-btn
          class="create-button"
          icon="mdi-plus"
          @click="addCaliber()"
        ></v-btn>
      </v-col>
    </v-row>
    <v-row  v-if="isAddingChamber && isAddingCaliber && caliberValue">
      <v-col cols="1"></v-col>
      <v-col cols="11">
        <v-text-field
          label="Nom du calibre"
          v-model="caliberValue.name"
          @update:model-value="updateCaliber"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row  v-if="isAddingChamber && model">
      <v-col cols="1"></v-col>
      <v-col cols="11">
        <v-text-field
          label="Nom de la chambre"
          v-model="model.name"
          @update:model-value="updateChamber"
        ></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
  import { ICaliberAutocompleteMapper } from '@/mappers/ICaliberAutocompleteMapper';
  import { IChamberingAutocompleteMapper } from '@/mappers/IChamberingAutocompleteMapper';
  import { IAutocompleteItem } from '@/models/IAutocompleteItem';
  import { ICaliber } from '@/models/ICaliber';
  import { IChambering } from '@/models/IChambering';
  import { ICaliberRepository } from '@/repositories/ICaliberRepository';
  import { IChamberingRepository } from '@/repositories/IChamberingRepository';
  import { inject, onMounted, ref } from 'vue';

  const chamberingRepository = inject<IChamberingRepository>('chamberingRepository') as IChamberingRepository;
  const chamberingAutocompleteMapper = inject<IChamberingAutocompleteMapper>('chamberingAutocompleteMapper') as IChamberingAutocompleteMapper;
  const caliberRepository = inject<ICaliberRepository>('caliberRepository') as ICaliberRepository;
  const caliberAutocompleteMapper = inject<ICaliberAutocompleteMapper>('caliberAutocompleteMapper') as ICaliberAutocompleteMapper;

  const model = defineModel<IChambering>()

  const props = defineProps<{
    chambering?: IChambering,
  }>();

  const chamberingItems = ref<IAutocompleteItem<IChambering>[]>([]);
  const isAddingChamber = ref(false);
  const caliberItems = ref<IAutocompleteItem<ICaliber>[]>([]);
  const caliberValue = ref<ICaliber>();
  const isAddingCaliber = ref(false);

  const emit = defineEmits(['update:model-value'])

  onMounted(() => {
    model.value = props.chambering;
    setChamberingItems(model.value);
  });

  async function setChamberingItems(chambering?: IChambering) {
    const chamberings = await chamberingRepository.getChamberings()
    chamberingItems.value = chamberings.map(
      (chambering) => chamberingAutocompleteMapper.map(chambering)
    );

    if (chambering) {
      model.value = chamberingItems.value.find(item => {
        return item.value.id === chambering.id;
      })?.value;
    }
  }

  async function setCaliberItems(chambering?: IChambering) {
    const calibers = await caliberRepository.getCalibers()
    caliberItems.value = calibers.map((caliber) => caliberAutocompleteMapper.map(caliber));
    if (chambering) {
      caliberValue.value = caliberItems.value.find(item => {
        return item.value.name == chambering.caliber.name;
      })?.value;
    }
  }

  function addChamber() {
    if (!model.value) {
      model.value = chamberingRepository.getEmptyChambering();
    }

    setCaliberItems(model.value);
    isAddingChamber.value = true;
  }

  function addCaliber() {
    caliberValue.value = caliberRepository.getEmptyCaliber();
    isAddingCaliber.value = true;
  }

  function updateChamber() {
    emit("update:model-value", model.value);
  }

  function updateCaliber() {
    if (!caliberValue.value || !model?.value) return;

    model.value.caliber = caliberValue.value;
    emit("update:model-value", model.value);
  }
</script>
