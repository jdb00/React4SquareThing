import React, { Component } from 'react';

class Filter extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
              <div role="group" className="btn-group btn-group-toggle">
                <label className="venue-filter btn active btn-primary">
                  <input name="venue-filter" type="radio" autoComplete="off" value="all" defaultChecked=""/>All
                </label>
                <label className="venue-filter btn btn-primary">
                  <input name="venue-filter" type="radio" autoComplete="off" value="food"/>Food
                </label>
                <label className="venue-filter btn btn-primary">
                  <input name="venue-filter" type="radio" autoComplete="off" value="drinks"/>Drinks
                </label>
                <label className="venue-filter btn btn-primary">
                  <input name="venue-filter" type="radio" autoComplete="off" value="others"/>Others
                </label>
              </div>
            </div>
        )
    }
}

export default Filter;







