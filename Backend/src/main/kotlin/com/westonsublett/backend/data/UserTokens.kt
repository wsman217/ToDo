package com.westonsublett.backend.data

import at.favre.lib.crypto.bcrypt.BCrypt
import at.favre.lib.crypto.bcrypt.LongPasswordStrategies
import java.sql.Date
import javax.persistence.*

@Entity
@Table(name = "user_tokens")
class UserTokens() {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "token_id", nullable = false)
    var id: Int? = null

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    var user: Users? = null

    @Column(name = "value")
    var value: String? = null

    @Column(name = "expiration")
    var expiration: Date? = null

    constructor(user: Users, expiration: Date) : this() {
        this.user = user
        this.value = BCrypt.with(LongPasswordStrategies.hashSha512(BCrypt.Version.VERSION_2A))
            .hashToString(12, (System.currentTimeMillis().toString() + user.password).toCharArray())
        /*this.value = BCrypt.withDefaults().hashToString(
            12, (System.currentTimeMillis().toString() + user.password).toCharArray()
        )*/
        this.expiration = expiration
    }
}