<template>
    <div id="form" style="width: 1000px;margin: 0 auto;">
        <div style="margin-left: 40%; width: 900px;margin-top: 5px;"></div>
        <card style="margin-bottom: 5px; margin-top: 10px">
            <Row type="flex" class="code-row-bg">
                <Col span="5"><Button type="primary" ghost @click="addModal = true">发帖</Button></Col>
            </Row>
        </card>
        <card v-for="(item, index) in tempPageData" :key="index" style="margin-bottom: 5px">
            <p slot="title" style="height: 35px">
                <Row type="flex" align="middle">
                    <Col span="14" v-if="$store.state.authority == 'admin'">{{ item[0].displayName }}&nbsp;</Col>
                    <Col span="16" v-else>{{ item[0].displayName }}&nbsp;</Col>
                    <Col span="2">{{ item[0].userName }}</Col>
                    <Col span="6">{{ item[0].updateTime }}</Col>
                    <Col span="2" v-if="$store.state.authority == 'admin'">
                        <Button type="warning" ghost @click="deleteModal = true, tempUuid = item[0].uuid">删除</Button></Col>
                </Row>
            </p>
            <p>{{ item[0].content }}.</p>

            <Divider orientation="right">
                <font size="1px" @click="replySet(index)" color="#6495ed">{{ replySetting.tipText[index] }}</font>
                <font size="1px" @click="replyModal = !replyModal, tempUuid = item[0].uuid" color="#6495ed">&nbsp;&nbsp;&nbsp;评论</font>
            </Divider>
            <Divider v-show="replySetting.show[index]" style="margin-top: 2px; margin-bottom: 2px"/>
            <Row v-show="replySetting.show[index]" >
                <Row type="flex" align="middle" v-for="(item, index) in pageInfo.ifoReplyData" :key="index">
                    <Col span="16">{{ item[0].content }}</Col>
                    <Col span="2">{{ item[0].userName }}</Col>
                    <Col span="6">{{ item[0].updateTime }}</Col>
                    <Divider style="margin-top: 2px; margin-bottom: 2px"/>
                </Row>
            </Row>
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
        <Modal v-model="addModal" scrollable title="信息填写" @on-ok="publish">
            <div>
                <Row type="flex" align="middle">
                    <Form :label-width="120">
                        <FormItem label="请输入内容">
                            <Input v-model="publishData.content"  type="textarea" :rows="4" placeholder="Enter something..." style="width: 300px">
                                <Icon type="ios-person-outline" slot="prepend"></Icon>
                            </Input>
                        </FormItem>
                    </Form>
                </Row>
            </div>
        </Modal>
        <Modal v-model="replyModal" scrollable title="评论填写" @on-ok="replyComment">
            <div>
                <Row type="flex" align="middle">
                    <Form :label-width="120">
                        <FormItem label="请输入内容">
                            <Input v-model="publishData.content"  type="textarea" :rows="4" placeholder="Enter something..." style="width: 300px">
                                <Icon type="ios-person-outline" slot="prepend"></Icon>
                            </Input>
                        </FormItem>
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
    export default {
        name: "forum",
        data() {
            return {
                replySetting:{
                    show: [],
                    tipText: []
                },
                tempUuid: '',
                deleteModal: false,
                addModal: false,
                replyModal: false,
                modal_loading: false,
                tempPageData: [
                    {
                        "uuid": "",
                        "userName": "",
                        "content": "",
                        "updateTime": "",
                        "commentaryId": "",
                        "displayName": ""
                    }
                ],
                replyData: [
                    [{
                        "uuid": "",
                        "userName": "11",
                        "content": "1111111111",
                        "updateTime": "2020年05月31日 10:02:10",
                        "commentaryId": "",
                        "displayName": ""
                    }],
                    [{
                        "uuid": "",
                        "userName": "22",
                        "content": "2222222222",
                        "updateTime": "2020年05月31日 10:02:10",
                        "commentaryId": "",
                        "displayName": ""
                    }]
                ],
                publishData: [
                    {
                        "uuid": "",
                        "userName": "",
                        "content": "",
                        "updateTime": "",
                        "commentaryId": "",
                        "displayName": ""
                    }
                ],
                pageInfo: {
                    total: 0,
                    pageSize: 3,
                    pageData: [],
                    replyData: [],
                    ifoReplyData: []
                }
            }
        },
        methods: {
            //获取帖子及跟帖
            getIfo() {
                let that = this;
                that.axios.get('http://139.159.209.32:8909/commentaryController/getAllCommentaries').then(res => {
                    res = res.data;
                    that.pageInfo.pageData = res;
                    for(let i = 0; i < res.length; i++){
                        that.replySetting.show.push(false)
                        that.replySetting.tipText.push("查看回复");
                    }
                    that.tempPageData = res.slice(0, that.pageInfo.pageSize)
                    that.pageInfo.total = that.pageInfo.pageData.length
                })
            },
            publish() {
                let that = this;
                var params = new URLSearchParams();
                params.append('content',that.publishData.content);
                that.axios.post('http://139.159.209.32:8909/commentaryController/saveCommentary', params).then(res => {
                    this.$Message.success('发布成功');
                    that.getIfo()
                }).catch(e => {this.$Message.error('发布失败');})
            },
            replyComment() {
                let that = this;
                var params = new URLSearchParams();
                console.log(that.tempUuid)
                return
                params.append('uuid', that.tempUuid)
                params.append('content',that.publishData.content);
                that.axios.post('http://139.159.209.32:8909/commentaryController/replyCommentary', params).then(res => {
                    this.$Message.success('评论成功');
                    // this.getReply()
                }).catch(e => {this.$Message.error('评论失败');})
            },
            getReply() {
                let that = this;
                that.axios.get('http://139.159.209.32:8909/commentaryController/getAllCommentaries').then(res => {
                    res = res.data;
                    // 获取跟帖
                    for(let i = 0; i < res.length; i++){
                        if(res[i][0].commentaryId == null || res[i][0].commentaryId == "null"){
                            that.pageInfo.replyData.push(res[i])
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
            next(e) {
                var start = (e - 1) * this.pageInfo.pageSize;
                var end = e * this.pageInfo.pageSize;
                this.tempPageData = this.pageInfo.pageData.slice(start, end)
            },
            replySet(index){
                this.$set(this.replySetting.show,index,!this.replySetting.show[index])
                if(this.replySetting.tipText[index] == "查看评论"){
                    this.replySetting.tipText[index] = "折叠评论"
                }else {
                    this.replySetting.tipText[index] = "查看评论"
                }
            }
        },
        created() {
            this.getIfo();
        }
    }
</script>

<style scoped>
    #question {
        zoom: 78%;
    }
    .main{
        width: 100%;
        height: 100%;
        background-image: url('http://p4.qhimg.com/bdr/__85/t01288f9f6058ea1008.jpg');
        background-size: cover;
        background-attachment: fixed;
        background-repeat: repeat;
        zoom: 78%;

    }
</style>

