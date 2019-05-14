<template>
  <div>
    <h1>Plaster Calculator</h1>
    <!--
      Currently only supports inches
      <p>
        Units: 
        <select v-model="selectedUnits">
          <option v-for="unit in units">{{ unit }}</option>
        </select>
      </p>
      -->
    <p>
      Shape:
      <select v-model="selectedShape">
        <option v-for="shape in shapes" v-bind:key="shape">{{ shape }}</option>
      </select>
    </p>

    <div v-if="selectedShape && shapeImageSource">
      <img :src="shapeImageSource" v-bind:alt="selectedShape" width="172" />
    </div>

    <p>
      Consistency:
      <select v-model="selectedConsistency">
        <option v-for="consistency in consistencies" v-bind:key="consistency.value" v-bind:value="consistency.value" >{{ consistency.name }}</option>
      </select>
    </p>

    <div v-if="selectedShape === 'Sphere'">
      Radius (r)
      <input type="number" v-model="radius" min="0"> inches
      <p v-if="calculatedVolume">
        Volume 
        = <sup>4</sup>&frasl;<sub>3</sub>πr<sup>3</sup>
        <br/>
        = <sup>4</sup>&frasl;<sub>3</sub> &times; π &times; <strong>{{ radius }}</strong><sup>3</sup>
        <br/>
        = <strong>{{ Number(calculatedVolume).toFixed(this.precision) }}</strong> {{ selectedUnits }}<sup>3</sup>
      </p>
    </div>

    <div v-else-if="selectedShape === 'Cone'">
      Base Radius (r)
      <input type="number" v-model="radius"> inches
      <br/>
      Height (h)
      <input type="number" v-model="height"> inches
      <p v-if="calculatedVolume">
        Volume 
        = <sup>1</sup>&frasl;<sub>3</sub>πr<sup>2</sup>h
        <br/>
        = <sup>4</sup>&frasl;<sub>3</sub> &times; π &times; <strong>{{ radius }}</strong><sup>2</sup> &times; <strong>{{ height }}</strong>
        <br/>
        = {{ Number(calculatedVolume).toFixed(this.precision) }} {{ selectedUnits }}<sup>3</sup>
      </p>
    </div>

    <div v-else-if="selectedShape === 'Conical Frustum'">
      Top Radius (r)
      <input type="number" v-model="radius"> inches
      <br/>
      Bottom Radius (r)
      <input type="number" v-model="bottomRadius"> inches
      <br/>
      Height (h)
      <input type="number" v-model="height"> inches
      <p v-if="calculatedVolume">
        Volume 
        = <sup>1</sup>&frasl;<sub>3</sub>πh(r<sup>2</sup> + rR + R<sup>2</sup>)
        <br/>
        = <sup>1</sup>&frasl;<sub>3</sub> &times; π &times; {{ height }} &times; ({{ radius }}<sup>2</sup> + ({{ radius }} &times; {{ bottomRadius }}) + {{ bottomRadius }}<sup>2</sup>)
        <br/>
        = {{ Number(calculatedVolume).toFixed(this.precision) }} {{ selectedUnits }}<sup>3</sup>
      </p>
    </div>

    <div v-else-if="selectedShape === 'Cylinder'">
      Base Radius (r)
      <input type="number" v-model="radius"> inches
      <br/>
      Height (h)
      <input type="number" v-model="height"> inches
      <p v-if="calculatedVolume">
        Volume 
        = πr<sup>2</sup>h
        <br/>
        = π &times; <strong>{{ radius }}</strong><sup>2</sup> &times; <strong>{{ height }}</strong>
        <br/>
        = {{ Number(calculatedVolume).toFixed(this.precision) }} {{ selectedUnits }}<sup>3</sup>
      </p>
    </div>

    <div v-else-if="selectedShape === 'Tube'">
      Outer Diameter (d1)
      <input type="number" v-model="outerDiameter"> inches
      <br/>
      Inner Diameter (d2)
      <input type="number" v-model="innerDiameter"> inches
      <br/>
      Length (l)
      <input type="number" v-model="length"> inches
      <p v-if="calculatedVolume">
        Volume 
        = π((d<sub>1</sub><sup>2</sup> - d<sub>2</sub><sup>2</sup>)/4)l
        <br/>
        = π &times; ((<strong>{{ outerDiameter }}</strong><sup>2</sup> - <strong>{{ innerDiameter }}</strong><sup>2</sup>)/4) &times; <strong>{{ length }}</strong>
        <br/>
        = {{ Number(calculatedVolume).toFixed(this.precision) }} {{ selectedUnits }}<sup>3</sup>
      </p>
    </div>

    <div v-else-if="selectedShape === 'Cube'">
      Edge Length  (a)
      <input type="number" v-model="length"> inches
      <p v-if="calculatedVolume">
        Volume 
        = a<sup>3</sup>
        = <strong>{{ length }}</strong><sup>3</sup>
        = {{ Number(calculatedVolume).toFixed(this.precision) }} {{ selectedUnits }}<sup>3</sup>
      </p>
    </div>

    <div v-else-if="selectedShape === 'Rectangular Solid'">
      Length (l)
      <input type="number" v-model="length"> inches
      <br/>
      Width (w)
      <input type="number" v-model="width"> inches
      <br/>
      Height (h)
      <input type="number" v-model="height"> inches
      <p v-if="calculatedVolume">
        Volume 
        = lwh
        = <strong>{{ length }}</strong> &times; <strong>{{ width }}</strong> &times; <strong>{{ height }}</strong>
        = {{ Number(calculatedVolume).toFixed(this.precision) }} {{ selectedUnits }}<sup>3</sup>
      </p>
    </div>

    <div v-if="calculatedVolume">
      <strong>
        Volume = {{ this.numberFormat(calculatedVolume) }} {{ selectedUnits }}<sup>3</sup>
        ({{ Number(calculatedVolumeCubicFeet).toFixed(5) }} ft<sup>3</sup>)
      </strong>
    </div>
    <div v-if="calculatedVolume">

      <div>
        <hr/>
        <h4>USG's Formula:</h4>
        <p>
        </p>
        <p>
          <strong>{{ this.numberFormat(usgPoundsOfWater) }}</strong> &nbsp;<em>pounds of water</em>
          ({{ this.numberFormat(poundsToGrams(usgPoundsOfWater)) }}g)
          <br/>
          <strong>{{ this.numberFormat(usgPoundsOfPlaster) }}</strong> &nbsp;<em>pounds of plaster</em>
          ({{ this.numberFormat(poundsToGrams(usgPoundsOfPlaster)) }}g)
        </p>
      </div>

      <div>
        <hr/>
        <h4>Keith Simpson's Formula:</h4>
        <p>
          <em>volume in cubic inches</em> &times; 11 = <em>grams of water</em>
          <br/>
          <em>grams of water</em> &times; (100 / consistency) = <em>grams of Pottery Plaster</em>
        </p>
        <p>
          {{ this.numberFormat(calculatedVolume) }} {{ selectedUnits }}<sup>3</sup> &times; 11 = <strong>{{ this.numberFormat(keithSimpsonGramsOfWater, 0) }}</strong> &nbsp;<em>grams of water</em>
          <br/>
          {{ this.numberFormat(keithSimpsonGramsOfWater, 0) }} &nbsp;<em>grams of water</em> &times; 1.43 = <strong>{{ this.numberFormat(keithSimpsonGramsOfPlaster, 0) }}</strong> &nbsp;<em>grams of plaster</em>
        </p>
      </div>

      <div>
        <hr/>
        <h4>Andrew Martin's Formula:</h4>
        <p>
          <em>volume in cubic inches</em> / 80 = <em>quarts of water</em>
          <br/>
          <em>quarts of water</em> &times; 3 = <em>pounds of plaster</em>
        </p>
        <p>
          {{ this.numberFormat(calculatedVolume) }} {{ selectedUnits }}<sup>3</sup> / 80 = <strong>{{ this.numberFormat(andrewMartinQuartsOfWater) }}</strong> &nbsp;<em>quarts of water</em>
          <br/>
          {{ this.numberFormat(andrewMartinQuartsOfWater) }} &nbsp;<em>quarts of water</em> &times; 3 = <strong>{{ this.numberFormat(andrewMartinPoundsOfPlaster) }}</strong> &nbsp;<em>pounds of plaster</em>
          ({{ this.numberFormat(poundsToGrams(andrewMartinPoundsOfPlaster)) }}g)
        </p>
      </div>

      <div>
        <hr/>
        <h3>Notes:</h3>
        <h4><a href="https://www.usg.com/">USG's</a> Formula:</h4>
        <p>
          <a href="https://www.usg.com/content/dam/USG_Marketing_Communications/united_states/product_promotional_materials/finished_assets/gypsum-cement-plaster-volume-mix-guide.xlsx">Download the USG Excel calculator.</a>
          <br/>
          The USG calculator contains some pretty esoteric formulas:
          <br/>
          First, calculate a ratio based on the consistency:
          <br/>
          ratio = (-0.00004 &times; <strong><em>consistency</em></strong><sup>3</sup>)
          + (0.0154 &times; <strong><em>consistency</em></strong><sup>2</sup>)
          - (2.23 &times; <strong><em>consistency</em></strong>)
          + 164.25
          <br/>
          Second, calculate pounds of plaster and water from ratio and consistency:
          <br/>
          ratio &times; cubic feet = pounds of plaster
          <br/>
          pounds of plaster * consistency / 100 = pounds of water
        </p>

        <h4>Keith Simpson's Formula:</h4>
        <p>
          <a href="http://www.alfredceramics.com/simpson.html">Keith Simpson, Alfred University</a>:
          <br/>
          Water should be room temperature
          <br/>
          Sift plaster through fingers into water
          <br/>
          Slake plaster for 3 minutes
          <br/>
          Mix for 3 minutes
        </p>

        <h4>Andrew Martin's Formula:</h4>
        <p>
          Simplified technique by Andrew Martin from <a href="https://books.google.com/books/about/The_Essential_Guide_to_Mold_Making_Slip.html?id=X-rtBGDCBb0C">"The Essential Guide to Mold Making & Slip Casting"</a>.
          This technique creates a slightly thicker plaster as Andrew has rounded the required water down to make the calculation simpler and allow for the water to be measured by volume.
        </p>

      </div>
    </div>

    <div class="footer">
      Created by <a href="http://dereka.net">Derek Au</a> on <a href="https://github.com/derekphilipau/vue-plaster-calculator/">Github</a> using <a href="https://vuejs.org/">Vue</a> and <a href="https://cli.vuejs.org/">Vue CLI</a>.  &copy; 2019.
    </div>
  </div>
