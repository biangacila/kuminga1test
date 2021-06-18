//import "./MySlider.css"
import React from "react";
import gsap from "gsap";
import {  TweenLite,TimelineMax,} from "gsap";


export default class MySlider extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

       // gsap.to('#picker', {x: 250, duration: 5})
        //this.maker();
        //this.maker2()
        this.maker4()
    }

    backSlide=()=>{
        gsap.from('#picker',{x: 150, duration: 5})
    }
    nextSlide=()=>{
        gsap.to('#picker', {x: 150, duration: 5})
        //gsap.from('#picker',{x: 150, duration: 5})
    }
    maker4=()=>{
        let picker = document.querySelector("#picker");
        let cells = document.querySelectorAll(".cell");
        let proxy = document.createElement("div");
        let cellWidth = 50;

        var divWidth = document.getElementsByClassName("cell")[0].clientWidth;

        let baseTl = new TimelineMax({paused: true});
        let animation = new TimelineMax({repeat: -1, paused: true})
            .add(baseTl.tweenFromTo(1, 2))
        console.log(">F: ",1," > ",)
        function snapX(x) {
            return Math.round(x / cellWidth) * cellWidth;
        }
        console.log(">F: ",2)
        function updateProgress() {
            animation.progress(this.x / wrapWidth);
        }

        console.log(">F: ",3)

        for (let i = 0; i < cells.length; i++) {
            initCell(cells[i], i);
        }
        function initCell(element, index) {

            TweenLite.set(element, {
                width: cellWidth,
                scale: 0.6,
                //rotationX: rotationX,
                x: -cellWidth
            });

            var tl = new TimelineMax({repeat: 1})
                .to(element, 1, {x: "+=" + wrapWidth/*, rotationX: -rotationX*/}, 0)
                .to(element, cellStep, {color: "#009688", scale: 1, repeat: 1, yoyo: true}, 0.5 - cellStep)

            baseTl.add(tl, index * -cellStep);
        }


        let draggable = window.Draggable.create(proxy, {
            // allowContextMenu: true,
            type: "x",
            trigger: picker,
            throwProps: true,
            onDrag: updateProgress,
            onThrowUpdate: updateProgress,
            snap: {
                x: snapX
            },
            onThrowComplete: function () {
                console.log("onThrowComplete");
                //TODO: animation that inject selected card title
            }
        });
    }
    maker3=()=>{
        let cellWidth = 450;
        let picker = document.querySelector("#picker");
        let cells = document.querySelectorAll(".cell");
        let proxy = document.createElement("div");

        let numCells = cells.length;
        let cellStep = 1 / numCells;
        let wrapWidth = cellWidth * numCells;

        let baseTl = new TimelineMax({paused: true},0);
        TweenLite.set(picker, {
            /*perspective: 1100,*/
            width: wrapWidth - cellWidth
        });

        for (var i = 0; i < cells.length; i++) {
            initCell(cells[i], i);
        }

        let animation = new TimelineMax({repeat: -1, paused: true})
            .add(baseTl.tweenFromTo(1, 2))

        let draggable = window.Draggable.create(proxy, {
            // allowContextMenu: true,
            type: "x",
            trigger: picker,
            throwProps: true,
            onDrag: updateProgress,
            onThrowUpdate: updateProgress,
            snap: {
                x: snapX
            },
            onThrowComplete: function () {
                console.log("onThrowComplete");
                //TODO: animation that inject selected card title
            }
        });

        function snapX(x) {
            return Math.round(x / cellWidth) * cellWidth;
        }

        function updateProgress() {
            animation.progress(this.x / wrapWidth);
        }

        function initCell(element, index) {

            TweenLite.set(element, {
                width: cellWidth,
                scale: 0.6,
                //rotationX: rotationX,
                x: -cellWidth
            });

            var tl = new TimelineMax({repeat: 1})
                .to(element, 1, {x: "+=" + wrapWidth/*, rotationX: -rotationX*/}, 0)
                .to(element, cellStep, {color: "#009688", scale: 1, repeat: 1, yoyo: true}, 0.5 - cellStep)

            baseTl.add(tl, i * -cellStep);
        }
    }


    render() {


        return (
            <main>

                    <div id="picker"  style={styles.main}>
                        <div className="cell" style={styles.cell}>
                            <div className="cell-content" style={styles.cellContent}>Card 1</div>
                        </div>
                        <div className="cell"  style={styles.cell}>
                            <div className="cell-content"  style={styles.cellContent}>Card 2</div>
                        </div>
                        <div className="cell"  style={styles.cell}>
                            <div className="cell-content"  style={styles.cellContent}>Card 3</div>
                        </div>
                        <div className="cell"  style={styles.cell}>
                            <div className="cell-content"  style={styles.cellContent}>Card 4</div>
                        </div>
                        <div className="cell"  style={styles.cell}>
                            <div className="cell-content"  style={styles.cellContent}>Card 5</div>
                        </div>
                        <div className="cell"  style={styles.cell}>
                            <div className="cell-content"  style={styles.cellContent}>Card 6</div>
                        </div>
                        <div className="cell"  style={styles.cell}>
                            <div className="cell-content"  style={styles.cellContent}>Card 7</div>
                        </div>
                        <div className="cell"  style={styles.cell}>
                            <div className="cell-content"  style={styles.cellContent}>Card 8</div>
                        </div>
                    </div>

                <div className='draggable resizable'></div>

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

let cellWidth = 450;
let cells = document.querySelectorAll(".cell");
let proxy = document.createElement("div");

let numCells = cells.length;
let cellStep = 1 / numCells;
let wrapWidth = cellWidth * numCells;

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
