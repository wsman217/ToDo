import React, {useState} from "react";
import {ImageBackground, Pressable, Text, TextInput, TouchableOpacity, View} from "react-native";

export default function Login({
                                  login,
                                  error,
                                  setRegistering
                              }: { login: Function, error: string, setRegistering: Function }) {
    const [details, setDetails] = useState({username: "", password: ""})

    const submitHandler = () => {
        login(details);
    }
    return (
        <View style={{width: "100%", height: "100%", alignContent: "center"}}>
            <ImageBackground source={require("../../assets/background.jpg")}
                             resizeMode={"contain"}
                             style={{
                                 flex: 1,
                                 justifyContent: "center",
                                 alignItems: "center",
                                 paddingVertical: "30%",
                                 height: "100%",
                                 width: "100%"
                             }}>
                <View style={{
                    flex: 1,
                    justifyContent: "space-around",
                    backgroundColor: "rgba(187,150,231,0.8)",
                    paddingHorizontal: "5%",
                    paddingVertical: "3%",
                    borderRadius: 15
                }}>
                    <View>
                        <Text style={{
                            color: "#000000",
                            fontSize: 32,
                            fontWeight: "bold",
                            alignSelf: "center"
                        }}>Login</Text>
                    </View>

                    <View>
                        <TextInput placeholder={"Enter username: "}
                                   onChangeText={newText => setDetails({...details, username: newText})}
                                   defaultValue={details.username}
                                   placeholderTextColor={"#413946"}
                                   style={{
                                       borderStyle: "solid",
                                       borderWidth: 2,
                                       borderRadius: 7,
                                       borderColor: "#685d6e",
                                       textAlign: "center",

                                   }}
                        />
                    </View>

                    <View>
                        <TextInput placeholder={"Enter password: "}
                                   onChangeText={newText => setDetails({...details, password: newText})}
                                   defaultValue={details.password} secureTextEntry={true}
                                   placeholderTextColor={"#413946"}
                                   style={{
                                       borderStyle: "solid",
                                       borderWidth: 2,
                                       borderRadius: 7,
                                       borderColor: "#685d6e",
                                       textAlign: "center",

                                   }}/>
                    </View>

                    <View>
                        <TouchableOpacity onPress={() => submitHandler()}
                                          activeOpacity={.8}
                                          style={{
                                              padding: "3%",
                                              borderRadius: 4,
                                              backgroundColor: "#b142cc",
                                              alignSelf: "flex-start",
                                              minWidth: "100%",
                                          }}>
                            <Text style={{
                                alignSelf: "center",
                                justifyContent: "center",
                                color: "#fff",
                                fontWeight: "bold"
                            }}>Login</Text>
                        </TouchableOpacity>
                        {/*{(error != "") ? <Text style={{fontSize: 15}}>{error}</Text> : ""}*/}
                    </View>

                    <Pressable onPress={() => setRegistering(true)}
                               style={{
                                   minWidth: "100%",
                               }}>
                        <Text style={{
                            textAlign: "center",
                            fontSize: 12
                        }}>Register</Text>
                    </Pressable>

                </View>
            </ImageBackground>
        </View>
    )
}