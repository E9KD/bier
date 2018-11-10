<template>
  <div class="evaluate backgroundImg">
    <div class="evaluate_container">
      <div class="container_title">
        <img src="../../../static/image/title.jpg" alt="" class="title_img">
      </div>
      <div class="container_content" v-for="(item,index) in evaluateList" :key="index">
        <div class="content_top">
          <img :src="item.img" alt="" class="top_img">
          <p class="top_p">{{item.title}}</p>
          <p class="top_p_p">{{item.number}}</p>
          <p class="top_p" style="margin-left:0px;">次</p>
        </div>
        <div class="content_bottom">
          <p class="bottom_p">建议</p>
          <p class="bottom_content">{{item.content}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    mapState
  } from "vuex";
  export default {
    data() {
      return {
        evaluateList: [{
            img: require("../../../static/image/1.png"),
            number: null,
            content: ``,
            title: `吃肉`
          },
          {
            img: require("../../../static/image/2.png"),
            number: null,
            content: ``,
            title: `吃鱼虾`
          },
          {
            img: require("../../../static/image/3.png"),
            number: null,
            content: ``,
            title: `吃蛋类`
          },
          {
            img: require("../../../static/image/4.png"),
            number: null,
            content: ``,
            title: `喝牛奶`
          },
          {
            img: require("../../../static/image/5.png"),
            number: null,
            content: ``,
            title: `吃豆类及制品`
          },
          {
            img: require("../../../static/image/6.png"),
            number: null,
            content: ``,
            title: `吃蔬菜`
          },
          {
            img: require("../../../static/image/7.png"),
            number: null,
            content: ``,
            title: `吃水果`
          }
        ],
        textList: [{
            a: `本周您的孩子肉类摄入较充足，平均每天1次以上，肉类主要包括了畜肉（猪肉、牛肉、羊肉等）和禽肉（鸡肉、鸭肉等）。《中国居民膳食指南（2016）》提倡，每天都有适量的肉类摄入，儿童每天摄入50g-75g左右的肉比较适宜。禽肉脂肪、胆固醇含量较低，瘦肉是优质蛋白质的来源，矿物质（钙铁等）含量较多，易于吸收。家长应该保证孩子每天有1-2次肉类摄入，满足成长关键期孩子对优质蛋白质、矿物质的需求。需要注意的是：对于肥胖、体重超重的孩子，日常饮食不宜摄入太多的肉，要适当限制肉类食物的摄入量，尤其不宜吃太多的肥肉.`,
            b: `本周您的孩子肉类摄入不够充足，平均每天不足1次。肉类主要包括了畜肉（猪肉、牛肉、羊肉等）和禽肉（鸡肉、鸭肉等）。《中国居民膳食指南（2016）》提倡，每天都有适量的肉类摄入，儿童每天摄入50g-75g左右的肉比较适宜。禽肉脂肪、胆固醇含量也较低，瘦肉是优质蛋白质的来源，矿物质（钙铁等）含量较多，易于吸收。家长应该保证孩子每天有1-2次肉类摄入，满足成长关键期孩子对优质蛋白质、矿物质的需求。肉类烹饪方法很多，是否易于消化吸收，孩子是否喜欢吃，也应该是家长需要考虑的一个要点。`,
            c: `本周您的孩子肉类摄入量太少，一个周之内吃肉在2次以下。肉类提供的优质蛋白严重不足，不利于孩子的生长发育。肉类主要包括了畜肉（猪肉、牛肉、羊肉等）和禽肉（鸡肉、鸭肉等）。《中国居民膳食指南（2016）》提倡，每天都有适量的肉类摄入，儿童每天摄入50g-75g左右的肉比较适宜。禽肉脂肪、胆固醇含量也较低，瘦肉是优质蛋白质的来源，矿物质（钙铁等）含量较多，易于吸收。家长应该保证孩子每天有1-2次肉类摄入，满足成长关键期孩子对优质蛋白质、矿物质的需求。`
          },
          {
            a: `本周您的孩子鱼虾类食物摄入较充足。鱼虾类食物能提供比较优质的动物性蛋白，蛋白质量较高，氨基酸组成较合理，且鱼虾类肉质比较细腻，较容易消化吸收，对孩子的生长发育十分有利。鱼虾里面还含有较丰富的营养素，比如矿物质，像钙铁锌，脂溶性维生素A、维生素D及水溶性维生素B1。另外，深海鱼含有不饱和脂肪酸（ω3脂肪酸），对孩子神经大脑发育有益，建议每周摄入3次以上，对于保证孩子多种优质营养供给，非常有意义。`,
            b: `本周您的孩子肉类摄入不够充足，平均每天不足1次。肉类主要包括了畜肉（猪肉、牛肉、羊肉等）和禽肉（鸡肉、鸭肉等）。《中国居民膳食指南（2016）》提倡，每天都有适量的肉类摄入，儿童每天摄入50g-75g左右的肉比较适宜。禽肉脂肪、胆固醇含量也较低，瘦肉是优质蛋白质的来源，矿物质（钙铁等）含量较多，易于吸收。家长应该保证孩子每天有1-2次肉类摄入，满足成长关键期孩子对优质蛋白质、矿物质的需求。肉类烹饪方法很多，是否易于消化吸收，孩子是否喜欢吃，也应该是家长需要考虑的一个要点。`,
            c: `本周您的孩子肉类摄入量太少，一个周之内吃肉在2次以下。肉类提供的优质蛋白严重不足，不利于孩子的生长发育。肉类主要包括了畜肉（猪肉、牛肉、羊肉等）和禽肉（鸡肉、鸭肉等）。《中国居民膳食指南（2016）》提倡，每天都有适量的肉类摄入，儿童每天摄入50g-75g左右的肉比较适宜。禽肉脂肪、胆固醇含量也较低，瘦肉是优质蛋白质的来源，矿物质（钙铁等）含量较多，易于吸收。家长应该保证孩子每天有1-2次肉类摄入，满足成长关键期孩子对优质蛋白质、矿物质的需求。`
          },
          {
            a: `本周您的孩子鸡蛋摄入量适宜，中国营养学会提倡，每天要适量的吃鸡蛋，对于少年儿童来讲，每天至少要吃1个鸡蛋或1个以上，有利于孩子的成长发育。鸡蛋能提供完全性蛋白质，蛋黄的营养元素含量丰富，如卵磷脂、脑磷脂，对大脑神经发育有利，蛋黄还含丰富的维生素D、维生素A。蛋白、蛋黄都是营养丰富的食物，每天吃1个以上的鸡蛋，对少年儿童的生长发育十分有好处。`,
            b: `本周您的孩子鸡蛋摄入量欠缺，孩子应该多吃蛋类食物。于正在生长发育期的孩子来说，各位家长不用太过在意蛋类胆固醇太高的问题，与蛋类能提供优质的营养比较，成长发育期的孩子更需要摄入足量的蛋类食物，来满足成长发育的需要。中国营养学会提倡，每天要适量的吃鸡蛋，对于少年儿童来讲，每天至少要吃1个鸡蛋，除了鸡蛋，鹌鹑蛋、鸭蛋类也可以作为孩子蛋类食物的选择。`,
            c: `本周您的孩子吃了不足3个鸡蛋，两天吃不到1个鸡蛋，对于成长发育期的孩子来说，蛋类摄入太少。中国营养学会提倡，每天要适量的吃鸡蛋，对于少年儿童来讲，每天至少要吃1个鸡蛋，需要改善孩子的饮食习惯，培养孩子每天吃鸡蛋的习惯，蛋类能提供丰富的营养，优质蛋白质、卵磷脂、脑磷脂、维生素、矿物质等，对成长发育十分有利。`
          },
          {
            a: `本周您的孩子牛奶摄入量比较充足，可以从牛奶中获取比较充足的钙元素。牛奶中还含有优质动物性蛋白质和维生素，对孩子骨骼、牙齿的生长发育非常重要，应该让孩子继续保持喝牛奶的好习惯。每天孩子牛奶的摄入量建议是350ml-500ml。`,
            b: `本周您的孩子基本能坚持每天喝1次牛奶的习惯，牛奶是优质的钙源，有利于孩子的生长发育及身高促进。建议每天不少于350ml的牛奶摄入量，如果每天喝牛奶不足350ml，则虽然有每天喝牛奶的习惯，牛奶摄入量仍然不能满足孩子生长发育所需。所以，如果牛奶每天只摄入一次，请尽量提升牛奶摄入量。`,
            c: `本周您的孩子牛奶摄入量较少，牛奶可为孩子提供丰富优质的钙源和优质蛋白质，牛奶钙源生物利用率较高，优于其他食物中的钙。孩子在生长发育关键时期，牛奶摄入量过少，可能会导致钙的摄入量不足，影响孩子的生长发育，尤其是孩子骨骼的发育。建议孩子每天都要喝牛奶，一天至少饮奶两次，保证每天牛奶摄入量达到350ml-500ml。`
          },
          {
            a: `本周您的孩子能够基本坚持每天摄入大豆产品，值得鼓励。大豆是营养丰富的食物，尤其优质蛋白含量比较高，氨基酸比例较适宜。大豆中含有一定量的不饱和脂肪酸和较丰富的钙，与动物性肉类相比，大豆含胆固醇低，有利于孩子成长发育，应让孩子养成坚持每天摄入豆类食品的习惯。`,
            b: `本周您的孩子大豆制品摄入量不够充足，平均每天不足1次。大豆是营养丰富的食物，尤其优质蛋白含量比较高，氨基酸比例较适宜。大豆中含有一定量的不饱和脂肪酸和较丰富的钙，与动物性肉类相比，大豆含胆固醇低，有利于孩子成长发育，应该帮助孩子养成每天摄入豆类食品的习惯。`,
            c: `本周您的孩子大豆制品摄入量太少。大豆营养非常丰富，尤其优质蛋白的含量较高，氨基酸比例较适宜。大豆中含有一定量的不饱和脂肪酸和较丰富的钙，与动物性肉类相比，大豆含胆固醇低，有利于孩子成长发育。建议增加大豆制品的摄入量，家长应该帮助孩子养成每天摄入豆制食品的习惯。`
          },
          {
            a: `本周您的孩子蔬菜摄入量基本合理。坚持每天摄入新鲜蔬菜，每天蔬菜摄入量不应该低于300g-500g，蔬菜是成长关键期孩子的重要营养素来源，包括维生素、膳食纤维、矿物质（钙铁镁钾）及功能性活性物质。不同种类的蔬菜，能为孩子提供的关键营养素不同，要尽量多摄入不同种类的蔬菜（根茎类、叶菜类和瓜菜类）。一日三餐最好每一餐都要摄入一定的蔬菜。`,
            b: `本周您的孩子蔬菜摄入量不足，应增加新鲜蔬菜摄入量。每天蔬菜摄入量不应该低于300g-500g，蔬菜是成长关键期孩子的重要营养素来源，包括维生素、膳食纤维、矿物质（钙铁镁钾）及功能性活性物质。不同种类的蔬菜，能为孩子提供的关键营养素不同，要尽量多摄入不同种类的蔬菜（根茎类、叶菜类和瓜菜类）。一日三餐最好每一餐都要摄入一定的蔬菜。`,
            c: `本周您的孩子蔬菜摄入量太少，平均每天不足1次，建议应该多吃新鲜蔬菜，每天蔬菜摄入量不应该低于300g-500g，蔬菜是成长关键期孩子的重要营养素来源，包括维生素、膳食纤维、矿物质（钙铁镁钾）及功能性活性物质。不同种类的蔬菜，能为孩子提供的关键营养素不同，要尽量多摄入不同种类的蔬菜（根茎类、叶菜类和瓜菜类）。`
          },
          {
            a: `本周您的孩子水果摄入量基本合理。坚持每天吃新鲜的水果，每天水果的摄入量不应低于200g-350g，建议一日三餐，饭后都应该吃新鲜的水果。水果含有丰富的维生素、膳食纤维、果酸、生理活动物质等有益孩子健康成长发育的营养成分。不同的水果，为孩子提供的关键营养素不同，在保证水果摄入量的基础上，也应该考虑尽量多的摄入不同种类的水果。`,
            b: `本周您的孩子水果摄入量不足，应增加每日新鲜水果的摄入量，每天水果的摄入量不应低于200g-350g，建议一日三餐，饭后都应该吃新鲜的水果。水果含有丰富的维生素、膳食纤维、果酸、生理活动物质等有益孩子健康成长发育的营养成分。不同的水果，为孩子提供的关键营养素不同，在保证水果摄入量的基础上，也应该考虑尽量多的摄入不同种类的水果。`,
            c: `本周您的孩子水果摄入量太少，平均每天不足1次，应该增加吃水果的次数及每日新鲜水果的摄入量，每天水果的摄入量不应低于200g-350g，建议一日三餐，饭后都应该吃新鲜的水果。水果含有丰富的维生素、膳食纤维、果酸、及生理活动物质等有益孩子健康成长发育的营养成分。不同的水果，为孩子提供的关键营养素不同，在保证水果摄入量的基础上，也应该考虑尽量多的摄入不同种类的水果。`
          }
        ]
      };
    },
    methods: {
      ComputeLevel(x, y, z, c) {
        /**
         * @msg: x 高分 y 低分 z 当前分数
         * @param {type}
         * @return:
         */
  
        if (z > x) {
          this.evaluateList[c].content = this.textList[c].a;
        } else if (z <= x && z > y) {
          this.evaluateList[c].content = this.textList[c].b;
        } else if (z < y) {
          this.evaluateList[c].content = this.textList[c].c;
        }
      },
      ChangeNumber(){
        this.evaluateList[0].number=this.evaluateParam.rou
        this.evaluateList[1].number=this.evaluateParam.yuxia
        this.evaluateList[2].number=this.evaluateParam.dan
        this.evaluateList[3].number=this.evaluateParam.niunai
        this.evaluateList[4].number=this.evaluateParam.doulei
        this.evaluateList[5].number=this.evaluateParam.shucai
        this.evaluateList[6].number=this.evaluateParam.shuiguo

      },
      init() {
        this.ChangeNumber()
        // 肉计算
        this.ComputeLevel(6, 3, this.evaluateParam.rou, 0);
        // 鱼虾计算
        this.ComputeLevel(2, 1, this.evaluateParam.yuxia, 1);
        // 蛋计算
        this.ComputeLevel(6,3,this.evaluateParam.rou,2)
        // 牛奶计算
        this.ComputeLevel(9,7,this.evaluateParam.rou,3)
        // 豆类及制品计算
        this.ComputeLevel(4,2,this.evaluateParam.rou,4)
        // 蔬菜计算
        this.ComputeLevel(9,7,this.evaluateParam.rou,5)
        // 水果计算
        this.ComputeLevel(9,7,this.evaluateParam.rou,6)
      }
    },
    computed: {
      ...mapState(["evaluateParam"])
    },
    mounted() {
      this.init();
    }
  };
