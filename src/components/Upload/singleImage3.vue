<template>
	<div class="upload-container">
		<el-upload class="image-uploader" :data="dataObj" drag :multiple="false" :show-file-list="false" action="https://httpbin.org/post"
		  :on-success="handleImageScucess">
			<i class="el-icon-upload"></i>
			<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
		</el-upload>
		<div class="image-preview image-app-preview">
			<div class="image-preview-wrapper" v-show="imageUrl.length>1">
				<div class='app-fake-conver'>&nbsp&nbsp全球 付费节目单 最热 经济</div>
				<img :src="imageUrl">
				<div class="image-preview-action">
					<i @click="rmImage" class="el-icon-delete"></i>
				</div>
			</div>
		</div>
		<div class="image-preview">
			<div class="image-preview-wrapper" v-show="imageUrl.length>1">
				<img :src="imageUrl">
				<div class="image-preview-action">
					<i @click="rmImage" class="el-icon-delete"></i>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	// 预览效果见文章
	import { getToken } from 'api/qiniu';
	export default {
	  name: 'singleImageUpload',
	  props: {
	    value: String
  },
	  computed: {
	    imageUrl() {
	      return this.value
    }
  },
	  data() {
	    return {
	      tempUrl: '',
	      dataObj: { token: '', key: '' }
    };
  },
	  methods: {
	    rmImage() {
	      this.emitInput('');
    },
	    emitInput(val) {
	      this.$emit('input', val);
    },
	    handleImageScucess(file) {
	      this.emitInput(file.files.file)
    },
	    beforeUpload() {
	      const _self = this;
	      return new Promise((resolve, reject) => {
	        getToken().then(response => {
	          const key = response.data.qiniu_key;
	          const token = response.data.qiniu_token;
	          _self._data.dataObj.token = token;
	          _self._data.dataObj.key = key;
	          this.tempUrl = response.data.qiniu_url;
	          resolve(true);
        }).catch(err => {
	          // console.log(err);
	          reject(false)
        });
      });
    }
  }
	};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.upload-container {
	width: 100%;
	position: relative;
	@include clearfix;
	.image-uploader {
		width: 35%;
		float: left;
	}
	.image-preview {
		width: 200px;
		height: 200px;
		position: relative;
		border: 1px dashed #d9d9d9;
		float: left;
		margin-left: 50px;
		.image-preview-wrapper {
			position: relative;
			width: 100%;
			height: 100%;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.image-preview-action {
			position: absolute;
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
			cursor: default;
			text-align: center;
			color: #fff;
			opacity: 0;
			font-size: 20px;
			background-color: rgba(0, 0, 0, .5);
			transition: opacity .3s;
			cursor: pointer;
			text-align: center;
			line-height: 200px;
			.el-icon-delete {
				font-size: 36px;
			}
		}
		&:hover {
			.image-preview-action {
				opacity: 1;
			}
		}
	}
	.image-app-preview {
		width: 320px;
		height: 180px;
		position: relative;
		border: 1px dashed #d9d9d9;
		float: left;
		margin-left: 50px;
		.app-fake-conver {
			height: 44px;
			position: absolute;
			width: 100%; // background: rgba(0, 0, 0, .1);
			text-align: center;
			line-height: 64px;
			color: #fff;
		}
	}
}
</style>
