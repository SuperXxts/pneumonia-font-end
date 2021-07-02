<template>
    <div id="forum" style="width: 1000px;margin: 0 auto;">
        <div style="margin-left: 40%; width: 900px;margin-top: 5px;"></div>
        <card style="margin-bottom: 5px; margin-top: 10px">
            <Row type="flex" class="code-row-bg">
                <Col span="5"><Button type="primary" ghost @click="addModal = true">发帖</Button></Col>
            </Row>
        </card>
        <card v-for="(item, index) in tempPageData" :key="index" style="margin-bottom: 5px">
            <p slot="title" style="height: 35px">
                <Row type="flex" align="middle">
                    <Col span="14" v-if="$store.state.authority == 'admin'">{{ item.displayName }}&nbsp;</Col>
                    <Col span="16" v-else>{{ item.displayName }}&nbsp;</Col>
                    <Col span="2">{{ item.userName }}</Col>
                    <Col span="6">{{ item.updateTime }}</Col>
                    <Col span="2" v-if="$store.state.authority == 'admin'">
                        <Button type="warning" ghost @click="deleteModal = true, tempUuid = item.uuid">删除</Button></Col>
                </Row>
            </p>
            <!--<p v-if="item.imgSrc !== null && item.imgSrc !== '' && item.imgSrc !== 'undefined'">-->
            <!--    <span v-for="img in '1*2'.split('*')" style="margin-right: 10px;">-->
            <!--        <el-image src="img" style="width: 50px; height: 50px"></el-image>-->
            <!--    </span>-->
            <!--</p>-->
            <p v-html="item.content"></p>
            <Divider orientation="right">
                <a style="font-size: 1px" @click="replySet(index + getPageIndex)" color="#6495ed">
                    共{{pageInfo.replyData[index + getPageIndex].length}}条评论&nbsp;&nbsp;&nbsp;{{ replySetting.tipText[index + getPageIndex] }}</a>
                <a style="font-size: 1px" @click="replyCommentButton(index + getPageIndex, item.commentaryId)" color="#6495ed">&nbsp;&nbsp;&nbsp;评论</a>
            </Divider>
            <Divider v-show="replySetting.show[index + getPageIndex]" style="margin-top: 2px; margin-bottom: 2px"/>
            <transition name="fade">
                <Row v-show="replySetting.show[index + getPageIndex]"  v-if="pageInfo.replyData[index + getPageIndex].length > 0">
                    <Row type="flex" align="middle" v-for="(itemitem, indexindex) in pageInfo.replyData[index + getPageIndex]" :key="indexindex">
                        <Col span="16"><span v-html="itemitem.content"></span></Col>
                        <!--<Col span="4">-->
                        <!--    <span  v-if="itemitem.imgSrc !== null && itemitem.imgSrc !== ''&& item.imgSrc !== 'undefined'">-->
                        <!--        <el-image src="itemitem.imgSrc.split('*')[0]" style="width: 50px; height: 50px"></el-image>-->
                        <!--    </span>-->
                        <!--</Col>-->
                        <Col span="2">{{ itemitem.userName }}</Col>
                        <Col span="5">{{ itemitem.updateTime }}</Col>
                        <Col span="1" v-if="$store.state.authority == 'admin'">
                            <a style="font-size: 1px; color: red"
                               @click="deleteReplyModal = true, tempUuid = item[0].uuid, tempReplyUuid=itemitem.uuid">删除</a></Col>
                        <Divider style="margin-top: 2px; margin-bottom: 2px"    />
                    </Row>
                </Row>
            </transition>
        </card>
        <Modal v-model="deleteModal" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>删除确认</span>
            </p>
            <div style="text-align:center">
                <p>再点击删除后，你将删除它</p>
                <p>你确认删除吗？</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long :loading="modal_loading" @click="deleteIfo">Delete</Button>
            </div>
        </Modal>
        <Modal v-model="deleteReplyModal" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>删除确认</span>
            </p>
            <div style="text-align:center">
                <p>再点击删除后，你将删除它</p>
                <p>你确认删除吗？</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long :loading="modal_loading" @click="deleteReply">Delete</Button>
            </div>
        </Modal>
        <Modal v-model="addModal" fullscreen scrollable title="信息填写" @on-ok="publish">
            <div>
                <Form>
                    <FormItem>
                        <Upload
                                v-if="addModal"
                                id="addUp"
                                :show-upload-list="false"
                                :before-upload="beforeUpload"
                                :on-success="handleSuccess"
                                :on-error="handleError"
                                :format="['jpg','jpeg','png','gif']"
                                multiple
                                action="https://apis.yum6.cn/api/5bd7f16aa33d7"
                        >
                            <Button icon="ios-cloud-upload-outline" ></Button>
                        </Upload>
                        <quill-editor
                                v-if="addModal"
                                id="addQuill"
                                class="ql-editor"
                                v-model="publishData.content"
                                ref="AddQuillEditor"
                                aria-placeholder="content"
                                :options="editorOption"
                                @blur="onEditorBlur($event)"
                                @focus="onEditorFocus($event)"
                                @change="onEditorChange($event)">
                        </quill-editor>
                    </FormItem>
                    <!--<FormItem label="请输入内容">-->
                    <!--    <Input v-model="publishData.content"  type="textarea" :rows="4" placeholder="Enter something..." style="width: 300px">-->
                    <!--        <Icon type="ios-person-outline" slot="prepend"></Icon>-->
                    <!--    </Input>-->
                    <!--</FormItem>-->
                </Form>
            </div>
        </Modal>
        <Modal v-model="replyModal" scrollable fullscreen title="评论填写" @on-ok="replyComment">
            <div>
                <Row type="flex" align="middle">
                    <Form :label-width="120">
                        <FormItem>
                            <Upload
                                    v-if="replyModal"
                                    id="replyUp"
                                    :show-upload-list="false"
                                    :before-upload="beforeUpload"
                                    :on-success="replyHandleSuccess"
                                    :on-error="handleError"
                                    :format="['jpg','jpeg','png','gif']"
                                    multiple
                                    action="https://apis.yum6.cn/api/5bd7f16aa33d7"
                            >
                                <Button icon="ios-cloud-upload-outline" ></Button>
                            </Upload>
                            <quill-editor
                                    v-if="replyModal"
                                    id="replyQuill"
                                    class="ql-editor"
                                    v-model="replyPublishData.content"
                                    ref="ReplyQuillEditor"
                                    aria-placeholder="content"
                                    :options="editorOption">
                            </quill-editor>
                        </FormItem>
                        <!--<FormItem label="请输入内容">-->
                        <!--    <Input v-model="publishData.content"  type="textarea" :rows="4" placeholder="Enter something..." style="width: 300px">-->
                        <!--        <Icon type="ios-person-outline" slot="prepend"></Icon>-->
                        <!--    </Input>-->
                        <!--</FormItem>-->
                    </Form>
                </Row>
            </div>
        </Modal>
        <!-- 分页 -->
        <div style="position: absolute;bottom: -10px;left: 50%;transform: translate(-50%, -50%);">
            <Page :total="pageInfo.total"
                :page-size="pageInfo.pageSize"
                show-elevator
                show-total
                @on-change="next"/>
        </div>

    </div>
