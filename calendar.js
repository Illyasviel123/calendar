window.addEventListener("load",function(){
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth()+1
    const table = document.querySelector('table')
    const tbody = document.querySelector('tbody')
    const header = document.querySelector('.header p')

    function isLeapYear(year){
        if(year%400==0){
            return true
        }else if(year%100!=0 && year%4==0){
            return true
        }else{
            return false
        }
    }/*判断是否为闰年*/

    function dayOfAMonth(year,month){
        switch (month){
            case 1:return 31 
            case 2:
                if(isLeapYear(year)==true){
                    return 29
                }else{
                    return 28
                }
            case 3:return 31
            case 4:return 30
            case 5:return 31
            case 6:return 30
            case 7:return 31
            case 8:return 31
            case 9:return 30
            case 10:return 31
            case 11:return 30
            case 12:return 31
        }
    }/*判断该月有多少天*/

    function clearTable(){
        let trs = this.document.querySelectorAll('table tr')
        for(i=trs.length -1;i>0;i--){
            tbody.removeChild(trs[i]);
    }
    }

    function isToday(){
        if(year==date.getFullYear() && month == date.getMonth()+1){
            let date_ = new Date(`${year}-${month}-1`)
            let i = date_.getDay()+date.getDate()-1
            let row = Math.floor(i/7)
            let col = i%7
            let row_=row+2
            if(col == 0){
                col = 7
                row_ = row+1
            }
            let today = document.querySelector(`tr:nth-child(${row_}) td:nth-child(${col})`)
            today.classList.add('today')
        }
    }

    function getTime(){
        header.innerHTML = `${year}年${month}月`
        let date_ = new Date(`${year}-${month}-1`)
        let j = date_.getDay()
        let k = 0                           /*计数器，每多七个格子要增加一行*/
        let a = 1                           /*计数器，给日历格子中填写日期*/
        let m = dayOfAMonth(year,month)
        let newRow =table.insertRow()
        for(j;j>1;j--){
            newRow.insertCell()
            k++
        }
        for(m;m>0;m--){
            let b=newRow.insertCell()
            b.innerHTML=`${a}`
            a++
            k++
            if(k%7==0){
                newRow =table.insertRow()
            }
        }
        isToday()

        if(year<=date.getFullYear() && month<date.getMonth()+1 || year<date.getFullYear()){
            let tds = document.querySelectorAll('td')
            tds.forEach(function(item){
                item.style.color='#d3d3d3'
            })
        }
        /*今年之前字体变灰色*/

        if(year==date.getFullYear() && month==date.getMonth()+1 ){
            let date_ = new Date(`${year}-${month}-1`)
            let i = date_.getDay()+date.getDate()-1
            let row = Math.floor(i/7)+1
            let row_ = row+1
            let col = i%7
            if(col == 0){
                col = 7
                row_ = row
                row--
            }
            for(col;col>1;col--){
                let td = document.querySelector(`tr:nth-child(${row_}) td:nth-child(${col-1})`)
                td.style.color='#d3d3d3'
            }
            
            for(row;row>1;row--){
                if(row>2){
                    for(let m=1;m<=7;m++){
                        let td = document.querySelector(`tr:nth-child(${row}) td:nth-child(${m})`)
                        td.style.color='#d3d3d3'
                    }
                }else{
                    let date_ = new Date(`${year}-${month}-1`)
                    let j = date_.getDay()
                    for(j;j<=7;j++){
                        let td = document.querySelector(`tr:nth-child(${row}) td:nth-child(${j})`)
                        td.style.color='#d3d3d3'
                    }
                }
            }
        }
        /*当天之前字体样式变成灰色*/

        let tds = document.querySelectorAll('td')
        let i = tds.length
        for(i;i>0;i--){
            if(tds[i-1].style.color!='rgb(211, 211, 211)' && tds[i-1].innerHTML!=""){
                tds[i-1].classList.add('active')
            }else{
                tds[i-1].style.cursor='default'
            }
        }
        /*当天前后的鼠标样式改造*/

        let acts = document.querySelectorAll('.active')
        //  console.log(acts)
        acts.forEach(function(item,index){
            item.addEventListener('click',function(){
                const calendar = document.querySelector('.calendar')
                calendar.style.width = '60%'
                const remark = document.createElement('span')
                remark.innerHTML=`<h1>${year}年${month}月${date.getDate()+index}日</h1>
                <div class="rmk">备注：<input id="rmk_"></div><input type="checkbox" id="countDown">
                同步设定倒计时<button id="submit">确定</button>`
                remark.className='remark'
                const container = document.querySelector('.container')
                const footer = document.querySelector('.footer')
                container.insertBefore(remark,footer)
                let submit = document.querySelector('#submit')
                let countDown = document.querySelector('#countDown')
                submit.addEventListener('click',function(){
                    let input = document.querySelector('#rmk_')
                    let remark_ = document.createElement('h3')
                    let value = input.value.trim()
                    remark_.className='remark_'
                    remark_.innerHTML = `${year}年${month}月${date.getDate()+index}日备注：${value}`
                    const nul = document.querySelector('#null')
                    calendar.insertBefore(remark_,nul)
                    if(countDown.checked == true){
                        let count = document.createElement('h3')
                        count.className='count'
                        const date1 = +new Date(`${year}-${month}-${date.getDate()+index}`)
                        const dateNow = +new Date()
                        let day = Math.ceil((date1-dateNow)/1000/60/60/24)
                        if(value == ''){
                            count.innerHTML=`距离${year}年${month}月${date.getDate()+index}日还有${day}天`
                        }else{
                            count.innerHTML=`距离${value}还有${day}天`
                        }
                        calendar.insertBefore(count,nul)
                    }
                    container.removeChild(remark)
                    calendar.style.width = '90%'
                })
            })
        })/*备注生成*/

        

    }
    getTime()
    /*日历主体*/


    
    const minusYear = document.querySelector('#minusYear')
    const minusMonth = document.querySelector('#minusMonth')
    const addMonth = document.querySelector('#addMonth')
    const addYear = document.querySelector('#addYear')
    
    minusYear.addEventListener('click',function(){
        if(year>=1){
            year--
            clearTable()
            getTime()
        }else{
            alert('年份不能再小啦！')
        }
    })
    minusMonth.addEventListener('click',function(){
        if(month>1){
            month--
        }else{
            year--
            month=12
        }
        clearTable()
        getTime()        
    })
    addMonth.addEventListener('click',function(){
        if(month<=11){
            month++
        }else{
            year++
            month=1
        }
        clearTable()
        getTime()
    })
    addYear.addEventListener('click',function(){
        year++
        clearTable()
        getTime()
    })
    /*头部按钮改变时间*/
    
})



