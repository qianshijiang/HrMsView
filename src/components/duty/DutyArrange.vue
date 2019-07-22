<template>
  <div>
    <el-form :model="dutyVo" :rules="rules" ref="addDutyForm" style="margin: 0px;padding: 0px;">
      <div style="text-align: left">
          <el-row>
            <div>
              <el-form-item label="值班时间:" prop="dutyTime">
                <el-date-picker
                  v-model="dutyVo.dutyTime"
                  unlink-panels
                  size="large"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择值班日期">
                </el-date-picker>
              </el-form-item>
            </div>
            <div>
                <el-form-item label="值班描述" prop="remarks">
                  <el-input type="textarea" v-model="dutyVo.remarks"></el-input>
                </el-form-item>
            </div>
            <div>
              <el-form-item label="值班人员:" prop="nationId">
                <el-select v-model="emp.nationId" style="width: 150px" size="mini" placeholder="请选择民族">
                  <el-option
                    v-for="item in nations"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-row>
          <span slot="footer" class="dialog-footer">
    <el-button size="mini" @click="cancelEidt">取 消</el-button>
    <el-button size="mini" type="primary" @click="addEmp('addEmpForm')">确 定</el-button>
  </span>
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
        rules: {
          dutyTime: [{required: true, message: '必选:值班时间', trigger: 'blur'}],
          remarks: [{required: true, message: '必填:值班描述', trigger: 'blur'}],
          empIdList: [{required: true, message: '必选:值班人员', trigger: 'blur'}],
        }
      }
    },
    methods:{

    },
    mounted:function () {

    }
  }
</script>
