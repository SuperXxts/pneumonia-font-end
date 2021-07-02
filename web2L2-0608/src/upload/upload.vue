<template>
  <div id="upload" style="width: 900px; margin: 0 auto">
    <Modal
      closable="false"
      v-model="showPreResult"
      width="390px"
      style="text-align: center"
    >
      <p style="font-size: 14px">
        &nbsp;&nbsp;{{ preResult.imgName }}<br />
        <span class="covid">Covid-19的概率：{{ preResult.covid }}</span
        ><br />
        <span class="normal">正常的概率：{{ preResult.normal }}</span
        ><br />
        <span class="vir">其它病毒性的概率：{{ preResult.vir }}</span>
      </p>
    </Modal>
    <h1 style="text-align: center; color: white">肺炎自助诊断</h1>
    <Divider></Divider>
    <h2 style="text-align: center; color: white">请上传肺部X光照片</h2>
    <card>
      <div class="uploadImg">
        <el-upload
          drag
          class="upload"
          action="http://localhost:8000/predict"
          :auto-upload="true"
          :on-change="changeUpload"
          :limit="1"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :on-error="handleAvatarErr"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
        </el-upload>
      </div>
      <Form :label-width="90" inline>
        <div>
          <FormItem label="姓名">
            <Input type="text" placeholder="请输入姓名" v-model="userName" />
          </FormItem>
          <FormItem label="性别">
            <Select v-model="sex">
              <Option value="男">男</Option>
              <Option value="女">女</Option>
            </Select>
          </FormItem>
          <FormItem label="婚姻">
            <Select v-model="marriage">
              <Option value="已婚">已婚</Option>
              <Option value="未婚">未婚</Option>
            </Select>
          </FormItem>
          <FormItem label="年龄">
            <Input type="text" placeholder="请输入年龄" v-model="age" />
          </FormItem>

          <FormItem label="民族">
            <Input type="text" placeholder="请输入民族" v-model="nation" />
          </FormItem>
          <FormItem label="过敏史">
            <Input type="text" placeholder="请输入过敏史" v-model="allergy" />
          </FormItem>
          <FormItem label="住址">
            <Input type="text" placeholder="请输入住址" v-model="address" />
          </FormItem>
          <FormItem label="记录日期">
            <Input type="text" v-model="data" />
          </FormItem>
          <FormItem label="主诉">
            <Input
              type="text"
              placeholder="请输入主诉,不超过200字"
              v-model="textarea"
            />
          </FormItem>
          <FormItem label="诊断结果">
            <Input type="text" placeholder="请输入诊断结果" v-model="result" />
          </FormItem>
          <br />
          <FormItem>
            <Button type="primary" @click="upload">提交</Button>
          </FormItem>
        </div>
      </Form>
    </card>
  </div>
</template>

<script>
export default {
  name: "upload",
  data() {
    return {
      userName: "",
      sex: "",
      age: "",
      marriage: "",
      nation: "",
      allergy: "",
      address: "",
      data: "",
      textarea: "",
      result: "",
      getinfotimer: 1,
      showPreResult: false,
      preResult: {
        imgName: "",
        covid: "",
        normal: "",
        vir: "",
      },
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.preResult.imgName = file.name;
      let pre_result = res.split(",");
      this.result =
        "covid-19: " +
        pre_result[0] +
        " ， normal: " +
        pre_result[1] +
        " ， vir:" +
        pre_result[2];
      this.preResult.covid = pre_result[0];
      this.preResult.normal = pre_result[1];
      this.preResult.vir = pre_result[2];
      this.showPreResult = true;
      console.log("预测结果：", res);
    },
    handleAvatarErr(res) {
      console.log("上传失败", res);
      this.$message.error("上传失败");
    },
    changeUpload(file) {
      let file_name = file.name
        .substring(file.name.lastIndexOf(".") + 1)
        .toUpperCase();
      if (file_name !== "JPG" && file_name !== "PNG") {
        this.$message.error("上传图片格式不对!");
      }
    },
    notice(text) {
      this.$Notice.open({
        title: "请稍等",
        desc:
          "您好，由于服务器负载有限，该识别结果会在大约10秒后返回，若无返回，请重新上传",
        duration: 0,
      });
    },
    upload() {},
    //获取当前时间，进行转换
    getTime: function () {
      var _this = this;
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1;
      let dd = new Date().getDate();
      _this.data = yy + "年" + mm + "月" + dd + "日";
    },
    //创建定时器
    currentTime() {
      setInterval(this.getTime, 500);
    },
  },
  created() {
    //触发定时器，创建当前时间
    this.currentTime();
  },
};
</script>

<style scoped>
#upload {
  zoom: 80%;
}
.uploadImg {
  text-align: center;
}
.el-upload__tip {
  margin-bottom: 10px;
}
.covid {
  color: rgb(202, 17, 54);
}
.normal {
  color: rgb(36, 173, 36);
}
.vir {
  color: rgb(191, 211, 15);
}
</style>
