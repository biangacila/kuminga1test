import React from "react";
import "./style.css";
import gsap from "gsap";

export default class GoodProgress extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            draggable:null,
        }
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
            // allowContextM enu: true,
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

        this.setState({
            draggable : draggable,
            gsap:gsap,
            baseTl:baseTl
        })

        function snapX(x) {
            console.log("snapX > ",Math.round(x / cellWidth) * cellWidth)
            return Math.round(x / cellWidth) * cellWidth;
        }

        function updateProgress() {
            console.log("updateProgress X > ",this.x);
            animation.progress(wrapProgress(this.x / wrapWidth));
        }

        function initCell(element, index) {
            console.log("initCell>>> ",element," > ",index)
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

    backSlide=()=>{
        gsap.from('#picker',{x: 150, duration: 5})
    }

    nextSlide=()=>{
        this.state.gsap.from(this.state.baseTl.tweenFromTo(1, 2, {immediateRender: true,duration: 5,repeat: -1}))

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
                <div style={styles.navSlide}>
                    <div style={styles.midleBox}>
                        <button style={styles.btn} onClick={this.backSlide}>Left</button>
                        <button style={styles.btn} onClick={this.nextSlide}>Right</button>
                    </div>
                </div>
            </main>
        )
    }
}


const styles = {
    btn: {
        margin: 30,
        minHeight: 50,
        maxHeight: 50,
        minWidth: 50,
        maxWidth: 50,
        borderRadius: 25,
        backgroundColor: "black",
        color: 'white',
        fontWeight: "bold",
        fontSize: 16,
    },
    navSlide: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    midleBox: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row"
    },
    cellContent:{

    },
    cell: {
        position: "relative",
        top: 0,
        left: 0,
        margin:10,
        /*maxWidth: 450,*/
        minWidth:450,
        /*maxHeight:450,*/
        minHeight:650,
        fontSize: 26,
        fontWeight: "500",
        color: "rgba(0, 0, 0, 0.92)",
        userSelect: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:"#eee",
        transformOrigin:"center bottom",
        border:"1px solid black",
        borderRadius: 5
    },
    /*
    .cell {


    height: 100%;
    transform-origin: center bottom;
    border: 1px soild black;
}
     */
    picker: {
        display: "flex",
        flexDirection: "row",
        /*backgroundColor: "green",*/
        position: "absolute",
        overflow: "hidden",
        width: 400,
        borderRadius: "2px",
        boxShadow: "0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14),\n" +
            "    0 1px 10px 0 rgba(0, 0, 0, 0.12)",
    },
    main: {
        display: "flex",
        position: "relative",
        flexDirection: "row",
        maxWidth: "90%",
        minWidth:"90%",
        height: "100%",
        /*overflow: "hidden",*/
        alignItems: "center",
        justifyContent: "center",
        /* backgroundColor: "red",*/
        padding:20,
    }
}

