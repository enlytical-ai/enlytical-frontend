import React from 'react'
import { useState, useEffect } from 'react'
import "./CompetitionConfirmation.css"
import Accordian from '../../accordian/Accordian'
import {
    NotificationContainer,
    NotificationManager,
} from "react-notifications";
import axios from "axios";
import { BASE_URL } from "../../../appConstants";
import { useSelector } from "react-redux";
import Title from '../Title';
import { HEADER } from '../../../appUiConatsnts';
import { display } from '@mui/system';

const CompetitionConfirmation = () => {

    const [state, setState] = useState({
        category_array: [],
        _id: ""
    });
    const targetingStrategy = ['conservative', 'neutral', 'aggressive']
    const [strategy, setStrategy] = useState(...targetingStrategy)
    console.log(strategy);

    const appParams = useSelector((state) => state.appParams);
    const { current_brand } = appParams;
    const token = localStorage.getItem("token");
    useEffect(() => {
        axios.get(`${BASE_URL}categoryCompetition?brandId=${current_brand._id}`, {
            headers: {
                token,
            },
        }).then((response) => {
            console.log(response.data.data.category_and_competition_array.category_array);
            const { category_array, _id } =
                response.data.data.category_and_competition_array
            setState({ category_array, _id })
        }).catch((error) => {
            console.log(error);
        });
    }, [])


    //To get the height for grid
    const [containerHeight, setContainerHeight] = useState();
    useEffect(() => {
        const height = window.innerHeight
        const netHeight = height - (HEADER.height + 20 + 32 + 24 + 42 + 32);
        setContainerHeight(netHeight)
    }, [])
    window.addEventListener('resize', () => {
        const height = window.innerHeight
        const netHeight = height - (HEADER.height + 20 + 32 + 24 + 42 + 32);
        setContainerHeight(netHeight)
    });
    //


    const saveData = () => {
        const token = localStorage.getItem("token");
        axios.put(`${BASE_URL}categoryCompetition/${state._id}?brandId=${current_brand._id}`, { category_array: state.category_array }, {
            headers: {
                token,
            },
        }).then((response) => {
            console.log(response.data.data.category_and_competition_array.category_array);
            const { category_array, _id } = response.data.data.category_and_competition_array
            setState({ category_array, _id });

            NotificationManager.success(
                `${response.data.message}`,
                "Success",
                2000
            );
        }).catch((error) => {
            console.log(error);
            NotificationManager.error(
                `${error.response.data.data.message} `,
                "Error",
                2000
            );
        })
    }

    // const isChecked = (value) => value === strategy

    // console.log(comp);
    // console.log(comp.targeting_strategy);
    // if (strategy === comp.targeting_strategy) {
    //     setStrategy(strategy)
    // }

    const handleChange = (e, cat, comp) => {
        console.log(e.target.value, cat, comp);
        let cat_array = [...state.category_array];
        cat_array.forEach((catEl) => {
            if (catEl._id === cat._id) {
                catEl.competition_array.forEach((compEl) => {
                    if (compEl._id === comp._id) {
                        compEl.targeting_strategy = e.target.value;
                    }
                })
            }
        })
        setState(prevState => ({ ...prevState, category_array: cat_array }));
    }


    const accordianHeaderComponent = (cat) => {
        return (
            <div className='accordion-header'>
                <h6>{cat.category}</h6>
                <div className='accordion-sub-header'>
                    <h6>Conservative</h6>
                    <h6>Neutral</h6>
                    <h6>Aggressive</h6>
                </div>
            </div>
        )
    }
    const accordianBodyComponent = (cat) => {
        return (
            <div className='accordion-body-container'>
                {
                    cat.competition_array.map((comp) => {
                        return (
                            <>
                                <div className='accordion-body'>
                                    <h6>{comp.competition}</h6>
                                    <div className='accordion-sub-body'>
                                        {
                                            targetingStrategy.map((result) => {
                                                return (
                                                    <div className="form-check" >
                                                        <input type="radio" id={comp._id} name={comp._id} value={result}
                                                            checked={result === comp.targeting_strategy}
                                                            onChange={(e) => handleChange(e, cat, comp)}
                                                        />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </>
                        )
                    })
                }
            </div>
        )
    }



    return (
        <>
            <Title>Please Confirm your Priority for each Targeting Strategy</Title>
            <div style={{ height: containerHeight }} >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Title style={{ color: "#012970" }} >Category</Title>
                    <Title style={{ color: "#012970" }} >Targeting Strategy</Title>
                </div>
                {
                    (state.category_array.length) && (state.category_array.map((cat) => {
                        return (

                            <div style={{ marginBottom: 5 }} >
                                <Accordian
                                    accordianHeaderComponent={() => accordianHeaderComponent(cat)}
                                    accordianBodyComponent={() => accordianBodyComponent(cat)}
                                    accordianHeaderHeight={40}
                                    accordianBodyHeight={120}
                                    accordianStatus={true}
                                />

                            </div>

                        )
                    }))
                }
            </div>

            <div className="nextButtonContainer" >
                <button onClick={saveData} className="btn btn-primary btn-sm">
                    Save
                </button>
            </div>
        </>
    )
}

export default CompetitionConfirmation;