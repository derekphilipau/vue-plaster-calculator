<template>
  <div class="pcontainer">
    <div class="lang-selector">
      <LocaleChanger />
    </div>
    <div class="pcalc">

      <h1 class="app-title">{{ $t('title') }}</h1>

      <VolumeCalculator :selectedUnits="selectedUnits" v-on:volumeChange="updateVolume"/>

      <div class="input-group">
        <input v-model="selectedUnits" type="radio" id="unitsIn" name="units" value="in"
              checked>
        <label for="unitsIn">{{ $t('inches') }}</label>

        <input v-model="selectedUnits" type="radio" id="unitsCm" name="units" value="cm">
        <label for="unitsCm">{{ $t('centimeters') }}</label>
      </div>

      <div class="input-group">
        {{ $t('volume') }}
        <input id="volume-input" type="number" v-model="volume" @focus="$event.target.select()">
        {{ selectedUnits }}<sup>3</sup>
      </div>

      <div class="input-group">
        <small>
        <em>
          <span v-if="volume && selectedUnits === 'in'">
            ({{ Number(volumeCubicCentimeters).toFixed(2) }} cm<sup>3</sup>,
            {{ Number(volumeCubicFeet).toFixed(5) }} ft<sup>3</sup>)
          </span>
          <span v-if="volume && selectedUnits === 'cm'">
            ({{ Number(volumeCubicInches).toFixed(2) }} in<sup>3</sup>,
            {{ Number(volumeCubicFeet).toFixed(5) }} ft<sup>3</sup>)
          </span>
        </em>
        </small>
      </div>

      <div class="center-content">
        <div class="consistency">
          {{ $t('plasterType') }}
          <v-select
            class="consistency-vs"
            :options="consistencies"
            v-model="vSelectConsistency"
            @input="setConsistency"
            >
            <template v-slot:option="option">
              {{ option.label }}
              <div class="reccon">Recommended consistency: {{ option.consistency }}</div>
            </template>
          </v-select>
        </div>
      </div>

      <div class="input-group">
        {{ $t('enterConsistency') }}
        <input type="number" v-model="selectedConsistency" @focus="$event.target.select()">
      </div>

      <div v-if="volume">

        <div class="results-container">
          <h3>
            Keith Simpson
            <br/>
            (recommended for potters)
          </h3>
          <h4>
            <strong>{{ this.numberFormat(keithSimpsonGramsOfWater, 0) }}</strong>
            {{ $t('grams') }} {{ $t('water') }}
          </h4>
          <h4>
            <strong>{{ this.numberFormat(keithSimpsonGramsOfPlaster, 0) }}</strong>
            {{ $t('grams') }} {{ $t('plaster') }}
          </h4>
        </div>

        <div class="results-container">
          <h3>USG</h3>
          <h4>
            <strong>{{ this.numberFormat(usgPoundsOfWater) }}</strong>
            {{ $t('pounds') }} {{ $t('water') }}
            ({{ this.numberFormat(poundsToGrams(usgPoundsOfWater)) }} {{ $t('grams') }})
          </h4>
          <h4>
            <strong>{{ this.numberFormat(usgPoundsOfPlaster) }}</strong>
            {{ $t('pounds') }} {{ $t('plaster') }}
            ({{ this.numberFormat(poundsToGrams(usgPoundsOfPlaster)) }} {{ $t('grams') }})
          </h4>
        </div>

        <div class="results-container">
          <h3>Andrew Martin</h3>
          <h4>
            <strong>{{ this.numberFormat(andrewMartinQuartsOfWater) }}</strong>
            {{ $t('quarts') }} {{ $t('water') }}
            ({{ this.numberFormat(quartsToGrams(andrewMartinQuartsOfWater)) }} {{ $t('grams') }})
          </h4>
          <h4>
            <strong>{{ this.numberFormat(andrewMartinPoundsOfPlaster) }}</strong>
            {{ $t('pounds') }} {{ $t('plaster') }}
            ({{ this.numberFormat(poundsToGrams(andrewMartinPoundsOfPlaster)) }} {{ $t('grams') }})
          </h4>
        </div>

        <div class="results-container">
          <h3>Bivins/Campana</h3>
          <h4>
            <strong>{{ this.numberFormat(campanaGramsOfWater) }}</strong>
            {{ $t('grams') }} {{ $t('water') }}
          </h4>
          <h4>
            <strong>{{ this.numberFormat(campanaGramsOfPlaster) }}</strong>
            {{ $t('grams') }} {{ $t('plaster') }}
          </h4>
        </div>

        <div class="results-container">
          <h3>
            Derek Au
            <br/>
            (tested at 70 consistency)
          </h3>
          <h4>
            <strong>{{ this.numberFormat(derekGramsOfWater) }}</strong>
            {{ $t('grams') }} {{ $t('water') }}
          </h4>
          <h4>
            <strong>{{ this.numberFormat(derekGramsOfPlaster) }}</strong>
            {{ $t('grams') }} {{ $t('plaster') }}
          </h4>
        </div>

      </div>

      <div class="section-container">
        <h2>{{ $t('notes') }}</h2>

        <p v-html="$t('notes1')"></p>
        <p v-html="$t('notes2')"></p>
        <p v-html="$t('notes3')"></p>

        <h3><a href="https://www.simpsonstudio.us/about">Keith Simpson</a></h3>
        <p>
          <em>volume in cubic inches</em> &times; 11 = <em>grams of water</em>
          <br/>
          <em>grams of water</em> &times; (100 / consistency) = <em>grams of Pottery Plaster</em>
        </p>
        <p v-if="volume">
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

        <h3><a href="https://www.usg.com/">USG</a></h3>
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
        <p v-if="volume">
          ratio = (-0.00004 &times; <strong><em>{{ selectedConsistency }}</em></strong><sup>3</sup>)
          + (0.0154 &times; <strong><em>{{ selectedConsistency }}</em></strong><sup>2</sup>)
          - (2.23 &times; <strong><em>{{ selectedConsistency }}</em></strong>)
          + 164.25 = <strong><em>{{ Number(usgRatio).toFixed(2) }}</em></strong>
          <br/>
          {{ Number(usgRatio).toFixed(2) }}  &times; {{ Number(volumeCubicFeet).toFixed(5) }} ft<sup>3</sup> =  <strong>{{ this.numberFormat(usgPoundsOfPlaster) }}</strong> lbs. plaster
          <br/>
          <strong>{{ this.numberFormat(usgPoundsOfPlaster) }}</strong> lbs. plaster  &times; ({{ selectedConsistency }} / 100) =  <strong>{{ this.numberFormat(usgPoundsOfWater) }}</strong> lbs. water
        </p>

        <h3>Andrew Martin</h3>
        <p>
          <em>volume in cubic inches</em> / 80 = <em>quarts of water</em>
          <br/>
          <em>quarts of water</em> &times; 3 = <em>pounds of plaster</em>
        </p>
        <p v-if="volume">
          {{ this.numberFormat(volumeCubicInches) }} in<sup>3</sup> / 80 = <strong>{{ this.numberFormat(andrewMartinQuartsOfWater) }}</strong> qts. water
          <br/>
          {{ this.numberFormat(andrewMartinQuartsOfWater) }} qts. water &times; 3 = <strong>{{ this.numberFormat(andrewMartinPoundsOfPlaster) }}</strong> lbs. plaster
          ({{ this.numberFormat(poundsToGrams(andrewMartinPoundsOfPlaster)) }}g)
        </p>
        <p>
          <em>Keith Simpson's notes:</em> Simplified technique by Andrew Martin from <a href="https://books.google.com/books/about/The_Essential_Guide_to_Mold_Making_Slip.html?id=X-rtBGDCBb0C">"The Essential Guide to Mold Making & Slip Casting"</a>.
          This technique creates a slightly thicker plaster as Andrew has rounded the required water down to make the calculation simpler and allow for the water to be measured by volume.
        </p>


        <h3><a href="https://nicholasbivins.com/">Nick Bivins</a> & <a href="https://jeffcampana.com/">Jeff Campana</a></h3>
        <p>
          <em>volume in cubic centimeters</em> &times; 0.6 = <em>grams of water</em>
          <br/>
          <em>grams of water</em> &times; (100 / {{ selectedConsistency }}) = <em>grams of plaster</em>
        </p>
        <p v-if="volume">
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
        <p v-if="volume">
          <em>volume in cubic centimeters</em> &times; 15000 / 15860  = <strong>{{ this.numberFormat(derekGramsOfPlaster) }}</strong> <em>grams of plaster</em>
          <br/>
          <em>grams of plaster</em> &times; {{ selectedConsistency }} / 100 = <strong>{{ this.numberFormat(derekGramsOfWater) }}</strong> <em>grams of water</em>
        </p>
      </div>

      <div class="section-container">
        <h2>{{ $t('links') }}</h2>
        <p>
          USG:
          <a href="https://plaster.com/product-comparison-chart/">Plaster Chart</a>,
          <a href="https://plaster.com/videos/">Videos</a>
        </p>
        <p>
          Georgia Pacific Plasters:
          <a href="http://gpindustrialplasters.com/pottery-plaster/">Plaster Chart</a>
        </p>
      </div>

      <div class="footer">
        <p>
          <a href="https://glazy.org">
            <svg class="logo" xmlns="http://www.w3.org/2000/svg" width="399.072" height="345.607" viewBox="10.233 37.431 399.072 345.607" xml:space="preserve" fill="currentColor">
              <path d="M151.689 383.039c-4.538-49.805 1.951-118.691 56.465-138.515 61.487-22.36 103.53 32.957 117.281 86.483l10.934.009c-17.133-71.619-66.557-123.375-124.856-123.375-71.719 0-128.969 72.142-128.34 175.398v-.001h-72.94L209.769 37.431l199.536 345.607H151.689v.001z"/>
            </svg>
          </a>
          <br/>
          <a href="https://glazy.org">glazy.org</a>
        </p>
        <p>
          Find this useful?
          <a href="https://www.paypal.com/donate/?cmd=_donations&business=VN8HBLPQG6N3E&currency_code=USD&source=url">Buy me a cup of coffee!</a>
        </p>
        <p>
          &copy;{{ new Date().getFullYear() }}, <a href="https://derekau.net">Derek Au</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import VolumeCalculator from './VolumeCalculator.vue';
