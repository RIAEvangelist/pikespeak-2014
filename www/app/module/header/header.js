(
    function(){
        var moduleName='header';
        
        function render(el){
            el.querySelector('.back').addEventListener(
                'click',
                function(e){
                    e.target.classList.add('hidden');
                    app.trigger('nav-back');
                    document.getElementsByClassName('title')[0].innerHTML='PPIHC 2014'
                }
            );
        }
        
        app.on(
            'screen-open',
            function(screen){
                document.getElementsByClassName('back')[0].classList.remove('hidden');
                document.getElementsByClassName('title')[0].innerHTML=screen;
            }
        );
        
        exports(moduleName,render);    
    }
)();