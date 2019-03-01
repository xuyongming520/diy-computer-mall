<template>
  <div id="shopping-address">
    <header>
      <span>收货地址</span>
      <el-button
        type="primary"
        icon="el-icon-plus"
        class="addButton"
        @click="openCreateDialog"
      >
        新增地址
      </el-button>
    </header>
    <main id="address-list" v-loading="loading">
      <!-- {{addressList}} -->
      <div
        class="address-card"
        v-for="(address,index) in addressList"
        :key="index"
      >
        <p class="name">{{address.name}}</p>
        <p class="phone">{{address.phone}}</p>
        <p class="position">
          {{address.country}} {{address.city}} {{address.province}} {{address.area}}
        </p>
        <p class="address">
          {{`${address.street}(${address.zip})` | ellipsis}}
        </p>

        <div class="top-layer">
          <div
            class="update-button"
            @click="openUpdateDialog(address)"
          >
            <span>修 改</span>
          </div>
          <div
            class="delete-button"
            @click="deleteAddress(address.pkId)"
          >
            <span>删 除</span>
          </div>
        </div>
      </div>
    </main>

    <el-pagination
      v-show="totalPage>0"
      :current-page.sync="listQuery.page"
      :page-size="listQuery.limit"
      :page-count="totalPage"
      layout="prev, pager, next"
      style="margin-top:20px"
      @current-change="handleCurrentChange"
    >
    </el-pagination>

    <el-dialog title="收货地址" :visible.sync="addressDetailDialog" width="650px" @close="resetForm">
      <el-form
        :model="addressDetail"
        :rules="rules"
        ref="addressForm"
        label-width="100px"
        class="form"
      >
        <el-form-item label="收货人姓名" prop="name">
          <el-input v-model="addressDetail.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model.number="addressDetail.phone"></el-input>
        </el-form-item>
        <el-form-item label="收货地点" required>
          <el-row>
            <el-col :span="11">
              <el-form-item prop="country">
                <el-input v-model="addressDetail.country" placeholder="国家"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="2">
              <el-form-item prop="province">
                <el-input v-model="addressDetail.province" placeholder="省份"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item prop="city">
                <el-input v-model="addressDetail.city"  placeholder="城市"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="2">
              <el-form-item prop="area">
                <el-input v-model="addressDetail.area" placeholder="区域"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="详细地址" prop="street">
          <el-input type="textarea"
            v-model="addressDetail.street"
            placeholder="详细地址，如(XX小区X幢XXX号)"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="邮政编码" prop="zip">
          <el-input v-model="addressDetail.zip"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitAddress">{{create?'立即创建':'立即修改'}}</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import * as userAddress from '@/api/shopping-address';

