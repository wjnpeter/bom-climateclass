# Bom Climate Classification

This node module provide api to get climate zone in Australia, as well as rainfall, temperature.

It basically provide same function as [Climate classification maps](http://www.bom.gov.au/jsp/ncc/climate_averages/climate-classifications/index.jsp)

[About climate classification maps](http://www.bom.gov.au/jsp/ncc/climate_averages/climate-classifications/IDCclimclasgrids.jsp)


## Installation
```
npm install bom-climateclass --save
```


## Usage
```
const { getClimateclass } = require('bom-climateclass')

const params = {
  type: 'koppenmajor',
  lat: -42.373875,
  lon: 146.231807
}
getClimateclass(params, function (err, data) {
  console.log(data)
})

```
## Return 
Example return;
```
['Winter', 'winter(more than 800)']
```

#### Temperature/humidity zones
This method of classification identifies six key zones across Australia, based on a set of definitions relating to summer and winter conditions:

- Hot humid summer
- Warm humid summer
- Hot dry summer, mild winter
- Hot dry summer, cold winter
- Warm summer, cold winter
- Mild/warm summer, cold winter

#### Köppen
The six major classes are identified predominantly on native vegetation type, with the additional sub-groups taking into consideration seasonal distribution of temperature and precipitation:

- Equatorial
- Tropical
- Subtropical
- Desert
- Grassland
- Temperate

#### Seasonal rainfall
The seasonal rainfall maps use the differences between summer and winter rainfall across Australia to identify six major climate zones.

- Summer dominant
- Summer
- Uniform
- Winter
- Winter dominant
- Arid

## Params

### type
#### Type: 'temperature' | 'koppenmajor' | 'koppen' | 'rainfallmajor' | 'rainfall'
#### Required: true
