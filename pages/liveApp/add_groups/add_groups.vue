<template>
<!-- 创建群组 -->
<view class="createGroup">
	<!-- 群组名称 -->
	<view class="create_input">
		<view>
			<input @input="getGroupName" placeholder="群名称" placeholder-style="color:#CFCFCF;line-height:20px;font-size:12px;" auto-focus>
		</view>
	</view>
	<!-- 群简介 -->
	<view class="create_textarea">
		<view>
			<textarea @input="getGroupDec" placeholder="群简介" auto-focus placeholder-style="color:#CFCFCF;line-height:20px;font-size:12px;"></textarea>
		</view>
	</view>
	<!-- 此版本注释 -->
	<!-- <view class="check_area">
		<view>
			<checkbox-group class="checkbox-group" bindchange="allowJoin">
				<label class="checkbox">
					<checkbox value="true"/>允许任何人加入
				</label>
			</checkbox-group>
			<checkbox-group class="checkbox-group" bindchange="allowApprove">
				<label class="checkbox">
					<checkbox value="true"/>加入需要审批
				</label>
			</checkbox-group>
			<!-- <checkbox-group class="checkbox-group" bindchange="noAllowJoin">
				<label class="checkbox">
					<checkbox value="true"/>不允许任何人加入
				</label>
			</checkbox-group> -->
			<!-- <checkbox-group class="checkbox-group" bindchange="allowInvite">
				<label class="checkbox">
					<checkbox value="true"/>允许群人员邀请
				</label>
			</checkbox-group>
		</view>
	</view> -->
	<!-- 获取需要邀请的好友列表 -->
	<view class="friend_list">
		<view>
			<text class="invite_text">邀请好友</text>
			<checkbox-group class="checkbox-group" @change="inviteFriendFun">
				<label class="checkbox" v-for="(item, index) in friendList" :key="index">
					<checkbox :value="item.name"></checkbox>{{ item.name }}</label>
			</checkbox-group>
		</view>
	</view>
	<!--  -->
	<view class="create_btn">
		<button type="primary" @tap="createGroup">创建</button>
	</view>
</view>
</template>

<script>
var WebIM = require("@/utils/WebIM")["default"];

export default {
  data() {
    return {
      friendList: [],
      // 好友列表
      groupName: "",
      // 群名称
      groupDec: "",
      // 群简介
      allowJoin: true,
      // 是否允许任何人加入
      allowApprove: false,
      // 加入需要审批
      noAllowJoin: false,
      // 不允许任何人加入
      allowInvite: false,
      // 允许群人员邀请
      inviteFriend: [],
      // 需要加好友ID
      owner: "" // = myName

    };
  },

  components: {},
  props: {},
  onLoad: function (options) {
    this.setData({
      owner: JSON.parse(options.owner).myName
    });
  },
  onShow: function () {
    var me = this; // 获取当前用户的好友信息

    WebIM.conn.getRoster({
      success: function (roster) {
        var member = [];

        for (let i = 0; i < roster.length; i++) {
          if (roster[i].subscription == "both") {
            member.push(roster[i]);
          }
        }

        me.setData({
          friendList: member
        });
      }
    });
  },
  methods: {
    getGroupName: function (e) {
      this.setData({
        groupName: e.detail.value
      });
    },
    getGroupDec: function (e) {
      this.setData({
        groupDec: e.detail.value
      });
    },
    allowJoinFun: function (e) {
      this.setData({
        allowJoin: Boolean(e.detail.value) || false
      });
    },
    allowApproveFun: function (e) {
      this.setData({
        allowApprove: Boolean(e.detail.value) || false
      });
    },
    noAllowJoinFun: function (e) {
      this.setData({
        noAllowJoin: Boolean(e.detail.value) || false
      });
    },
    allowInviteFun: function (e) {
      this.setData({
        allowInvite: Boolean(e.detail.value) || false
      });
    },
    inviteFriendFun: function (e) {
      this.setData({
        inviteFriend: e.detail.value
      });
    },
    // 创建群组
    createGroup: function () {
      let me = this;
      let allGroups = getApp().globalData.groupList;

      if (!this.groupName.trim()) {
        uni.showModal({
          title: "请输入群名",
          confirmText: "OK",
          showCancel: false
        });
        return;
      }

      if (allGroups.reduce(function (result, v, k) {
        return result || v.name == me.groupName;
      }, false)) {
        uni.showModal({
          title: "群名被占用",
          confirmText: "OK",
          showCancel: false
        });
        return;
      }

      let options = {
        data: {
          groupname: this.groupName,
          desc: this.groupDec,
          members: this.inviteFriend,
          "public": this.allowJoin,
          // approval: this.data.allowApprove,
          // allowinvites: this.data.allowInvite,
          owner: this.owner
        },
        success: function (respData) {
          uni.showToast({
            title: "添加成功",
            duration: 2000,
            success: function (res) {
              setTimeout(() => uni.navigateTo({
                url: "../groups/groups?myName=" + me.owner
              }), 2000);
            }
          });
        },
        error: function (err) {
          uni.showToast({
            title: err.data.error_description,
            icon:'none'
          });
        }
      };
      WebIM.conn.createGroupNew(options);
    }
  }
};
</script>
<style>
@import "./add_groups.css";
page{background-color: white;}
</style>