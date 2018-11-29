<template>
    <div class="test">
        <div class="box" :style="{top:boxTop+'vh'}">
            <div class="videoBox" v-for="(item,index) in videoList" :key="index">
                <video class="video" :src="item" controls direction show-fullscreen-btn show-play-btn show-center-play-btn></video>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                videoList: [
                    "http://video.biergao.cn/6d877253e17a4d24a6244e827108ddc6/a04768f505b54d0d9a74086683bc0b58-6fdfe66e6317e629733386187024309f-fd.mp4",
                    "http://video.biergao.cn/e150bd633a264c92b51233f996485d9f/addceb4f0860479a947de1fbe9dfe10a-82a4976c29f7a22057110c9d7d17d2f5-fd.mp4",
                    "http://video.biergao.cn/f156bd1800884ecd95dc1fd502cbeba1/f2000524eab14dde9bfdc5bfbd5d34bd-230666aa2ed62d4debbe49c8c158c4fa-fd.mp4",
                    "http://video.biergao.cn/710f611b3e354d08b6847a89bcda1018/1b443c39e2e34dec849a69cab52aa15b-9bf585f9b62e6998169d889e1ceeb0d8-fd.mp4"
                ],
                boxTop: 0
            }
        },
        onReachBottom() {
            this.boxTop -= 100
            console.log(this.boxTop);
        },
        onPageScroll(e){
            console.log(e);
        }
    }
</script>

<style scoped>
    .test {
        height: 100vh;
        width: 100vw;
        overflow: hidden;
        position: relative;
    }
    
    .box {
        position: absolute;
        /* top: 0px; */
        left: 0px;
    }
    
    .videoBox {
        width: 100vw;
        height: 100vh;
    }
    
    .video {
        width: 100vw;
        height: 100vh;
    }
</style>
