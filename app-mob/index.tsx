import { Button, Image, ScrollView, Text, TextInput, Pressable, View, ToastAndroid, FlatList, Alert, ActivityIndicator } from "react-native";
import { NativeWindStyleSheet } from "nativewind";
import { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import { Link, router } from "expo-router";
import React from "react";
import { getItem, removeItem, setItem } from "./MrData";
NativeWindStyleSheet.setOutput({
  default: "native",
});
export default function Home() {
  const [dashDisplay, setDashDisplay] = useState("hidden")
  const [orderDown, setOrderDown] = useState("flex")
  const [destination, setDestination] = useState("")
  const [productName, setProductName] = useState("")
  const [names, setNames] = useState("")
  const [price, setProductPrice] = useState("")
  const [quantity, setQuantity] = useState("")
  const [updateDest, setDest] = useState("")
  const [updateProd, setProd] = useState("")
  const [updateCust, setCust] = useState("")
  const [updatePrice, setPrice] = useState("")
  const [updateQty, setQty] = useState("")
  const [updateSts, setSts] = useState("")
  const [updateId, setId] = useState("")
  const [wamburaDis1, setWamburaDis1] = useState('hidden')
  const [wamburaDis2, setWamburaDis2] = useState('hidden')
  const [user, setUser] = useState("TanAir Cargo Guest")
  const [orderlist, setOrders] = useState([]);
  const [useKey, setUseKey] = useState(0);
  const [keyWord, setKeyWord] = useState("");
  const [checkKey, setCheckKey] = useState(false);
  const [indexDis, setIndexDis] = useState("hidden");
  const [homeDis, setHomeDis] = useState("flex");
  const [authLogDispl, setauthLogDispl] = useState('flex');
  const [authNewDispl, setauthNewDispl] = useState('hidden');
  const [loading, setLoading] = useState('hidden');
  const [fname, setFname] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPass, setNewPass] = useState('');
  const [logPass, setLogPass] = useState('');
  const [error, setError] = useState('');
  const [logEmail, setLogEmail] = useState('');
  var keys=0;
const loginActivity = async () => {
  if(logEmail != "" && logPass != ""){
    if(logEmail.indexOf("@") < 1){
      setError("Please Enter Valid Email");
          }
         else if(logEmail.indexOf(".") < 1){
          setError("Please Enter Valid Email");
         }
        else {
          if(logPass.length >= 8){
                setError(" Please Wait...")
                var token;
                await getItem('token').then(
                  async (v) => { if(v !== null || v !== "") { token = v } else {
                     const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json'
                    }, 
                    data: JSON.stringify({ id: '0q3234$' + logPass + "982#", email: + logEmail, names: logEmail}),
                };
                load();
                await axios.post("https://wambeleapi.perfectrecovery.co.tz/api/token", requestOptions)
                .then((response) => {
                  if(response.data.status != "1"){ setError("<!Security Check Failed! Try Login With Device You signedup with")}
                  else {
                    token = response.data.token
                  setItem("token", token);
                  }})}}).catch((e) => console.log(e))
                       const requestOptions = {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json'
                      }, 
                      data: JSON.stringify({ id: '0q3234$' + logPass + "982#", email: + logEmail, names: logEmail}),
                  };
                  load();
                  await axios.post("https://wambeleapi.perfectrecovery.co.tz/api/token", requestOptions)
                  .then((response) => {
                    if(response.data.status != "1"){ setError("<!Security Check Failed! Try Login With Device You signedup with")}
                    else {
                      token = response.data.token
                    setItem("token", token);
                    const requestOptions = {
                      method: 'POST',
                      data: { logEmail: logEmail, logPassword: logPass, signal: "1"},
                      headers: {
                        "Content-Type" : "application/json",
                        Authorization:'Bearer ' + token
                      }
                  }
                  axios.post("https://wambele.perfectrecovery.co.tz/tanairapi/tanair.php", requestOptions)
                  .then((response) => {
                    const status = response.data[0].status;
                    const userId = response.data[0].id;
                    const names = response.data[0].names;
                    switch (status) {
                      case "0":
                        unload();
                        setError("Unsecured Request: Try Again")
                        break;
                      case "1": 
                        setError("Success!...")
                        setItem('Email', logEmail);
                        setItem('usernames', names);
                        setItem('userId', userId);
                        setIndexDis("hidden")
                        setHomeDis("flex")
                        setUser(names)
                        setUseKey(useKey + 1)
                        setError("")
                        break;
                      case "2": 
                      unload();
                        setError("Check Email or Paswword?: Try Signup...")
                        break;
                      default:
                        unload();
                        setError("Security Alert: Use Device You SignedUp With ")
                        break;
                    }
               }).catch((err) => unload());
              }}).catch((e) => console.log(e))}
              else{setError("Password Too Short: Enter At Least 8 Characters")} }
}
else {setError("Enter Both, Email and Password")}
}
//signup activity 
  const signupActivity = () => {
    if(fname != "" && newPass != ""){
      if(newEmail.indexOf("@") < 1){
			  setError("Please Enter Valid Email");
	          }
	         else if(newEmail.indexOf(".") < 1){
            setError("Please Enter Valid Email");
	         }
          else {
            if(newPass.length >= 8){
                  setError(" Please Wait...")
                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json'
                        }, 
                        data: JSON.stringify({ id: '0q3234$' + newPass + "982#", email: + newEmail, names: fname}),
                    };
                    load();
                    axios.post("https://wambeleapi.perfectrecovery.co.tz/api/token", requestOptions)
                    .then((response) => {
                      if(response.data.status != "1"){ setError("<!Security Check Failed!> Try Again")}
                      else {
                      setItem("token", response.data.token);
                      setError("Secure Environment Created Succesfully...")
                      const requestOptions = {
                        method: 'POST',
                        data: { Email: newEmail, user_names: fname, password: newPass, signal: "0"},
                        headers: {
                          "Content-Type" : "application/json",
                          Authorization:'Bearer ' + response.data.token
                        }
                    };
                    axios.post("https://wambele.perfectrecovery.co.tz/tanairapi/tanair.php", requestOptions)
                    .then((response) => {
                      const status = response.data[0].status;
                      const userId = response.data[0].id;
                      switch (status) {
                        case "0":
                          unload();
                          setError("Unsecured Request: Try Again")
                          break;
                        case "1": 
                          setError("Success!...")
                          setItem('Email', newEmail);
                          setItem('usernames', fname);
                          setItem('userId', userId);
                          setHomeDis("flex");
                          setIndexDis("hidden");
                          setUser(fname)
                          setUseKey(useKey + 1)
                          setError("")
                          break;
                        case "2": 
                        unload();
                          setError("Email Already Registred: Try Login...")
                          break;
                        default:
                          unload();
                          setError("Something Unexpected Happened...")
                          break;
                      }
                 }
                ).catch((err) => unload());
                 }
                }
                ).catch((err) => unload());
                }else{setError("Password Too Short: Enter At Least 8 Characters")}
    }
  }
}
  const createDispl = () => {
    if(authNewDispl === 'hidden') { setauthNewDispl('flex'); setauthLogDispl('hidden'); } else {setauthNewDispl('hidden'); setauthLogDispl('flex');}
  }
  const handleKey = (e) => {
    if(e.nativeEvent.key == "Enter"){
      loginActivity();
    }
  }
  const handleKeySignup = (e) => {
    if(e.nativeEvent.key == "Enter"){
      signupActivity();
    }
  }
  const loginDispl = () => {
    if(authLogDispl === 'hidden') { setauthNewDispl('hidden'); setauthLogDispl('flex'); } else {setauthNewDispl('flex'); setauthLogDispl('hidden');}
  }
  const checkUser = () => {
    setCheckKey(true);
    getItem('userId').then((v) => {
      if(v !== null) {
        setIndexDis("hidden")
        setHomeDis("flex")
  } else {
     setIndexDis("flex")
     setHomeDis("hidden")
  }
    }).catch((e) => console.log(e))
    getItem('usernames').then((v) => {
        if(v !== null) {
          setUser(v)
    }
      }).catch((e) => console.log(e))
      
  } 
  checkKey ? console.log("Noooooo") : checkUser();
  
  const orderingActivity = async () => {
    setError("Please Wait....")
    var userId;
    await getItem('userId').then((value) => userId = value)
    if(productName != "" && price != "" && names != "" && quantity != "" && destination != ""){
                  var token;
                     await getItem('token').then(
                      (v) => v !== null || v !== "" ? token = v : token="").catch((e) => console.log(e))
                      const requestOptions = {
                        method: 'POST',
                        data: { product: productName, price: price, customer: names, quantity: quantity, destination: destination, added_by: userId, signal: "2"},
                        headers: {
                          "Content-Type" : "application/json",
                          Authorization:'Bearer ' + token
                        }
                    }
                    load()
                    axios.post("https://wambele.perfectrecovery.co.tz/tanairapi/tanair.php", requestOptions)
                    .then((response) => {
                      const status = response.data[0].status;
                      switch (status) {
                        case "0":
                          unload()
                          setError("Network Down: Try Again...")
                          break;
                          case "1": 
                          setProductName("")
                          setProductPrice("")
                          setNames("")
                          setQuantity("")
                          setDestination("")
                          setError("Order Placed Succesfully")
                          setUseKey(useKey + 1)
                            break;
                        default:
                          unload()
                          setError(" Order could Not Be Created Succesful try to reload app")
                          break;
                      }
                 }).catch((err) => unload());
                } else { setError("All Fields Are Required") }
              }
  const logOut = () => {
   removeItem('userId').then((r) => console.log(r));
   removeItem('Email').then((r) => console.log(r));
   removeItem('usernames').then((r) => console.log(r));
   setIndexDis("flex ")
   setHomeDis("hidden ")
   setUser("TanAir Cargo Guest")
  }
  const wamburaDisplay = () => {
    setWamburaDis1('flex')
  }
  const wamburaDisplayHide = () => {
    setWamburaDis1('hidden')
    setWamburaDis2('hidden')
  }
  const wambeleDisplayOrder = () => {
    orderDown === 'hidden'? setOrderDown('flex') : setOrderDown('hidden');
  }
  const viewDashboard = () => {
    if(dashDisplay === "hidden") {
      alert("Dashboard is hidden under construction")
    }
  }
  useEffect( ()=> {
          getItem("userId")
          .then((
            async (userid) => {
              var token;
              await getItem('token').then(
                (v) => v !== null || v !== "" ? token = v : token = "").catch((e) => console.log(e));
              const requestOptions = {
                method: 'POST',
                data: { added_by: userid, signal: "5" },
                headers: {
                  "Content-Type": "application/json",
                  Authorization: 'Bearer ' + token
                }
              };
              load()
              await axios.post("https://wambele.perfectrecovery.co.tz/tanairapi/tanair.php", requestOptions)
                .then((response) => {
                  unload()
                  if(response.data[0].status === "1"){
                  setOrders(response.data);
                  }
                }).catch((err) => unload());
            }
          ))}, [useKey]);
      //product cards 
      const updateStatus = (orderid, delivered) => {
        if(delivered !== "Delivered") {
          var userId;
        getItem("userId")
        .then((
          async (userid) => {
            userId = userid;
            var token;
            await getItem('token').then(
              (v) => v !== null || v !== "" ? token = v : token = "").catch((e) => console.log(e));
            const requestOptions = {
              method: 'POST',
              data: { orderId: orderid, added_by: userid, signal: "3" },
              headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + token
              }
            };
            load()
            await axios.post("https://wambele.perfectrecovery.co.tz/tanairapi/tanair.php", requestOptions)
              .then((response) => {
                setUseKey(useKey + 1)
              }).catch((err) => unload());
          }
        ))
        }
      }
      const deleteOrder = async (order, orderid) => {
        if(window.confirm("Delete This Order?")){
            var token;
            await getItem('token').then(
              (v) => v !== null || v !== "" ? token = v : token = "").catch((e) => console.log(e));
            const requestOptions = {
              method: 'POST',
              data: { orderId: orderid, signal: "4" },
              headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + token
              }
            };
            load()
            await axios.post("https://wambele.perfectrecovery.co.tz/tanairapi/tanair.php", requestOptions)
              .then((response) => {
                setUseKey(useKey + 1)
              }).catch((err) => unload());
        }
        }
      const updateOrder = (order) => {
        setWamburaDis2("flex")
        setId(order.orderid)
        setSts(order.order_status)
        setProd(order.product);
        setPrice(order.price);
        setCust(order.customer);
        setQty(order.quantity);
        setDest(order.destination);
      }
      const updatingActivity = async () => {
        if(updateProd != "" && updatePrice != "" && updateCust != "" && updateQty != "" && updateDest != ""){
                      var token;
                         await getItem('token').then(
                          (v) => v !== null ? token = v : token="").catch((e) => console.log(e))
                          const requestOptions = {
                            method: 'POST',
                            data: { product: updateProd, price: updatePrice, customer: updateCust, quantity: updateQty, destination: updateDest,status: updateSts, orderId: updateId, signal: "7"},
                            headers: {
                              "Content-Type" : "application/json",
                              Authorization:'Bearer ' + token
                            }
                        }
                        load()
                        axios.post("https://wambele.perfectrecovery.co.tz/tanairapi/tanair.php", requestOptions)
                        .then((response) => {
                          const status = response.data[0].status;
                          switch (status) {
                            case "0":
                              unload()
                              setError("Network Down: Try Again...")
                              break;
                              case "1": 
                              setError("Order Updated Succesfully")
                              setUseKey(useKey + 1)
                                break;
                            default:
                              unload()
                              setError(" Order could Not Be Updated Succesful try again")
                              break;
                          }
                     }).catch((err) => unload());
                    } else { setError("All Fields Are Required") }
      }
    const ProductBigCard = ({order}) => {
      return (<View key={keys++} className="flex flex-col  w-full p-2">
        <View className="flex flex-wrap items-center w-full flex-row p-2 border-b border-gray-200">
        <Text className=" text-sm flex-1 font-bold">#Order-{order.orderid}</Text>
        <View className="flex flex-row flex-1">
        <Image className = "flex shadow-md w-7 h-7 rounded"
        source={require("../assets/images/joseph.png")}/>
        <Text className="text-xs p-1">{order.product}</Text>
        </View>
        <Text className="text-xs p-1 flex-1"> {order.customer}</Text>
        <Text className="text-xs p-1 flex-1"> {order.quantity} </Text>
        <Text className="text-xs p-1 flex-1"> {order.price}</Text>
        <Text className="text-xs p-1 flex-1"> {order.order_status}</Text>
        <Text className="text-xs p-1 flex-1"> {order.destination}</Text>
        <View className="flex flex-row flex-1 items-center sm:flex-row">
        <Pressable onPress={() => {updateOrder(order)}} className="flex flex-row justify-center items-center border border-gray-100 p-1 rounded shadow-sm m-1"><Image className="flex w-5 h-5" source={require("../assets/images/update.png")}/><Text>Update</Text></Pressable>
        <Pressable onPress={() => {deleteOrder(order, order.orderid)}} className="flex flex-row justify-center items-center border border-gray-100 p-1 rounded shadow-sm"><Image className="flex w-5 h-5" source={require("../assets/images/delete.png")}/><Text> Delete</Text></Pressable>
        </View>
        </View></View>
      )
    }
    const ProductMobileCard = ({order}) => { 
      if(order.order_status !== "Delivered"){
     return (<View key={keys++} className="flex shadow bg-white rounded  sm:hidden flex-col  w-full mb-2">
  <Pressable className="flex flex-row flex-wrap items-center w-full p-2 border-b border-gray-200">
  <View className="flex flex-col w-1/2 gap-3">
  <Text className="text-start flex-1 font-bold">Order ID</Text>
  <Text className=" text-sm flex-1 font-medium">#Order-{order.orderid}</Text>
  </View>
  <View className="w-1/2 flex-wrap p-2">
  <Text className=" text-start font-bold p-2">Product</Text>
  <View className="flex flex-row flex-1">
  <Image className = "flex shadow-md w-7 h-7 rounded"
  source={require("../assets/images/joseph.png")}/>
  <Text className="text-xs p-1">{order.product}</Text>
  </View>
  </View>
  </Pressable>
  <View className= { orderDown  + " flex-col gap-4"}>
  <View className="flex flex-row flex-wrap w-full p-2 items-center border-b border-gray-300 ">
  <Text className="font-bold flex-1">Customer Name</Text>
  <Text className="text-xs p-1 flex-1"> {order.customer} </Text>
  </View>
  <View className="flex flex-row flex-wrap w-full p-2 items-center border-b border-gray-300">
  <Text className="font-bold flex-1">Quantity</Text>
  <Text className="text-xs p-1 flex-1"> {order.quantity} </Text>
  </View>
  <View className="flex flex-row flex-wrap w-full p-2 items-center border-b border-gray-300">
  <Text className="font-bold flex-1">Price</Text>
  <Text className="text-xs p-1 flex-1"> {order.price} </Text>
  </View>
  <View className="flex flex-row flex-wrap w-full p-2 items-center border-b border-gray-300">
  <Text className="font-bold flex-1">Status</Text>
  <Text className="text-xs p-1 flex-1">{order.order_status}</Text>
  </View>
  <View className="flex flex-row flex-wrap w-full p-2 items-center border-b border-gray-300">
  <Text className="font-bold flex-1">Destination</Text>
  <Text className="text-xs p-1 flex-1">{order.destination}</Text>
  </View>
  <View className="flex flex-row flex-wrap w-full p-2 items-center border-b border-gray-300">
  <Text className="font-bold flex-1">Ordered</Text>
  <Text className="text-xs p-1 flex-1">{order.date}</Text>
  </View>
  <View className="flex flex-row flex-wrap w-full p-2 items-center">
  <Text className="font-bold flex-1"></Text>
  <View className="flex flex-row justify-end flex-1 items-center sm:flex-row">
  <Pressable onPress={() => updateStatus(order.orderid, order.order_status)} className="bg-gray-950 flex flex-row justify-center items-center p-2 rounded shadow-2xl m-2 mr-4">
    <Image className="flex w-5 h-5 mr-2" source={require("../assets/images/tick.png")}/>
    <Text className="text-white">Delivered</Text>
    </Pressable>
  </View>
  </View>
  </View>
  </View>)}
   else {
    return (<View key={keys++} className="flex shadow bg-white rounded  sm:hidden flex-col  w-full mb-2">
      <Pressable className="flex flex-row flex-wrap items-center w-full p-2 border-b border-gray-200">
      <View className="flex flex-col w-1/2 gap-3">
      <Text className="text-start flex-1 font-bold">Order ID</Text>
      <Text className=" text-sm flex-1 font-medium">#Order-{order.orderid}</Text>
      </View>
      <View className="w-1/2 flex-wrap p-2">
      <Text className=" text-start font-bold p-2">Product</Text>
      <View className="flex flex-row flex-1">
      <Image className = "flex shadow-md w-7 h-7 rounded"
      source={require("../assets/images/joseph.png")}/>
      <Text className="text-xs p-1">{order.product}</Text>
      </View>
      </View>
      </Pressable>
      <View className= { orderDown  + " flex-col gap-4"}>
      <View className="flex flex-row flex-wrap w-full p-2 items-center border-b border-gray-300 ">
      <Text className="font-bold flex-1">Customer Name</Text>
      <Text className="text-xs p-1 flex-1"> {order.customer} </Text>
      </View>
      <View className="flex flex-row flex-wrap w-full p-2 items-center border-b border-gray-300">
      <Text className="font-bold flex-1">Quantity</Text>
      <Text className="text-xs p-1 flex-1"> {order.quantity} </Text>
      </View>
      <View className="flex flex-row flex-wrap w-full p-2 items-center border-b border-gray-300">
      <Text className="font-bold flex-1">Price</Text>
      <Text className="text-xs p-1 flex-1"> {order.price} </Text>
      </View>
      <View className="flex flex-row flex-wrap w-full p-2 items-center border-b border-gray-300">
      <Text className="font-bold flex-1">Status</Text>
      <Text className="text-xs p-1 flex-1">{order.order_status}</Text>
      </View>
      <View className="flex flex-row flex-wrap w-full p-2 items-center border-b border-gray-300">
      <Text className="font-bold flex-1">Destination</Text>
      <Text className="text-xs p-1 flex-1">{order.destination}</Text>
      </View>
      <View className="flex flex-row flex-wrap w-full p-2 items-center border-b border-gray-300">
      <Text className="font-bold flex-1">Ordered</Text>
      <Text className="text-xs p-1 flex-1">{order.date}</Text>
      </View>
      <View className="flex flex-row flex-wrap w-full p-2 items-center">
      <Text className="font-bold flex-1"></Text>
      <View className="flex flex-row justify-end flex-1 items-center sm:flex-row">
      <Pressable onPress={() => updateStatus(order.orderid, order.order_status)} className= "bg-gray-400 flex flex-row justify-center items-center p-2 rounded border border-black/30 m-2 mr-4"><Image className="flex w-5 h-5 mr-2" source={require("../assets/images/tick.png")}/><Text className="text-blue-950">Delivered</Text></Pressable>
      </View>
      </View>
      </View>
      </View>)
   }
  } 
  const handleKeyPress = (e) => {
    if(e.nativeEvent.key == "Enter"){
      searchGo();
    }
  }
  const handleKeyOrder = (e) => {
    if(e.nativeEvent.key == "Enter"){
      orderingActivity();
    }
  }
  const searchGo = () => {
      getItem("userId")
      .then((
        async (userid) => {
          var token;
          await getItem('token').then(
            (v) => v !== null || v !== "" ? token = v : token = "").catch((e) => console.log(e));
          const requestOptions = {
            method: 'POST',
            data: { added_by: userid, keyword: keyWord, signal: "6" },
            headers: {
              "Content-Type": "application/json",
              Authorization: 'Bearer ' + token
            }
          };
          load()
          await axios.post("https://wambele.perfectrecovery.co.tz/tanairapi/tanair.php", requestOptions)
            .then((response) => {
              unload()
              if(response.data == "0") {
                alert("No Order, To List All orders filter with Empty")
              } else
              setOrders(response.data);
            }).catch((err) => unload());
        }
      ))
  }
  const load = () => {
    setLoading("flex")
  }
  const unload = () => {
    setLoading("hidden")
  }
