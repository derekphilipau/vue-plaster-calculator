<template>
  <div>
    <div>
      <a href="#" @click.prevent="selectShape('cube')">
        <Cube
          class="shape-button"
          :class="selectedShape === 'cube' ? 'shape-selected' : ''"
          />
      </a>
      <a href="#" @click.prevent="selectShape('rectangularSolid')">
        <RectangularSolid
          class="shape-button"
          :class="selectedShape === 'rectangularSolid' ? 'shape-selected' : ''"
          />
      </a>
      <a href="#" @click.prevent="selectShape('cone')">
        <Cone
          class="shape-button"
          :class="selectedShape === 'cone' ? 'shape-selected' : ''"
          />
      </a>
      <a href="#" @click.prevent="selectShape('conicalFrustum')">
        <ConicalFrustum
          class="shape-button"
          :class="selectedShape === 'conicalFrustum' ? 'shape-selected' : ''"
          />
      </a>
      <a href="#" @click.prevent="selectShape('cylinder')">
        <Cylinder
          class="shape-button"
          :class="selectedShape === 'cylinder' ? 'shape-selected' : ''"
          />
      </a>
      <a href="#" @click.prevent="selectShape('tube')">
        <Tube
          class="shape-button"
          :class="selectedShape === 'tube' ? 'shape-selected' : ''"
          />
      </a>
      <a href="#" @click.prevent="selectShape('sphere')">
        <Sphere
          class="shape-button"
          :class="selectedShape === 'sphere' ? 'shape-selected' : ''"
          />
      </a>
    </div>

    <h4 class="shape-name">{{ $t(selectedShape) }}</h4>

    <div v-if="selectedShape == 'cube'">
      <Cube class="shape-image" />
    </div>
    <div v-else-if="selectedShape == 'rectangularSolid'">
      <RectangularSolid class="shape-image" />
    </div>
    <div v-else-if="selectedShape == 'cone'">
      <Cone class="shape-image" />
    </div>
    <div v-else-if="selectedShape == 'conicalFrustum'">
      <ConicalFrustum class="shape-image" />
    </div>
    <div v-else-if="selectedShape == 'cylinder'">
      <Cylinder class="shape-image" />
    </div>
    <div v-else-if="selectedShape == 'tube'">
      <Tube class="shape-image" />
    </div>
    <div v-else-if="selectedShape == 'sphere'">
      <Sphere class="shape-image" />
    </div>

    <div v-if="selectedShape === 'sphere'">
      {{ $t('radius') }} (r)
      <input type="number" v-model="radius" min="0"> {{ selectedUnits }}
      <p v-if="volume">
        {{ $t('volume') }}
        = <sup>4</sup>&frasl;<sub>3</sub>πr<sup>3</sup>

        = <sup>4</sup>&frasl;<sub>3</sub> &times; π &times; <strong>{{ radius }}</strong><sup>3</sup>

        = <strong>{{ Number(volume).toFixed(this.precision) }}</strong>
      </p>
    </div>

    <div v-else-if="selectedShape === 'cone'">
      {{ $t('baseRadius') }} (r)
      <input type="number" v-model="radius"> {{ selectedUnits }}
      <br/>
      {{ $t('height') }} (h)
      <input type="number" v-model="height"> {{ selectedUnits }}
      <p v-if="volume">
        {{ $t('volume') }}
        = <sup>1</sup>&frasl;<sub>3</sub>πr<sup>2</sup>h

        = <sup>4</sup>&frasl;<sub>3</sub> &times; π &times; <strong>{{ radius }}</strong><sup>2</sup> &times; <strong>{{ height }}</strong>

        = {{ Number(volume).toFixed(this.precision) }}
      </p>
    </div>

    <div v-else-if="selectedShape === 'conicalFrustum'">
      {{ $t('topRadius') }} (r)
      <input type="number" v-model="radius"> {{ selectedUnits }}
      <br/>
      {{ $t('bottomRadius') }} (R)
      <input type="number" v-model="bottomRadius"> {{ selectedUnits }}
      <br/>
      {{ $t('height') }}  (h)
      <input type="number" v-model="height"> {{ selectedUnits }}
      <p v-if="volume">
        {{ $t('volume') }}
        = <sup>1</sup>&frasl;<sub>3</sub>πh(r<sup>2</sup> + rR + R<sup>2</sup>)

        = <sup>1</sup>&frasl;<sub>3</sub> &times; π &times; {{ height }} &times; ({{ radius }}<sup>2</sup> + ({{ radius }} &times; {{ bottomRadius }}) + {{ bottomRadius }}<sup>2</sup>)

        = {{ Number(volume).toFixed(this.precision) }}
      </p>
    </div>

    <div v-else-if="selectedShape === 'cylinder'">
      {{ $t('baseRadius') }}  (r)
      <input type="number" v-model="radius"> {{ selectedUnits }}
      <br/>
      {{ $t('height') }}  (h)
      <input type="number" v-model="height"> {{ selectedUnits }}
      <p v-if="volume">
        {{ $t('volume') }}
        = πr<sup>2</sup>h

        = π &times; <strong>{{ radius }}</strong><sup>2</sup> &times; <strong>{{ height }}</strong>

        = {{ Number(volume).toFixed(this.precision) }}
      </p>
    </div>

    <div v-else-if="selectedShape === 'tube'">
      {{ $t('outerDiameter') }}  (d1)
      <input type="number" v-model="outerDiameter"> {{ selectedUnits }}
      <br/>
      {{ $t('innerDiameter') }} (d2)
      <input type="number" v-model="innerDiameter"> {{ selectedUnits }}
      <br/>
      {{ $t('height') }} (h)
      <input type="number" v-model="height"> {{ selectedUnits }}
      <p v-if="volume">
        {{ $t('volume') }}
        = π((d<sub>1</sub><sup>2</sup> - d<sub>2</sub><sup>2</sup>)/4)h

        = π &times; ((<strong>{{ outerDiameter }}</strong><sup>2</sup> - <strong>{{ innerDiameter }}</strong><sup>2</sup>)/4) &times; <strong>{{ height }}</strong>

        = {{ Number(volume).toFixed(this.precision) }}
      </p>
    </div>

    <div v-else-if="selectedShape === 'cube'">
      {{ $t('edgeLength') }} (a)
      <input type="number" v-model="length"> {{ selectedUnits }}
      <p v-if="volume">
        {{ $t('volume') }}
        = a<sup>3</sup>
        = <strong>{{ length }}</strong><sup>3</sup>
        = {{ Number(volume).toFixed(this.precision) }}
      </p>
    </div>

    <div v-else-if="selectedShape === 'rectangularSolid'">
      {{ $t('length') }} (l)
      <input type="number" v-model="length"> {{ selectedUnits }}
      <br/>
      {{ $t('width') }} (w)
      <input type="number" v-model="width"> {{ selectedUnits }}
      <br/>
      {{ $t('height') }} (h)
      <input type="number" v-model="height"> {{ selectedUnits }}
      <div v-if="volume">
        <p>
          {{ $t('volume') }}
          = lwh
          = <strong>{{ length }}</strong> &times; <strong>{{ width }}</strong> &times; <strong>{{ height }}</strong>
          = {{ Number(volume).toFixed(this.precision) }}
        </p>
      </div>
    </div>

  </div>