</template>

<script>
    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['image'],

        ['clean'],                                         // remove formatting button
    ];
    export default {
        name: "forum",
        data() {
            return {
                content: `please input content`,
                editorOption: {
                    modules: {
                        toolbar: {
                            container: toolbarOptions,
                            handlers: {
                                'image': function (value) {
                                    if (value) {
                                        // 调用iview图片上传
                                        document.querySelector('.ivu-upload .ivu-btn').click()
                                    } else {
                                        this.quill.format('image', false);
                                    }
                                }
                            }
                        }
                    }
                },
                updateHeaders:{
                    "Authorization": "Basic 14ac5499cfdd2bb2859e4476d2e5b1d2bad079bf",
                    "Access-Control-Allow-Credentials": "true",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Content-Type,X-PINGOTHER",
                    "Access-Control-Allow-Methods": "OPTIONS,GET,POST,PUT,PATCH,POST,DELETE",
                    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36"
                },
                replySetting:{
                    show: [],
                    tipText: []
                },
                tempImgSrc: [],
                tempUuid: '',
                tempReplyUuid: '',
                tempCommentaryId: '',
                deleteModal: false,
                addModal: false,
                replyModal: false,
                deleteReplyModal: false,
                modal_loading: false,
                tempPageData: [
                    {
                        "uuid": "",
                        "userName": "",
                        "content": "",
                        "imgSrc": "",
                        "updateTime": "",
                        "commentaryId": "",
                        "displayName": ""
                    }
                ],
                replyData: [
                    [{
                        "uuid": "",
                        "userName": "",
                        "content": "",
                        "imgSrc": "",
                        "updateTime": "",
                        "commentaryId": "",
                        "displayName": ""
                    }]
                ],
                replyPublishData: [
                    [{
                        "uuid": "",
                        "userName": "",
                        "content": "",
                        "imgSrc": "",
                        "updateTime": "",
                        "commentaryId": "",
                        "displayName": ""
                    }]
                ],
                publishData: [
                    {
                        "uuid": "",
                        "userName": "",
                        "content": "",
                        "imgSrc": "",
                        "updateTime": "",
                        "commentaryId": "",
                        "displayName": ""
                    }
                ],
                pageInfo: {
                    total: 0,
                    pageSize: 3,
                    pageNum: 1,
                    pageIndex: 3,
                    pageData: [],
                    replyData: [],
                }
            }
        },
        computed: {
            getPageIndex(){
                this.pageInfo.pageIndex = this.pageInfo.pageSize * (this.pageInfo.pageNum - 1)
                return this.pageInfo.pageIndex
            }
            // editor() {
            //     return this.$refs.myQuillEditor.quill;
            // }
        },
        methods: {
            //获取帖子及跟帖
            getIfo() {
                let that = this;
                that.axios.get('http://139.159.209.32:8909/commentaryController/getAllCommentaries').then(res => {
                    res = res.data;
                    // that.pageInfo.pageData = res;
                    var hasConnection = false;
                    var tempArray = []
                    for(let i = 0; i < res.length; i++){
                        for(let l = 0; l < res[i].length; l++){
                            if(res[i][l].commentaryId == null || res[i][l].commentaryId == "null"){
                                tempArray.push(res[i][l])
                                hasConnection = true
                            }else {
                                // 帖子
                                that.pageInfo.pageData.push(res[i][l])
                            }
                        }
                        if(hasConnection){
                            that.pageInfo.replyData.push(tempArray)
                            hasConnection = false
                            tempArray = []
                        }else {
                            that.pageInfo.replyData.push([])
                            hasConnection = false
                            tempArray = []
                        }
                    }
                    for(let m = 0; m < that.pageInfo.pageData.length; m++){
                        that.replySetting.show.push(false)
                        that.replySetting.tipText.push("查看评论");
                    }
                    that.tempPageData = that.pageInfo.pageData.slice(0, that.pageInfo.pageSize)
                    that.pageInfo.total = that.pageInfo.pageData.length

                })
            },
            publish() {
                let that = this;
                var params = new URLSearchParams();
                params.append('content',that.publishData.content);
                params.append('imgSrc',that.publishData.imgSrc);
                that.axios.post('http://139.159.209.32:8909/commentaryController/saveCommentary', params).then(res => {
                    this.$Message.success('发布成功');
                    that.getIfo()
                }).catch(e => {this.$Message.error('发布失败');})
            },
            replyComment() {
                let that = this;
                var params = new URLSearchParams();
                params.append('uuid', that.tempCommentaryId)
                params.append('content',that.replyPublishData.content);
                params.append('imgSrc',that.replyPublishData.imgSrc);
                console.log(that.replyPublishData.imgSrc)
                that.axios.post('http://139.159.209.32:8909/commentaryController/replyCommentary', params).then(res => {
                    this.$Message.success('评论成功');
                    this.getReply()
                }).catch(e => {this.$Message.error('评论失败');})
            },
            replyCommentButton(index, commentaryId){
                this.$set(this.replySetting.show,index,true)
                if(this.replySetting.tipText[index] == "查看评论"){
                    this.replySetting.tipText[index] = "折叠评论"
                }else {
                    this.replySetting.tipText[index] = "查看评论"
                }
                this.replyModal = !this.replyModal
                this.tempCommentaryId = commentaryId
            },
            getReply() {
                let that = this;
                that.axios.get('http://139.159.209.32:8909/commentaryController/getAllCommentaries').then(res => {
                    res = res.data;
                    var hasConnection = false;
                    var tempArray = []
                    that.pageInfo.replyData = []
                    for(let i = 0; i < res.length; i++){
                        for(let l = 0; l < res[i].length; l++){
                            if(res[i][l].commentaryId == null || res[i][l].commentaryId == "null"){
                                tempArray.push(res[i][l])
                                hasConnection = true
                            }else {
                                hasConnection = false
                            }
                        }
                        if(hasConnection){
                            that.pageInfo.replyData.push(tempArray)
                            tempArray = []
                        }else {
                            that.pageInfo.replyData.push([])
                        }
                    }
                })
            },
            deleteIfo() {
                let that = this;
                var param = new URLSearchParams();
                param.append('uuid', this.tempUuid)
                this.modal_loading = true;
                setTimeout(() => {
                    this.modal_loading = false;
                    this.deleteModal = false;
                }, 2000);
                that.axios.delete('http://139.159.209.32:8909/commentaryController/deleteCommentary', param).then(res => {
                    if(res.data.info == "用户无权删除"){
                        this.$Message.error('删除失败');
                    }else{
                        this.$Message.success('删除成功');
                    }
                }).catch(e => {this.$Message.error('删除失败');})
            },
            deleteReply(){
                let that = this;
                var param = new URLSearchParams();
                param.append('uuid', this.tempUuid)
                param.append("replyUUID", this.tempReplyUuid)
                this.modal_loading = true;
                setTimeout(() => {
                    this.modal_loading = false;
                    this.deleteReplyModal = false;
                }, 2000);
                that.axios.delete('http://139.159.209.32:8909/commentaryController/deleteCommentary', param).then(res => {
                    if(res.data.info == "用户无权删除"){
                        this.$Message.error('删除失败');
                    }else{
                        this.$Message.success('删除成功');
                    }
                }).catch(e => {this.$Message.error('删除失败');})
            },
            next(e) {
                var start = (e - 1) * this.pageInfo.pageSize;
                var end = e * this.pageInfo.pageSize;
                this.tempPageData = this.pageInfo.pageData.slice(start, end)
                this.pageInfo.pageNum = e
            },
            replySet(index){
                this.$set(this.replySetting.show,index,!this.replySetting.show[index])
                if(this.replySetting.tipText[index] == "查看评论"){
                    this.replySetting.tipText[index] = "折叠评论"
                }else {
                    this.replySetting.tipText[index] = "查看评论"
                }
            },
            onEditorReady(editor) { // 准备编辑器

            },
            onEditorBlur(){}, // 失去焦点事件
            onEditorFocus(){}, // 获得焦点事件
            onEditorChange(){}, // 内容改变事件
            beforeUpload(e){
                console.log(e.size)
                if(e.size>2000000){
                    this.$Message.error("请检查图片大小是否小于2M")
                }

            },
            handleSuccess (res) {
                // 获取富文本组件实例
                let quill = this.$refs.AddQuillEditor.quill
                // 如果上传成功
                if (res) {
                    // 获取光标所在位置
                    let length = quill.getSelection().index;
                    // 插入图片，res为服务器返回的图片链接地址
                    quill.insertEmbed(length, 'image', res.data)
                    // 调整光标到最后
                    quill.setSelection(length + 1)
                    this.$Message.success('图片插入成功')
                    this.publishData.imgSrc += "*" + res.data;
                    console.log(res)
                } else {
                    // 提示信息，需引入Message
                    this.$Message.error('图片插入失败')
                }
            },
            replyHandleSuccess (res) {
                // 获取富文本组件实例
                let quill = this.$refs.ReplyQuillEditor.quill
                // 如果上传成功
                if (res) {
                    // 获取光标所在位置
                    let length = quill.getSelection().index;
                    console.log(length)
                    // 插入图片，res为服务器返回的图片链接地址
                    quill.insertEmbed(length, 'image', res.data)
                    // 调整光标到最后
                    quill.setSelection(length + 1)
                    this.$Message.success('图片插入成功')
                    this.replyPublishData.imgSrc += "*" + res.data;
                    console.log(res)
                } else {
                    // 提示信息，需引入Message
                    this.$Message.error('图片插入失败')
                }
            },
            handleError (res) {
                this.$Message.error('图片插入失败')
            }
        },
        created() {
            this.getIfo();
        }
    }
</script>

<style scoped>
    #forum {
        zoom: 78%;
        background-image: url('../background.jpg');
        background-size: cover;
		background-attachment: fixed;
        background-repeat: repeat;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
    .ivu-upload {
        display: none;
    }
    .ql-editor{
        height: 500px;
    }
</style>

