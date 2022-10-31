<template>
  <div class="mapArea">
    <img
      src="../../assets/shouye.gif"
      width="100%"
      height="calc(100vh - 120px)"
      usemap="#plantmap"
    >
    <map id="circleMap" name="plantmap">
      <area coords="215,6,460,143" href="/hylc_bap/combinatory/overview"/>
      <area coords="750,55,961,186" href="/hylc_bap/combinatory/overview"/>
      <area coords="845,276,1075,437" href="/hylc_bap/combinatory/overview"/>
      <area coords="563,395,870,595" href="/hylc_bap/combinatory/overview">
      <area coords="34,409,279,591" href="/hylc_bap/combinatory/overview"/>
      <area coords="235,158,768,367" href="/hylc_bap/combinatory/overview"/>
    </map>
  </div>
</template>

<script>
  export default {
    name: 'home',
    mounted() {
      this.adjust()
    },
    methods: {
      adjust() {
        let map = document.getElementById('circleMap');
        let element = map.childNodes;
        let itemNumber = element.length / 2
        for (let i = 0; i <= itemNumber; i++) {
          let tempI = 2 * i; //TODO why???
          let oldCoords = element[tempI]?.coords;
          let newCoords = this.adjustPosition(oldCoords);
          element[tempI]?.setAttribute("coords", newCoords);
        }
      },
      // 调整坐标
      adjustPosition(position = '') {
        let pageWidth = document.body.clientWidth - 25;
        let pageHeight = document.body.clientHeight - 100;

        let imageWidth = 1895;
        let imageHeight = 870;
        let each = position.split(",");

        // 获取每个坐标点
        for (let i = 0; i < each.length; i++) {
          each[i] = Math.round(parseInt(each[i]) * pageWidth / imageWidth).toString();//x坐标
          i++;
          each[i] = Math.round(parseInt(each[i]) * pageHeight / imageHeight).toString();//y坐标
        }
        //生成新的坐标
        let newPosition = "";
        for (let i = 0; i < each.length; i++) {
          newPosition += each[i];
          if (i < each.length - 1) {
            newPosition += ",";
          }
        }
        return newPosition
      }
    }
  }
</script>

<style scoped>
  .mapArea {
    width: 100%;
    height: calc(100vh - 120px);
    display: flex;
    align-items: center;
    justify-content: center;
    background: url(../../assets/bg1.png) no-repeat #fafbfc;
  }

  .mapArea img {
    width: 57.52%;
    height: 73.56%;
  }
</style>
