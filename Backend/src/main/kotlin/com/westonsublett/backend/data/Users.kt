package com.westonsublett.backend.data

import javax.persistence.*

@Entity
@Table(name = "users")
class Users() {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", nullable = false)
    var id: Int? = null

    @Column(name = "name")
    var name: String? = null

    @Column(name = "username")
    var username: String? = null

    @Column(name = "password")
    var password: String? = null

    constructor(name: String, username: String, password: String) : this() {
        this.name = name
        this.username = username
        this.password = password
    }
}