<template>
  <ContainerDefault>
    <div class="d-flex justify-space-between">
      <h2>Produtos</h2>
      <v-btn append-icon="$plus">Novo</v-btn>
    </div>
    <v-data-table :items="products"></v-data-table>
  </ContainerDefault>
</template>
<script setup>
const products = [
  {
    name: 'Ração Premium para Cães Adultos',
    category: 'Ração',
    pet: 'Cachorro',
    brand: 'Golden',
    price: 149.9,
    weight: '15kg',
    description: 'Ração premium com nutrientes essenciais para cães adultos.',
    inStock: true,
  },
  {
    name: 'Ração Premium para Gatos Castrados',
    category: 'Ração',
    pet: 'Gato',
    brand: 'Whiskas',
    price: 89.9,
    weight: '3kg',
    description: 'Alimento balanceado para gatos castrados.',
    inStock: true,
  },
  {
    name: 'Bifinho de Carne',
    category: 'Petiscos',
    pet: 'Cachorro',
    brand: 'Pedigree',
    price: 19.9,
    weight: '65g',
    description: 'Petisco macio ideal para recompensas.',
    inStock: true,
  },
  {
    name: 'Tapete Higiênico Super Absorvente',
    category: 'Higiene e Limpeza',
    pet: 'Cachorro',
    brand: 'Chalesco',
    price: 59.9,
    quantity: '30 unidades',
    description: 'Tapetes com alto poder de absorção.',
    inStock: false,
  },
  {
    name: 'Brinquedo Mordedor de Borracha',
    category: 'Brinquedos',
    pet: 'Cachorro',
    brand: 'Pet Games',
    price: 34.9,
    description: 'Auxilia na limpeza dos dentes e alivia o estresse.',
    inStock: true,
  },
  {
    name: 'Coleira Ajustável com Guia',
    category: 'Acessórios',
    pet: 'Cachorro',
    brand: 'Zee.Dog',
    price: 129.9,
    description: 'Coleira confortável e resistente.',
    inStock: true,
  },
  {
    name: 'Areia Higiênica para Gatos',
    category: 'Higiene e Limpeza',
    pet: 'Gato',
    brand: 'Pipicat',
    price: 39.9,
    weight: '4kg',
    description: 'Alta absorção e controle de odores.',
    inStock: true,
  },
  {
    name: 'Ração para Peixes Tropicais',
    category: 'Aquarismo',
    pet: 'Peixe',
    brand: 'Alcon',
    price: 14.9,
    weight: '50g',
    description: 'Alimento completo para peixes tropicais.',
    inStock: true,
  },
]
</script>
