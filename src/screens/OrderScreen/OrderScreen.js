import React from 'react';
import {Text,BackHandler,View,StyleSheet,ScrollView,ActivityIndicator} from 'react-native';
import {Navigation} from 'react-native-navigation';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import TableItem from '../../components/TableItem/TableItem';
import Input from '../../components/UI/Input/Input';
import validate from '../../utility/validation';
import Button from '../../components/UI/Button/Button';
import {HOST_URL} from '../../settings';

class OrderScreen extends  React.Component{
    state={
       controls:{
        name : {
            value: "",
            valid: false,
            placeholder:'Full Name',
            validationRules: {
              isName: true
            },
            touched: false
          },
          address : {
            value: "",
            valid: false,
            placeholder:'Address',
            validationRules: {
              isText: true
            },
            touched: false
          },
          country : {
            value: "",
            valid: false,
            placeholder:'Country',
            validationRules: {
              isName: true
            },
            touched: false
          },
          city : {
            value: "",
            valid: false,
            placeholder:'City',
            validationRules: {
              isName: true
            },
            touched: false
          },
          zipCode : {
            value: "",
            valid: false,
            placeholder:'ZipCode',
            validationRules: {
              isNumber: true
            },
            touched: false
          },
       },
       billingData:[],
       loading:false
    };
    componentDidMount(){
        console.log('ORder');
        this.navigationEventListener = Navigation.events().bindComponent(this);
        this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
        Navigation.pop(this.props.componentId); // works best when the goBack is async
        return true;
        
    });
    this.fetchBillinginfo();
    }
    fetchBillinginfo = () =>{
        fetch(HOST_URL+`/billing/${this.props.data.userId}/`)
        .then(res=>res.json())
        .then(response=>{
            if(response){
                console.log(response);
                this.setState({billingData:response});
            }
        }).catch(err=>console.log(err));
    }
    componentWillUnmount() {
        this.backHandler.remove();
        this.navigationEventListener.remove();
    }
    updateInputState = (key,val) =>{
        this.setState(prevState => {
            return {
              controls: {
                ...prevState.controls,
                [key]: {
                  ...prevState.controls[key],
                  value: val,
                  valid: validate(
                    val,
                    prevState.controls[key].validationRules,
                    null
                  ),
                  touched: true
                }
              }
            };
          });
    }
    billingInfoHandler = () =>{
        this.setState({loading:true});
        const data = {
            full_name: this.state.controls.name.value,
            address: this.state.controls.address.value,
            city: this.state.controls.city.value,
            country: this.state.controls.country.value,
            zipcode: this.state.controls.zipCode.value,
            user: this.props.data.userId
        }
        fetch(HOST_URL+`/billing/`,{
            method:"POST",
            body:JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>res.json())
        .then(response=>{
            if(response){
                console.log(response);
                this.setState({billingData:response,loading:false});
            }
        }).catch(err=>{
            this.setState({loading:false});
            console.log(err)
        });

    }
    render(){
        const projectList = this.props.data.cart.map(item=>{
            return <TableItem key={item.id} title={item.title} price={item.discount_rate?item.discount_rate:item.price} />
        });    
        const billingArray = [];
        for (let key in this.state.controls) {
            billingArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        const billingInput = billingArray.map(key=>{
            return   <Input key={key.id} placeholder={key.config.placeholder}
            value={key.config.value}
            valid={key.config.valid}
            onChangeText={val=>this.updateInputState(key.id,val)}
            touched={key.config.touched}
          />;
        });
        let billingSubmitButton = (
            <Button title="Add Billing Info" style={styles.billingButton} color="#05C0BA" disabled={buttonDisable} onPress={this.billingInfoHandler} />
        );
        if(this.state.loading){
            billingSubmitButton=<ActivityIndicator/>;
        }
        let buttonDisable = true;
        if(this.state.controls.name.valid && this.state.controls.address.valid
             && this.state.controls.zipCode.valid && this.state.controls.country.valid 
             && this.state.controls.city.valid){
                buttonDisable=false;
        }
        let billingForm = (
                    <ScrollView style={styles.inputContainer}>
                        {billingInput}
                         {billingSubmitButton}
                    </ScrollView>
        );
        if(this.state.billingData){
            console.log(this.state.billingData)
            billingForm = <View style={styles.dataStyling}>
                <Text style={styles.textFont}>{this.state.billingData.full_name}</Text>
                <Text style={styles.textFont} >{this.state.billingData.country}</Text>
            </View>;
        }
        
        
        return(
            <ScrollView>
            <View style={styles.container}>
                <View style={styles.card}>
                    <HeadingText>Order Summary</HeadingText>
                    <ScrollView >
                        {projectList}
                    </ScrollView>
                    <TableItem style={styles.textStyle} title="Total" price={this.props.data.totalPrice} />
                </View>
                <View style={styles.card}>
                    <HeadingText>Billing Info</HeadingText>
                    {billingForm}
                </View>
            </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        margin:2
    },
    inputContainer:{
        marginLeft:10,
        marginRight:10
    },
    card:{
        elevation: 2,
        marginTop: 10,
        backgroundColor: "white",
        justifyContent:'center'
    },
    textStyle:{
        fontWeight:'bold'
    },
    billingButton:{
        marginTop:5,
        marginBottom:20
    },
    dataStyling:{
        marginLeft:15,
        marginBottom:10
    },
    textFont:{
        fontSize:15,
        fontWeight:'bold'
    }
   
});

export default OrderScreen;