(
    function(){
        var moduleName='nav';
        
        function render(el){
            el.addEventListener(
                'click',
                handleClicks
            );
            
        }
        
        function handleClicks(e){
            var screens=document.getElementsByClassName('screen');
            for(var i=0; i<screens.length; i++){
                screens[i].classList.remove('showScreen');
            }
            
            document.getElementsByClassName(e.target.id)[0].classList.add('showScreen');
            if(!app.data.nav)
                app.data.nav={};
                
            app.data.nav.current=e.target.id;
            app.trigger(
                'screen-open',
                e.target.id
            );
        }
        
        
        app.on(
            'nav-back',
            function(){
                app.data.nav.current=false;
                var screens=document.getElementsByClassName('screen');
                for(var i=0; i<screens.length; i++){
                    screens[i].classList.remove('showScreen');
                }
            }
        );
        exports(moduleName,render);    
    }
)();