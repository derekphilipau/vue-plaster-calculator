<template>
  <div>
    <a v-for="shape in shapes" v-bind:key="shape" v-on:click="selectShape(shape)">
      <i v-if="shape === selectedShape" class="icon icon-button icon-selected" :class="'icon-'+getShapeIconName(shape)"/> 
      <i v-else class="icon icon-button" :class="'icon-'+getShapeIconName(shape)"/> 
    </a>

    <h4>{{ selectedShape }}</h4>
    
    <div class="selected-shape-container" v-if="selectedShape">
      <i class="icon icon-image" :class="'icon-'+getShapeIconName(selectedShape)"/>
    </div>

    <div v-if="selectedShape === 'Sphere'">
      Radius (r)
      <input type="number" v-model="radius" min="0">
      <p v-if="volume">
        Volume 
        = <sup>4</sup>&frasl;<sub>3</sub>πr<sup>3</sup>
        <br/>
        = <sup>4</sup>&frasl;<sub>3</sub> &times; π &times; <strong>{{ radius }}</strong><sup>3</sup>
        <br/>
        = <strong>{{ Number(volume).toFixed(this.precision) }}</strong>
      </p>
    </div>

    <div v-else-if="selectedShape === 'Cone'">
      Base Radius (r)
      <input type="number" v-model="radius">
      <br/>
      Height (h)
      <input type="number" v-model="height">
      <p v-if="volume">
        Volume 
        = <sup>1</sup>&frasl;<sub>3</sub>πr<sup>2</sup>h
        <br/>
        = <sup>4</sup>&frasl;<sub>3</sub> &times; π &times; <strong>{{ radius }}</strong><sup>2</sup> &times; <strong>{{ height }}</strong>
        <br/>
        = {{ Number(volume).toFixed(this.precision) }}
      </p>
    </div>

    <div v-else-if="selectedShape === 'Conical Frustum'">
      Top Radius (r)
      <input type="number" v-model="radius">
      <br/>
      Bottom Radius (r)
      <input type="number" v-model="bottomRadius">
      <br/>
      Height (h)
      <input type="number" v-model="height">
      <p v-if="volume">
        Volume 
        = <sup>1</sup>&frasl;<sub>3</sub>πh(r<sup>2</sup> + rR + R<sup>2</sup>)
        <br/>
        = <sup>1</sup>&frasl;<sub>3</sub> &times; π &times; {{ height }} &times; ({{ radius }}<sup>2</sup> + ({{ radius }} &times; {{ bottomRadius }}) + {{ bottomRadius }}<sup>2</sup>)
        <br/>
        = {{ Number(volume).toFixed(this.precision) }}
      </p>
    </div>

    <div v-else-if="selectedShape === 'Cylinder'">
      Base Radius (r)
      <input type="number" v-model="radius">
      <br/>
      Height (h)
      <input type="number" v-model="height">
      <p v-if="volume">
        Volume 
        = πr<sup>2</sup>h
        <br/>
        = π &times; <strong>{{ radius }}</strong><sup>2</sup> &times; <strong>{{ height }}</strong>
        <br/>
        = {{ Number(volume).toFixed(this.precision) }}
      </p>
    </div>

    <div v-else-if="selectedShape === 'Tube'">
      Outer Diameter (d1)
      <input type="number" v-model="outerDiameter">
      <br/>
      Inner Diameter (d2)
      <input type="number" v-model="innerDiameter">
      <br/>
      Length (l)
      <input type="number" v-model="length">
      <p v-if="volume">
        Volume 
        = π((d<sub>1</sub><sup>2</sup> - d<sub>2</sub><sup>2</sup>)/4)l
        <br/>
        = π &times; ((<strong>{{ outerDiameter }}</strong><sup>2</sup> - <strong>{{ innerDiameter }}</strong><sup>2</sup>)/4) &times; <strong>{{ length }}</strong>
        <br/>
        = {{ Number(volume).toFixed(this.precision) }}
      </p>
    </div>

    <div v-else-if="selectedShape === 'Cube'">
      Edge Length  (a)
      <input type="number" v-model="length">
      <p v-if="volume">
        Volume 
        = a<sup>3</sup>
        = <strong>{{ length }}</strong><sup>3</sup>
        = {{ Number(volume).toFixed(this.precision) }}
      </p>
    </div>

    <div v-else-if="selectedShape === 'Rectangular Solid'">
      Length (l)
      <input type="number" v-model="length">
      <br/>
      Width (w)
      <input type="number" v-model="width">
      <br/>
      Height (h)
      <input type="number" v-model="height">
      <div v-if="volume">
        <p>
          Volume 
          = lwh
          = <strong>{{ length }}</strong> &times; <strong>{{ width }}</strong> &times; <strong>{{ height }}</strong>
          = {{ Number(volume).toFixed(this.precision) }}
        </p>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "VolumeCalculator",
  props: {
  },
  data() {
    return {
      precision: 2,
      shapes: [
        "Cube",
        "Rectangular Solid",
        "Cone", 
        "Conical Frustum",
        "Cylinder", 
        "Tube",
        "Sphere"
        ],
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
    volume: function() {
      // For now assume
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
    }
  },
  watch: {
    volume: function (val) {
      this.$emit('volumeChange', val);
    }
  },
  methods: {
    getShapeIconName: function(shape) {
      if (shape) {
        return shape.replace(/\s/g, '');
      }
      return null;
    },
    selectShape: function(shape) {
      this.selectedShape = shape;
    }
  }
};
</script>

<style scoped>
  .icon-button {
    font-size: 50px;
  }
  .icon-selected {
    opacity: 0.5;
  }
  .icon-image {
    font-size: 120px;
    line-height: 120px;
  }
  .selected-shape-container {
  }
  input[type="number"]
  {
    font-size: 16px;
    width: 70px;
  }
</style>