</template>

<script>
export default {
  name: "VolumeCalculator",
  props: {
    msg: String
  },
  data() {
    return {
      precision: 2,
      /*
      current only supports inches
      units: [
          "inches",
          "feet",
          "millimeters",
          "centimeters",
          "meters"
      ],
      */
      shapes: [
        "Cube",
        "Rectangular Solid",
        "Cone", 
        "Conical Frustum",
        "Cylinder", 
        "Tube",
        "Sphere"
        ],
      consistencies: [
        { value: 160, name: "160" },
        { value: 145, name: "145 Metal Casting" },
        { value: 133, name: "133" },
        { value: 123, name: "123" },
        { value: 114, name: "114" },
        { value: 107, name: "107" },
        { value: 100, name: "100 Hydroperm®" },
        { value: 94, name: "94" },
        { value: 89, name: "89" },
        { value: 84, name: "84" },
        { value: 80, name: "80" },
        { value: 76, name: "76" },
        { value: 73, name: "73 #1 Moulding, #1 Casting" },
        { value: 70, name: "70 #1 Pottery, White Art®" },
        { value: 67, name: "67" },
        { value: 64, name: "64 Puritan® Pottery" },
        { value: 61.5, name: "61.5" },
        { value: 60, name: "60 Duramold®" },
        { value: 59, name: "59" },
        { value: 57, name: "57" },
        { value: 55, name: "55" },
        { value: 53, name: "53" },
        { value: 51.7, name: "51.7" },
        { value: 50, name: "50 Tuf Cal®" },
        { value: 49, name: "49" },
        { value: 47, name: "47" },
        { value: 45.7, name: "45.7 Hydrocal® White. B - Base" },
        { value: 42, name: "42 Hydrocal® A-11, B-11" },
        { value: 40, name: "40 Statuary, Ceramical®, C- Base" },
        { value: 38, name: "38 Ultracal® 30" },
        { value: 37, name: "37" },
        { value: 33.3, name: "33.3 Hydrostone®" },
        { value: 32, name: "32 Tuf Stone®" },
        { value: 30, name: "30" },
        { value: 28, name: "28" },
        { value: 24, name: "24" },
        { value: 21, name: "21 Hydrostone® Super X" },
        { value: 20, name: "20 Drystone®" }
      ],
      selectedUnits: "in",
      selectedShape: "Rectangular Solid",
      selectedConsistency: 70,
      radius: null,
      bottomRadius: null,
      height: null,
      length: null,
      width: null,
      outerDiameter: null,
      innerDiameter: null
    };
  },
  computed: {
    calculatedVolume: function() {
      // For now assume inches
      if (this.selectedShape === "Sphere" && this.radius) {
        return (4/3)*Math.PI*Math.pow(this.radius, 3);
      }
      else if (this.selectedShape === "Cone" && this.radius && this.height) {
        return (1/3)*Math.PI*Math.pow(this.radius, 2)*this.height;
      }
      else if (this.selectedShape === "Conical Frustum" && this.radius && this.height) {
        return (1/3)*Math.PI*this.height*(Math.pow(this.radius, 2) + (this.radius * this.bottomRadius) + Math.pow(this.bottomRadius, 2));
      }
      else if (this.selectedShape === "Cylinder" && this.radius && this.height) {
        return Math.PI*Math.pow(this.radius, 2)*this.height;
      }
      else if (this.selectedShape === "Tube" && this.innerDiameter && this.outerDiameter && this.length) {
        return Math.PI*((Math.pow(this.outerDiameter, 2)-Math.pow(this.innerDiameter, 2))/4)*this.length;
      }
      else if (this.selectedShape === "Cube" && this.length) {
        return Math.pow(this.length, 3);
      }
      else if (this.selectedShape === "Rectangular Solid" && this.length && this.width && this.height) {
        return this.length*this.width*this.height
      }
      return 0;
    },
    calculatedVolumeCubicFeet: function() {
      return this.calculatedVolume / 1728;
    },
    andrewMartinQuartsOfWater: function() {
      return this.calculatedVolume / 80;
    },
    andrewMartinPoundsOfPlaster: function() {
      return this.andrewMartinQuartsOfWater * 3;
    },
    keithSimpsonGramsOfWater: function() {
      return this.calculatedVolume * 11;
    },
    keithSimpsonGramsOfPlaster: function() {
      // return this.keithSimpsonGramsOfWater * 1.43;
      return this.keithSimpsonGramsOfWater * (100 / this.selectedConsistency);
    },
    usgPoundsOfPlaster: function() {
      // -0.00004*($E$13^3)+0.0154*($E$13^2)-2.23*($E$13)+164.25
      let mysterious = (-0.00004*Math.pow(this.selectedConsistency, 3))
                      + (0.0154*Math.pow(this.selectedConsistency, 2))
                      - (2.23*this.selectedConsistency)
                      + 164.25;
      return mysterious * this.calculatedVolumeCubicFeet;
    },
    usgPoundsOfWater: function() {
      return this.usgPoundsOfPlaster * this.selectedConsistency / 100;
    },
    shapeImageSource: function() {
      if (this.selectedShape) {
        return "./img/shapes/" + this.selectedShape.replace(/\s/g, '') + ".png";
      }
      return null;
    }
  },
  watch: {
  },
  methods: {
    poundsToGrams: function(pounds) {
      return pounds * 453.592;
    },
    numberFormat: function(x, precision = this.precision) {
      if (x) {
        return this.numberWithCommas(Number(x).toFixed(precision));
      }
      return 0;
    },
    // https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
    numberWithCommas: function(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input[type="number"]
{
  font-size: 16px;
  width: 70px;
}
select {
  font-size: 16px;
}
.footer {
  margin: 40px 0;
}
</style>
