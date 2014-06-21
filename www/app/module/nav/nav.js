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
            document.getElementsByClassName('screen').forEach(
                function(el){
                    el.classList.remove('showScreen');
                }
            );
            
            document.getElementById(e.target.id).classList.add('showScreen');
        }
        
        exports(moduleName,render);    
    }
)();