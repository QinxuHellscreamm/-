<template>
	<view class="container">
    <uni-section type="line" title=''>
      <uni-notice-bar scrollable show-icon text="如果你想关注和交流合金coumputed的进展 或 想提出自己的建议可以加入合金coumpted粉丝群 lz微信：v5878k142" />
    </uni-section>
    <uni-collapse-item :title="'版本介绍'+ list2[0].title">
      <uni-section title="版本更新" type="line" padding>
        <uni-steps :options="list2" active-color="#007AFF" :active="active" direction="column" />
      </uni-section>
    </uni-collapse-item>
    <view class="uni-form-item uni-column">
      <view class="title">选择角色</view>
      <radio-group class="uni-list" @change="roleChange">
        <view class="uni-list-cell uni-list-cell-pd" v-for="(item,index) in roleMap">
          <radio  :value="item.roleId"></radio>
          <label class="label-2-text" :for="item.name">{{item.name}}</label>
        </view>
      </radio-group>
    </view>


    <view class="title">两件套</view>
    <radio-group class="uni-list" @change="JXchange">
      <view class="uni-list-cell uni-list-cell-pd" v-for="(item,index) in JXmap1" >
        <radio :value="item.jxId" :disabled="role.jx2.jxId == item.jxId"></radio>
        <label class="label-2-text" :for="item.name">{{item.name}}</label>
      </view>
    </radio-group>
    <view class="title">四件套</view>
    <radio-group class="uni-list" @change="JXchange2">
      <view class="uni-list-cell uni-list-cell-pd" v-for="(item,index) in JXmap2" >
        <radio :value="item.jxId" :disabled="role.jx1.jxId == item.jxId"></radio>
        <label class="label-2-text" :for="item.name">{{item.name}}</label>
      </view>
    </radio-group>


<!--    <uni-collapse-item title="2+2+2机芯" v-if="role.roleId" style="margin-top: 15px;">-->
<!--      <view style="text-align: center">暂未开放</view>-->
<!--    </uni-collapse-item>-->

    <view class="form">
      <view class="uni-form-item uni-column">
        <view class="row">
          <text class="uni-form-item__title">命中</text>
          <view class="uni-input-wrapper">
            <input class="uni-input" type="number" placeholder="" v-model="attrs.mingzhong"/>
          </view>
        </view>

<!--        <view class="row">-->
<!--          <text class="uni-form-item__title">怪无视抗</text>-->
<!--          <view class="uni-input-wrapper">-->
<!--            <input class="uni-input" type="number" placeholder="" v-model="attrs.wushikang"/>-->
<!--          </view>-->
<!--        </view>-->
        <view class="row">
          <text class="uni-form-item__title">暴击</text>
          <view class="uni-input-wrapper">
            <input class="uni-input" type="number" placeholder="" v-model="attrs.baoji" @input="baojiInput"/>
          </view>
        </view>
        <view class="row">
          <text class="uni-form-item__title">暴伤</text>
          <view class="uni-input-wrapper">
            <input class="uni-input" type="number" placeholder="" v-model="attrs.baoshang" @input="baoshangInput"/>
          </view>
        </view>
        <view class="row">
          <text class="uni-form-item__title">无视</text>
          <view class="uni-input-wrapper">
            <input class="uni-input" type="number" placeholder="" v-model="attrs.wushi"/>
          </view>
        </view>
        <view class="row">
          <text class="uni-form-item__title">异常</text>
          <view class="uni-input-wrapper">
            <input class="uni-input" type="number" placeholder="" v-model="attrs.yichang"/>
          </view>
        </view>
        <view class="row">
          <text class="uni-form-item__title">近增</text>
          <view class="uni-input-wrapper">
            <input class="uni-input" type="number" placeholder="" v-model="attrs.jinzeng"/>
          </view>
        </view>
        <view class="row">
          <text class="uni-form-item__title">远增</text>
          <view class="uni-input-wrapper">
            <input class="uni-input" type="number" placeholder="" v-model="attrs.yuanzeng"/>
          </view>
        </view>
<!--        <view class="row">-->
<!--          <text class="uni-form-item__title">攻击</text>-->
<!--          <view class="uni-input-wrapper">-->
<!--            <input class="uni-input" type="number" placeholder="" v-model="attrs.ad"/>-->
<!--          </view>-->
<!--        </view>-->
      </view>
      <view class="title" style="margin-top: 20px"></view>
    </view>
