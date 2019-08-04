!function () {
    let aTags = document.querySelectorAll('nav.menu > ul > li > a')
    /*tween.js*/
// Setup the animation loop.
    function animate(time) {
        requestAnimationFrame(animate);
        TWEEN.update(time);
    }
    requestAnimationFrame(animate);
    for(let i = 0; i < aTags.length; i++){
        aTags[i].onclick = function (e) {
//                e.preventDefault()
            /*======================*/
            console.log(e.currentTarget.getAttribute('href')) //打印 锚点
            let href = e.currentTarget.getAttribute('href')
            let element = document.querySelector(href)
            let top = element.offsetTop;
            let targetTop = top - 100;
            let currentTop = window.scrollY;
            let s = targetTop - currentTop //向上滑动 s 为负值
            let t = Math.abs( (s/100) * 300); // 时间不能是负数，所以取绝对值
            if(t>500){
                t = 500
            }
            const coords = { x: 0, y: currentTop };

            const tween = new TWEEN.Tween(coords)
                .to({ x: 0, y: targetTop }, t )
                .easing(TWEEN.Easing.Quadratic.InOut)
                .onUpdate(() => {
//                        box.style.setProperty('transform', `translate(${coords.x}px, ${coords.y}px)`);
                    window.scrollTo(0,coords.y)
                })
                .start();

            /* let targetTop = top - 100;
             let n = 25;
             let duration = 500/n; // t
             let currentTop = window.scrollY;
             let distance = (targetTop - currentTop)/n //s
             let i = 0
             let id = setInterval( ()=>{
                 if(i ===n){
                     window.clearInterval(id)
                     return ;
                 }
                 i = i + 1;
                 window.scrollTo( 0, currentTop + distance * i)
             },duration)*/

        }
    }
}.call()

