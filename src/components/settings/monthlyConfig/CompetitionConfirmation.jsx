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


const CompetitionConfirmation = () => {

    const item = [
        {
            id: "1",
            Category: "Probiotics",
            content: [
                {
                    id: "11",
                    competition: "Yakult"
                },
                {
                    id: "12",
                    competition: "Lactogut"
                },
            ]
        },
        {
            id: "2",
            Category: "MultiVitamins",
            content: [
                {
                    id: "21",
                    competition: "Meadbery"
                },
                {
                    id: "22",
                    competition: "Nutribears"
                },
                {
                    id: "23",
                    competition: "Kapiva"
                },
            ]
        },
        {
            id: "3",
            Category: "Digestion & Nausea",
            content: [
                {
                    id: "31",
                    competition: "Ayusheal"
                },
                {
                    id: "32",
                    competition: "Chubears"
                },
                {
                    id: "33",
                    competition: "Carbamide"
                },
                {
                    id: "34",
                    competition: "Gummy Vites"
                },
            ]
        },
    ]

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
            <div style={{ marginBottom: "15px" }}>
                <h3 style={{ fontSize: "20px", color: "#1565C0" }}>
                    Please Confirm your Priority for each Targeting Strategy
                </h3>
            </div>
            <div>
                <div className="Heading">
                    <h5 style={{ width: '100%' }}>Category</h5>
                    <h5 style={{ width: '60%', paddingLeft: "20px" }}>Targeting Strategy</h5>
                </div>
                {
                    (state.category_array.length) && (state.category_array.map((cat) => {
                        return (
                            <>
                                <div>
                                    <Accordian
                                        accordianHeaderComponent={() => accordianHeaderComponent(cat)}
                                        accordianBodyComponent={() => accordianBodyComponent(cat)}
                                        accordianHeaderHeight={40}
                                        accordianBodyHeight={120}
                                        accordianStatus={true}
                                    />

                                </div>
                            </>
                        )
                    }))
                }
            </div>
            <div style={{ textAlign: "right" }}>
                <button onClick={saveData} className="btn btn-primary btn-sm mt-5">
                    Save
                </button>
            </div>

        </>
    )
}

export default CompetitionConfirmation;