export default {
  name: 'shopping-address',
  data() {
    return {
      loading: true,
      addressList: [],
      totalCount: 0,
      totalPage: 0,
      listQuery: {
        limit: 9,
        page: 1,
      },
      addressDetailDialog: false,
      addressDetail: {
        pkid: '',
        name: '',
        phone: '',
        country: '中国',
        province: '',
        city: '',
        area: '',
        street: '',
        zip: '',
        isDefault: 0,
      },
      create: true,
      rules: {
        name: [
          { required: true, message: '请输入收货人姓名', trigger: 'blur' },
        ],
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          {
            type: 'number', message: '请输入正确的手机号码', trigger: 'blur',
          },
        ],
        country: [{ required: true, message: '请输入国家', trigger: 'blur' }],
        province: [{ required: true, message: '请输入省份', trigger: 'blur' }],
        city: [{ required: true, message: '请输入城市', trigger: 'blur' }],
        area: [{ required: true, message: '请输入区域', trigger: 'blur' }],
        street: [{ required: true, message: '请输入详细地址', trigger: 'blur' }],
        zip: [{ required: true, message: '请输入邮政编码', trigger: 'blur' }],
      },
    };
  },
  methods: {
    getList() {
      userAddress.query(this.listQuery)
        .then((result) => {
          this.addressList = result.data.data.list;
          this.totalCount = result.data.data.totalCount;
          this.totalPage = result.data.data.totalPage;
          this.loading = false;
        }).catch(() => {
          this.loading = false;
        });
    },
    submitAddress() {
      if (this.create) {
        this.createAddress();
      } else {
        this.updateAddress();
      }
    },
    createAddress() {
      this.$refs.addressForm.validate(async (valid) => {
        if (valid) {
          await userAddress.insert(this.addressDetail)
            .then(() => {
              this.$notify({
                title: '成功',
                message: '新建地址成功！',
                type: 'success',
              });
              this.getList();
            }).catch(() => {
              this.$notify({
                title: '失败',
                message: '新建地址失败。',
                type: 'fail',
              });
            });
          this.addressDetailDialog = false;
          this.resetForm();
          return true;
        }
        console.log('error submit!!');
        return false;
      });
    },
    updateAddress() {
      this.$refs.addressForm.validate(async (valid) => {
        if (valid) {
          await userAddress.update(this.addressDetail)
            .then(() => {
              this.$notify({
                title: '成功',
                message: '更新地址成功！',
                type: 'success',
              });
              this.getList();
            }).catch(() => {
              this.$notify({
                title: '失败',
                message: '更新地址失败。',
                type: 'fail',
              });
            });
          this.addressDetailDialog = false;
          this.resetForm();
          return true;
        }
        console.log('error submit!!');
        return false;
      });
    },
    async deleteAddress(id) {
      await userAddress.deleteById(id)
        .then(() => {
          this.$notify({
            title: '成功',
            message: '删除地址成功！',
            type: 'success',
          });
        });
      this.getList();
    },
    openCreateDialog() {
      this.addressDetail = {
        pkid: '',
        name: '',
        phone: '',
        country: '中国',
        province: '',
        city: '',
        area: '',
        street: '',
        zip: '',
        isDefault: 0,
      };
      this.addressDetailDialog = true;
      this.create = true;
    },
    openUpdateDialog(oldAddress) {
      this.addressDetailDialog = true;
      this.addressDetail = oldAddress;
      this.create = false;
    },
    resetForm() {
      this.$refs.addressForm.resetFields();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
  },
  created() {
    this.getList();
  },
  filters: {
    ellipsis(string) {
      if (!string) return '';
      if (string.length > 48) {
        return `${string.slice(0, 48)}…`;
      }
      return string;
    },
  },
};
</script>

<style lang="less" scoped>
@import url('../../styles/number.less');
@import url('../../styles/color.less');
#shopping-address{
  width: 890px;
  header{
    line-height: 80px;
    border-bottom: 1px solid @fontThree;
    margin-bottom: 30px;
    span{
      color: @fontTwo;
      font-size: 30px;
      letter-spacing: 2px;
    }
    .addButton{
      float: right;
      margin: 20px 0;
    }
  }
  main{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    .address-card{
      position: relative;
      width: 246px;
      height: 140px;
      border: 1px solid @fontFour;
      border-radius: 3px;
      margin:4px;
      padding:20px;
      .name{
        margin:3px 0 10px 0;
        font-size: 22px;
      }
      .phone{
        margin:5px 0;
        color: @fontThree;
        font-size: 14px;
      }
      .position{
        margin:5px 0;
        color: @fontThree;
        font-size: 14px;
      }
      .address{
        margin:5px 0;
        color: @fontThree;
        font-size: 14px;
        text-overflow: ellipsis;
        word-wrap: break-word;
        overflow: hidden;
      }

      .top-layer{
        width: 186px;
        height: 180px;
        border-radius: 3px;
        position:absolute;
        top:0;
        left:0;
        background:rgba(0,0,0,.8);
        opacity: 0;
        transition: all .5s;
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 0 50px;
        &:hover{
          opacity: 1;
        }
        div{
          width:70px;
          height: 70px;
          border-radius: 50%;
          background: rgba(96,98,102,.8);
          text-align: center;
          line-height: 70px;
          font-size: 14px;
          color: white;
          transition: all .3s;
          &:hover{
            cursor: pointer;
            color: @colorTwo;
          }
        }
      }
    }
  }
  .form{
    margin-right: 30px;
    .el-row {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
