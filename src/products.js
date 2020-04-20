'use strict'

const KoppenGridCode = {
  42: ['Equatorial', 'rainforest (monsoonal)'],
  41: ['Equatorial', 'savanna'],

  37: ['Tropical', 'rainforest(persistently wet)'],
  36: ['Tropical', 'rainforest(monsoonal)'],
  35: ['Tropical', 'savanna'],

  34: ['Subtropical', 'no dry season'],
  33: ['Subtropical', 'distinctly dry summer'],
  32: ['Subtropical', 'distinctly dry winter'],
  31: ['Subtropical', 'moderately dry winter'],

  24: ['Desert', 'hot(persistently dry)'],
  23: ['Desert', 'hot(summer drought)'],
  22: ['Desert', 'hot(winter drought)'],
  21: ['Desert', 'warm(persistently dry)'],

  15: ['Grassland', 'hot(persistently dry)'],
  14: ['Grassland', 'hot(summer drought)'],
  13: ['Grassland', 'hot(winter drought)'],
  12: ['Grassland', 'warm(persistently dry)'],
  11: ['Grassland', 'warm(summer drought)'],

  9: ['Temperate', 'no dry season (hot summer)'],
  8: ['Temperate', 'moderately dry winter (hot summer)'],
  7: ['Temperate', 'distinctly dry (and hot) summer'],
  6: ['Temperate', 'no dry season (warm summer)'],
  5: ['Temperate', 'moderately dry winter (warm summer)'],
  4: ['Temperate', 'distinctly dry (and warm) summer'],
  3: ['Temperate', 'no dry season (mild summer)'],
  2: ['Temperate', 'distinctly dry (and mild) summer'],
  1: ['Temperate', 'no dry season (cool summer)']
}

const TemperatureGridCode = {
  1: 'Hot humid summer',
  2: 'Warm humid summer',
  3: 'Hot dry summer, mild winter',
  4: 'Hot dry summer, cold winter',
  5: 'Warm summer, cool winter',
  6: 'Mild warm summer, cold winter'
}

const rainfallGridCode = {
  1: ['Summer Dominant', 'summer dominant (more than 1200)'],
  2: ['Summer Dominant', 'summer dominant (650 - 1200)'],
  3: ['Summer Dominant', 'summer dominant (350 - 650)'],

  4: ['Arid', 'arid(less than 350)'],

  5: ['Summer', 'summer(more than 1200)'],
  6: ['Summer', 'summer(650 - 1200)'],
  7: ['Summer', 'summer(350 - 650)'],

  9: ['Uniform', 'uniform(more than 800)'],
  10: ['Uniform', 'uniform(500 - 800)'],
  11: ['Uniform', 'uniform(250 - 500)'],

  13: ['Winter Dominant', 'winter dominant(more than 800)'],
  14: ['Winter Dominant', 'winter dominant(500 - 800)'],
  15: ['Winter Dominant', 'winter dominant(250 - 500)'],

  17: ['Winter', 'winter(more than 800)'],
  18: ['Winter', 'winter(500 - 800)'],
  19: ['Winter', 'winter(250 - 500)']
}

exports.products = {
  temperature: {
    file: '/tmp_zones.zip',
    gridCode: TemperatureGridCode
  },
  koppenmajor: {
    file: '/kpngrp.zip',
    gridCode: KoppenGridCode
  },
  koppen: {
    file: '/kpn.zip',
    gridCode: KoppenGridCode
  },
  rainfallmajor: {
    file: '/seasgrpb.zip',
    gridCode: rainfallGridCode
  },
  rainfall: {
    file: '/seasb.zip',
    gridCode: rainfallGridCode
  }
}