<template>
  <div>
    <el-form :model="dutyVo" v-loading="tableLoading" :rules="rules" ref="addDutyForm" style="margin: 0px;padding: 0px;">
      <div style="text-align: left">
          <el-row>
            <div class="common_div" style="margin: 20px 10px;">
              <el-form-item label="值班时间:" prop="dutyTime">
                <el-date-picker
                  v-model="dutyVo.dutyTime"
                  clearable
                  size="large"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择值班日期">
                </el-date-picker>
              </el-form-item>
            </div>
            <div class="common_div" style="margin: 20px 10px;">
                <el-form-item label="值班描述:" prop="remarks">
                  <el-input type="textarea" resize="none" clearable v-model="dutyVo.remarks" placeholder="值班描述"></el-input>
                </el-form-item>
            </div>
            <div class="common_div" style="margin: 20px 10px;">
              <el-form-item label="值班人员:" prop="empIdList">
                <el-select filterable multiple v-model="dutyVo.empIdList" clearable size="large" placeholder="请选择值班人员">
                  <el-option
                    v-for="item in empLists"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-row>
        <div style="text-align: center;">
          <el-button plain size="small" @click="consoleDutyInfo()">清 空</el-button>
          <el-button size="small" type="primary" @click="addDutyInfo('addDutyForm')">确 定</el-button>
        </div>
  </div>
</el-form>
</div>
</template>
<script>
  export default{
    data(){
      return {
        dutyVo: { //值班对象数据
          dutyTime: '', //值班时间
          remarks: '', //值班描述
          empIdList:[], //员工Id数组
        },
        empLists:[], //人员列表
        tableLoading:true, //加载等待
        rules: {
          dutyTime: [{required: true, message: '必选:值班时间', trigger: 'blur'}],
          remarks: [{required: true, message: '必填:值班描述', trigger: 'blur'}],
          empIdList: [{required: true, message: '必选:值班人员', trigger: 'blur'}],
        }
      }
    },
    methods:{
      addDutyInfo: function (formName) {
        this.$confirm('是否确认提交?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(action=> {
          if(action == 'confirm'){
            let result = this.addDutyInfoSure(formName);
            if(result){
              this.$message({type: 'success', message: '提交成功!',});
            }
          }
        }).catch(err=> {
          if(err=='cancel'){
            this.$message({type: 'info', message: '已取消'});
          }else{
            this.$message({type: 'error', message: '程序出错'});
          }
        });
      },
      getAllEmp:function () {
        let _this = this;
        this.postRequest("/employee/basic/getAllEmps").then(resp=>{
          if(resp && resp.status == 200) {
            _this.tableLoading = false;
            _this.empLists = resp.data.data;
          }
        });
      },
      consoleDutyInfo: function () {
        let _this = this;
        _this.dutyVo.dutyTime = '';
        _this.dutyVo.remarks = '';
        _this.dutyVo.empIdList = [];
      },
      addDutyInfoSure: function (formName) {
        let _this = this;
        this.$refs[formName].validate((valid) => {
           if(valid){
              _this.tableLoading = true;
              this.postRequest("/duty/info/addDutyInfo",_this.dutyVo).then(resp=> {
                if (resp && resp.status == 200) {
                  _this.tableLoading = false;
                  _this.dutyVo.dutyTime = '';
                  _this.dutyVo.remarks = '';
                  _this.dutyVo.empIdList = [];
                  this.$message({type: 'success', message: '提交成功!',});
                }
              });
           }else{
             return false;
           }
        });
      }
    },
    mounted:function () {
       this.getAllEmp();
    }
  }
</script>
<style>
  .common_div{
    width: 100%;
  }
  .el-textarea{
    width: 90%;
  }
</style>
