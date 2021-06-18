import React from "react";
import "./style.css";

export default class GoodProgress extends React.Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.initJavascript();
    }
    initJavascript=()=>{
        let gsap = window.gsap;
        let Draggable=window.Draggable;
        let InertiaPlugin = window.InertiaPlugin;

        gsap.registerPlugin(Draggable, InertiaPlugin);

        gsap.defaults({ease: "none"});

        var picker = document.querySelector(".picker");
        var cells = gsap.utils.toArray(".cell");
        var proxy = document.createElement("div");

        var cellWidth = 450;
//var rotationX = 90;

        var numCells = cells.length;
        var cellStep = 1 / numCells;
        var wrapWidth = cellWidth * numCells;

        var baseTl = gsap.timeline({ paused: true });
        var wrapProgress = gsap.utils.wrap(0, 1);

        gsap.set(picker, {
            //perspective: 1100,
            width: wrapWidth - cellWidth
        });

        for (var i = 0; i < cells.length; i++) {
            initCell(cells[i], i);
        }

        var animation = gsap.timeline({ repeat: -1, paused: true })
            .add(baseTl.tweenFromTo(1, 2, {immediateRender: true}))

        var draggable = new Draggable(proxy, {
            // allowContextMenu: true,
            type: "x",
            trigger: picker,
            inertia: true,
            onDrag: updateProgress,
            onThrowUpdate: updateProgress,
            snap: {
                x: snapX
            },
            onThrowComplete: function(){
                let biggestElement = cells.slice(0).sort((a, b) => gsap.getProperty(a, "scaleX") - gsap.getProperty(b, "scaleX")).pop();
                console.log("onThrowComplete. Biggest element:", biggestElement);
            }
        });

        function snapX(x) {
            return Math.round(x / cellWidth) * cellWidth;
        }

        function updateProgress() {
            animation.progress(wrapProgress(this.x / wrapWidth));
        }

        function initCell(element, index) {

            gsap.set(element, {
                width: cellWidth,
                scale: 0.6,
                //rotationX: rotationX,
                x: -cellWidth
            });

            var tl = gsap.timeline({ repeat: 1 })
                .to(element, 1, { x: "+=" + wrapWidth/*, rotationX: -rotationX*/ }, 0)
                .to(element, cellStep, { color: "#009688", scale: 1, repeat: 1, yoyo: true }, 0.5 - cellStep);
            baseTl.add(tl, i * -cellStep);
        }


    }
    render() {
        return(
            <main>
                <div id="picker" className="picker">
                    <div className="cell">
                        <div className="cell-content">Card 1</div>
                    </div>
                    <div className="cell">
                        <div className="cell-content">Card 2</div>
                    </div>
                    <div className="cell">
                        <div className="cell-content">Card 3</div>
                    </div>
                    <div className="cell">
                        <div className="cell-content">Card 4</div>
                    </div>
                    <div className="cell">
                        <div className="cell-content">Card 5</div>
                    </div>
                    <div className="cell">
                        <div className="cell-content">Card 6</div>
                    </div>
                    <div className="cell">
                        <div className="cell-content">Card 7</div>
                    </div>
                    <div className="cell">
                        <div className="cell-content">Card 8</div>
                    </div>
                </div>
            </main>
        )
    }
}
