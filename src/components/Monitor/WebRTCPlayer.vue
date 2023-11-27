<template>
    <div class="relative w-full h-full">
        <div
            v-if="recordDuration"
            class="flex items-center absolute left-1/2 -translate-x-1/2 py-2 px-4 rounded-full bg-black/50 top-4"
        >
            <div class="w-2.5 h-2.5 rounded-full bg-error mr-2"></div>
            <span class="text-white text-xs">{{ recordDuration }}</span>
        </div>
        <!-- <NSpin :show="!videoIsReady"> -->
        <div ref="videoWrapper" class="w-full h-full bg-black">
            <!-- <button class="absolute-center z-50" @click="playVideo">播放</button> -->
            <video
                @click="playVideo"
                muted
                :controls="false"
                ref="videoEl"
                :autoplay="true"
                class="w-full h-full"
            ></video>
            <NSpin v-if="!videoIsReady" class="absolute-center"></NSpin>
        </div>
        <!-- </NSpin> -->
        <!-- <ControlsBar
            v-if="controls"
            :muted="muted"
            class="absolute left-0 bottom-0 w-full h-23"
            @audio-change="isMuted = $event"
            @fullscreen="enter"
            @command="$emit('command', $event)"
            @record="startRecord"
            @stop-record="stopRecord"
            @add-preset="$emit('add-preset', $event)"
            @screenshot="capture"
        ></ControlsBar> -->
    </div>
</template>

<script setup lang="ts">
// import ControlsBar from './ControlsBar.vue';
import { computed, onMounted, ref } from "vue";
import { useEventListener, useFullscreen, useNow } from "@vueuse/core";
// import RecordRTC from "recordrtc";
// import { downloadFile } from "@ebuild/utils/other";
import { format, differenceInMilliseconds } from "date-fns";
import { NSpin } from "naive-ui";
import { getServerWebRTC } from "@/api/monitor";
interface Props {
    id: string;
    src: string;
    controls?: boolean;
    muted?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
    muted: false,
});
defineEmits<{
    "add-preset": [];
    command: [value: string];
}>();
const isMuted = ref(props.muted);
const videoEl = ref<HTMLVideoElement>();
const videoWrapper = ref<HTMLDivElement>();
const { enter } = useFullscreen(videoEl);
const videoIsReady = ref(false);

useEventListener(videoEl, "play", () => {
    console.log("播放");
    videoIsReady.value = true;
});

const pc = new RTCPeerConnection({
    iceServers: [{ urls: ["stun:stun.l.google.com:19302"] }],
});
pc.onnegotiationneeded = async () => {
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    // const formData = new FormData();
    // formData.append('sdp64', btoa(pc.localDescription!.sdp));
    // formData.append('url', props.src);
    // formData.append('id', props.id);

    //   const data = await getServerWebRTC({
    //     offer: btoa(pc.localDescription!.sdp),
    //     url: props.src,
    //     id: props.id,
    //   });
    // const data = await res.json();
    //   console.log("接口返回", data);
    //   const answer = atob(data.answer);
    //   pc.setRemoteDescription(
    //     new RTCSessionDescription({ type: "answer", sdp: answer })
    //   );
};
pc.addTransceiver("video", {
    direction: "recvonly",
});
pc.addTransceiver("audio", {
    direction: "recvonly",
});
const stream = new MediaStream();
pc.ontrack = (event) => {
    stream.addTrack(event.track);
    if (videoEl.value) {
        videoEl.value.srcObject = stream;
        // videoEl.value.play();
    }
};

pc.oniceconnectionstatechange = () => {
    const state = pc.iceConnectionState;
    if (state === "failed" || state === "disconnected") {
        console.log("处理连接异常");
    }
};

function playVideo() {
    videoEl.value?.play();
}
let recorder: any | null = null;
const now = useNow();
const startPoint = ref<Date | null>(null);
const recordDuration = computed(() => {
    if (!startPoint.value) return;
    return format(
        differenceInMilliseconds(now.value, startPoint.value),
        "mm:ss"
    );
});
// function startRecord() {
//   if (!videoEl.value) return;
//   startPoint.value = new Date();
//   const mediaStream = videoEl.value.captureStream();
//   recorder = new RecordRTC(mediaStream, { type: "video" });
//   recorder.startRecording();
// }
// function stopRecord() {
//   startPoint.value = null;
//   recorder.stopRecording(() => {
//     const url = URL.createObjectURL(recorder.getBlob());
//     const time = new Date().getTime();
//     const filename = `${time}.mp4`;
//     downloadFile(url, filename);
//     recorder = null;
//   });
// }
// function capture() {
//   if (!videoEl.value) return;
//   const canvas = document.createElement("canvas");
//   canvas.width = videoEl.value.videoWidth;
//   canvas.height = videoEl.value.videoHeight;
//   const ctx = canvas.getContext("2d");
//   if (!ctx) return;
//   ctx.drawImage(videoEl.value, 0, 0, canvas.width, canvas.height);
//   const screenshotURL = canvas.toDataURL();
//   downloadFile(screenshotURL, "screenshot.png");
//   window.$message?.success("截图成功");
// }
</script>

<style scoped></style>