</template>

<script>
import Cube from './shapes/Cube.vue';
import RectangularSolid from './shapes/RectangularSolid.vue';
import Cone from './shapes/Cone.vue';
import ConicalFrustum from './shapes/ConicalFrustum.vue';
import Cylinder from './shapes/Cylinder.vue';
import Tube from './shapes/Tube.vue';
import Sphere from './shapes/Sphere.vue';

export default {
  name: "VolumeCalculator",
  props: {
    selectedUnits: {
      type: String,
      default: "in"
    }
  },
  components: {
    Cube,
    RectangularSolid,
    Cone,
    ConicalFrustum,
    Cylinder,
    Tube,
    Sphere
  },
  data() {
    return {
      precision: 2,
      selectedShape: "rectangularSolid",
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
      if (this.selectedShape === "sphere" && this.radius) {
        return (4/3)*Math.PI*Math.pow(this.radius, 3);
      }
      else if (this.selectedShape === "cone" && this.radius && this.height) {
        return (1/3)*Math.PI*Math.pow(this.radius, 2)*this.height;
      }
      else if (this.selectedShape === "conicalFrustum" && this.radius && this.height) {
        return (1/3)*Math.PI*this.height*(Math.pow(this.radius, 2) + (this.radius * this.bottomRadius) + Math.pow(this.bottomRadius, 2));
      }
      else if (this.selectedShape === "cylinder" && this.radius && this.height) {
        return Math.PI*Math.pow(this.radius, 2)*this.height;
      }
      else if (this.selectedShape === "tube" && this.innerDiameter && this.outerDiameter && this.height) {
        return Math.PI*((Math.pow(this.outerDiameter, 2)-Math.pow(this.innerDiameter, 2))/4)*this.height;
      }
      else if (this.selectedShape === "cube" && this.length) {
        return Math.pow(this.length, 3);
      }
      else if (this.selectedShape === "rectangularSolid" && this.length && this.width && this.height) {
        return this.length*this.width*this.height
      }
      return 0;
    }
  },
  watch: {
    volume(val) {
      this.$emit('volumeChange', val);
    }
  },
  methods: {
    selectShape(shape) {
      this.selectedShape = shape;
    }
  }
};
</script>

<style scoped>
  .shape-button {
    cursor: pointer;
    height: 64px;
    min-width: 64px;
    padding: 10px;
    color: #111;
  }
  .shape-button:hover {
    color: #ff3333;
  }
  .shape-selected {
    color: #ff3333 !important;
  }
  .shape-image {
    height: 128px;
  }
  .shape-name {
    margin-top: 0;
    margin-bottom: 10px;
  }
  input
  {
    font-size: 16px;
  }
  input[type="number"]
  {
    font-size: 16px;
    width: 70px;
  }
</style>
