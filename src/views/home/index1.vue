<template>
  <!-- <div class= "login_background" usemap="#plantmap" > -->
  <div  class ="mapArea" ref="agefirst" >
    <img  src="../../assets/shouye.gif"
          width= "100%"
          height="calc(100vh - 120px)"
          alt=""
          usemap="#plantmap"
    >
    <map id="circleMap" name="plantmap">
      <!-- 1920的屏幕动态图 宽度减去421  高度减去214-->
      <area shape="rect" coords="215,6,460,143" alt="fengxiang1" class = "fenxiang"/>
      <!-- @click="fengxian" -->
      <area shape="rect" coords="750,55,961,186" alt="fengxiang2" class = "fenxiang"/>
      <!-- @click="kehu" -->
      <area shape="rect" coords="845,276,1075,437" alt="fengxiang" class = "fenxiang" />
      <!-- @click="zichang" -->
      <area shape="rect" coords="563,395,870,595" alt="fengxiang" class = "fenxiang" />
      <!-- @click="chanpin" -->
      <area shape="rect" coords="34,409,279,591" alt="fengxiang" class = "fenxiang" />
      <!-- @click="yunying" -->
      <area shape="rect" coords="235,158,768,367" alt="fengxiang3" class = "fenxiang" />
      <!-- @click="quanjing" -->
    </map>
  </div>
</template>

<script>
  import { debounce} from "lodash";
  export default {
    // name:'AgeFirst',
    data(){
      return{
        heightVh:'970px',
        widthVw:'1920px'
      }
    },
    computed: {
      navList() {
        return this.$store.state.navList;
      }
    },
    mounted(){
      // this.adjust();
      let timeout = null;//onresize触发过多，设置定时器
      // window.onresize = function(){  //页面大小变化，重新加载页面以刷新MAP
      //     clearTimeout(timeout);
      //     timeout = setTimeout(function(){
      //         document.location.reload()
      //     },100)
      // }
      // let vm = this
      // window.onresize = function(){  //页面大小变化，重新加载页面以刷新MAP
      //     clearTimeout(timeout);
      //     timeout = setTimeout(function(){
      //         vm.$nextTick(() => {
      //             console.log(222222);

      //             vm.$refs.agefirst.doLayout();
      //         });
      //     },100)
      // }
      // this.adjust();

    },
    // activated() {
    //     this.$nextTick(() => {
    //         this.$refs.agefirst.doLayout();
    //     });
    // },
    methods:{
      adjust(){
        let map = document.getElementById('circleMap');
        let element = map.childNodes;
        let itemNumber = element.length /2
        for(let i=0;i<=itemNumber;i++){
          let tempI = 2*i;
          let oldCoords = element[tempI].coords;
          let newcoords = this.adjustPosition(oldCoords);
          element[tempI].setAttribute("coords",newcoords);
        }
        // let test = element
      },
      // 调整坐标
      adjustPosition(position){
        let pageWidth = document.body.clientWidth-25;
        let pageHeight = document.body.clientHeight-100;

        let imageWidth = 1895;
        let imageHeight = 870;
        let each = position.split(",");

        // 获取每个坐标点
        for(let i =0;i<each.length;i++){
          each[i] = Math.round(parseInt(each[i])*pageWidth/imageWidth).toString();//x坐标
          i++;
          each[i] = Math.round(parseInt(each[i])*pageHeight/imageHeight).toString();//y坐标
        }
        //生成新的坐标
        let newPosition = "";
        for(let i=0;i<each.length;i++) {
          newPosition +=each[i];
          if(i<each.length-1){
            newPosition +=",";
          }
        }
        return newPosition
      },
      fengxian(){
        if(this.$store.state.permissionList.includes("riskAnalysis:queryRiskMonitor")){
          // if(this.$store.state.permissionList.includes("riskAnalysis:queryRiskAnalysisHome")){

          this.$router.push('/ucock-riskMonitor')
          let navObj = {
            name: '风险监控',
            authId: '0702',
            active: true
          };
          this.$store.commit("setNavList", {
            navObj: navObj,
            navList: this.navList
          });
        }else{
          this.$message.error('暂无权限，请联系管理员！');
        }
      },
      kehu(){
        if(this.$store.state.permissionList.includes("analysis:queryCustomerAnalysis")){
          this.$router.push('/ucock-customerAnalyze')
          let navObj = {
            name: '客户分析',
            authId: '06',
            active: true
          };
          this.$store.commit("setNavList", {
            navObj: navObj,
            navList: this.navList
          });
        }else{
          this.$message.error('暂无权限，请联系管理员！');
        }
      },
      zichang(){
        if(this.$store.state.permissionList.includes("assetAnalysis:queryAssetAnalysis")){
          this.$router.push('/ucock-assetAnalysis')
          let navObj = {
            name: '资产管理',
            authId: '0301',
            active: true
          };
          this.$store.commit("setNavList", {
            navObj: navObj,
            navList: this.navList
          });
        }else{
          this.$message.error('暂无权限，请联系管理员！');
        }

      },
      chanpin(){
        if(this.$store.state.permissionList.includes("prodHand:queryZbProdHome")){
          this.$router.push('/ucock-projectInvest')
          let navObj = {
            name: '产品管理',
            authId: '0401',
            active: true
          };
          this.$store.commit("setNavList", {
            navObj: navObj,
            navList: this.navList
          });
        }else{
          this.$message.error('暂无权限，请联系管理员！');
        }

      },
      yunying(){
        if(this.$store.state.permissionList.includes("operMgmt:queryOperMgmt")){
          this.$router.push('/ucock-productConfiguration')
          let navObj = {
            name: '盈利分析',
            authId: '05',
            active: true
          };
          this.$store.commit("setNavList", {
            navObj: navObj,
            navList: this.navList
          });
        }else{
          this.$message.error('暂无权限，请联系管理员！');
        }

      },
      quanjing(){
        if(this.$store.state.permissionList.includes("strategy:queryR10StrategyHome")){
          this.$router.push('/ucock-policySetting')
          let navObj = {
            name: '全景视图',
            authId: '02',
            active: true
          };
          this.$store.commit("setNavList", {
            navObj: navObj,
            navList: this.navList
          });
        }else{
          this.$message.error('暂无权限，请联系管理员！');
        }

      }
    }
  }
</script>

<style scoped>

  .login_background {
    width: 100%;
    height: calc(100vh - 120px);
    background: url(../../assets/ageFirst1.png) no-repeat;
    background-size: contain;
    background-position: center;
  }
  .mapArea{
    width: 100%;
    height: calc(100vh - 120px);
    display: flex;
    align-items: center;
    justify-content: center;
    background: url(../../assets/bg1.png)no-repeat;
    background-color: #fafbfc
  }
  .mapArea img{
    /* width:100%;
    height:100%; */
    width:57.52%;
    height:73.56%;


    /* width:1090px;
    height:640px; */
    /* align-items: center; */

  }
  /* .fenxiang{
      background:red;
      cursor: pointer;
  } */
</style>
