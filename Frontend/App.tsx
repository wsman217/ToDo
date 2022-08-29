
import {Text, View} from 'react-native';
import React, {Fragment, useState} from "react";

import * as Constants from "./src/Constants";
// @ts-ignore
import LoginPage from './src/UserHandling/LoginPage.tsx';

type LoginProps = {
    username: string
    password: string
}

export type RegisterProps = {
    username: string
    password: string
    name: string
}

export default function App() {
    const [user, setUser] = useState("")
    const [error, setError] = useState("")
    const [registering, setRegistering] = useState(false)

    const login = (props: LoginProps) => {
        let body = fetch(Constants.BASE_URL + "user/login", {
            method: 'POST',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(props)
        })
            .then((response) => {
                if (response.status != 200)
                    return null
                return response.text()
            })
            .then((data) => {
                if (data == null) {
                    setError("Invalid username or password.")
                    return
                }
                setUser(data)
            })
            .catch(() => {
                setError("Invalid username or password.")
            })
        //TODO save user key in cache. https://stackoverflow.com/questions/57776847/how-to-manage-user-session-in-react-native
    }

    const register = (props: RegisterProps) => {
        fetch(Constants.BASE_URL + "user/create",
            {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        username: props.username,
                        password: props.password,
                        name: props.name
                    }
                )
            })
            .then(() => (login(props)))
            .catch(() => setError("Username exists."))
    }

    //TODO Check if user key is saved.

    if (user == "") {
        if (registering)
            //TODO direct to a registration page.
            return (
                <Fragment>
                    <Text>Registering</Text>
                </Fragment>
            );
        else
            //TODO direct to a login page.
        {
            return (
                <View style={{
                    flex: 1,
                }}>
                    <LoginPage login={login} error={error} setRegistering={setRegistering}/>
                </View>
            );
        }
    } else {
        //TODO Return data.
        return (
            <Fragment>
                <Text>Data.</Text>
            </Fragment>
        )
    }
}