</script>

<style scoped>
  .container_title {
    text-align: center;
  }
  
  .evaluate_container {
    width: 90%;
    margin: 0 auto;
  }
  
  .container_content {
    padding-bottom: 30rpx;
  }
  
  .content_bottom {
    margin-top: 20rpx;
  }
  
  .title_img {
    width: 60%;
    height: 200rpx;
  }
  
  .top_img {
    width: 60rpx;
    height: 60rpx;
    display: inline-block;
    vertical-align: middle;
  }
  
  .top_p {
    font-size: 30rpx;
    color: white;
    margin-left: 30rpx;
    vertical-align: middle;
    display: inline-block;
  }
  
  .top_p_p {
    margin: 0px 10rpx;
    text-align: center;
    text-decoration: underline;
    color: rgb(227, 170, 9);
    display: inline-block;
  }
  
  .bottom_p {
    font-size: 30rpx;
    color: white;
    width: 60rpx;
    display: inline-block;
    vertical-align: top;
  }
  
  .bottom_content {
    width: 80%;
    color: white;
    background-color: rgba(255, 255, 255, 0.1);
    word-wrap: break-word;
    padding: 20rpx 20rpx;
    display: inline-block;
    vertical-align: top;
    border-radius: 30rpx;
    margin-left: 30rpx;
    font-size: 30rpx;
  }
</style>