//render items according to viewport
const renderItemMob = ({item}) => <ProductMobileCard key={keys++} order={item}/>
const renderItemBig = ({item}) => <ProductBigCard key={keys++} order={item}/>
//return full view
  return (<View className="w-full h-full absolute mt-7">
    <View className= { loading + " absolute z-50 w-full h-full justify-center bg-black/30 items-center"}>
    <ActivityIndicator size="large" color="#ffffff" /></View>
  <View className={homeDis + " w-full h-full"}>
    <View className= {wamburaDis2 + " absolute z-20 items-center justify-center w-full bg-black/60 h-full"}>
    <View className="flex shadow-2xl bg-white sm:w-3/4 h-auto sm:ml-52 w-3/4 p-3 rounded">
    <Text className="font-bold pl-3 pb-3">Update Order</Text>
    <Text onPress={wamburaDisplayHide} className="absolute right-0 pr-3 mr-4 text-xs text-red-800">
    <Image className = "flex w-5 h-5 mx-auto" alt="opts" source={require("../assets/images/close.gif")}/>
    </Text>
    <View className="product flex">
      <View className="flex flex-col sm:flex-row flex-wrap">
      <TextInput className="placeholder-gray-600 flex-1 p-2 border rounded m-3" value={updateProd} onChangeText={(val) => setProd(val)} placeholder="Enter Product Name"/>
      <TextInput className="placeholder-gray-600 flex-1 p-2 border rounded m-3" value={updatePrice} onChangeText={(val) => setPrice(val)} placeholder="Enter Sample Price"/>
      </View>
      <TextInput className="placeholder-gray-600 p-2 border rounded m-3" value={updateCust} onChangeText={(val) => setCust(val)} placeholder="Enter Customer Names"/>
      <View className="flex flex-col sm:flex-row flex-wrap ">
      <TextInput className="placeholder-gray-600 flex-1 p-2 border rounded m-3" value={updateQty} onChangeText={(val) => setQty(val)} placeholder="Enter Quantity"/>
      <TextInput className="placeholder-gray-600 flex-1 p-2 border rounded m-3" value={updateDest} onChangeText={(val) => setDest(val)} placeholder="Enter Destination Adress"/>
      <TextInput onKeyPress={(e) => handleKeyOrder(e)} className="placeholder-gray-600 flex-1 p-2 border rounded m-3" value={updateSts} onChangeText={(val) => setSts(val)} placeholder="Update Status/ Delivered is Not Supported Here!"/>
      <Text className=" text-center w-full text-red-950 bg-white">{error}</Text>
      </View>
      <Pressable onPress={updatingActivity} className="flex flex-1 rounded shadow m-3 p-3 items-center bg-green-900"><Text className="text-white font-medium">UPDATE DATA</Text></Pressable>
      </View>
    </View>
    </View>
    <View className= {wamburaDis1 + " absolute z-20 items-center justify-center w-full bg-black/60 h-full"}>
    <View className="flex shadow-2xl bg-white sm:w-3/4 h-auto sm:ml-52 w-10/12 p-3 rounded">
    <Text className="font-bold pl-3 pb-3 h-8">Create New Order</Text>
    <Text onPress={wamburaDisplayHide} className="absolute right-0 pr-3 mr-2 h-8 text-xs text-red-800">
    <Image className = "flex w-5 h-5 mx-auto" alt="opts" source={require("../assets/images/close.gif")}/>
    </Text>
    <View className="product flex flex-col p-2">
      <View className="flex flex-col sm:flex-row w-full mb-2">
      <TextInput className="placeholder-gray-600 p-2 mb-2 border rounded w-full" onChangeText={(val) => setProductName(val)} placeholder="Enter Product Name"/>
      <TextInput className="placeholder-gray-600 p-2 mb-2 border rounded w-full" onChangeText={(val) => setProductPrice(val)} placeholder="Enter Sample Price"/>
      </View>
      <TextInput className="placeholder-gray-600 p-2 mb-2 border rounded w-full" onChangeText={(val) => setNames(val)} placeholder="Enter Customer Names"/>
      <View className="flex flex-col sm:flex-row w-full mb-2">
      <TextInput className="placeholder-gray-600 p-2 mb-2 border rounded w-full" onChangeText={(val) => setQuantity(val)} placeholder="Enter Quantity"/>
      <TextInput onKeyPress={(e) => handleKeyOrder(e)}
      className="placeholder-gray-600 p-2 mb-2 border rounded w-full" onChangeText={(val) => setDestination(val)} placeholder="Enter Destination Adress"/>
      <Text className=" text-center w-full text-red-950 bg-white">{error}</Text>
      </View>
      <Pressable onPress={orderingActivity} className="flex rounded shadow p-3 mt-3 items-center bg-green-900"><Text className="text-white font-medium">ORDER NOW</Text></Pressable>
      </View>
    </View>
    </View>
  <View className="flex flex-row sm:flex-row flex-wrap h-full w-full">
  <View className="flex shadow z-10 flex-row sm:flex-col h-14 sm:h-full w-full sm:w-2/12 p-2 justify-center items-center bg-blue-950">
  <Text className="flex text-lg sm:text-2xl w-1/2 sm:w-full sm:justify-center font-medium text-white">TanAir Cargo</Text>
  <Pressable onPress={wamburaDisplay}
  className="flex flex-row justify-center items-center border bg-blue-100 sm:top-10 border-gray-50 p-2 sm:p-5
   rounded shadow-2xl">
    <Image className="p-1 flex w-7 h-7 " source={require("../assets/images/add-active.png")}/>
    <Text className="text-blue-950"> Create New Order </Text>
  </Pressable>
  </View>
  <View
    className="flex flex-col h-full w-full sm:w-10/12 bg-blue-100 sm:p-2 p-0">
  <View className="flex flex-row items-center left-2 shadow-md justify-end shadow-black/60 bg-white gap-2 w-full p-1">
      <View className="flex"><Text className="font-bold">{user}</Text>
      <Text className="text-xs">Admin</Text>
      <Pressable className="border-none text-center p-1 bg-blue-950 shadow rounded mt-1" onPress={logOut}>
        <Text className="text-center  text-white">Sign Out</Text></Pressable>
      </View>
      <View className=" border rounded-full border-dashed border-gray-400 p-1 w-13 h-13">
        <Image source={require("../assets/images/joseph.png")} className=" shadow-md flex w-10 h-10 rounded-full"/>
        </View>
    </View>
    <ScrollView className="flex flex-col h-full w-full p-2 pb-16">
    <View className="flex pb-3 pt-3 justify-start flex-row w-full"><Text className="text-2xl text-blue-950 font-bold ">Customer Orders</Text><Image className = "flex w-auto h-7 ml-2" alt="opts" source={require("../assets/images/flight.png")}/></View>
      <Pressable className="flex flex-row items-center ">
      <Pressable  onPress={()=> viewDashboard()}>
</Pressable>
<View className="flex  rounded-l  items-center justify-center border border-gray-200 flex-row w-full sm:w-1/3 bg-gray-100 right-0 sm:left-2/3 rounded-r">
<TextInput onKeyPress={(e) => handleKeyPress(e)} onChangeText={(keyw) => setKeyWord(keyw)} className="flex p-3  text-center rounded bg-white w-10/12 placeholder-gray-600" placeholder="Search by Customer Name/ Status"/>
<Pressable onPress={searchGo} className="flex justify-center items-center w-2/12"><Image className = "flex w-7 h-7" alt="opts" source={require("../assets/images/search.png")}/></Pressable>
</View></Pressable>
<View className=" hidden md:hidden sm:flex sm:flex-col">
<View className="flex flex-row flex-wrap items-center w-full p-2 border-b border-gray-200">
    <Text className="text-start flex-1 font-bold">Order ID</Text>
    <Text className=" text-start flex-1 font-bold">Product Name</Text>
    <Text className="font-bold flex-1">Customer Name</Text>
    <Text className="font-bold flex-1">Quantity</Text>
    <Text className="font-bold flex-1">Price</Text>
    <Text className="font-bold flex-1">Status</Text>
    <Text className="font-bold flex-1">Destination</Text>
    <Text className="font-bold flex-1 text-center">Action</Text>
    </View>
    {orderlist.map((order) => <ProductBigCard key={keys++} order={order}/>)}
</View>
<View className=" sm:hidden md:hidden flex flex-col pb-24">
    <Pressable className="flex sm:hidden " onPress={wambeleDisplayOrder}>
    <Text className="flex text-blue-400 p-2 w-1/2 m-1 text-sm underline">Minimize Orders &gt;</Text></Pressable>
{orderlist.map((order) => <ProductMobileCard key={keys++} order={order}/>)}</View>
</ScrollView>
</View></View></View>
{/*Index Operations start here */}
<View
    className= {indexDis + " flex-col justify-center items-center h-full w-full bg-blue-900 sm:bg-blue-950"}
    ><View 
    className=" flex h-full w-full sm:w-3/4 md:w-1/2 lg:w-4/12
     sm:shadow-[-1px 4px 28px 0px rgba(0,0,0,0.75)] p-4 sm:p-8 sm:bg-blue-900"
    ><View className="flex flex-col flex-initial mb-5 items-center w-full">
      <Image alt="TanAir" source={require("../assets/images/tanair.jpg")} className="flex w-28 h-28 rounded-full border border-dashed border-blue-800 shadow"/>
       <Text className=" text-4xl text-white drop-shadow font-serif">TanAir Cargo</Text>
      </View>
      <Text className="text-red-200 w-full text-center h-auto">{error}</Text>
    <View className= {authLogDispl + " flex-col w-full top-32"}>
      <Text className="text-black text-base pl-2 hidden">Username</Text>
       <TextInput onChangeText={(val) => setLogEmail(val)} 
       placeholder="Enter Account Email" 
       className="flex w-full mb-4 bg-white p-2 pl-4 Email placeholder-gray-600"></TextInput>
       <Text className="text-black text-base pl-2 hidden">Password</Text>
       <TextInput onKeyPress={(e) => handleKey(e) } onChangeText={(val) => setLogPass(val)} placeholder="Enter Password"
        className="flex w-full mb-4 justify-center items-center p-2 pl-4 bg-white placeholder-gray-500"></TextInput>
       <View className="w-full flex flex-col">
        <Pressable onPress={loginActivity} 
        className="flex p-2 mb-3 w-full items-center bg-blue-950 shadow-inner">
          <Text className=" flex text-xl text-white drop-shadow ">Login</Text>
          </Pressable>
        <Pressable onPress={createDispl} 
        className="flex p-2  border border-white w-full bg-none mr-2 justify-center items-center">
          <Text className="flex text-lg text-white drop-shadow">Create New Account</Text></Pressable>
      </View>
    </View>
    <View className= {authNewDispl + " flex-col flex-1 w-full gap-3 pt-4"}>
      <Text className="text-white text-base">Full Names</Text>
       <TextInput onChangeText={(val) => setFname(val)} placeholder="Enter Your Names"
        className="flex w-full bg-white shadow border-blue-500 p-2 pl-4 Email placeholder-gray-600"></TextInput>
      <Text className="text-white text-base">Email</Text>
       <TextInput textContentType="emailAddress" onChangeText={(val) => setNewEmail(val)}
        placeholder="Enter Account Email" className="flex bg-white w-full border-b border-blue-500 p-2 pl-4 Email placeholder-gray-600"></TextInput>
       <Text className="text-white text-base">Account Password</Text>
       <TextInput onKeyPress={(e) => handleKeySignup(e) } textContentType="password"
        onChangeText={(val) => setNewPass(val)} placeholder="Enter Password" 
        className="flex w-full border-b bg-white border-blue-500 p-2 pl-4 placeholder-gray-600"></TextInput>
       <View className="w-full flex">
        <Pressable onPress={signupActivity}
        className="flex p-3 w-full items-center text-center border border-blue-500  bg-blue-950 shadow-lg rounded">
          <Text className="flex text-xl text-white shadow">Signup</Text></Pressable>
        <Pressable onPress={loginDispl} 
        className="flex p-3 shadow w-full bg-blue-white border border-white rounded mt-2 justify-center items-center">
      <Text className="text-white text-xl">Login</Text></Pressable>
          </View>
    </View></View>
    </View></View>)}
