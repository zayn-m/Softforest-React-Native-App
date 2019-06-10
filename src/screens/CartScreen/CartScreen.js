import React,{Component} from 'react';
import {StyleSheet,View,ScrollView,Text,Button} from 'react-native';
import {connect} from 'react-redux';
import {HOST_URL} from '../../settings';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import CartItem from '../../components/CartItem/CartItem';
import {Navigation} from 'react-native-navigation';
class CartScreen extends Component{
    
    state={
        cart:[],
        total:0,

    }

    componentWillMount(){
         fetch(HOST_URL+`/cart-details/${this.props.userId}/`)
        .then(res=>res.json())
        .then(response=>{
            if(response){
                console.log(response);
                const total = Math.round(response.total);
                this.setState({cart:response.projects,total:total});
                   
            }
            
        }).catch(err=>console.log(err));
       
    }
    componentDidMount(){
        this.navigationEventListener = Navigation.events().bindComponent(this);
    }
    componentWillUnmount(){
        this.navigationEventListener.remove();
    }
    shouldComponentUpdate(nextProps,nextState){
        return this.props!==nextProps || this.state!==nextState;
    }
    itemDeleteHandler=(event,id)=>{
       
        this.setState(prevState=>{
            return{
                ...prevState,
                cart:prevState.cart.filter(key=>key.id!==id)
            };
        },()=>{
            const project=[...this.props.check];
            console.log(project);
            let index = project.indexOf(id);
            project.splice(index, 1);
            const data ={
                ...this.props.check,
                projects:project
            }
            fetch(HOST_URL+`/cart/${this.props.userId}/`,{
                method:"PATCH",
                body:JSON.stringify(data),
                headers:{
                    "Content-Type":"application/json"
                }
            }).then(res=>res.json())
            .then(response=>{  
                console.log(data);
                console.log(response); 
                    this.setState(prevState=>{
                        return {
                            ...prevState,
                            total:response.total
                        }
                    });
                    console.log(response);
                
            }).catch(err=>console.log(err));
        });  
    };
    checkOutHandler = () => {
        const data = {
            cart_id: this.props.cart_id,
            cart: this.state.cart,
            totalPrice: this.state.total,
            userId:this.props.userId
        };
        if(data.cart.length===0){
            console.log("IFFF");
            return;
        }
        else{
            console.log("ELSE");
            console.log(this.props);
           
            Navigation.push(this.props.componentId, {
                component: {
                  name: "softforest.OrderScreen",
                  passProps: {
                    data:data
                  }
                }
              });
          
        }
        
    };
    render(){
        console.log(this.props.check);
        return(
            <View style={styles.container}>
            <ScrollView>
            {
                this.state.cart.map(project=>{
                  return  <CartItem
                        key={project.id}
                        image={project.image}
                        title={project.title}
                        price={project.discount_rate !=0.00? project.discount_rate :project.price } 
                        delete={(event) => this.itemDeleteHandler(event, project.id)}
                    />;
                })
            }
        </ScrollView>
            <View style={styles.card}>
                <HeadingText >Your Cart Total</HeadingText>
                <View style={styles.checkOutContainer}>
                    <Text style={styles.price}>${Math.round(this.state.total)}</Text>
                </View>
                <Button title="CheckOut" color="#05C0BA"  onPress={this.checkOutHandler} />
            </View>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        margin:14
    },  
    card: {
        elevation: 2,
        marginTop: 10,
        backgroundColor: "white",
        justifyContent:'center'
      },
      price:{
        color: "black",
        fontSize: 18,
        padding: 8,
        borderWidth:1,
        borderRadius:10,
        marginBottom:10
      },
      checkOutContainer:{
        justifyContent: 'center',
        alignItems:"center"
      }
});

const mapStateToProps = state =>{
    return{
        userId:state.auth.userId,
        check:state.cart.data.projects,
        cart_id:state.cart.data.id
    };
};

export default connect(mapStateToProps)(CartScreen);