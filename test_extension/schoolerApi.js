const schoolerApi = () => {
    try {
        const url = `https://schooler.sun-asterisk.com/api/academic/subjects/257/lessons/10112/detail`
        fetch(url, {
            headers:{
                'cookie' : 'remember_student_59ba36addc2b2f9401580f014c7f58ea4e30989d=eyJpdiI6Imxhbjl1SWFLSGpUSUM1OUZvSU1MaEE9PSIsInZhbHVlIjoia2JuNnNnVUk2VENxOU4yMEJHcTNVQXZ4akZhUmtrRGUrcWk1bXErOTNKbXVEXC93RjRWckVXeXliZWVNdmVlWjhFQ0owMm1DSzhMR2JcLzF4ODR5emRpd0tyY0lUY01OWndwQnIrckdGMktNRkg1Y2gzVFp6MWZWN2hHNVF1RnNlRm9nWCtxd093MHJBM0xJQXVPRld5eThoUkdOSXZHODQwVlhBXC9zNmVxdUg0PSIsIm1hYyI6IjBlM2E0MTlmZjA4OGJmNzZiNzE1NWM3ZmUxZTI4MGI0MWViZGVlZTFmZDAxZmZhZTViN2ViMTUzYzFjYTk5YTgifQ==; XSRF-TOKEN=eyJpdiI6InpCSUN5V2J6QnNKUmJBVW5nYTFucnc9PSIsInZhbHVlIjoiMUxxaGJRbnk4Z25UcHpPRmJlTnNhd3BSc1lZb2JRNUlNam5LTTg4T3hTUm42SUVObThJd2U0OEZSMnZnblBDZiIsIm1hYyI6Ijg1NDAwZmJhYjU3ZTdmZDY1MTdiOGY4NTRiMDU1OGVlOTMwNjVhZDkxOTBhYTk0MjczN2JlY2JkYWI2ZGY1ZGUifQ==; schooler_session=eyJpdiI6InhhaTFHWDY1WWU4ekF0Y0h2ZUt3Mnc9PSIsInZhbHVlIjoiSCtCUjIra29paWRwcjNRS01tbXdPRHJkZUtEcnZNV0t3cEVPbW9naW5iRnQ1ZzY3eEJDU1FTTHNFdGVQKzBPYiIsIm1hYyI6Ijg4YjUxZTVhNWQyMTg1NWM0ODkyNDI5MjI0ZmRmZTdkMjMzMjk5NjA5MmVjNDhjZTgzMjFiYzQxMzMyNmNkYjMifQ==; io=5NVvJIKe-Mxh5v-EnlEj'
            }
        }).then((response) => response.json()).then((data) => {
            console.log(data);
            document.getElementById("content").innerHTML = `${data.name}`
        })
    } catch (error) {
        console.log(error);
    }
}

document.getElementById("nav-schooler").addEventListener("click", schoolerApi)