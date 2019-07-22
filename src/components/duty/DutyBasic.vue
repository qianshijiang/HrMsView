<template>
  <div>
    <el-container>
      <!--<el-header style="padding: 0px;display:flex;justify-content:space-between;align-items: center;">
        <div style="display: inline;">
          <el-button type="primary" size="mini" icon="el-icon-plus" @click="">
            值班安排
          </el-button>
        </div>
      </el-header>-->
      <el-main style="padding-left: 0px;padding-top: 0px">
        <div>
          <transition name="slide-fade">
            <div style="margin-bottom: 10px;" class="demo-input-suffix">
              <span>值班日期:
                  <el-date-picker
                  v-model="dutyTime"
                  unlink-panels
                  size="large"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择值班日期">
                </el-date-picker>
              </span>
              <span style="margin: 0 30px;">姓名:
                   <el-input
                    clearable
                    size="large"
                    placeholder="输入姓名"
                    style="width: 200px;"
                    v-model="empName">
                   </el-input>
               </span>
              <span>工号:
                  <el-input
                   clearable
                   size="large"
                   style="width: 200px;"
                   placeholder="输入工号"
                   v-model="workId">
               </el-input>
              </span>
               <div class="search_button">
                 <el-button icon="el-icon-search" type="primary" size="small" @click="searchDutys">搜索</el-button>
               </div>
            </div>
          </transition>
          <el-table
            :data="dutys"
            v-loading="tableLoading"
            border
            stripe
            size="mini"
            style="width: 100%">
            <el-table-column
              prop="dutyTime"
              align="left"
              fixed
              label="值班日期"
              width="151">
              <template slot-scope="scope">{{ scope.row.dutyTime | formatDateTime}}</template>
            </el-table-column>
            <el-table-column
              prop="remarks"
              width="500"
              align="left"
              label="值班描述">
            </el-table-column>
            <el-table-column
              prop="operName"
              label="创建人姓名"
              align="left"
              width="152">
            </el-table-column>
            <el-table-column
              prop="empName"
              width="152"
              align="left"
              label="员工姓名">
            </el-table-column>
            <el-table-column
              prop="workId"
              width="152"
              align="left"
              label="员工工号">
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
        dutys:[], //日志数据
        tableLoading:false,
        totalCount: -1,//页码总数
        dutyTime:'', //值班日期
        empName:'',//员工姓名
        workId:'',//员工工号
        currentPage:1,//页码
        pageSize:10,//每页条数
      }
    },
    methods: {
      initData: function () {
        let _this = this;
        if(_this.dutyTime==null){
          _this.dutyTime = '';
        }
        let param = {dutyTime:this.dutyTime,empName:this.empName, workId:this.workId, currentPage:this.currentPage, pageSize:this.pageSize};
        this.postRequest("/duty/info/getListByPage",param).then(resp=> {
          if (resp && resp.status == 200) {
            let data = resp.data.data;
            _this.totalCount = resp.data.totalNum;
            _this.dutys = data;

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