import LocaleChanger from './LocaleChanger.vue';

export default {
  name: "PlasterCalculator",
  components: {
    VolumeCalculator,
    LocaleChanger,
  },
  data() {
    return {
      precision: 2,
      consistencies: [
        { value: 145, label: "USG Metal Casting", consistency: "145" },
        { value: 100, label: "USG Hydroperm®", consistency: "100" },
        { value: 73, label: "USG #1 Moulding, #1 Casting", consistency: "73" },
        { value: 70, label: "USG #1 Pottery, White Art®", consistency: "70" },
        { value: 64, label: "USG Puritan® Pottery", consistency: "64" },
        { value: 60, label: "USG Duramold®", consistency: "60" },
        { value: 50, label: "USG Tuf Cal®", consistency: "50" },
        { value: 45.7, label: "USG Hydrocal® White. B - Base", consistency: "45.7" },
        { value: 42, label: "USG Hydrocal® A-11, B-11", consistency: "42" },
        { value: 40, label: "USG Statuary, Ceramical®, C- Base", consistency: "40" },
        { value: 38, label: "USG Ultracal® 30", consistency: "38" },
        { value: 36, label: "USG Densite® K-33 Plaster", consistency: "36" },
        { value: 33.3, label: "USG Hydrostone®", consistency: "33.3" },
        { value: 32, label: "USG Tuf Stone®", consistency: "32" },
        { value: 21, label: "USG Hydrostone® Super X", consistency: "21" },
        { value: 20, label: "USG Drystone®", consistency: "20" },
        { value: 70, label: "GP K-55 Pottery Plaster", consistency: "70-75" },
        { value: 70, label: "GP K-58 Pottery Plaster", consistency: "70" },
        { value: 68, label: "GP K-59 Pottery Plaster", consistency: "68-70" },
        { value: 67, label: "GP K-60 Pottery Plaster", consistency: "67" },
        { value: 66, label: "GP K-62 Pottery Plaster", consistency: "66" },
        { value: 55, label: "GP K-63 Pottery Plaster", consistency: "55-57" },
        { value: 45, label: "GP Denscal® TL Plaster", consistency: "45" },
        { value: 40, label: "GP Densite® K-25 Plaster", consistency: "40" },
        { value: 36, label: "GP Densite® K-40 Plaster, Ram Plaster", consistency: "36-40" },
        { value: 36, label: "GP Densite® K-13 Plaster", consistency: "36-38" },
        { value: 36, label: "GP Densite® K-12 Low Expansion Plaster", consistency: "36-37" },
        { value: 35, label: "Saint-Gobain Formula Crystacal R", consistency: "35" },
        { value: 36, label: "Saint-Gobain Formula Keramicast", consistency: "36" },
        { value: 57, label: "Saint-Gobain Formula Newcast 96", consistency: "57" },
        { value: 68, label: "Saint-Gobain Formula Pottery Plaster", consistency: "68" },
        { value: 70, label: "Saint-Gobain Formula Fine Caster Plaster", consistency: "70" },
      ],
      selectedUnits: "cm",
      vSelectConsistency: { value: 70, label: "USG #1 Pottery, White Art®", consistency: "70" },
      selectedConsistency: 70,
      volume: '',
    };
  },
  computed: {
    volumeCubicCentimeters() {
      let vol = this.volume;
      if (this.selectedUnits === "in") {
        vol = this.cubicInchesToCubicCentimeters(vol);
      }
      return vol;
    },
    volumeCubicFeet() {
      let vol = this.volume;
      if (this.selectedUnits === "cm") {
        vol = this.cubicCentimetersToCubicInches(vol);
      }
      return vol / 1728;
    },
    volumeCubicInches() {
      let vol = this.volume;
      if (this.selectedUnits === "cm") {
        vol = this.cubicCentimetersToCubicInches(vol);
      }
      return vol;
    },
    andrewMartinQuartsOfWater() {
      return this.volumeCubicInches / 80;
    },
    andrewMartinPoundsOfPlaster() {
      return this.andrewMartinQuartsOfWater * 3;
    },
    keithSimpsonGramsOfWater() {
      return this.volumeCubicInches * 11;
    },
    keithSimpsonGramsOfPlaster() {
      // return this.keithSimpsonGramsOfWater * 1.43;
      return this.keithSimpsonGramsOfWater * (100 / this.selectedConsistency);
    },
    usgRatio() {
      // -0.00004*($E$13^3)+0.0154*($E$13^2)-2.23*($E$13)+164.25
      return (-0.00004*Math.pow(this.selectedConsistency, 3))
              + (0.0154*Math.pow(this.selectedConsistency, 2))
              - (2.23*this.selectedConsistency)
              + 164.25;
    },
    usgPoundsOfPlaster() {
      return this.usgRatio * this.volumeCubicFeet;
    },
    usgPoundsOfWater() {
      return this.usgPoundsOfPlaster * this.selectedConsistency / 100;
    },
    campanaGramsOfWater() {
      return this.volumeCubicCentimeters * 0.6;
    },
    campanaGramsOfPlaster() {
      return this.campanaGramsOfWater * (100 / this.selectedConsistency);
    },
    derekGramsOfWater() {
      // 15860 cm3 = 15000g plaster
      return this.derekGramsOfPlaster * this.selectedConsistency / 100;
    },
    derekGramsOfPlaster() {
      return this.volumeCubicCentimeters * 15000 / 15860;
    }
  },
  mounted() {
    if (this.$i18n.locale === "en") {
      this.selectedUnits = 'in';
    }
  },
  methods: {
    updateVolume(val) {
      if (val) {
        this.volume = Number(val).toFixed(2);
      }
      else {
        this.volume = '';
      }
    },
    poundsToGrams(pounds) {
      return pounds * 453.592;
    },
    quartsToGrams(quarts) {
      return quarts * 946.35295;
    },
    cubicInchesToCubicCentimeters(cubicInches) {
      return cubicInches * 16.387;
    },
    cubicCentimetersToCubicInches(cubicCentimeters) {
      return cubicCentimeters / 16.387;
    },
    numberFormat(x, precision = this.precision) {
      if (x) {
        return this.numberWithCommas(Number(x).toFixed(precision));
      }
      return 0;
    },
    // https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
    numberWithCommas(x) {
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
.pcontainer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.pcalc {
  max-width: 700px;
  width: 100%;
}
.lang-selector {
  position: absolute;
  top: 6px;
  right: 6px;
}
.app-title {
  color: #ff3333;
  margin-top: 5px;
}
.results-container {
  margin: 20px 10px;
  border: 1px solid #000000;
}
.results-container h3 {
  color: #ff3333;
  font-size: 1em;
  margin-block-start: 1em;
  margin-block-end: 0.5em;
}
.results-container h4 {
  font-weight: normal;
  font-size: 1.25em;
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;
}
.section-container {
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
.input-group {
  margin: 10px 0;
}
.center-content {
  display: flex;
  justify-content: center;
}
.consistency {
  min-width: 300px;
}
.consistency-vs {
  margin-bottom: 10px;
}
.consistency-vs .vs__search::placeholder,
.consistency-vs .vs__dropdown-toggle,
.consistency-vs .vs__dropdown-menu {
  background-color: #ffffff;
}
.reccon {
  font-size: small;
  font-style: italic;
  color: #888;
}
.vs__dropdown-option--highlight .reccon {
  color: #ddd;
}
.footer {
  width: 100%;
  margin: 40px 0;
}
.logo {
  color: #ff7d00;
  width: 80px;
  height: 69px;
}
</style>
