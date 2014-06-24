(
    function(){
        var moduleName='racers';
        
        function render(el){
            el.addEventListener(
                'click',
                handleClicks
            );
        }
        
        function getTimes(){
            if(!app.data.nav)
                return
            
            if(app.data.nav.current!=moduleName)
                return;
            
            document.querySelector('.title').innerHTML='Timing';
              
           intel.xdk.device.getRemoteData(
                'http://livetiming.net/ppihc/LoadPKT.asp?ts='+new Date().getTime(), 
                'GET',
                '',
                'parseTimes',
                'timingError'
            );
        }
        
        window.timingError=function (data){console.log(data)}
        
        window.parseTimes = function (times) {
            var classes={};
            var templates={
                class   : document.querySelector('.racers section[data-template="class"]').innerHTML,
                row     : document.querySelector('.racers  tbody[data-template="row"]').innerHTML
            };
            var timingGroups=document.getElementById('timingGroups');
            
            times=times.replace('<! ','').replace('\n<end>','');
            times=times.split('\n');
            //console.log(templates)
            document.getElementById('timingFor').innerHTML=times[0].split('|')[0].slice(0,-1);
            
            for(var i=1; i<times.length; i++){
                times[i]=times[i].split('|');
                if(!times[i][17])
                    continue;
                if(times[i][17]=='Sweep')
                    continue;
                    
                if(!classes[
                        times[i][17]    
                    ]
                ){
                    classes[
                        times[i][17]    
                    ]={};
                }
                
                classes[
                    times[i][17]    
                ][i]=times[i];
            }
            
            timingGroups.innerHTML='';
            
            for(var keys=Object.keys(classes), j=0;j<keys.length;j++){
                var racers='';
                var racer=classes[keys[j]];
                
                for(var place=Object.keys(racer), k=0;k<place.length;k++){
                    var info=racer[place[k]];
                    
                    //console.log(info);
                    
                    racers+=templates.row.replace('${name}',info[2])
                        .replace(
                            '${section1}',
                            (info[36])? info[36].replace(/\s/g,'') || '--:--' 
                                : 
                            '--:--'
                        ).replace(
                            '${section2}',
                            (info[37])? info[37].replace(/\s/g,'') || '--:--'
                                :
                            '--:--'
                        ).replace(
                            '${section3}',
                            (info[38])? info[38].replace(/\s/g,'') || '--:--'
                                :
                            '--:--'
                        ).replace(
                            '${section4}',
                            (info[39])? info[39].replace(/\s/g,'') || '--:--'
                                :
                            '--:--'
                        ).replace(
                            '${number}',
                            info[1]
                        )
                }
                
                timingGroups.innerHTML+=templates.class.replace('${class}',keys[j])
                    .replace('${racers}',racers)
                    .replace('<!--','')
                    .replace('-->','');
                
            }
            
            //console.log(times,classes);
            
            if(app.data.nav.current==moduleName){
                setTimeout(
                    getTimes,
                    25000
                );
            }
        }
        
        function handleClicks(e){
            switch(e.target.id){
                case 'footerButton':
                    app.trigger('log','Footer Button Clicked');
                    break;
            }
        }
        
        app.on(
            'screen-open',
            getTimes
        );
        
        exports(moduleName,render);    
    }
)();