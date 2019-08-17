!function() {

    
    let specialTags = document.querySelectorAll('[data-x]')
    for(let i = 0; i < specialTags.length ; i++){
        specialTags[i].classList.add('offset')
    }

    window.onload = function () {
        siteWelcome.classList.remove('active')
        findClosestAndRemoveOffset()
    }

    window.addEventListener('scroll',function (e) {
        findClosestAndRemoveOffset()
    })

    /*heper*/
    function findClosestAndRemoveOffset() {
        let specialTags = document.querySelectorAll('[data-x]')
        let minIndex = 0;
        for(let i = 1; i < specialTags.length ; i++){
//                console.log(specialTags[i].offsetTop,'specialTags[i].offsetTop')
            if( Math.abs(specialTags[i].offsetTop - window.scrollY) < Math.abs(specialTags[minIndex].offsetTop - window.scrollY)){
                minIndex = i;
            }
        }
        // console.log('minIndex',minIndex)
        specialTags[minIndex].classList.remove('offset')

        let id = specialTags[minIndex].id;
//	        console.log(id)
        // console.log(document.querySelector('a[href="#'+ id +'"]').parentNode);
        
        let a = document.querySelector('a[href="#'+ id +'"]');
        let li = a.parentNode;
        let navLists = li.parentNode.children;
        // console.log(navLists)
        for(let i = 0; i < navLists.length; i ++){
            navLists[i].classList.remove('highlight')
        }
        li.classList.add('highlight')
    }

    /**
     * 点击 添加高亮 待优化
     * @type {NodeList}
     */
    let liTags = document.querySelectorAll('nav.menu > ul > li')
    for (let i = 0; i < liTags.length; i++){
        liTags[i].onmouseenter = function (e) {
            e.currentTarget.classList.add('active');
            // this.classList.add('active');

        }

        liTags[i].onmouseleave = function (e) {
            e.currentTarget.classList.remove('active');
        }
    }

}.call()