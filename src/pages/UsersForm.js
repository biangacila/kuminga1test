import React from "react";
import ReactCssTransitionGroup from "react-addons-css-transition-group";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./style.css";

class UsersForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Animal: "",
            imageUrl: null,
            data: [
                {title: "one", imageUrl: ""},
                {title: "two", imageUrl: ""},
                {title: "three", imageUrl: ""},
                {title: "four", imageUrl: ""},
                {title: "five", imageUrl: ""},
            ]
        }
    }

    validation = () => {
        //todo check for character length min :2 and max:20
        const animal = this.state.Animal;
        if (animal.length < 2) {
            return false
        }
        if (animal.length > 20) {
            return false
        }
        return true
    }
    fakeUtest = () => {
    }
    submitForm = async (e) => {
        this.fakeUtest();
        e.preventDefault();
        if (!this.validation()) {
            alert("validation fail,Minimum 2 and max 20 ");
            return
        }
        let randomAnimal = "";
        let params = {
            tags: randomAnimal,
            tagmode: "any",
            format: "json"
        }
        let url = `http://api.flickr.com/services/feeds/photos_public.gne`;
        fetch(url,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params)
            })
            .then((response) => response.json())
            .then((response) => {
                let rnd = Math.floor(Math.random() * response.items.length);
                let image_src = response.items[rnd]['media']['m'].replace("_m", "_b");
                this.setState({
                    imageUrl: image_src
                })
            }).catch((e) => {
        })
    }
    nextSlide = () => {
        let totalElement = this.state.data.length
        let index = totalElement - 1;
        let lastElement = this.state.data[index];
        let tmp = [];
        tmp.push(lastElement);
        for (let i = 0; i < totalElement - 1; i++) {
            let el = this.state.data[i];
            tmp.push(el);
        }
        this.setState({data: tmp})
    }
    backSlide = () => {
        let totalElement = this.state.data.length
        let index = totalElement - 1;
        let firstElement = this.state.data[0];
        let tmp = [];
        for (let i = 1; i < totalElement; i++) {
            let el = this.state.data[i];
            tmp.push(el);
        }
        tmp.push(firstElement);
        this.setState({data: tmp})
    }

    render() {
        return (
            <div>
                <form onSubmit={this.submitForm}>
                    <h1>User input</h1>
                    <label>Animal</label>
                    <input
                        onChange={(e) => this.setState({
                            Animal: e.target.value
                        })}
                        value={this.state.Animal}
                    />
                    <button type={"submit"}>Submit</button>
                </form>
                <hr/>

                    <ReactCssTransitionGroup
                        transitionName={"fade"}
                        transitionEnterTimeout={600}
                        transitionLeaveTimeout={600}
                        transitionAppear={true}
                        transitionAppearTimeout={500}
                        style={styles.boxSlide}
                    >
                        <div style={styles.normalSlide}>
                            <h1>{this.state.data[0].title}</h1>
                        </div>
                        <div style={styles.normalSlide}>
                            <h1>{this.state.data[1].title}</h1>
                        </div>

                        <div style={styles.mainSlide}>
                            <h1>{this.state.data[2].title}</h1>
                        </div>

                        <div style={styles.normalSlide}>
                            <h1>{this.state.data[3].title}</h1>
                        </div>
                        <div style={styles.normalSlide}>
                            <h1>{this.state.data[4].title}</h1>
                        </div>
                    </ReactCssTransitionGroup>


                <div style={styles.navSlide}>
                    <div style={styles.midleBox}>
                        <button style={styles.btn} onClick={this.backSlide}>Left</button>
                        <button style={styles.btn} onClick={this.nextSlide}>Right</button>
                    </div>
                </div>

            </div>
        )
    }
}

export default UsersForm;

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
    boxSlide: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
    },
    mainSlide: {
        borderColor: "red",
        borderWidth: 2,
        borderStyle: "solid",
        borderRadius: 10,
        minHeight: 350,
        maxHeight: 350,
        minWidth: 350,
        maxWidth: 350,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        margin: 10,
        transition: "all .8s ease-in-out",
        transformOrigin: "left top",
        //transform: scaleY(0),
    },
    normalSlide: {
        borderColor: "gray",
        borderWidth: 2,
        borderStyle: "solid",
        borderRadius: 10,
        minHeight: 300,
        maxHeight: 300,
        minWidth: 300,
        maxWidth: 300,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        margin: 10,
    }
}
