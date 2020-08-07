import React, { Component } from 'react';
import Venue from './Venue';
import Filter from './Filter'
import Modal from 'react-bootstrap/Modal'
import './App.css';

var clientId = '5ASNMMJXBFRCRFVPVLU0RTFZBRQWWQZC3GDHNXY2RCLXFXNX'
var clientSecret ='VSQPBSYPV2BYILO0UPZSMFR5V4VY1N4DXW2GUJKHQLQNVWL0'
var key = '?client_id='+clientId+'&client_secret='+clientSecret+'&v=20200801'


class App extends Component {

  constructor(props){
    super(props)

    this.state = {
      venues: [
        // {
        //   id: "4b4d4133f964a52070cf26e3",
        //   name: "Real Groovy",
        //   address: "369 Queen Street",
        //   category: "Record Shop"
        // },
        // {
        //   id: "4b633568f964a520bc6a2ae3",
        //   name: "Cordis Auckland",
        //   address: "83 Symonds St",
        //   category: "Hotel"
        // },
        // {
        //   id: "4bc992e7b6c49c7401a28e91",
        //   name: "Ken Yakitori",
        //   address: "89 Karangahape Rd.",
        //   category: "Yakitori"
        // }
      ],
      isModalOpen: false,
      modalVenue: {
        address: "301-317 Queen St",
        category: "City Hall",
        description: "abadsf",
        id: "4b8766b6f964a52067be31e3",
        name: "Auckland Town Hall",
        photo: "https://fastly.4sqi.net/img/general/200x200/194220_nI7vTqtIFQncbe7Zgn_XLymzqM78Cx-aZ_gySunjz-M.jpg"
      }
    }
  }

  showModal = () => {
    console.log('open')
    this.setState({
      isModalOpen: true
    })
  } 

  hideModal = () => {
    this.setState({
      isModalOpen: false
    })
  }

  loadVenues = () => {
    var latlng = '-36.856806,174.764425'
    var url = 'https://api.foursquare.com/v2/venues/explore'+key+'&ll=' + latlng

    fetch(url)
    .then((response)=>{
        return response.json()
    })
    .then((data)=>{
        return data.response.groups[0].items
    })
    .then((data)=>{
        return data.map((item)=>{
            var venue = {
                id: item.venue.id,
                name: item.venue.name,
                address: item.venue.location.address,
                category: item.venue.categories[0].shortName 
            }
            return venue
        })
    })
    .then((data)=>{
        this.setState({
          venues: data
        })
    })
  }

  loadVenue = (id)=>{
    var url = 'https://api.foursquare.com/v2/venues/'+id+key
   
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
        var item = data.response.venue
        var venue = {
            id:item.id,
            name:item.name,
            category:item.categories[0].shortName,
            address:item.location.address,
            description:item.description,
            photo:item.bestPhoto.prefix + '300x300' + item.bestPhoto.suffix
        }
        return venue
    })
    .then(data=>this.setState({modalVenue:data}))
  } 

  loadVenue = (id)=>{
    var id = "4bcd4a98fb84c9b696e5213e"
    var url = 'https://api.foursquare.com/v2/venues/' + id + key

    fetch(url)
    .then(response=>response.json())
    // .then(data=>console.log(data))
    .then((data)=>{
        var item = data.response.venue
        var venue = {
            id: item.id,
            name: item.name,
            category: item.categories[0].shortName,
            address: item.location.address,
            description: item.description,
            photo: item.bestPhoto.prefix + '1080x1920' + item.bestPhoto.suffix
        }
        return venue
    })
    .then(data=>{
      this.setState({
        modalVenue: data
      })
    })

}   

  componentDidMount(){
    this.loadVenues()
  }

  render(){
    return(
      <div className="app">
        <div className="container">
          <div className="venues">
            {
              this.state.venues.map((item)=>{
                var venueProps ={
                  key: item.id,
                  ...item,
                  showModal: this.showModal,
                  loadVenue: this.loadVenue
                }

                return(
                  <Venue {...venueProps}/>
                )
              })
            }
            
              
              
          </div> 

          <div className="venue-filters">
            <Filter/>
          </div>
        </div>


        <Modal show={this.state.isModalOpen} animation={true} onHide={this.hideModel}>
          <Modal.Body>
            <div className="venue-popup-body row">

              <div className="col-6">
                <h1 className="venue-name">{this.state.modalVenue.name}</h1>
                <p>5B Gore St</p>
                <p>Auckland</p>
                <p><span className="badge venue-type">Café</span></p>
              </div>

              <div className="col-6">
                <img src={this.state.modalVenue.photo} className="img-fluid" alt="Responsive image"/>
              </div>

            </div>
          </Modal.Body>
        </Modal>
        
        <div className="modal" id="venue-modal" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-body">
                
              </div>
            </div>
          </div>
        </div>
    </div>
    )
  }
}

export default App;
