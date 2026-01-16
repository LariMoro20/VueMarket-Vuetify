<template>
  <ContainerDefault>
    <div class="d-flex justify-space-between">
      <h2>Categorias</h2>
      <v-btn append-icon="$plus">Nova</v-btn>
    </div>

    <v-data-table :items="categories"></v-data-table>
  </ContainerDefault>
</template>
<script setup>
const categories = [
  {
    name: 'Ração',
    description: 'Alimentos secos e úmidos para cães, gatos e outros pets',
    pets: ['Cachorro', 'Gato', 'Outros'],
  },
  {
    name: 'Petiscos',
    description: 'Bifinhos, ossinhos e snacks para recompensas',
    pets: ['Cachorro', 'Gato'],
  },
  {
    name: 'Higiene e Limpeza',
    description: 'Shampoos, tapetes higiênicos e produtos de limpeza',
    pets: ['Cachorro', 'Gato'],
  },
  {
    name: 'Acessórios',
    description: 'Coleiras, guias, roupas e camas',
    pets: ['Cachorro', 'Gato'],
  },
  {
    name: 'Brinquedos',
    description: 'Itens para entretenimento e estímulo físico e mental',
    pets: ['Cachorro', 'Gato'],
  },
  {
    name: 'Saúde e Bem-estar',
    description: 'Vitaminas, suplementos e produtos veterinários',
    pets: ['Cachorro', 'Gato'],
  },
  {
    name: 'Aquarismo',
    description: 'Produtos para peixes e aquários',
    pets: ['Peixe'],
  },
  {
    name: 'Pássaros',
    description: 'Gaiolas, rações e acessórios para aves',
    pets: ['Pássaro'],
  },
]
</script>
