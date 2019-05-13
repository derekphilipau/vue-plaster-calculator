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
      <strong>Volume = {{ this.numberFormat(calculatedVolume) }} {{ selectedUnits }}<sup>3</sup></strong>
    </div>
    <div v-if="calculatedVolume">
      <div>
        <hr/>
        <h4><a href="https://books.google.com/books/about/The_Essential_Guide_to_Mold_Making_Slip.html?id=X-rtBGDCBb0C">Andrew Martin, "The Essential Guide to Mold Making & Slip Casting"</a></h4>
        <p>
          <em>volume in cubic inches</em> / 80 = <em>quarts of water</em>
          <br/>
          <em>quarts of water</em> &times; 3 = <em>pounds of plaster</em>
        </p>
        <p>
          {{ this.numberFormat(calculatedVolume) }} {{ selectedUnits }}<sup>3</sup> / 80 = <strong>{{ this.numberFormat(quartsOfWater) }}</strong> &nbsp;<em>quarts of water</em>
          <br/>
          {{ this.numberFormat(quartsOfWater) }} &nbsp;<em>quarts of water</em> &times; 3 = <strong>{{ this.numberFormat(poundsOfPlaster) }}</strong> &nbsp;<em>pounds of plaster</em>
        </p>
      </div>

      <div>
        <hr/>
        <h4><a href="http://www.alfredceramics.com/simpson.html">Keith Simpson</a>, Alfred University</h4>
        <p>
          <em>volume in cubic inches</em> &times; 11 = <em>grams of water</em>
          <br/>
          <em>grams of water</em> &times; 1.43 = <em>grams of Pottery Plaster</em>
        </p>
        <p>
          {{ this.numberFormat(calculatedVolume) }} {{ selectedUnits }}<sup>3</sup> &times; 11 = <strong>{{ this.numberFormat(gramsOfWater, 0) }}</strong> &nbsp;<em>grams of water</em>
          <br/>
          {{ this.numberFormat(gramsOfWater, 0) }} &nbsp;<em>grams of water</em> &times; 1.43 = <strong>{{ this.numberFormat(gramsOfPlaster, 0) }}</strong> &nbsp;<em>grams of plaster</em>
        </p>
      </div>
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
      selectedUnits: "in",
      selectedShape: "Rectangular Solid",
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
    quartsOfWater: function() {
      return this.calculatedVolume / 80;
    },
    poundsOfPlaster: function() {
      return this.quartsOfWater * 3;
    },
    gramsOfWater: function() {
      return this.calculatedVolume * 11;
    },
    gramsOfPlaster: function() {
      return this.gramsOfWater * 1.43;
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
</style>
