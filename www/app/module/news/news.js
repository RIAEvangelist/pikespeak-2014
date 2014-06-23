(
    function(){
        var moduleName='news';
        
        function render(el){
            console.log('top')
            el.addEventListener(
                'click',
                handleClicks
            );
            
        }
        
        function handleClicks(e){
            switch(e.target.id){
                case 'footerButton':
                    app.trigger('log','Footer Button Clicked');
                    break;
            }
        }
        
        exports(moduleName,render);    
    }
)();