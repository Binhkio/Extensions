const COOKIE = "remember_student_59ba36addc2b2f9401580f014c7f58ea4e30989d=eyJpdiI6ImErak5zcXhxXC9IdXMxdGxMV1g4UDJBPT0iLCJ2YWx1ZSI6Ik1tUUJ4YjZjTDdtOUNzMGp5alQxaHlHMnZSV2pTZ3BaUlwvZ1FrZzBUXC9GRDdKcnVCZHgxN3B3UUtYbytObzdHd1ViOFJVZGZKc3ZcL1piUmZOWXBqQTMxdWNFS3prVkVqK2p3T2w3TVFNSkZWT1VQU0JIWkpIUFhJTTlENWJTKzhIXC9hcXVjdEd3eWJxYTNHRlhnYk4yVDBWMUtQWHhpdkFjdCtpblNMRkNQUFU9IiwibWFjIjoiODU5OTJkYTk0ODNmMDYxOTg0YWU4NzVlMmQ4YzM5MWNjYzg5ZTNlNjZjOTllY2RkZWNkZDE2NTdkNzlkMTFiNiJ9; _gcl_au=1.1.368627548.1672815984; _clck=1dlby4c|1|f7z|0; _fbp=fb.1.1672815985229.511997659; _ga=GA1.2.279302467.1672815985; __hstc=170927871.92f19b0beea22dafcf80059a82e4ca9e.1672815991836.1672815991836.1672815991836.1; hubspotutk=92f19b0beea22dafcf80059a82e4ca9e; _ga_WJ6RGXY9DY=GS1.1.1672815984.1.1.1672815996.48.0.0; io=LTr1COtfoHC1kYIDn56u; XSRF-TOKEN=eyJpdiI6IllyQ2hLOUxLMjg4XC9tTWgxQWRYRG1RPT0iLCJ2YWx1ZSI6ImdNdlRCcmIrTnR5cytqeHhoODVGdjBCNCtkZmVWVDBVU0hDTTdOM29KeDFpdEs0ODVBVUJlUTY3MWlSVXc5Nk4iLCJtYWMiOiJiYzA1YWNlNzZlOGVlZWI0MWJiMmViMTBiOGU4NjhkMGMyYzA1NTAwZTRhNWE0OWU3NTM3NjNmNzlmYmQwNmQ5In0%3D; schooler_session=eyJpdiI6InNCNWJ1MXVJY3lRUzZvVUxtQzVvUlE9PSIsInZhbHVlIjoiMWNHd1lNM0NCRzhuK1JJVStTSk5Td0lJYjBDSGl0RUhYZEl5eTd6bE5XWXd1eTZDQWJoWjJkU0krdkR5NFoxbCIsIm1hYyI6Ijk2YmI1YmE5Yzk3MmVhMTRiYTQyYWVkZDRkNWU3YWExNzRmYmIzMGU3MTVlMzMwNDdjMTFlYjMxZTgwMmY0YTcifQ%3D%3D"

const renderUI = (scheduleData, detailData, masterData) => {
    let teacher = {}
    masterData.teachers.forEach(info => {
        if(info.id === scheduleData.teachers[0].id){
            teacher = {...info}
        }
    })
    const avatarSrc = `https://schooler.sun-asterisk.com${teacher.avatar}`
    document.getElementById("content").innerHTML = 
        `
            <div id="schooler-ui">
                <p><b>Date:</b> ${detailData.schedule[0].day}${"\t"}<b>Time:</b> ${detailData.schedule[0].start_time} <b>to</b> ${detailData.schedule[0].end_time}</p>
                <p><b>Room:</b> ${detailData.schedule[0].room}${"\t"}<b>Class:</b> ${detailData.schedule[0].class_name}</p>
                <p><b>Lesson:</b> ${detailData.name}</p>
                <div id="schooler-teacher">
                    <img id="schooler-teacher-image" src=${avatarSrc} alt="No image"/>
                    <div id="schooler-teacher-info">
                        <p><b>Teacher:</b> ${teacher.name}</p>
                        <p><b>Phone:</b> ${teacher.telephone}</p>
                        <p><b>Email:</b> ${teacher.email}</p>
                    </div>
                </div>
            </div>
        `
}

const schoolerApi = () => {
    try {
        const rawTime = new Date().toLocaleDateString()
        const timeArr = rawTime.split("/")
        let day = timeArr[0]
        let month = timeArr[1]
        let year = timeArr[2]
        month = month > 9 ? month : `0${month}`
        day = day > 9 ? day : `0${day}`
        const scheduleUrl = `https://schooler.sun-asterisk.com/api/schedules/${year}-${month}-${day}/month/student`
        fetch(scheduleUrl, {
            headers:{
                'cookie' : COOKIE
            }
        }).then((scheduleResponse) => scheduleResponse.json()).then((scheduleDataArray) => {
            let scheduleData = {}
            for(const schedule of scheduleDataArray){
                if(new Date(schedule.day) >= new Date()){
                    scheduleData = {...schedule}
                    break
                }
            }
            scheduleData = {...scheduleDataArray[1]}
            console.log(scheduleData);
            const detailUrl = `https://schooler.sun-asterisk.com/api/academic/subjects/${scheduleData.subject.id}/lessons/${scheduleData.lesson_id}/detail`
            fetch(detailUrl, {
                headers:{
                    'cookie' : COOKIE
                }
            }).then((detailResponse) => detailResponse.json()).then((detailData) => {
                const masterDataUrl = `https://schooler.sun-asterisk.com/master-data`
                fetch(masterDataUrl, {
                    headers:{
                        'cookie' : COOKIE
                    }
                }).then((masterDataResponse) => masterDataResponse.json()).then((masterData) => {
                    renderUI(scheduleData, detailData, masterData)
                })
            })
        })
    } catch (error) {
        console.log(error);
    }
}

document.getElementById("nav-schooler").addEventListener("click", schoolerApi)