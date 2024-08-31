<template>
  <div v-if="model">
    <v-row  v-if="!isAddingChamber">
      <v-col cols="10">
        <v-autocomplete
          label="Chambre"
          :items="chamberingItems"
          v-model="chamberingValue"
          @update:model-value="emit('update:model-value', chamberingValue)"
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
          v-model="model.caliber"
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
    <v-row  v-if="isAddingChamber && isAddingCaliber">
      <v-col cols="1"></v-col>
      <v-col cols="11">
        <v-text-field
          label="Nom du calibre"
          v-model="caliberValue"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row  v-if="isAddingChamber">
      <v-col cols="1"></v-col>
      <v-col cols="11">
        <v-text-field
          label="Nom de la chambre"
          v-model="model"
        ></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
  import { IAutocompleteItem } from '@/models/IAutocompleteItem';
  import { ICaliber } from '@/models/ICaliber';
  import { IChambering } from '@/models/IChambering';
  import { IChamberingService } from '@/services/IChamberingService';
  import { inject, onMounted, ref } from 'vue';

  const chamberingService = inject<IChamberingService>('chamberingService') as IChamberingService;

  const model = defineModel<IChambering>()

  const chamberingItems = ref<IAutocompleteItem<IChambering>[]>([]);
  const chamberingValue = ref<IChambering>()
  const isAddingChamber = ref(false);
  const caliberItems = ref<ICaliber[]>([]);
  const caliberValue = ref<ICaliber>();
  const isAddingCaliber = ref(false);

  const emit = defineEmits(['update:model-value'])

  onMounted(() => {
    setChamberingItems();
  });

async function setChamberingItems(chambering?: IChambering) {
  chamberingItems.value = await chamberingService.getChamberings().then((chamberings) => {
    const chamberingItems = chamberings.map((chambering): IAutocompleteItem<IChambering> => {
      return {title: chambering.name, value: chambering}
    });

    if (chambering) {
      chamberingValue.value = chamberingItems.find(item => {
        return item.value.id === chambering.id;
      })?.value;
    }

    return chamberingItems;
  });
}

  function addChamber() {
    isAddingChamber.value = true;
  }

  function addCaliber() {
    isAddingCaliber.value = true;
  }
</script>
