<template>
  <div>
    <!-- <el-tooltip class="item" effect="light" content="点击跳转到延期生产单" placement="top-start"> -->
    <el-badge v-if="showTix !=='2'" :value="msgMind" style="line-height: 30px;">
      <el-button size="small" type="primary" @click="jump" style="height:32px;">
      <icon-svg icon-class="message"></icon-svg>
        <!-- <svg t="1492682037685" class="bug-svg" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1863"
				  xmlns:xlink="http://www.w3.org/1999/xlink" width="64" height="64">
					<path d="M969.142857 548.571429q0 14.848-10.861714 25.709714t-25.709714 10.861714l-128 0q0 97.718857-38.290286 165.705143l118.857143 119.442286q10.861714 10.861714 10.861714 25.709714t-10.861714 25.709714q-10.276571 10.861714-25.709714 10.861714t-25.709714-10.861714l-113.152-112.566857q-2.852571 2.852571-8.557714 7.424t-23.990857 16.274286-37.156571 20.845714-46.848 16.566857-55.442286 7.424l0-512-73.142857 0 0 512q-29.147429 0-58.002286-7.716571t-49.700571-18.870857-37.705143-22.272-24.868571-18.578286l-8.557714-8.009143-104.557714 118.272q-11.446857 11.995429-27.428571 11.995429-13.714286 0-24.576-9.142857-10.861714-10.276571-11.702857-25.417143t8.850286-26.587429l115.419429-129.718857q-33.133714-65.133714-33.133714-156.562286l-128 0q-14.848 0-25.709714-10.861714t-10.861714-25.709714 10.861714-25.709714 25.709714-10.861714l128 0 0-168.009143-98.852571-98.852571q-10.861714-10.861714-10.861714-25.709714t10.861714-25.709714 25.709714-10.861714 25.709714 10.861714l98.852571 98.852571 482.304 0 98.852571-98.852571q10.861714-10.861714 25.709714-10.861714t25.709714 10.861714 10.861714 25.709714-10.861714 25.709714l-98.852571 98.852571 0 168.009143 128 0q14.848 0 25.709714 10.861714t10.861714 25.709714zM694.857143 219.428571l-365.714286 0q0-75.995429 53.430857-129.426286t129.426286-53.430857 129.426286 53.430857 53.430857 129.426286z"
					  p-id="1864"></path>
				</svg> -->
        延期提醒
      </el-button>
    </el-badge>
    <!-- </el-tooltip> -->
    <el-dialog v-dialogDrag title="提醒" :visible.sync="dialogTableVisible">
      <el-table :data="msgList">
        <el-table-column prop="OrderId" label="工序编号">
          <!-- <template scope="scope">
						<div>msg:{{ scope.row.name }}</div>
						<br/>
						<div>url: {{scope.row.OrderId}}</div>
					</template> -->
        </el-table-column>
        <el-table-column prop="name" label="工序">
          <!-- <template scope="scope">
						{{ scope.row.name}}
					</template> -->
        </el-table-column>
        <el-table-column prop="CreateTime" label="创建时间" :formatter="this.ChangeDateFormat">
          <!-- <template scope="scope">
						{{ scope.row.CreateTime | this.ChangeDateFormat}}
					</template> -->
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
import { page } from "api/admin/msgRemind/index";
import {
  getToken,
  setToken,
  getRole,
  setRole,
  setUserId,
  getUserId,
  removeRole,
  removeUserID,
  removeToken
} from "utils/auth";
export default {
  name: "errLog",
  props: {
    logsList: {
      type: Array
    }
  },

  data() {
    return {
      dialogTableVisible: false,
      msgList: null,
      msgMind: null,
      showTix: "",
      num: 0
    };
  },
  created() {
    this.upload();
    this.showTix = getRole();
    //  console.log( this.showTix)
  },
  methods: {
    jump() {
      // console.log('tixing')
      if (this.$router.history.current.name == "生产单管理") {
        this.num++;
        // console.log('tixing')
        this.$router.push({
          name: "生产单管理",
          params: {
            stateCode: 1
          },
          query: {
            stateCode: 1,
            n: this.num
          }
        });
      } else {
        this.$store.dispatch("GetOrderState", 3).then(() => {
          // location.reload(); // 为了重新实例化vue-router对象 避免bug
        });
        this.$router.push({
          name: "生产单管理",
          params: {
            stateCode: 1
          }
        });
      }
    },
    upload() {
      page().then(res => {
        if (res.status == 200) {
          this.msgMind = res.data.total;
          this.msgList = res.data.rows;
        }
      });
    }
  }
};
</script>

<style scoped>
.bug-svg {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
