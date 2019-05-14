# vue-volume-calculator

The Plaster Calculator allows you enter the dimensions of a solid shape, and then calculates the volume of that shape as well as the approximate amount of plaster and water required using common plaster mixing formulas.

## Notes:

### USG's Formula:
<a href="https://www.usg.com/content/dam/USG_Marketing_Communications/united_states/product_promotional_materials/finished_assets/gypsum-cement-plaster-volume-mix-guide.xlsx">Download the USG Excel calculator.</a>

The USG calculator contains some pretty esoteric formulas: 

* First, calculate a ratio based on the consistency: 
ratio = (-0.00004 × consistency3) + (0.0154 × consistency2) - (2.23 × consistency) + 164.25 

* Second, calculate pounds of plaster and water from ratio and consistency: 
ratio × cubic feet = pounds of plaster 
pounds of plaster * consistency / 100 = pounds of water

### Keith Simpson's Formula:

<em>volume in cubic inches</em> &times; 11 = <em>grams of water</em>

<em>grams of water</em> &times; (100 / consistency) = <em>grams of Pottery Plaster</em>

<a href="http://www.alfredceramics.com/simpson.html">Keith Simpson, Alfred University</a> 

Water should be room temperature 

Sift plaster through fingers into water 

Slake plaster for 3 minutes 

Mix for 3 minutes

### Andrew Martin's Formula:

<em>volume in cubic inches</em> / 80 = <em>quarts of water</em>

<em>quarts of water</em> &times; 3 = <em>pounds of plaster</em>

Simplified technique by Andrew Martin from <a href="https://books.google.com/books/about/The_Essential_Guide_to_Mold_Making_Slip.html?id=X-rtBGDCBb0C">"The Essential Guide to Mold Making & Slip Casting"</a>. This technique creates a slightly thicker plaster as Andrew has rounded the required water down to make the calculation simpler and allow for the water to be measured by volume.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```