<!--    <view>{{role.attrs}}</view>-->
    <view v-if="computedAttr" style="color: red">属性评分:{{computedAttr}} <span v-if="role.attrs.teji">特技：{{role.attrs.teji}}</span></view>
    <view style="display: flex">
      <button class="mini-btn" type="primary" style="margin-top: 20px" v-if="role.jx1.jxId && role.jx2.jxId" @click="js">计算属性</button>
      <button v-if='computedAttr' class="mini-btn"  style="margin-top: 20px" @click="upload" disabled>上传属性</button>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        active: 0,
        list2: [
          {title: '0.18 ', desc: '移除s2联合无法掉落机芯，增加孙尚香计算功能'},
          {title: '0.17 ', desc: '增加了s2赛季新出的4套机芯,移除了s1赛季1.2版本机芯四件套30%加成特性'},
          {title: '0.16 ', desc: '增加了合金弹头1.2新出的3套机芯'},
          {title: '0.15 ', desc: '暴击实际生效带来的增益以及将伤害倍率改为机芯评分'},
          {title: '0.14 ', desc: '增加了命中属性对伤害计算的影响'},
          {title: '0.13 ', desc: '优化了版本介绍,增加了暴击上限和爆伤上限'},
          {title: '0.12 ', desc: '优化了显示结果的浮点精度，增加了斯嘉丽和莉拉的计算功能-2023-7-16 13:05'},
          {title: '0.11', desc: '优化计算公式'},
          {title: '0.1', desc: '增加了特雷弗的属性计算'},
        ],
        role_visible:true,
				roleMap:[
          {name:'斯嘉丽', roleId:'0',zlv:0,jx1:{},jx2:{}},
          {name:'莉拉', roleId: '1',zlv:0,jx1:{},jx2:{}},
          {name:'特雷弗', roleId: '2',jx1:{},jx2:{}},
          {name:'香香', roleId: '3',jx1:{},jx2:{}},
        ],
        typeMap:[
          {name:'2+4', type:'0',zlv:0,jx1:{},jx2:{}},
          // {name:'2+2+2', type: '1',zlv:0,jx1:{},jx2:{}},
        ],
        computedAttr:0,
        attrs:{
          teji:'',
          ad:1,
          zhaohuan:0,
          mingzhong:0,
          wushikang:0,
          baoji:0,
          baoshang:0,
          wushi:0,
          yichang:0,
          jinzeng:0,
          yuanzeng:0,
          gongji: 0,
          sheji:0,
          shesu:0
        },
        wushiMap: [
          { min: 0, max: 10, mindb: 0, db: 0.7 },
          { min: 10, max: 20, mindb: 7, db: 1.2 },
          { min: 20, max: 30, mindb: 19, db: 1.4 },
          { min: 30, max: 40, mindb: 33, db: 1.8 },
          { min: 40, max: 50, mindb: 51, db: 2.3 },
          { min: 50, max: 60, mindb: 74, db: 3.3 },
          { min: 60, max: 70, mindb: 107, db: 4.7 }
        ],
        role:{
          jx1:{},
          jx2:{}
        },
        JXmap1:[
          {name:'大约翰', jxId: '2',attr:{ wushi: 20 }},
          {name:'格洛那', jxId: '5',attr:{ zhaohuan: 40}},
          {name:'六臂', jxId: '6',attr:{ jinzeng: 20}},
          {name:'雷式空母', jxId: '8',attr:{ yuanzeng: 12}},
          {name:'恐爪战甲', jxId: '9',attr:{ baoji: 12}},
          {name:'惊啸机甲', jxId: '10',attr:{ yichang: 12}},
          {name:'克拉肯', jxId: '12',attr:{ shesu: 20}},
          {name:'钢铁哨兵', jxId: '13',attr:{ baoji: 15}},
          {name:'黑猎犬', jxId: '14',attr:{ wushi: 12 }},
        ],
        JXmap2:[
          {name:'雷式空母', jxId: '8',attr:{ yuanzeng: 12,zhaohuan: 90,}},
          {name:'恐爪战甲', jxId: '9',attr:{ baoji: 12,jinzeng: 36}},
          {name:'惊啸机甲', jxId: '10',attr:{ yichang: 12,teji:'获得强化武器时，下次武器射击远程增伤提升100%'}},
          {name:'吉利塔', jxId: '11',attr:{ yichang: 12,wushi:10,sheji:40}},
          {name:'克拉肯', jxId: '12',attr:{ shesu: 12,baoji:15,zhaohuan:90}},
          {name:'钢铁哨兵', jxId: '13',attr:{ baoji:15,jinzeng: 20,teji:'获得强化武器时，强化武器伤害提升50%'}},
          {name:'黑猎犬', jxId: '14',attr:{ wushi:12,baoji: 15,sheji:40}},
        ],
        roleIndex:0,
        indicatorStyle: `height: 50px;`
			}
		},
		methods: {
      baojiInput(e){
        if(e.detail.value - 0 > 100){
          this.attrs.baoji = 100
        }
      },
      baoshangInput(e){
        if(e.detail.value - 0 > 200){
          this.attrs.baoshang = 200
        }
      },
			roleChange(e){
        this.role = ''
        this.role = this.roleMap[Number(e.detail.value)];
      },
      JXchange(e){
        this.JXmap1.forEach(item=>{
          if(item.jxId == e.detail.value) this.role.jx1 = item
        })
      },
      JXchange2(e){
        this.JXmap2.forEach(item=>{
          if(item.jxId == e.detail.value) this.role.jx2 = item
        })
      },
      js(){
        this.role.attrs = {...this.attrs}
        for(let k in this.role.jx1.attr){
           this.role.attrs[k] = Number(this.role.attrs[k]) + Number(this.role.jx1.attr[k])
        }
        for(let k in this.role.jx2.attr){
          if(k != 'teji'){
            this.role.attrs[k] = Number(this.role.attrs[k]) + Number(this.role.jx2.attr[k])
          }else{
            this.role.attrs[k] = this.role.jx2.attr[k]
          }
        }
        // return console.log(this.role)
        let mingzhong = this.role.attrs.mingzhong >= 5 ? 5 : this.role.attrs.mingzhong
        if(this.role.roleId == '0'){
          let wushi =  this.role.attrs.wushi - this.role.attrs.wushikang

          if(wushi < 0) wushi = 0
          else if(wushi > 70) wushi = 70

          let wushiIndex = Math.floor(wushi / 10) == 7 ? 6 : Math.floor(wushi / 10)
          let wushiItem = this.wushiMap[wushiIndex]

          let wushiAdd = 1 + (wushiItem.mindb + (wushi - wushiItem.min) * wushiItem.db) / 100
          let computed1 =  this.role.attrs.ad * ((this.role.attrs.baoji / 100 * 0.7) * ((150+Number(this.role.attrs.baoshang))/100)+1)*(1 + this.role.attrs.gongji / 100) * wushiAdd
          let yichang = computed1 * this.role.attrs.yichang / 100 * 0.35
          let yuanjin = Number(this.role.attrs.jinzeng)  > Number(this.role.attrs.yuanzeng) ? this.role.attrs.jinzeng : this.role.attrs.yuanzeng
          this.computedAttr = (computed1 + yichang + Number(this.role.attrs.shesu*0.009) + Number(this.role.attrs.sheji*0.009)) * (1 + yuanjin / 100) * (95 + Number(mingzhong)) / 100
          this.computedAttr = this.computedAttr.toFixed(2)
          let qianghuawuqi = Math.floor(this.role.attrs.wushi / 5) * 2.5
          let qianghuawuqi2 = Math.floor(this.role.attrs.yichang / 5)
          this.computedAttr = this.computedAttr + '  强化子弹伤害+' + qianghuawuqi + '%  获得额外强化武器' + qianghuawuqi2 + '%'
        }
        if(this.role.roleId == '1'){
          let wushi =  this.role.attrs.wushi - this.role.attrs.wushikang
          if(wushi < 0) wushi = 0;
          else if(wushi > 70) wushi = 70

          let wushiIndex = Math.floor(wushi / 10) == 7 ? 6 : Math.floor(wushi / 10)
          let wushiItem = this.wushiMap[wushiIndex]
          let wushiAdd = 1 + (wushiItem.mindb + (wushi - wushiItem.min) * wushiItem.db) / 100
          let computed1 =  this.role.attrs.ad * ((this.role.attrs.baoji / 100 * 0.7) * ((150+Number(this.role.attrs.baoshang))/120)+1)*(1 + this.role.attrs.gongji / 100) * wushiAdd
          let yichang = computed1 * this.role.attrs.yichang / 100 * 0.61
          let yuanjin = Number(this.role.attrs.jinzeng) > Number(this.role.attrs.yuanzeng) ? this.role.attrs.jinzeng : this.role.attrs.yuanzeng
          this.computedAttr = (computed1 + yichang + Number(this.role.attrs.shesu*0.009) + Number(this.role.attrs.sheji*0.009)) * (1 + yuanjin / 100) * (95 + Number(mingzhong)) / 100
          this.computedAttr = this.computedAttr.toFixed(2)
          let zhaohuanwushanghai = Math.floor(this.role.attrs.yuanzeng / 5) * 5
          this.computedAttr = this.computedAttr + '  召唤物伤害倍率' + (Number(zhaohuanwushanghai) + Number(this.role.attrs.zhaohuan)) + '%'
        }
        if(this.role.roleId == '2'){
          let wushi =  this.role.attrs.wushi - this.role.attrs.wushikang
		      if(wushi < 0) wushi = 0
          else if(wushi > 70) wushi = 70
          let wushiIndex = Math.floor(wushi / 10) == 7 ? 6 : Math.floor(wushi / 10)
          let wushiItem = this.wushiMap[wushiIndex]
          let wushiAdd = 1 + (wushiItem.mindb + (wushi - wushiItem.min) * wushiItem.db) / 100
          let computed1 =  this.role.attrs.ad * ((this.role.attrs.baoji / 100 * 0.7) * ((150+Number(this.role.attrs.baoshang))/100)+1)*(1 + this.role.attrs.gongji / 100) * wushiAdd
          let yichang = computed1 * this.role.attrs.yichang / 100 * 0.4
          this.computedAttr = (computed1 + yichang + Number(this.role.attrs.shesu*0.009) + Number(this.role.attrs.sheji*0.009)) * (1 + this.role.attrs.jinzeng / 100) * (95 + Number(mingzhong)) / 100
          this.computedAttr = this.computedAttr.toFixed(2)
        }
        if(this.role.roleId == '3'){
          let wushi =  this.role.attrs.wushi - this.role.attrs.wushikang
          if(wushi < 0) wushi = 0
          else if(wushi > 70) wushi = 70
          let wushiIndex = Math.floor(wushi / 10) == 7 ? 6 : Math.floor(wushi / 10)
          let wushiItem = this.wushiMap[wushiIndex]
          let wushiAdd = 1 + (wushiItem.mindb + (wushi - wushiItem.min) * wushiItem.db) / 100
          let computed1 =  this.role.attrs.ad * ((this.role.attrs.baoji / 100 * 0.7) * ((150+Number(this.role.attrs.baoshang))/100)+1)*(1 + this.role.attrs.gongji / 100) * wushiAdd
          let yichang = computed1 * this.role.attrs.yichang / 100 * 0.4
          this.computedAttr = (computed1 + yichang + Number(this.role.attrs.shesu*0.009) + Number(this.role.attrs.sheji*0.009)) * (1 + this.role.attrs.yuanzeng / 100) * (95 + Number(mingzhong)) / 100
          this.computedAttr = this.computedAttr.toFixed(2) + '贯穿炮伤害加成' + Math.floor(this.role.attrs.baoshang / 10) * 4
        }
      },
      upload(){

            this.$api("post", "/user/hj/attrUpload", '')
            .then((res) => {
              console.log(res);
              localStorage.token = "Bearer " + res.token;
              router.push({ path: "/index/video" });
            })
            .catch((err) => {
              console.log(err);
              // proxy.$message.error(err);
            });
      }
		},
    created(){
      console.log(this.$api);
    }
	}
