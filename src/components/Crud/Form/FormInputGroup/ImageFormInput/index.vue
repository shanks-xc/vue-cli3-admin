<template>
  <div class="image-form-input">
    <div v-if="formField[componentData.property]" class="image-box">
      <img :src="formField[componentData.property]" alt="">
      <div class="group-icon">
        <el-button icon="el-icon-search" circle @click="handleClickZoom" />
        <el-upload
          class="upload-iamge"
          :show-file-list="false"
          :auto-upload="false"
          action
          :on-change="handleChangeImage"
        >
          <el-button icon="el-icon-edit" circle />
        </el-upload>
      </div>
      <!-- <el-button size="small" type="primary">重新上传</el-button> -->
    </div>
    <el-upload
      v-else
      class="upload-iamge"
      drag
      action
      :show-file-list="false"
      :auto-upload="false"
      :on-change="handleChangeImage"
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>
          点击上传
        </em>
      </div>
    </el-upload>
    <p class="tip">
      请选择<span>1200x1920</span>的图片
    </p>
    <el-dialog
      class="image-dialog"
      :visible.sync="dialogVisible"
      :show-close="false"
      :fullscreen="true"
    >
      <!-- <div class="imgp"> -->
      <img :src="formField[componentData.property]" alt="">
      <!-- </div> -->
      <el-button class="close-btn" icon="el-icon-close" @click="dialogVisible = false" />
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'ImageFormInput',
  props: {
    type: {
      type: String,
      require: true,
      default: ''
    },
    componentData: {
      type: Object,
      default: () => {},
      require: true
    },
    formField: {
      type: Object,
      default: () => {},
      require: true
    }
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  created() {
    // if (this.type === 'search') { // 搜索才赋值
    //   this.value = this.propertyValue
    // } else {
    //   this.value = this.componentData.defaultValue
    // }

    // STRING类型输入框里面含有inputType属性，用于细化不同输入框
    // console.log(this.componentData)
  },
  methods: {
    formatInputType(type) {
      switch (type) {
        case 'STRING':
          return 'text'
        case 'MEMO':
          // 搜索只需要输入框
          return this.type === 'search' ? 'text' : 'textarea'
          // if (this.type === 'search') { // 搜索只需要输入框
          //   return 'text'
          // } else {
          //   return 'textarea'
          // }
        case 'INT':
          return 'number'
        case 'PASSWORD':
          return 'password'
        default:
          break
      }
    },
    async handleChangeImage(file) {
      await this.beforeImageUpload(file)
      this.getBase64(file.raw).then(res => {
        this.formField[this.componentData.property] = res
        // console.log(res)
      })
    },
    /**
     * @Descripttion: 上传之前
     */
    beforeImageUpload(image) {
      let file = image.raw
      let width = 1200
      let height = 1920
      const isSize = new Promise(function(resolve, reject) {
        let _URL = window.URL || window.webkitURL
        let img = new Image()
        img.src = _URL.createObjectURL(file)
        img.onload = function() {
          let valid = img.width === width && img.height === height
          valid ? resolve() : reject(img)
        }
      }).then(() => {
        return file
      }, (img) => {
        if (img.width !== width) {
          this.$message.error(`图片宽度${img.width}不足${width}`)
          return Promise.reject()
        }
        if (img.height !== height) {
          this.$message.error(`图片高度${img.height}不足${height}`)
          return Promise.reject()
        }
        if (this.componentData > this.componentData.maxSizeValue) {
          this.$message.error(`图片大小不能大于${this.componentData.maxSize}`)
          return Promise.reject()
        }
      })
      return isSize
    },
    /**
     * @Descripttion: 点击图片放大
     */
    handleClickZoom() {
      this.dialogVisible = true
    },
    /**
     * @Descripttion: 转base64
     */
    getBase64(file) {
      return new Promise(function(resolve, reject) {
        let reader = new FileReader()
        let imgResult = ''
        reader.readAsDataURL(file)
        reader.onload = function() {
          imgResult = reader.result
        }
        reader.onerror = function(error) {
          reject(error)
        }
        reader.onloadend = function() {
          resolve(imgResult)
        }
      })
    }
    // handleChange() {
    //   this.$emit('handleChange', this.componentData.property, this.value)
    // },
    // handleReset() {
    //   this.value = ''
    // },
    // handleSet(formField) {
    //   this.value = formField[this.componentData.property]
    // }
  }
}
</script>
<style lang="scss" scoped>
.image-form-input{
  .image-box {
    display: inline-block;
    position: relative;
    vertical-align: middle;
    border-radius: 6px;
    img {
      height: 300px;
      vertical-align: middle;
    }
    .group-icon{
      position: absolute;
      display: none;
      left: 0;
      top: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.5);
      height: 100%;
      align-items: center;
      justify-content: center;
      .el-button{
        background: transparent;
        color: #fff;
        margin: 5px;
        &:hover{
          border-color: #1890ff;
          color: #1890ff;
        }
      }
      .upload-iamge {
        line-height: 0.8;
        // margin: 10px;
      }
    }
    &:hover{
      .group-icon{
        display: flex;
      }
    }
  }
  .tip {
    color: rgba(0,0,0,.45);
    font-size: 14px;
    margin: 0;
    span{
      color: red;
    }
  }
  /deep/ .upload-iamge {
   .el-upload {
      vertical-align: middle;
    }
  //   .el-upload-dragger{
  //     width: 168px;
  //     height: 300px;
  //     padding: 10px;
  //   }
  //   .upload-iamge-icon {
  //     font-size: 28px;
  //     color: #8c939d;
  //     width: 144px;
  //     height: 144px;
  //     line-height: 280px;
  //     text-align: center;
  //   }
  }
  /deep/ .image-dialog {
    .is-fullscreen{
      background:transparent;
    }
    .el-dialog__header {
      display: none;
    }
    .el-dialog__body {
      display: flex;
      height: 100%;
      box-sizing: border-box;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    // .imgp {
      img {
        vertical-align: middle;
        max-width: 100%;
        height: auto;
        width: auto;
        max-height: 100%;
      }
    // }
    .close-btn {
      position: absolute;
      right: 10px;
      top: 10px;
      padding: 0;
      border: 0;
      background: transparent;
      color: #fff;
      font-size: 40px;
      &:hover {
        opacity: 0.9;
      }
    }
  }
}
</style>

