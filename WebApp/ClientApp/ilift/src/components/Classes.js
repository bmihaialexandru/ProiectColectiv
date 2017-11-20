import React, { Component } from 'react';

export class Classes extends Component {

  render() {
        return (
          <div id="fh5co-programs-section">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <div className="heading-section text-center animate-box">
                            <h2>Our Programs</h2>
                            <p>Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
                        </div>
                    </div>
                </div>
                <div className="row text-center">
                    <div className="col-md-4 col-sm-6">
                        <div className="program animate-box">
                            <img src={require("./images/fit-dumbell.svg")} alt="Cycling"/>
                            <h3>Body Combat</h3>
                            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. </p>
                            <span><a href="#" className="btn btn-default">Join Now</a></span>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-6">
                        <div className="program animate-box">
                            <img src={require("./images/fit-yoga.svg")} alt=""/>
                            <h3>Yoga Programs</h3>
                            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. </p>
                            <span><a href="#" className="btn btn-default">Join Now</a></span>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-6">
                        <div className="program animate-box">
                            <img src={require("./images/fit-cycling.svg")} alt=""/>
                            <h3>Cycling Program</h3>
                            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. </p>
                            <span><a href="#" className="btn btn-default">Join Now</a></span>
                        </div>
                    </div>
                    <br/>
                    <div className="col-md-4 col-sm-6">
                        <div className="program animate-box">
                            <img src={require("./images/fit-boxing.svg")} alt="Cycling"/>
                            <h3>Boxing Fitness</h3>
                            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. </p>
                            <span><a href="#" className="btn btn-default">Join Now</a></span>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-6">
                        <div className="program animate-box">
                            <img src={require("./images/fit-swimming.svg")} alt=""/>
                            <h3>Swimming Program</h3>
                            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. </p>
                            <span><a href="#" className="btn btn-default">Join Now</a></span>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-6">
                        <div className="program animate-box">
                            <img src={require("./images/fit-massage.svg")} alt=""/>
                            <h3>Massage</h3>
                            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. </p>
                            <span><a href="#" className="btn btn-default">Join Now</a></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}