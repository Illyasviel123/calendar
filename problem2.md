Q1:抓取到今天的算法很奇怪：先找到月初是星期几，再拿到日期，两者相加再减1记为i，
i整除7即为今天在日历上的行数减一，i对7取余即为在日历上的列数(算法这种东西我实在是不擅长)<br>
Q2:清空table时不能写成table.removeChild<br>
A:这个函数好像只能清除子级元素。必须在tbody里才能清除掉tr<br>
Q3：使用insertRow函数的时候，如果thead中有th而tbody中没有元素，那么添加的tr会跑到thead中，不知道如何解决<br>
Q4:日历中当天之前的时间，我加的颜色是#d3d3d3,js好像不认识这个，只认识对应的rgb(211,211,211)<br>