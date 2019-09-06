<template>
  <div class="geo-edit-panel" :style="{width: width + 'px', height: height + 'px'}" v-draggable="draggableValue">
    <div class="geo-edit-panel-header" :ref="handleId"><span>123</span></div>
    <div style="height: 60%;width: 100%;">
      <el-form ref="form" :model="formData" label-width="80px" @submit.native.prevent>
        <el-form-item label="高度">
          <el-slider
            v-model="formData.extrudedHeight" @change="extrudedHeightHandle" :max="extrudedHeightMax"
            show-input>
          </el-slider>
        </el-form-item>
        <el-form-item label="体块颜色">
          <el-color-picker v-model="formData.color" @change="changeColor" color-format="rgb"></el-color-picker>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { Draggable } from 'draggable-vue-directive'
export default {
  directives: {
    Draggable
  },
  props: {
    width: [Number],
    height: [Number],
    entity: [Object]
  },
  data () {
    return {
      handleId: 'handle-id',
      draggableValue: {
        handle: undefined
      },
      extrudedHeightMax: 99999,

      formData: {
        extrudedHeight: 0,
        color: '#FF0000'
      }
    }
  },
  methods: {
    extrudedHeightHandle (val) {
      this.$emit('extrudedHeightHandle', val)
    },
    changeColor (val) {
      let colorRGB = val.replace('rgb(', '')
      colorRGB = colorRGB.replace(')', '').split(',')
      let [r, g, b] = colorRGB
      r = r / 255 // cesium的rgb的值范围是0-1，而常规的是0-255
      g = g / 255
      b = b / 255
      this.$emit('changeColor', r, g, b)
    }
  },
  mounted () {
    debugger
    this.draggableValue.handle = this.$refs[this.handleId]
    this.formData.extrudedHeight = 0
    console.log(this.entity)
  }
}
</script>
<style>
  .geo-edit-panel{
    position:absolute; float: left;top: 50px;left:20px;background-color:#42b983;z-index: 1111;
  }
  .geo-edit-panel-header{
    height: 30px;
    width: 100%;
  }
</style>
