(
    function(){
        var moduleName='countDown';
        
        app.data.raceTime=new Date('6/29/2014 8:00 AM').getTime();
        
        function render(el){
            
            countDown();
        }
        
        function countDown(){
            var timeLeft=app.data.raceTime-(
                new Date().getTime()
            );
            
            var counter=document.querySelector('.countDown span');
            
            counter.innerHTML=(timeLeft/86400000 | 0) +'d ';
            
            timeLeft=timeLeft- (timeLeft/86400000 | 0)*86400000;
            
            counter.innerHTML+=(timeLeft/3600000 | 0) +'h ';
            
            timeLeft=timeLeft- (timeLeft/3600000 | 0)*3600000;
            
            counter.innerHTML+=(timeLeft/60000 | 0) +'m ';
            
            timeLeft=timeLeft- (timeLeft/60000 | 0)*60000;
            
            counter.innerHTML+=(timeLeft/1000 | 0)+'s ';
            
            
            setTimeout(
                countDown,
                1000
            );
        }
        
        exports(moduleName,render);    
    }
)();