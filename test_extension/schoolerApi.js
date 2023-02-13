const COOKIE = "remember_student_59ba36addc2b2f9401580f014c7f58ea4e30989d=eyJpdiI6Imxhbjl1SWFLSGpUSUM1OUZvSU1MaEE9PSIsInZhbHVlIjoia2JuNnNnVUk2VENxOU4yMEJHcTNVQXZ4akZhUmtrRGUrcWk1bXErOTNKbXVEXC93RjRWckVXeXliZWVNdmVlWjhFQ0owMm1DSzhMR2JcLzF4ODR5emRpd0tyY0lUY01OWndwQnIrckdGMktNRkg1Y2gzVFp6MWZWN2hHNVF1RnNlRm9nWCtxd093MHJBM0xJQXVPRld5eThoUkdOSXZHODQwVlhBXC9zNmVxdUg0PSIsIm1hYyI6IjBlM2E0MTlmZjA4OGJmNzZiNzE1NWM3ZmUxZTI4MGI0MWViZGVlZTFmZDAxZmZhZTViN2ViMTUzYzFjYTk5YTgifQ==; XSRF-TOKEN=eyJpdiI6InpCSUN5V2J6QnNKUmJBVW5nYTFucnc9PSIsInZhbHVlIjoiMUxxaGJRbnk4Z25UcHpPRmJlTnNhd3BSc1lZb2JRNUlNam5LTTg4T3hTUm42SUVObThJd2U0OEZSMnZnblBDZiIsIm1hYyI6Ijg1NDAwZmJhYjU3ZTdmZDY1MTdiOGY4NTRiMDU1OGVlOTMwNjVhZDkxOTBhYTk0MjczN2JlY2JkYWI2ZGY1ZGUifQ==; schooler_session=eyJpdiI6InhhaTFHWDY1WWU4ekF0Y0h2ZUt3Mnc9PSIsInZhbHVlIjoiSCtCUjIra29paWRwcjNRS01tbXdPRHJkZUtEcnZNV0t3cEVPbW9naW5iRnQ1ZzY3eEJDU1FTTHNFdGVQKzBPYiIsIm1hYyI6Ijg4YjUxZTVhNWQyMTg1NWM0ODkyNDI5MjI0ZmRmZTdkMjMzMjk5NjA5MmVjNDhjZTgzMjFiYzQxMzMyNmNkYjMifQ==; io=5NVvJIKe-Mxh5v-EnlEj"

const renderUI = (scheduleData, detailData) => {
    const avatarSrc = `https://schooler.sun-asterisk.com${scheduleData.teachers[0].avatar}`
    document.getElementById("content").innerHTML = 
        `
            <div id="schooler-ui">
                <p>Date: ${detailData.schedule[0].day}${"\t"}Time: ${detailData.schedule[0].start_time} to ${detailData.schedule[0].end_time}</p>
                <p>Room: ${detailData.schedule[0].room}${"\t"}Class: ${detailData.schedule[0].class_name}</p>
                <p>Lesson: ${detailData.name}</p>
                <div id="schooler-teacher">
                    <img src=${avatarSrc} alt="Teacher's image"/>
                    <p>Teacher: ${scheduleData.teachers[0].name}</p>
                </div>
            </div>
        `
}

const schoolerApi = () => {
    try {
        const rawTime = new Date().toLocaleDateString()
        const timeArr = rawTime.split("/")
        let month = timeArr[0]
        let day = timeArr[1]
        let year = timeArr[2]
        month = month > 9 ? month : `0${month}`
        day = day > 9 ? day : `0${day}`
        const scheduleUrl = `https://schooler.sun-asterisk.com/api/schedules/${year}-${month}-${day}/month/student`
        fetch(scheduleUrl, {
            headers:{
                'cookie' : COOKIE
            }
        }).then((scheduleResponse) => scheduleResponse.json()).then((scheduleDataArray) => {
            console.log(scheduleDataArray);
            // const scheduleData = {}
            // for(const schedule in scheduleDataArray){
            //     if(new Date(schedule.day) >= new Date()){
            //         scheduleData = {...schedule}
            //         break
            //     }
            // }
            // const detailUrl = `https://schooler.sun-asterisk.com/api/academic/subjects/${scheduleData.subject.id}/lessons/${data.lesson_id}/detail`
            // fetch(detailUrl, {
            //     headers:{
            //         'cookie' : COOKIE
            //     }
            // }).then((detailResponse) => detailResponse.json()).then((detailData) => {
            //     renderUI(scheduleData, detailData)
            // })
        })
    } catch (error) {
        console.log(error);
    }
}

document.getElementById("nav-schooler").addEventListener("click", schoolerApi)