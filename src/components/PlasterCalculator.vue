<template>
  <div>
    <h1 class="app-title">plaster calculator</h1>

    <VolumeCalculator :selectedUnits="selectedUnits" v-on:volumeChange="updateVolume"/>

    <div>
      <p>
        Units of Measurement:
        <select v-model="selectedUnits">
          <option value="in" >in</option>
          <option value="cm" >cm</option>
        </select>
      </p>
      <p>
        <strong>
          Volume =
          <input type="number" v-model="volume" @focus="$event.target.select()">
          {{ selectedUnits }}<sup>3</sup>
          <br/>
          <span v-if="volume && selectedUnits === 'in'">
            ({{ Number(volumeCubicCentimeters).toFixed(2) }} cm<sup>3</sup>,
            {{ Number(volumeCubicFeet).toFixed(5) }} ft<sup>3</sup>)
          </span>
          <span v-if="volume && selectedUnits === 'cm'">
            ({{ Number(volumeCubicInches).toFixed(2) }} in<sup>3</sup>,
            {{ Number(volumeCubicFeet).toFixed(5) }} ft<sup>3</sup>)
          </span>
        </strong>
      </p>
    </div>

    <div class="center-content">
      <div class="consistency">
        Enter consistency:
        <input type="number" v-model="selectedConsistency" @focus="$event.target.select()">
        <br/>
        Or, select plaster type:
        <v-select
          class="consistency-vs"
          :options="consistencies"
          v-model="vSelectConsistency"
          @input="setConsistency"
          >
        </v-select>
      </div>
    </div>

    <div v-if="volume">

      <div class="results-container">
        <h4>Keith Simpson, Alfred University (recommended)</h4>
        <p>
          <strong>{{ this.numberFormat(keithSimpsonGramsOfWater, 0) }}</strong> g water
          <br/>
          <strong>{{ this.numberFormat(keithSimpsonGramsOfPlaster, 0) }}</strong> g plaster
        </p>
      </div>

      <div class="results-container">
        <h4>USG</h4>
        <p>
          <strong>{{ this.numberFormat(usgPoundsOfWater) }}</strong> lbs. water
          ({{ this.numberFormat(poundsToGrams(usgPoundsOfWater)) }} g)
          <br/>
          <strong>{{ this.numberFormat(usgPoundsOfPlaster) }}</strong> lbs. plaster
          ({{ this.numberFormat(poundsToGrams(usgPoundsOfPlaster)) }} g)
        </p>
      </div>

      <div class="results-container">
        <h4>Andrew Martin</h4>
        <p>
          <strong>{{ this.numberFormat(andrewMartinQuartsOfWater) }}</strong> qts. water
          ({{ this.numberFormat(quartsToGrams(andrewMartinQuartsOfWater)) }} g)
          <br/>
          <strong>{{ this.numberFormat(andrewMartinPoundsOfPlaster) }}</strong> lbs. plaster
          ({{ this.numberFormat(poundsToGrams(andrewMartinPoundsOfPlaster)) }} g)
        </p>
      </div>

      <div class="results-container">
        <h4>Bivins/Campana</h4>
        <p>
          <strong>{{ this.numberFormat(campanaGramsOfWater) }}</strong> g water
          <br/>
          <strong>{{ this.numberFormat(campanaGramsOfPlaster) }}</strong> g plaster
        </p>
      </div>

      <div class="results-container">
        <h4>Derek Au</h4>
        <p>
          <strong>{{ this.numberFormat(derekGramsOfWater) }}</strong> g water
          <br/>
          <strong>{{ this.numberFormat(derekGramsOfPlaster) }}</strong> g plaster
        </p>
      </div>

      <div class="notes-container">
        <h2>Notes</h2>

        <h3>Keith Simpson's Formula:</h3>
        <p>
          <a href="http://www.alfredceramics.com/simpson.html">Keith Simpson, Alfred University</a>:
          <br/>
          <em>volume in cubic inches</em> &times; 11 = <em>grams of water</em>
          <br/>
          <em>grams of water</em> &times; (100 / consistency) = <em>grams of Pottery Plaster</em>
        </p>
        <p>
          {{ this.numberFormat(volumeCubicInches) }} in<sup>3</sup> &times; 11 = <strong>{{ this.numberFormat(keithSimpsonGramsOfWater, 0) }}</strong> g water
          <br/>
          {{ this.numberFormat(keithSimpsonGramsOfWater, 0) }} g water &times; (100 / {{ selectedConsistency }}) = <strong>{{ this.numberFormat(keithSimpsonGramsOfPlaster, 0) }}</strong> g plaster
        </p>
        <p>
          Water should be room temperature
          <br/>
          Sift plaster through fingers into water
          <br/>
          Slake plaster for 3 minutes
          <br/>
          Mix for 3 minutes
        </p>

        <h3><a href="https://www.usg.com/">USG's</a> Formula:</h3>
        <p>
          <a href="https://www.usg.com/content/dam/USG_Marketing_Communications/united_states/product_promotional_materials/finished_assets/gypsum-cement-plaster-volume-mix-guide.xlsx">Download the USG Excel calculator.</a>
          <br/>
          The USG calculator first calculates a ratio based on consistency and then the amounts of plaster and water:
          <br/>
          <em>ratio</em> = (-0.00004 &times; <strong><em>consistency</em></strong><sup>3</sup>)
          + (0.0154 &times; <strong><em>consistency</em></strong><sup>2</sup>)
          - (2.23 &times; <strong><em>consistency</em></strong>)
          + 164.25
          <br/>
          <em>ratio</em> &times; <em>cubic feet</em> = <em>pounds of plaster</em>
          <br/>
          <em>pounds of plaster</em> &times; <em>consistency</em> / 100 = <em>pounds of water</em>
        </p>
        <p>
          ratio = (-0.00004 &times; <strong><em>{{ selectedConsistency }}</em></strong><sup>3</sup>)
          + (0.0154 &times; <strong><em>{{ selectedConsistency }}</em></strong><sup>2</sup>)
          - (2.23 &times; <strong><em>{{ selectedConsistency }}</em></strong>)
          + 164.25 = <strong><em>{{ Number(usgRatio).toFixed(2) }}</em></strong>
          <br/>
          {{ Number(usgRatio).toFixed(2) }}  &times; {{ Number(volumeCubicFeet).toFixed(5) }} ft<sup>3</sup> =  <strong>{{ this.numberFormat(usgPoundsOfPlaster) }}</strong> lbs. plaster
          <br/>
          <strong>{{ this.numberFormat(usgPoundsOfPlaster) }}</strong> lbs. plaster  &times; ({{ selectedConsistency }} / 100) =  <strong>{{ this.numberFormat(usgPoundsOfWater) }}</strong> lbs. water
        </p>

        <h3>Andrew Martin's Formula:</h3>
        <p>
          <em>volume in cubic inches</em> / 80 = <em>quarts of water</em>
          <br/>
          <em>quarts of water</em> &times; 3 = <em>pounds of plaster</em>
        </p>
        <p>
          {{ this.numberFormat(volumeCubicInches) }} in<sup>3</sup> / 80 = <strong>{{ this.numberFormat(andrewMartinQuartsOfWater) }}</strong> qts. water
          <br/>
          {{ this.numberFormat(andrewMartinQuartsOfWater) }} qts. water &times; 3 = <strong>{{ this.numberFormat(andrewMartinPoundsOfPlaster) }}</strong> lbs. plaster
          ({{ this.numberFormat(poundsToGrams(andrewMartinPoundsOfPlaster)) }}g)
        </p>
        <p>
          <em>Keith Simpson's notes:</em> Simplified technique by Andrew Martin from <a href="https://books.google.com/books/about/The_Essential_Guide_to_Mold_Making_Slip.html?id=X-rtBGDCBb0C">"The Essential Guide to Mold Making & Slip Casting"</a>.
          This technique creates a slightly thicker plaster as Andrew has rounded the required water down to make the calculation simpler and allow for the water to be measured by volume.
        </p>


        <h3><a href="https://nicholasbivins.com/">Nick Bivins</a> & <a href="https://jeffcampana.com/">Jeff Campana</a> Method:</h3>
        <p>
          <em>volume in cubic centimeters</em> &times; 0.6 = <em>grams of water</em>
          <br/>
          <em>grams of water</em> &times; (100 / {{ selectedConsistency }}) = <em>grams of plaster</em>
        </p>
        <p>
          {{ this.numberFormat(volumeCubicCentimeters) }} cm<sup>3</sup> &times; 0.6 = <strong>{{ this.numberFormat(campanaGramsOfWater) }}</strong> g water
          <br/>
          {{ this.numberFormat(campanaGramsOfWater) }} g water &times; (100 / {{ selectedConsistency }}) = <strong>{{ this.numberFormat(campanaGramsOfPlaster) }}</strong> g plaster
        </p>

        <h3>Derek Au:</h3>
        <p>
          <em>Experimental.  Needs more data!</em>
        </p>
        <p>
          This method is based on test batches with known quantities of plaster and water
          and precise measurements of the resulting plaster volume.  Currently only
          one test has been performed with Pottery Plaster #1 at 70 consistency.
        </p>
        <p>
          Notes: With a batch of 15kg fresh Pottery Plaster #1 and 10.5kg water
          (70 consistency),
          plaster was sifted into water and then soaked for 1 minute,
          then mixed with a drill and Jiffy mixer attachment for 5 minutes,
          hand-mixed until plaster just began to set,
          then gently poured onto a flat, level surface bordered by coddles forming a rectangular
          space of 45.7cm x 82.63cm, the resulting plaster slab measured 45.7cm x 82.63cm x 4.2cm,
          or <em>15860 cm<sup>3</sup></em>
        </p>
        <p>
          <em>volume in cubic centimeters</em> &times; 15000 / 15860  = <strong>{{ this.numberFormat(derekGramsOfPlaster) }}</strong> <em>grams of plaster</em>
          <br/>
          <em>grams of plaster</em> &times; {{ selectedConsistency }} / 100 = <strong>{{ this.numberFormat(derekGramsOfWater) }}</strong> <em>grams of water</em>
        </p>

      </div>
    </div>

    <div class="footer">
      <p>
        <a href="https://glazy.org"><i class="icon icon-logo-footer icon-logo"/></a>
        <br/>
        <a href="https://glazy.org">https://glazy.org</a>
      </p>
      Created by <a href="http://derekau.net">Derek Au</a>
      on <a href="https://github.com/derekphilipau/vue-plaster-calculator/">Github</a>
      using <a href="https://vuejs.org/">Vue</a> and <a href="https://cli.vuejs.org/">Vue CLI</a>.
      &copy;{{ new Date().getFullYear() }}
    </div>
  </div>
