import { Category } from '@mui/icons-material'
import React from 'react'
import { useState } from 'react'
import "./CompetitionConfirmation.css"


const CompetitionConfirmation = () => {
    const item = [
        {
            id: 1,
            Category: "Probiotics",
            content: [
                {
                    id: 11,
                    competition: "Yakult"
                },
                {
                    id: 12,
                    competition: "Lactogut"
                },
            ]
        },
        {
            id: 2,
            Category: "MultiVitamins",
            content: [
                {
                    id: 21,
                    competition: "Meadbery"
                },
                {
                    id: 22,
                    competition: "Nutribears"
                },
                {
                    id: 23,
                    competition: "Kapiva"
                },
            ]
        },
    ]
    const [state, setState] = useState(item)
    return (
        <>
            <div style={{ marginBottom: "15px" }}>
                <h3 style={{ fontSize: "20px", color: "#1565C0" }}>
                    Please Confirm your Priority for each Targeting Strategy
                </h3>
            </div>

            <div className="accordion" id="accordionPanelsStayOpenExample">
                {
                    state.map((cat) => {
                        return (
                            <>
                                <div className="accordion-item" key={cat.id}>
                                    <h2 className="accordion-header" id={`panelsStayOpen-heading${cat.id}`}>
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                            <h6>{cat.Category}</h6>
                                            <h6 style={{ paddingLeft: '40%' }}>Conservative</h6>
                                            <h6 style={{ paddingLeft: '85px' }}>Neutral</h6>
                                            <h6 style={{ paddingLeft: '85px' }}>Aggressive</h6>
                                        </button>
                                    </h2>
                                    {
                                        cat.content.map((comp) => {
                                            return (
                                                <>
                                                    <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                                                        <div className="accordion-body">
                                                            <h6>{comp.competition}</h6>
                                                            <div className="form-check" style={{ paddingLeft: '43%' }}>
                                                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                                            </div>
                                                            <div className="form-check" style={{ paddingLeft: '165px' }}>
                                                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                                            </div>
                                                            <div className="form-check" style={{ paddingLeft: '150px' }}>
                                                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        })
                                    }

                                </div>
                            </>
                        )
                    })
                }
                <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">

                            <h6>Category #1</h6>
                            <h6 style={{ paddingLeft: '40%' }}>Conservative</h6>
                            <h6 style={{ paddingLeft: '85px' }}>Neutral</h6>
                            <h6 style={{ paddingLeft: '85px' }}>Aggressive</h6>

                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                        <div className="accordion-body">
                            <h6>Competition #1</h6>
                            <div className="form-check" style={{ paddingLeft: '43%' }}>
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                            </div>
                            <div className="form-check" style={{ paddingLeft: '165px' }}>
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                            </div>
                            <div className="form-check" style={{ paddingLeft: '150px' }}>
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                            </div>
                        </div>
                        <hr style={{ margin: 0 }} />
                        <div className="accordion-body">
                            <h6>Competition #2</h6>
                            <div className="form-check" style={{ paddingLeft: '43%' }}>
                                <input className="form-check-input" type="radio" name="flexRadioDefault2" id="flexRadioDefault2" />
                            </div>
                            <div className="form-check" style={{ paddingLeft: '165px' }}>
                                <input className="form-check-input" type="radio" name="flexRadioDefault2" id="flexRadioDefault2" />
                            </div>
                            <div className="form-check" style={{ paddingLeft: '150px' }}>
                                <input className="form-check-input" type="radio" name="flexRadioDefault2" id="flexRadioDefault2" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                            Accordion Item #2
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                        <div className="accordion-body">
                            <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classNamees that we use to style each element. These classNamees control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ textAlign: "right" }}>
                <button className="btn btn-primary btn-sm mt-5">
                    Save
                </button>
            </div>

        </>
    )
}

export default CompetitionConfirmation;