
let n;
init();
setInterval(()=>{
    makeLeave(getImage(n))
        .one('transitionend',(e)=>{
            makeEnter($(e.currentTarget))
    })
    makeCurrent(getImage(n+1));
    n+=1
},3000)



function init() {
    n = 1;
    $(`.images > img:nth-child(${n})`).addClass('current').siblings().addClass('enter')
}
function x(n) {
    if(n>3){
        n = n%3
        if(n===0)
            n = 3
    }
    return n
}

function getImage(n) {
    return $( `.images > img:nth-child(${x(n)})`)
}

function makeCurrent($node) {
    $node.addClass('current ').removeClass('enter leave')
}
function makeLeave($node) {
    $node.addClass('leave').removeClass('current enter')
    return $node;
}
function makeEnter($node) {
    $node.addClass('enter').removeClass('current leave')
}

/*setTimeout(()=>{
    $('.images > img:nth-child(1)').addClass('leave').removeClass('current').one('transitionend',(e)=>{
        $(e.currentTarget).removeClass('leave').addClass('enter')
    })
    $('.images > img:nth-child(2)').addClass('current').removeClass('enter')
    // $('.images > img:nth-child(3)').addClass('enter')

},1000)

setTimeout(()=>{
    $('.images > img:nth-child(2)').addClass('leave').removeClass('current').one('transitionend',(e)=>{
        $(e.currentTarget).removeClass('leave').addClass('enter')
    })
    $('.images > img:nth-child(3)').addClass('current').removeClass('enter')
    // $('.images > img:nth-child(3)').addClass('enter')

},3000)

setTimeout(()=>{
    $('.images > img:nth-child(3)').addClass('leave').removeClass('current').one('transitionend',(e)=>{
        $(e.currentTarget).removeClass('leave').addClass('enter')
    })
    $('.images > img:nth-child(1)').addClass('current').removeClass('enter')
    // $('.images > img:nth-child(3)').addClass('enter')

},6000)*/

/*
setTimeout(function () {
    $('.images>img:nth-child(1)').css({
        transform:'translateX(-100%)'
    })

    $('.images>img:nth-child(2)').css({
        transform:'translateX(-100%)'
    })
    $('.images>img:nth-child(1)').one('transitionend',function (e) {
        console.log(1)
        $(e.currentTarget).addClass('right').css({transform:'none'})
    })
},3000)

setTimeout(function () {
    $('.images>img:nth-child(2)').css({
        transform:'translateX(-200%)'
    })

    $('.images>img:nth-child(3)').css({
        transform:'translateX(-100%)'
    })
    $('.images>img:nth-child(2)').one('transitionend',function (e) {
        console.log(1)
        $(e.currentTarget).addClass('right').css({transform:'none'})
    })
},6000)

setTimeout(function () {
    $('.images>img:nth-child(3)').css({
        transform:'translateX(-200%)'
    })

    $('.images>img:nth-child(1)').css({
        transform:'translateX(-100%)'
    })
    $('.images>img:nth-child(3)').one('transitionend',function (e) {
        console.log(1)
        $(e.currentTarget).addClass('right').css({transform:'none'})
    })
},9000)*/