</script>

<style scoped lang="scss">
.container{
  padding: 30rpx 20rpx 0;
}
.uni-list{
  display: flex;
  flex-wrap: wrap;
  padding: 0 20rpx;
}
.uni-list-cell {
  width: 33%;
  display: flex;
  justify-content: flex-start;
  margin: 8rpx 0;
}

.uni-list .label-3 {
  padding: 0;
}

.label-2-text {
  flex: 1;
}

.form{
  margin-top: 10px;
  .title{
    margin-bottom: 10px;
  }
  .uni-column{
    display: flex;
    flex-wrap: wrap;

    .row{
      flex: 1 1 50%;
      display: flex;
      margin-bottom: 12px;
      .uni-form-item__title {
        font-size: 16px;
        line-height: 30px;
        width: 80px;
      }
      .uni-input {
        height: 28px;
        line-height: 28px;
        font-size: 15px;
        padding: 0px;
        //width: 40%;
        background-color: #FFFFFF;
      }
    }
  }
}

.uni-collapse-item{
  margin-bottom: 10px;
  .title{
    padding-left: 10px;
  }
}
.uni-input-wrapper {
  padding: 0 5px;
  width: 42%;
  background-color: #FFFFFF;
  .uni-input{
    width: 50%;
  }
}
::v-deep .uni-collapse-item__title{
  background-color: #fff;
}
.uni-section{
  ::v-deep .uni-section-header{
    display: none;
  }
}

</style>
