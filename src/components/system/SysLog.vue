<template>
  <div>
    <el-container>
      <el-main style="padding-left: 0px;padding-top: 0px">
        <div>
          <transition name="slide-fade">
            <div style="margin-bottom: 10px;" class="demo-input-suffix">
              <span>操作日期:
                  <el-date-picker
                v-model="addDate"
                unlink-panels
                size="large"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择操作日期">
                </el-date-picker>
              </span>
              <span style="margin: 0 30px;">操作员姓名:
                   <el-input
                clearable
                size="large"
                placeholder="输入操作员姓名"
                style="width: 200px;"
                v-model="hrName">
                   </el-input>
               </span>
              <span>IP:
                  <el-input
                clearable
                size="large"
                style="width: 200px;"
                placeholder="输入IP"
                v-model="IP">
               </el-input>
              </span>
              <div class="search_button">
                <el-button icon="el-icon-search" type="primary" size="small" @click="searchDutys">搜索</el-button>
              </div>
            </div>
          </transition>
          <el-table
            :data="oplogs"
            v-loading="tableLoading"
            border
            stripe
            size="mini"
            style="width: 100%">
            <el-table-column
              prop="addDate"
              align="left"
              fixed
              label="操作日期"
              width="200">
              <template slot-scope="scope">{{ scope.row.addDate | formatDateTime}}</template>
            </el-table-column>
            <el-table-column
              prop="operate"
              width="522"
              align="left"
              label="操作内容">
            </el-table-column>
            <el-table-column
              prop="hrName"
              label="操作员姓名"
              align="left"
              width="200">
            </el-table-column>
            <el-table-column
              prop="ip"
              width="200"
              align="left"
              label="IP">
            </el-table-column>
          </el-table>
          <div style="display: flex;justify-content: space-between;margin: 2px">
            <el-pagination
              background
              :page-size="pageSize"
              :current-page="currentPage"
              @current-change="currentChange"
              layout="prev, pager, next"
              :total="totalCount">
            </el-pagination>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        oplogs:[], //日志数据
        tableLoading:true,
        totalCount: -1,//页码总数
        addDate:'', //操作日期
        hrName:'',//操作员姓名
        IP:'',//IP地址
        currentPage:1,//页码
        pageSize:10,//每页条数
      }
    },
    methods: {
      initData: function () {
        let _this = this;
        if(_this.addDate==null){
          _this.addDate = '';
        }
        _this.tableLoading = true;
        let param = {addDate:this.addDate,hrName:this.hrName, IP:this.IP, currentPage:this.currentPage, pageSize:this.pageSize};
        this.postRequest("/oplog/info/getOplogList",param).then(resp=> {
          if (resp && resp.status == 200) {
            let data = resp.data.data;
            _this.totalCount = resp.data.totalNum;
            _this.tableLoading = false;
            _this.oplogs = data;
          }
        })
      },
      currentChange:function (currentPage) {
        this.currentPage = currentPage;
        this.initData();
      },
      searchDutys:function () {
        this.initData();
      },
    },
    mounted: function () {
      this.initData();
    }
  };
</script>
<style>
  .el-dialog__body {
    padding-top: 0px;
    padding-bottom: 0px;
  }

  .slide-fade-enter-active {
    transition: all .8s ease;
  }

  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }
  .search_button{
    margin-top: 20px;
  }
</style>
