(
    function(){
        var moduleName='photos';
        
        function render(el){
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