</template>

<script>
import VolumeCalculator from './VolumeCalculator.vue'

export default {
  name: "PlasterCalculator",
  props: {
    msg: String
  },
  components: {
    VolumeCalculator
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
        { value: 145, label: "145: USG Metal Casting" },
        { value: 100, label: "100: USG Hydroperm®" },
        { value: 73, label: "73: USG #1 Moulding, #1 Casting" },
        { value: 70, label: "70-75: GP K-55 Pottery Plaster" },
        { value: 70, label: "70: GP K-58 Pottery Plaster" },
        { value: 70, label: "70: USG #1 Pottery, White Art®" },
        { value: 68, label: "68-70: GP K-59 Pottery Plaster" },
        { value: 67, label: "67: GP K-60 Pottery Plaster" },
        { value: 66, label: "66: GP K-62 Pottery Plaster" },
        { value: 64, label: "64: USG Puritan® Pottery" },
        { value: 60, label: "60: USG Duramold®" },
        { value: 55, label: "55-57: GP K-63 Pottery Plaster" },
        { value: 50, label: "50: USG Tuf Cal®" },
        { value: 45.7, label: "45.7: USG Hydrocal® White. B - Base" },
        { value: 45, label: "45: GP Denscal® TL Plaster" },
        { value: 42, label: "42: USG Hydrocal® A-11, B-11" },
        { value: 40, label: "40: GP Densite® K-25 Plaster" },
        { value: 40, label: "40: USG Statuary, Ceramical®, C- Base" },
        { value: 38, label: "38: USG Ultracal® 30" },
        { value: 36, label: "36-40: GP Densite® K-40 Plaster, Ram Plaster" },
        { value: 36, label: "36-38: GP Densite® K-13 Plaster" },
        { value: 36, label: "36-37: GP Densite® K-12 Low Expansion Plaster" },
        { value: 36, label: "36: USG Densite® K-33 Plaster" },
        { value: 33.3, label: "33.3: USG Hydrostone®" },
        { value: 32, label: "32: USG Tuf Stone®" },
        { value: 21, label: "21: USG Hydrostone® Super X" },
        { value: 20, label: "20: USG Drystone®" }
      ],
      selectedUnits: "in",
      selectedShape: "Rectangular Solid",
      vSelectConsistency: { value: 70, label: "70: GP K-58 Pottery Plaster" },
      selectedConsistency: 70,
      volume: '',
    };
  },
  computed: {
    volumeCubicCentimeters: function() {
      let vol = this.volume;
      if (this.selectedUnits === "in") {
        vol = this.cubicInchesToCubicCentimeters(vol);
      }
      return vol;
    },
    volumeCubicFeet: function() {
      let vol = this.volume;
      if (this.selectedUnits === "cm") {
        vol = this.cubicCentimetersToCubicInches(vol);
      }
      return vol / 1728;
    },
    volumeCubicInches: function() {
      let vol = this.volume;
      if (this.selectedUnits === "cm") {
        vol = this.cubicCentimetersToCubicInches(vol);
      }
      return vol;
    },
    andrewMartinQuartsOfWater: function() {
      return this.volumeCubicInches / 80;
    },
    andrewMartinPoundsOfPlaster: function() {
      return this.andrewMartinQuartsOfWater * 3;
    },
    keithSimpsonGramsOfWater: function() {
      return this.volumeCubicInches * 11;
    },
    keithSimpsonGramsOfPlaster: function() {
      // return this.keithSimpsonGramsOfWater * 1.43;
      return this.keithSimpsonGramsOfWater * (100 / this.selectedConsistency);
    },
    usgRatio: function() {
      // -0.00004*($E$13^3)+0.0154*($E$13^2)-2.23*($E$13)+164.25
      return (-0.00004*Math.pow(this.selectedConsistency, 3))
              + (0.0154*Math.pow(this.selectedConsistency, 2))
              - (2.23*this.selectedConsistency)
              + 164.25;
    },
    usgPoundsOfPlaster: function() {
      return this.usgRatio * this.volumeCubicFeet;
    },
    usgPoundsOfWater: function() {
      return this.usgPoundsOfPlaster * this.selectedConsistency / 100;
    },
    campanaGramsOfWater: function() {
      return this.volumeCubicCentimeters * 0.6;
    },
    campanaGramsOfPlaster: function() {
      return this.campanaGramsOfWater * (100 / this.selectedConsistency);
    },
    derekGramsOfWater: function() {
      // 15860 cm3 = 15000g plaster
      return this.derekGramsOfPlaster * this.selectedConsistency / 100;
    },
    derekGramsOfPlaster: function() {
      return this.volumeCubicCentimeters * 15000 / 15860;
    },
    shapeImageSource: function() {
      if (this.selectedShape) {
        return "./img/shapes/" + this.selectedShape.replace(/\s/g, '') + ".png";
      }
      return null;
    }
  },
  methods: {
    updateVolume: function (val) {
      if (val) {
        this.volume = Number(val).toFixed(2);
      }
      else {
        this.volume = '';
      }
    },
    poundsToGrams: function(pounds) {
      return pounds * 453.592;
    },
    quartsToGrams: function(quarts) {
      return quarts * 946.35295;
    },
    cubicInchesToCubicCentimeters: function(cubicInches) {
      return cubicInches * 16.387;
    },
    cubicCentimetersToCubicInches: function(cubicCentimeters) {
      return cubicCentimeters / 16.387;
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
    },
    setConsistency() {
      if (this.vSelectConsistency) {
        this.selectedConsistency = this.vSelectConsistency.value;
      }
    }
  }
};
</script>

<style>
.app-title {
  color: #ff3333;
}
.icon-logo-footer {
  font-size: 50px;
  line-height: 50px;
  color: #ff7d00;
}
.results-container {
  margin: 20px 10px;
  border: 1px solid #000000;
}
.results-container h4 {
  color: #ff3333;
}
.notes-container {
  padding-top: 20px;
}
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
.center-content {
  display: flex;
  justify-content: center;
}
.consistency {
  min-width: 300px;
}
.consistency-vs .vs__search::placeholder,
.consistency-vs .vs__dropdown-toggle,
.consistency-vs .vs__dropdown-menu {
  background-color: #ffffff;
}
</style>
