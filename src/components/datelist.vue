<template>
    <div>
        <Calendar :months="months" :value="value" @next="next" @prev="prev" :events="events"   @select="select" ref="calendar" @selectMonth="selectMonth" @selectYear="selectYear" :arrowLeft="arrowLeft" :tileContent="tileContent" :almanacs="almanacs"
        />

    </div>
</template>

<script>
    import Calendar from "mpvue-calendar";
    import "mpvue-calendar/src/style.css";
    import arrowLeft from "../../static/image/leftarrow.png";
    
    export default {
        data() {
            return {
                clean: true,
                months: [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December"
                ],
                disabledArray: ["2018-6-27", "2018-6-25"],
                value: [], 
                begin: [2016, 1, 1],
                end: [2020, 1, 1],
                events: {"2018-10-24":"已签到"},
                tileContent: [{
                        date: "2018-9-22",
                        className: "holiday ",
                        content: "休"
                    },
                    {
                        date: "2018-9-23",
                        className: "holiday ",
                        content: "休"
                    }
                ],
                arrowLeft: arrowLeft
            };
        },
        components: {
            Calendar
        },
        methods: {
            selectMonth(month, year) {
                console.log(year, month);
            },
            prev(month) {
                console.log(month);
            },
            next(month) {
                console.log(month);
            },
            selectYear(year) {
                console.log(year);
            },
            select(val, val2) {
                console.log(val);
                console.log(val2);
            },
            ChangeDefaultDate() {
                let date = new Date()
                this.value = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
    
            },
            ChangeSignDate() {
                this.almanacs
            }
        },
        onLoad() {
            this.ChangeDefaultDate()
        }
    };
</script>
