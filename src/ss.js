export function a() {

    window.gsap.to('.el1, .el2 , .el3, .el4', {
        scale: 2,
        rotate: 45,
        borderRadius: '50%',
        duration: 3,
        repeat: -1,
        yoyo: true,
    })
}

export function b() {
    window.gsap.from('.feature-topic-wrap li ', {
        x:100,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        scrollTrigger: {
            trigger: ".feature-topic-wrap li",
            markers: true
        }
    })
}

export function scaleImg(){
    window.gsap.to('.thumb-style-four',{
        // scale:1.03,
       // x:10,
        duration:3,
        repeat: -1,
        rotate:2,
        yoyo:'true'
    })
}