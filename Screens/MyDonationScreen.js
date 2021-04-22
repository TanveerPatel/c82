import React ,{Component} from 'react'
import {View, Text,TouchableOpacity,ScrollView,FlatList,StyleSheet} from 'react-native';
import {Card,Icon,ListItem} from 'react-native-elements'
import MyHeader from '../Components/MyHeader.js'
import firebase from 'firebase';
import db from '../config.js'

export default class MyDonationScreen extends Component {
  static navigationOptions = { header: null };

   constructor(){
     super()
     this.state = {
       userId : firebase.auth().currentUser.email,
       allDonations : [],
       bookName :"",
       donorName :" "
     }
     this.requestRef= null
   }

getDonorDetails = (donorId) => {
    db.collection("users").where("email_Id", "==", donorId).get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            "donorName": doc.data().first_name + " " + doc.data().last_name
          })
        });
      })
  }
   getAllDonations =()=>{
     this.requestRef = db.collection("all_donations").where("donor_id" ,'==', this.state.userId)
     .onSnapshot((snapshot)=>{
       var allDonations = snapshot.docs.map(document => document.data());
       this.setState({
         allDonations : allDonations,
       });
     })
   }

   keyExtractor = (item, index) => index.toString()

   
   renderItem = ( {item, i} ) =>{
    return (
      <ListItem 
        key={i}    bottomDivider>
        <ListItem.Content>
            <ListItem.Title style= {{color: 'black',fontWeight:"bold"}}> {item.book_name}</ListItem.Title>
            <ListItem.Subtitle style={{color : 'green'}}>Requested by: {item.requested_by}</ListItem.Subtitle>
            <ListItem.Subtitle style={{color : 'green'}}>status: {item.request_status}</ListItem.Subtitle>
                       
            <TouchableOpacity style={styles.button}           >
                <Text style={{color :'#ffff'}}>Send Book</Text>

            </TouchableOpacity>
        </ListItem.Content>
     
          </ListItem>
    )
  }
   
   componentDidMount(){
     this.getAllDonations()
     this.getDonorDetails(this.state.userId)
   }

   componentWillUnmount(){
     this.requestRef();
   }

   render(){
     return(
       <View style={{flex:1}}>
         <MyHeader navigation={this.props.navigation} title="My Donations"/>
         <View style={{flex:1}}>
           {
             this.state.allDonations.length === 0
             ?(
               <View style={styles.subtitle}>
                 <Text style={{ fontSize: 20}}>List of all book Donations</Text>
               </View>
             )
             :(
               <FlatList
                 keyExtractor={this.keyExtractor}
                 data={this.state.allDonations}
                 renderItem={this.renderItem}
               />
             )
           }
         </View>
       </View>
     )
   }
   }


const styles = StyleSheet.create({
  button:{
    width:100,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     },
    elevation : 16
  },
  subtitle :{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center'
  }
})
