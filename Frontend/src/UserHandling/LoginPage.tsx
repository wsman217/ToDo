import React, {useState} from "react";
import {ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";

const background = require("../../assets/background.jpg");

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
        <View style={styles.container}>
            <ImageBackground
                source={background} style={styles.background} resizeMode={"cover"}>
                <View style={{
                    flex: .75,
                    paddingVertical: 10,
                }}></View>

                <View style={styles.wrapper}>
                    <View style={styles.wrapper}>
                        <View style={styles.inputWrap}>
                            <View style={styles.iconWrap}>
                                {/*Image. <Image source={lockIcon} style={styles.icon} resizeMode="contain" />*/}
                            </View>
                            <TextInput
                                onChangeText={newText => setDetails({...details, username: newText})}
                                placeholder={"Username"}
                                placeholderTextColor={"#FFF"}
                                style={styles.input}
                            />
                        </View>

                        <View style={styles.inputWrap}>
                            <View style={styles.iconWrap}>
                                {/*//Image. <Image source={lockIcon} style={styles.icon} resizeMode="contain" />*/}
                            </View>
                            <TextInput
                                onChangeText={newText => setDetails({...details, password: newText})}
                                secureTextEntry={true}
                                placeholder={"Password"}
                                placeholderTextColor={"#FFF"}
                                style={styles.input}
                            />
                        </View>

                        <TouchableOpacity
                            activeOpacity={.5}
                            onPress={() => submitHandler()}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Sign In</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.container}>
                        <View style={styles.signupWrap}>
                            <Text style={styles.accountText}>Don't have an account?</Text>
                            <TouchableOpacity
                                activeOpacity={.5}
                                onPress={() => setRegistering(true)}>
                                <View>
                                    <Text style={styles.signupLinkText}>Sign Up</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </View>
        /*<View style={{width: "100%", height: "100%", alignContent: "center"}}>
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
                        {/!*{(error != "") ? <Text style={{fontSize: 15}}>{error}</Text> : ""}*!/}
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
        </View>*/
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        width: "100%",
        height: "100%",
    },
    wrapper: {
        width: "75%",
        flex: 1,
        alignSelf: "center",
        justifyContent: "center",
    },
    inputWrap: {
        flexDirection: "row",
        marginVertical: 10,
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: "#CCC"
    },
    iconWrap: {
        paddingHorizontal: 7,
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        height: 20,
        width: 20,
    },
    input: {
        flex: 1,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: "#FF3366",
        paddingVertical: 20,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
    },
    buttonText: {
        color: "#FFF",
        fontSize: 18,
    },
    forgotPasswordText: {
        color: "#D8D8D8",
        backgroundColor: "transparent",
        textAlign: "right",
        paddingRight: 15,
    },
    signupWrap: {
        backgroundColor: "transparent",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    accountText: {
        color: "#D8D8D8"
    },
    signupLinkText: {
        color: "#FFF",
        marginLeft: 5,
    }
});