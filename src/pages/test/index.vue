<template>
    <div class="test"></div>
</template>
<script>
export default {
    methods:{
        change(){
            let a='{"type":"say","from_client_id":"7f00000108fd00000003","from_client_name":"\u5206\u4eba","to_client_id":"all","content":"http:\/\/www.a.comhttp:\/\/tmp\/wx41e93e31c9d4dc26.o6zAJsxJLWJ1OyRVNZsW5HYwbGnI.db51sotx8r5Hac07ad2dab3cb967672cdc09c16ef558.silk","stype":"2","time":"2018-12-15 10:12:17"}'
            let b=JSON.parse(a)
            console.log(b);
        }

    },
    onLoad(){
        this.change()
    }
}
</script>
<style scoped>

</style>
