(
    function(){
        var moduleName='news';
        
        function render(el){
            console.log('top')
            el.addEventListener(
                'click',
                handleClicks
            );
            
            getNews();
        }
        
        function getNews(screen){
            if(screen!=moduleName)
                return;
            
            intel.xdk.device.getRemoteData(
                'http://www.ppihc.com/feed/?ts='+new Date().getTime(), 
                'GET',
                '',
                'parseNews',
                'newsError'
            );
            
        }
        
        window.parseNews = function(news) {
            news=news.replace(/content\:encoded/g,'content');
            parser=new DOMParser();
            news=parser.parseFromString(news,"text/xml");
            news=news.documentElement.querySelectorAll('item');
            
            var articles='';
            var template=document.querySelector('article[data-template]').outerHTML;
            
            for(var i=0; i<news.length; i++){
                var article=template.replace(
                    /"hidden"/,
                    ''
                ).replace(
                    /\$\{title\}/,
                    news[i].querySelector('title').childNodes[0].nodeValue
                ).replace(
                    /\$\{date\}/,
                    news[i].querySelector('pubDate').childNodes[0].nodeValue
                ).replace(
                    /\$\{description\}/,
                    news[i].querySelector('description').childNodes[0].nodeValue
                ).replace(
                    /\$\{content\}/,
                    (
                        news[i].querySelector('content').childNodes[0].nodeValue
                    )
                );
                
                //console.log(article);
                
                articles+=article;
            }
            
            document.getElementById('newsContent').innerHTML=articles;
        };
        
        window.newsError=function(){}
        
        function handleClicks(e){
            if(!e.target)
                return;
            if(!e.target.tagName)
                return;
                
            switch(e.target.tagName){
                case 'ARTICLE':
                    e.target.querySelector('.description').classList.toggle('hidden')
                    e.target.querySelector('.content').classList.toggle('hidden')
                    break;
                default :
                    handleClicks(
                        {
                            target:e.target.parentElement
                        }    
                    )
            }
        }
        
        app.on(
            'screen-open',
            getNews
        );
        
        exports(moduleName,render);    
    }
)();